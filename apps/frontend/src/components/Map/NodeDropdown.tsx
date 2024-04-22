import React, { CSSProperties, SyntheticEvent } from "react";
import { GraphNode } from "common/src/GraphNode";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";
import { nodeOption } from "../../common/NodeOption.ts";

interface NodeDropdownProps {
  nodes: GraphNode[];
  name: string;
  label: string;
  sx: CSSProperties;
  value: nodeOption;
  onChange: (
    e: SyntheticEvent<Element, Event>,
    newValue: nodeOption | null,
  ) => void;
}

function NodeDropdown(props: NodeDropdownProps) {
  const nodeOptions: nodeOption[] = props.nodes.map((node) => ({
    id: node.nodeID,
    label: node.longName,
  }));

  return (
    <Autocomplete
      renderInput={(params) => (
        <TextField
          {...params}
          label={props.label}
          name={props.name}
          size="small"
          className="bg-gray-100"
        />
      )}
      options={nodeOptions}
      getOptionLabel={(option) => option.label}
      sx={props.sx}
      value={props.value}
      onChange={props.onChange}
    />
  );
}

export default NodeDropdown;
