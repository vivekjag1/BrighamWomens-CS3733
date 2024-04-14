import Autocomplete from "@mui/material/Autocomplete";
import { SxProps, Theme } from "@mui/material";
import { TextField } from "@mui/material";
import { useGraphNodes } from "./useGraphNodes.ts";

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
