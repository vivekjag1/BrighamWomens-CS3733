import React, { FormEventHandler } from "react";
import { Node } from "database";
import LocationIcon from "@mui/icons-material/LocationOn";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import StarIcon from "@mui/icons-material/Star";
import InfoIcon from "@mui/icons-material/Info";
import NodeParam from "./NodeParam.tsx";

const textFieldStyles = {
  width: "17vw",
};

function MapEditCard(props: {
  selectedNode?: Node;
  setSelectedNode: React.Dispatch<React.SetStateAction<Node | undefined>>;
  onReset: FormEventHandler;
}) {
  const setNodeX = (node: Node | undefined) => (x: string) => {
    if (node) props.setSelectedNode({ ...node, xcoord: x });
  };
  const setNodeY = (node: Node | undefined) => (y: string) => {
    if (node) props.setSelectedNode({ ...node, ycoord: y });
  };

  return (
    <div>
      <div className="border-5 flex p-4 bg-white rounded-2xl shadow-xl">
        <div className="flex flex-col gap-[1rem]">
          <div className="flex flex-row justify-between">
            <h2 className="text-2xl font-extralight text-secondary">
              Modify Nodes
            </h2>
          </div>

          <div className="flex gap-1 items-center">
            <StarIcon style={{ color: "#012D5A", marginRight: "5" }} />
            <NodeParam
              value={props.selectedNode?.shortName}
              sx={textFieldStyles}
              label="Short Name"
              editable={false}
            />
          </div>
          <div className="flex gap-1 items-center">
            <TextFieldsIcon style={{ color: "#012D5A", marginRight: "5" }} />
            <NodeParam
              value={props.selectedNode?.longName}
              sx={textFieldStyles}
              label="Long Name"
              editable={false}
              props={{ multiline: true }}
            />
          </div>
          <div className="flex gap-1 items-center">
            <InfoIcon style={{ color: "#012D5A", marginRight: "5" }} />
            <div className="flex flex-grow">
              <NodeParam
                value={props.selectedNode?.nodeType}
                sx={textFieldStyles}
                label="Type"
                editable={false}
              />
            </div>
            <div className="flex flex-grow">
              <NodeParam
                value={props.selectedNode?.floor}
                sx={textFieldStyles}
                label="Floor"
                editable={false}
              />
            </div>
          </div>
          <div className="flex flex-row gap-1 items-center">
            <LocationIcon style={{ color: "#012D5A", marginRight: "5" }} />
            <div className="flex flex-grow-1">
              <NodeParam
                value={props.selectedNode?.xcoord}
                onChange={setNodeX(props.selectedNode)}
                sx={{ width: "min-width" }}
                label="X"
                editable={true}
                props={{ type: "number" }}
              />
            </div>
            <div className="flex flex-grow-1">
              <NodeParam
                value={props.selectedNode?.ycoord}
                onChange={setNodeY(props.selectedNode)}
                sx={{ width: "min-width" }}
                label="Y"
                editable={true}
                props={{ type: "number" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapEditCard;
