import React, { useContext } from "react";
import LocationIcon from "@mui/icons-material/LocationOn";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import StarIcon from "@mui/icons-material/Star";
import InfoIcon from "@mui/icons-material/Info";
import NodeParam from "../NodeParam.tsx";
import { MapContext } from "../../routes/MapEdit.tsx";
import { Node } from "database";
import CustomDropdown from "../CustomDropdown.tsx";

export type nodeType =
  | "HALL"
  | "DEPT"
  | "CONF"
  | "EXIT"
  | "INFO"
  | "LABS"
  | "REST"
  | "RETL"
  | "SERV"
  | "BATH"
  | "STAI"
  | "ELEV";

const dropdownNodeTypes: nodeType[] = [
  "HALL",
  "DEPT",
  "CONF",
  "EXIT",
  "INFO",
  "LABS",
  "REST",
  "RETL",
  "SERV",
  "BATH",
];

const textFieldStyles_large = {
  width: "16vw",
  fontFamily: "poppins, sans-serif",
};

const textFieldStyles_small = {
  width: "8vw",
  fontFamily: "poppins, sans-serif",
};

const textFieldStyles_floor = {
  width: "5vw",
  fontFamily: "poppins, sans-serif",
};
const textFieldStyles_type = {
  width: "11vw",
  fontFamily: "poppins, sans-serif",
};

function MapEditCard(props: {
  updateNode: (field: keyof Node, value: string | number) => void;
}) {
  const nodes = useContext(MapContext).nodes;
  const selectedNodeID = useContext(MapContext).selectedNodeID;

  function isEditableNode(): boolean {
    const type = nodes?.get(selectedNodeID ?? "")?.nodeType;
    return type != "ELEV" && type != "STAI";
  }

  return (
    <div className="w-[21vw] flex p-4 bg-white rounded-2xl shadow-xl">
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-1 items-center">
          <StarIcon style={{ color: "#012D5A", marginRight: "5" }} />
          <NodeParam
            value={nodes?.get(selectedNodeID ?? "")?.shortName}
            onChange={(value) => {
              props.updateNode("shortName", value);
            }}
            sx={textFieldStyles_large}
            label="Short Name"
            editable={true}
          />
        </div>
        <div className="flex gap-1 items-center">
          <TextFieldsIcon style={{ color: "#012D5A", marginRight: "5" }} />
          <NodeParam
            value={nodes?.get(selectedNodeID ?? "")?.longName}
            onChange={(value) => {
              props.updateNode("longName", value);
            }}
            sx={textFieldStyles_large}
            label="Long Name"
            editable={true}
            props={{ multiline: true }}
          />
        </div>
        <div className="flex gap-1 items-center">
          <InfoIcon style={{ color: "#012D5A", marginRight: "5" }} />
          <CustomDropdown
            value={
              nodes.get(selectedNodeID ?? "")?.nodeType
                ? nodes.get(selectedNodeID ?? "")!.nodeType
                : ""
            }
            onChange={(value) => {
              props.updateNode("nodeType", value);
            }}
            options={dropdownNodeTypes}
            sx={textFieldStyles_type}
            label={
              isEditableNode()
                ? "Type"
                : nodes.get(selectedNodeID ?? "")?.nodeType
            }
            className=""
            disabled={
              nodes.get(selectedNodeID!) == undefined || !isEditableNode()
            }
          />

          <NodeParam
            value={nodes?.get(selectedNodeID ?? "")?.floor}
            sx={textFieldStyles_floor}
            label="Floor"
            editable={false}
          />
        </div>
        <form className="flex flex-row gap-1 items-center">
          <LocationIcon style={{ color: "#012D5A", marginRight: "5" }} />
          <NodeParam
            value={nodes?.get(selectedNodeID ?? "")?.xcoord}
            onChange={(value) => {
              props.updateNode("xcoord", parseInt(value));
            }}
            sx={textFieldStyles_small}
            label="X"
            editable={isEditableNode()}
            props={{ type: "number" }}
          />
          <NodeParam
            value={nodes?.get(selectedNodeID ?? "")?.ycoord}
            onChange={(value) => {
              props.updateNode("ycoord", parseInt(value));
            }}
            sx={textFieldStyles_small}
            label="Y"
            editable={isEditableNode()}
            props={{ type: "number" }}
          />
        </form>
      </div>
    </div>
  );
}

export default MapEditCard;
