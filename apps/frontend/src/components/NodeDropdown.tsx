import { APIEndpoints } from "common/src/APICommon.ts";
import { useEffect, useState } from "react";
import axios from "axios";
import { GraphNode } from "common/src/GraphNode.ts";
import Autocomplete from "@mui/material/Autocomplete";
import { SxProps, TextField, Theme } from "@mui/material";
import { createNodes } from "common/src/GraphCommon.ts";

interface NodeDropdownProps {
  value: string;
  onChange: (newValue: string) => void;
  label?: string;
  sx?: SxProps<Theme>;
  className?: string;
}

const NodeDropdown = ({
  value,
  onChange,
  label,
  sx,
  className,
}: NodeDropdownProps) => {
  const [nodes, setNodes] = useState<GraphNode[]>([]);

  useEffect(() => {
    //get the nodes from the db
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
      sx={sx}
      className={className}
      value={selectedValue}
      onChange={handleChange}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          className={`bg-gray-50 ${className}`}
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
