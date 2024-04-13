// import { APIEndpoints } from "common/src/APICommon.ts";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { GraphNode } from "common/src/GraphNode.ts";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";
import { useGraphNodes } from "./useGraphNodes.ts";

interface NodeDropdownProps {
  value: string;
  onChange: (newValue: string) => void;
}

const NodeDropdown = ({ value, onChange }: NodeDropdownProps) => {
  const nodes = useGraphNodes();

  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: { label: string } | null,
  ) => {
    onChange(newValue ? newValue.label : "");
  };

  const selectedValue = nodes.find((node) => node.longName === value)
    ? { label: value }
    : null;

  return (
    <Autocomplete
      disablePortal
      id="combo-box-location"
      options={nodes.map((node) => ({ label: node.longName }))}
      sx={{ width: "25rem", padding: 0 }}
      value={selectedValue}
      onChange={handleChange}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Location *"
          className="bg-gray-50"
          size="small"
          InputLabelProps={{
            style: { color: "#a4aab5", fontSize: ".9rem" },
          }}
        />
      )}
    />
  );
};

export default NodeDropdown;
