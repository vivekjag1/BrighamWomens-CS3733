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

interface ServiceFilterDropdownProps {
  filterByType: string[];
  setFilterByType: React.Dispatch<React.SetStateAction<string[]>>;
  filterByPriority: string[];
  setFilterByPriority: React.Dispatch<React.SetStateAction<string[]>>;
  filterByStatus: string[];
  setFilterByStatus: React.Dispatch<React.SetStateAction<string[]>>;
}

function ServiceFilterDropdown({
  filterByType,
  setFilterByType,
  filterByPriority,
  setFilterByPriority,
  filterByStatus,
  setFilterByStatus,
}: ServiceFilterDropdownProps) {
  const types = [
    "MedicineDelivery",
    "SecurityService",
    "SanitationService",
    "RoomScheduling",
    "DeviceDelivery",
    "GiftDelivery",
  ];
  const priorities = ["Low", "Medium", "High", "Emergency"];
  const statuses = ["Unassigned", "Assigned", "InProgress", "Closed"];

  const [openSubMenu, setOpenSubMenu] = React.useState({
    type: false,
    priority: false,
    status: false,
  });

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

  const toggleSubMenu = (category: "type" | "priority" | "status"): void => {
    setOpenSubMenu((prev) => ({
      type: category === "type" ? !prev.type : prev.type,
      priority: category === "priority" ? !prev.priority : prev.priority,
      status: category === "status" ? !prev.status : prev.status,
    }));
  };

  const handleResetFilters = () => {
    setFilterByType([]);
    setFilterByPriority([]);
    setFilterByStatus([]);
  };

  return (
    <FormControl
      size="small"
      sx={{ minWidth: 240, fontFamily: "Poppins, sans-serif" }}
    >
      <Select
        multiple
        value={[...filterByType, ...filterByPriority, ...filterByStatus]}
        input={<OutlinedInput />}
        renderValue={() => (
          <>
            <FilterListIcon /> Filter
          </>
        )}
        displayEmpty
        className="bg-gray-50"
        sx={{ fontFamily: "Poppins, sans-serif" }}
      >
        <MenuItem onClick={() => toggleSubMenu("type")}>
          <ListItemIcon>
            {openSubMenu.type ? <ExpandLess /> : <ExpandMore />}
          </ListItemIcon>
          <ListItemText primary="Types" />
        </MenuItem>
        {openSubMenu.type &&
          types.map((type) => (
            <MenuItem
              key={type}
              value={type}
              sx={{ pl: 3 }}
              onClick={() =>
                handleFilterChange(type, filterByType, setFilterByType)
              }
            >
              <Checkbox
                size="small"
                checked={filterByType.includes(type)}
                onChange={() =>
                  handleFilterChange(type, filterByType, setFilterByType)
                }
              />
              <ListItemText primary={type.replace(/([A-Z])/g, " $1").trim()} />
            </MenuItem>
          ))}

        <MenuItem onClick={() => toggleSubMenu("priority")}>
          <ListItemIcon>
            {openSubMenu.priority ? <ExpandLess /> : <ExpandMore />}
          </ListItemIcon>
          <ListItemText primary="Priorities" />
        </MenuItem>
        {openSubMenu.priority &&
          priorities.map((priority) => (
            <MenuItem
              key={priority}
              value={priority}
              sx={{ pl: 3 }}
              onClick={() =>
                handleFilterChange(
                  priority,
                  filterByPriority,
                  setFilterByPriority,
                )
              }
            >
              <Checkbox
                size="small"
                checked={filterByPriority.includes(priority)}
                onChange={() =>
                  handleFilterChange(
                    priority,
                    filterByPriority,
                    setFilterByPriority,
                  )
                }
              />
              <ListItemText primary={priority} />
            </MenuItem>
          ))}

        <MenuItem onClick={() => toggleSubMenu("status")}>
          <ListItemIcon>
            {openSubMenu.status ? <ExpandLess /> : <ExpandMore />}
          </ListItemIcon>
          <ListItemText primary="Statuses" />
        </MenuItem>
        {openSubMenu.status &&
          statuses.map((status) => (
            <MenuItem
              key={status}
              value={status}
              sx={{ pl: 3 }}
              onClick={() =>
                handleFilterChange(status, filterByStatus, setFilterByStatus)
              }
            >
              <Checkbox
                size="small"
                checked={filterByStatus.includes(status)}
                onChange={() =>
                  handleFilterChange(status, filterByStatus, setFilterByStatus)
                }
              />
              <ListItemText primary={status} />
            </MenuItem>
          ))}
        <MenuItem>
          <Button
            fullWidth
            onClick={handleResetFilters}
            style={{ color: "red" }}
            sx={{ "&:hover": { bgcolor: "unset" } }}
          >
            Reset
          </Button>
        </MenuItem>
      </Select>
    </FormControl>
  );
}

export default ServiceFilterDropdown;
