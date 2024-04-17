import React from "react";
import { Node } from "database";
import LocationIcon from "@mui/icons-material/LocationOn";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import StarIcon from "@mui/icons-material/Star";
import InfoIcon from "@mui/icons-material/Info";
import NodeParam from "./NodeParam.tsx";
import CustomSaveButton from "./CustomSaveButton.tsx";

const textFieldStyles_large = {
  width: "16vw",
};

const textFieldStyles_small = {
  width: "8vw",
};

function MapEditCard(props: {
  selectedNode?: Node;
  setSelectedNode: React.Dispatch<React.SetStateAction<Node | undefined>>;
  onSave: () => void;
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
              sx={textFieldStyles_large}
              label="Short Name"
              editable={false}
            />
          </div>
          <div className="flex gap-1 items-center">
            <TextFieldsIcon style={{ color: "#012D5A", marginRight: "5" }} />
            <NodeParam
              value={props.selectedNode?.longName}
              sx={textFieldStyles_large}
              label="Long Name"
              editable={false}
              props={{ multiline: true }}
            />
          </div>
          <div className="flex gap-1 items-center">
            <InfoIcon style={{ color: "#012D5A", marginRight: "5" }} />
            <NodeParam
              value={props.selectedNode?.nodeType}
              sx={textFieldStyles_small}
              label="Type"
              editable={false}
            />
            <NodeParam
              value={props.selectedNode?.floor}
              sx={textFieldStyles_small}
              label="Floor"
              editable={false}
            />
          </div>
          <form className="flex flex-row gap-1 items-center">
            <LocationIcon style={{ color: "#012D5A", marginRight: "5" }} />
            <NodeParam
              value={props.selectedNode?.xcoord}
              onChange={setNodeX(props.selectedNode)}
              sx={textFieldStyles_small}
              label="X"
              editable={true}
              props={{ type: "number" }}
            />
            <NodeParam
              value={props.selectedNode?.ycoord}
              onChange={setNodeY(props.selectedNode)}
              sx={textFieldStyles_small}
              label="Y"
              editable={true}
              props={{ type: "number" }}
            />
          </form>
          <div className="flex justify-end">
            <CustomSaveButton text="SAVE" onClick={props.onSave} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapEditCard;
