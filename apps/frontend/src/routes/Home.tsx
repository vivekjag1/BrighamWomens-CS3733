import { FormEvent, useState, useEffect } from "react";
import axios from "axios";
import { GraphNode } from "common/src/GraphNode.ts";
import { APIEndpoints } from "common/src/APICommon.ts";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import Map from "../components/Map/Map.tsx";
import ZoomControls from "../components/Map/ZoomControls.tsx";
import NavigationPane from "../components/Map/NavigationPane.tsx";
import FloorSelector from "../components/Map/FloorSelector.tsx";
import { createNodes } from "common/src/GraphCommon.ts";

function Home() {
  const [activeFloor, setActiveFloor] = useState(DEFAULT_FLOOR);
  const [nodes, setNodes] = useState<GraphNode[]>([]);
  const [path, setPath] = useState<GraphNode[]>(INITIAL_PATH);

  // Gets nodes from database to draw
  useEffect(() => {
    async function getNodesFromDb() {
      const rawNodes = await axios.get(APIEndpoints.mapGetNodes);
      let graphNodes = createNodes(rawNodes.data);
      graphNodes = graphNodes.filter((node) => node.nodeType != "HALL");
      graphNodes = graphNodes.sort((a, b) =>
        a.longName.localeCompare(b.longName),
      );
      setNodes(graphNodes);
      return graphNodes;
    }
    getNodesFromDb().then();
  }, []);

  // Submits currentLocation and destination to backend and gets an iterable of nodes representing path
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); // prevent page refresh
    const formData = new FormData(e.target as HTMLFormElement);
    console.log(Array.from(formData));
    setPath(INITIAL_PATH);

    /*const queryParams: Record<string, string> = {
      [NavigateAttributes.startLocationKey]: formData.get(
        NavigateAttributes.startLocationKey!.toString(),
      ),
      [NavigateAttributes.endLocationKey]: formData.get(
        NavigateAttributes.endLocationKey!.toString(),
      ),
      [NavigateAttributes.algorithmKey]: formData.get(
        NavigateAttributes.algorithmKey!.toString(),
      ),
    };*/
    /*const params: URLSearchParams = new URLSearchParams(queryParams);
    const url = new URL(APIEndpoints.navigationRequest, window.location.origin);
    url.search = params.toString();
    await axios
      .get(url.toString())
      .then(function (response) {
        setPath(response.data.path);
        setActiveFloor(getFloorNumber(response.data.path[0].floor));
        console.log(response.data);
      })
      .catch(console.error);*/
  }

  return (
    <div className="relative bg-offwhite">
      <TransformWrapper
        doubleClick={{ disabled: true }}
        panning={{ velocityDisabled: true }}
      >
        <div className="absolute top-[2%] right-[1.5%] z-10">
          <ZoomControls />
        </div>
        <TransformComponent
          wrapperStyle={wrapperStyles}
          contentStyle={contentStyles}
        >
          <Map activeFloor={activeFloor} nodes={nodes} path={path} />
        </TransformComponent>
      </TransformWrapper>
      <div className="absolute top-[1%] left-[1%]">
        <NavigationPane nodes={nodes} onSubmit={handleSubmit} />
      </div>
      <div className="absolute bottom-[2%] right-[1.5%]">
        <FloorSelector
          activeFloor={activeFloor}
          path={path}
          onClick={(selectedFloor: number) => setActiveFloor(selectedFloor)}
        />
      </div>
    </div>
  );
}

const wrapperStyles = {
  width: "100%",
  height: "100%",
  paddingLeft: "3%",
} as const;

const contentStyles = {
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
} as const;

const DEFAULT_FLOOR: number = 1;
const INITIAL_PATH: GraphNode[] = [
  new GraphNode("", "0", "0", "", "", "", "", ""),
  new GraphNode("", "0", "0", "", "", "", "", ""),
  new GraphNode("", "0", "0", "", "", "", "", ""),
  new GraphNode("", "0", "0", "", "", "", "", ""),
  new GraphNode("", "0", "0", "", "", "", "", ""),
];

export default Home;
