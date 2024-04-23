import { CSSProperties, SyntheticEvent } from "react";
import { PathAlgorithm } from "common/src/Path.ts";
import { Autocomplete, TextField } from "@mui/material";
interface algorithmDropdownProps {
  sx: CSSProperties;
  value: string;
  onChange: (
    e: SyntheticEvent<Element, Event>,
    newValue: string | null,
  ) => void;
}
function AlgorithmDropdown(props: algorithmDropdownProps) {
  return (
    <Autocomplete
      options={algorithms}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Algorithm"
          size="small"
          className="bg-gray-100"
          name="algorithm"
        />
      )}
      sx={props.sx}
      value={props.value}
      onChange={props.onChange}
    />
  );
}

const algorithms: PathAlgorithm[] = ["A-Star", "BFS", "DFS", "Dijkstra"];
export default AlgorithmDropdown;
