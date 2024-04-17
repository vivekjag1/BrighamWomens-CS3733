import React, { useContext } from "react";
import LocationIcon from "@mui/icons-material/LocationOn";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import StarIcon from "@mui/icons-material/Star";
import InfoIcon from "@mui/icons-material/Info";
import NodeParam from "./NodeParam.tsx";
import { MapContext } from "../routes/MapEdit.tsx";
import CustomSaveButton from "./CustomSaveButton.tsx";
import { Node } from "database";

const textFieldStyles_large = {
  width: "16vw",
};

const textFieldStyles_small = {
  width: "8vw",
};

function MapEditCard(props: {
  selectedNodeID?: string | undefined;
  onSave: () => void;
  updateNode: (field: keyof Node, value: string) => void;
}) {
  const nodes = useContext(MapContext).nodes;

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
              value={nodes?.get(props.selectedNodeID ?? "")?.shortName}
              sx={textFieldStyles_large}
              label="Short Name"
              editable={false}
            />
          </div>
          <div className="flex gap-1 items-center">
            <TextFieldsIcon style={{ color: "#012D5A", marginRight: "5" }} />
            <NodeParam
              value={nodes?.get(props.selectedNodeID ?? "")?.longName}
              sx={textFieldStyles_large}
              label="Long Name"
              editable={false}
              props={{ multiline: true }}
            />
          </div>
          <div className="flex gap-1 items-center">
            <InfoIcon style={{ color: "#012D5A", marginRight: "5" }} />
            <NodeParam
              value={nodes?.get(props.selectedNodeID ?? "")?.nodeType}
              sx={textFieldStyles_small}
              label="Type"
              editable={false}
            />
            <NodeParam
              value={nodes?.get(props.selectedNodeID ?? "")?.floor}
              sx={textFieldStyles_small}
              label="Floor"
              editable={false}
            />
          </div>
          <form className="flex flex-row gap-1 items-center">
            <LocationIcon style={{ color: "#012D5A", marginRight: "5" }} />
            <NodeParam
              value={nodes?.get(props.selectedNodeID ?? "")?.xcoord}
              onChange={(value) => {
                props.updateNode("xcoord", value);
              }}
              sx={textFieldStyles_small}
              label="X"
              editable={true}
              props={{ type: "number" }}
            />
            <NodeParam
              value={nodes?.get(props.selectedNodeID ?? "")?.ycoord}
              onChange={(value) => {
                props.updateNode("ycoord", value);
              }}
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
