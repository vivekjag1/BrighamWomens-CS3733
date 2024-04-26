import React, { CSSProperties, SyntheticEvent } from "react";
import { Node } from "database";
import Autocomplete from "@mui/material/Autocomplete";
import { MenuItem, TextField } from "@mui/material";
import { nodeOption } from "../../common/NodeOption.ts";
import { DesignSystem } from "../../common/StylingCommon.ts";

interface NodeDropdownProps {
  nodes: Node[];
  name: string;
  label: string;
  sx: CSSProperties;
  value: string;
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
          InputLabelProps={{
            style: {
              color: "#a4aab5",
              fontSize: ".9rem",
              fontFamily: DesignSystem.fontFamily,
            },
          }}
        />
      )}
      options={nodeOptions}
      sx={props.sx}
      value={nodeOptions.find((nodeOption) => nodeOption.id === props.value)}
      onChange={props.onChange}
      renderOption={(props, option) => (
        <MenuItem {...props} sx={menuItemStyles}>
          {option.label}
        </MenuItem>
      )}
    />
  );
}

const menuItemStyles = {
  fontFamily: DesignSystem.fontFamily,
  fontSize: "0.9rem",
  whiteSpace: "pre-wrap",
} as const;

export default NodeDropdown;
