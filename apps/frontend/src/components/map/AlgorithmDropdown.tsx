import { CSSProperties, SyntheticEvent } from "react";
import { PathAlgorithm } from "common/src/Path.ts";
import { Autocomplete, MenuItem, TextField } from "@mui/material";
import { DesignSystem } from "../../common/StylingCommon.ts";
/*import {DesignSystem} from "../../common/StylingCommon.ts";*/
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
          InputLabelProps={{
            style: {
              fontSize: ".9rem",
              fontFamily: DesignSystem.fontFamily,
            },
          }}
        />
      )}
      sx={props.sx}
      value={props.value}
      onChange={props.onChange}
      renderOption={(props, option) => (
        <MenuItem {...props} sx={menuItemStyles}>
          {option}
        </MenuItem>
      )}
      clearIcon={null}
    />
  );
}

const menuItemStyles = {
  fontFamily: DesignSystem.fontFamily,
  fontSize: "0.9rem",
  whiteSpace: "nowrap",
} as const;

const algorithms: PathAlgorithm[] = ["A-Star", "BFS", "DFS", "Dijkstra"];
export default AlgorithmDropdown;
