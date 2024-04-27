import React from "react";
import {
  FormControl,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  OutlinedInput,
  ListItemIcon,
  Button,
} from "@mui/material";
import {
  ExpandMore,
  ExpandLess,
  FilterList as FilterListIcon,
} from "@mui/icons-material";

interface EmployeeFilterDropdownProps {
  filterByPosition: string[];
  setFilterByPosition: React.Dispatch<React.SetStateAction<string[]>>;
  filterByRole: string[];
  setFilterByRole: React.Dispatch<React.SetStateAction<string[]>>;
}

function EmployeeFilterDropdown({
  filterByPosition,
  setFilterByPosition,
  filterByRole,
  setFilterByRole,
}: EmployeeFilterDropdownProps) {
  const positions = ["Doctor", "Nurse", "Janitor", "Security"];
  const roles = ["Staff", "Admin"];

  const [openSubMenu, setOpenSubMenu] = React.useState<
    "position" | "role" | null
  >(null);

  const handleFilterChange = (
    value: string,
    filter: string[],
    setFilter: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    const currentIndex = filter.indexOf(value);
    const newChecked = [...filter];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setFilter(newChecked);
  };

  const toggleSubMenu = (category: "position" | "role"): void => {
    setOpenSubMenu((prev) => (prev === category ? null : category));
  };

  const handleResetFilters = () => {
    setFilterByPosition([]);
    setFilterByRole([]);
  };

  return (
    <FormControl
      size="small"
      sx={{ minWidth: 180, fontFamily: "Poppins, sans-serif" }}
    >
      <Select
        multiple
        value={[...filterByPosition, ...filterByRole]}
        input={<OutlinedInput />}
        renderValue={() => (
          <div className="text-gray-500">
            <FilterListIcon className="text-gray-500" /> Filter
          </div>
        )}
        displayEmpty
        className="bg-gray-50 h-[2.4rem]"
        sx={{ fontFamily: "Poppins, sans-serif", borderRadius: 2 }}
      >
        <MenuItem onClick={() => toggleSubMenu("position")}>
          <ListItemIcon>
            {openSubMenu === "position" ? <ExpandLess /> : <ExpandMore />}
          </ListItemIcon>
          <ListItemText
            primary="Positions"
            primaryTypographyProps={{ fontFamily: "Poppins, sans-serif" }}
          />
        </MenuItem>
        {openSubMenu === "position" &&
          positions.map((position) => (
            <MenuItem
              key={position}
              value={position}
              sx={{ pl: 3 }}
              onClick={() =>
                handleFilterChange(
                  position,
                  filterByPosition,
                  setFilterByPosition,
                )
              }
            >
              <Checkbox
                size="small"
                checked={filterByPosition.includes(position)}
                onChange={() =>
                  handleFilterChange(
                    position,
                    filterByPosition,
                    setFilterByPosition,
                  )
                }
              />
              <ListItemText
                primary={position.replace(/([A-Z])/g, " $1").trim()}
                primaryTypographyProps={{ fontFamily: "Poppins, sans-serif" }}
              />
            </MenuItem>
          ))}

        <MenuItem onClick={() => toggleSubMenu("role")}>
          <ListItemIcon>
            {openSubMenu === "role" ? <ExpandLess /> : <ExpandMore />}
          </ListItemIcon>
          <ListItemText
            primary="Roles"
            primaryTypographyProps={{ fontFamily: "Poppins, sans-serif" }}
          />
        </MenuItem>
        {openSubMenu === "role" &&
          roles.map((role) => (
            <MenuItem
              key={role}
              value={role}
              sx={{ pl: 3 }}
              onClick={() =>
                handleFilterChange(role, filterByRole, setFilterByRole)
              }
            >
              <Checkbox
                size="small"
                checked={filterByRole.includes(role)}
                onChange={() =>
                  handleFilterChange(role, filterByRole, setFilterByRole)
                }
              />
              <ListItemText
                primary={role}
                primaryTypographyProps={{ fontFamily: "Poppins, sans-serif" }}
              />
            </MenuItem>
          ))}

        <hr className="mx-auto w-4/5" />
        <MenuItem
          style={{
            backgroundColor: "transparent",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            onClick={handleResetFilters}
            variant="contained"
            style={{
              backgroundColor: "#EA422D",
              color: "white",
              width: "60%",
              padding: ".2rem",
              marginTop: ".4rem",
              fontFamily: "Poppins, sans-serif",
              marginLeft: "auto",
              marginRight: "auto",
            }}
            endIcon={
              <svg
                fill="white"
                width="14px"
                height="14px"
                viewBox="0 0 1920 1920"
              >
                <path
                  d="M960 0v213.333c411.627 0 746.667 334.934 746.667 746.667S1371.627 1706.667 960 1706.667 213.333 1371.733 213.333 960c0-197.013 78.4-382.507 213.334-520.747v254.08H640V106.667H53.333V320h191.04C88.64 494.08 0 720.96 0 960c0 529.28 430.613 960 960 960s960-430.72 960-960S1489.387 0 960 0"
                  fill-rule="evenodd"
                />
              </svg>
            }
          >
            RESET
          </Button>
        </MenuItem>
      </Select>
    </FormControl>
  );
}

export default EmployeeFilterDropdown;
