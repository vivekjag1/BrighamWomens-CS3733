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
  Box,
} from "@mui/material";
import {
  ExpandMore,
  ExpandLess,
  FilterList as FilterListIcon,
} from "@mui/icons-material";
import { MakeProtectedGetRequest } from "../MakeProtectedGetRequest.ts";
import { APIEndpoints } from "common/src/APICommon.ts";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

interface ServiceFilterDropdownProps {
  filterByEmployee: string[];
  setFilterByEmployee: React.Dispatch<React.SetStateAction<string[]>>;
  filterByType: string[];
  setFilterByType: React.Dispatch<React.SetStateAction<string[]>>;
  filterByPriority: string[];
  setFilterByPriority: React.Dispatch<React.SetStateAction<string[]>>;
  filterByStatus: string[];
  setFilterByStatus: React.Dispatch<React.SetStateAction<string[]>>;
}

function ServiceFilterDropdown({
  filterByEmployee,
  setFilterByEmployee,
  filterByType,
  setFilterByType,
  filterByPriority,
  setFilterByPriority,
  filterByStatus,
  setFilterByStatus,
}: ServiceFilterDropdownProps) {
  const { getAccessTokenSilently } = useAuth0();
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

  const [openSubMenu, setOpenSubMenu] = React.useState<
    "employee" | "type" | "priority" | "status" | null
  >(null);

  const [employees, setEmployees] = useState<string[]>([]);
  const [employeePfps, setEmployeePfps] = useState<string[]>([]);

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

  const toggleSubMenu = (
    category: "employee" | "type" | "priority" | "status",
  ): void => {
    setOpenSubMenu((prev) => (prev === category ? null : category));
  };

  const handleResetFilters = () => {
    setFilterByType([]);
    setFilterByPriority([]);
    setFilterByStatus([]);
    setFilterByEmployee([]);
  };

  useEffect(() => {
    async function fetchData() {
      const token = await getAccessTokenSilently();

      try {
        const res = await MakeProtectedGetRequest(
          APIEndpoints.employeeGetRequest,
          token,
        );
        setEmployees(
          res.data.map((employee: { name: string }) => employee.name),
        );
        setEmployeePfps(
          res.data.map(
            (employee: { profilePicture: string }) => employee.profilePicture,
          ),
        );
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    }
    fetchData();
  }, [getAccessTokenSilently]);

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
          <div className="text-gray-500">
            <FilterListIcon className="text-gray-500" /> Filter
          </div>
        )}
        displayEmpty
        className="bg-gray-50 h-[2.4rem]"
        sx={{ fontFamily: "Poppins, sans-serif", borderRadius: 2 }}
      >
        <MenuItem onClick={() => toggleSubMenu("employee")}>
          <ListItemIcon>
            {openSubMenu === "employee" ? <ExpandLess /> : <ExpandMore />}
          </ListItemIcon>
          <ListItemText
            primary="Employees"
            primaryTypographyProps={{ fontFamily: "Poppins, sans-serif" }}
          />
        </MenuItem>
        {openSubMenu === "employee" && (
          <Box
            sx={{
              maxHeight: 300,
              overflow: "auto",
            }}
          >
            {employees.map((employee) => (
              <MenuItem
                key={employee}
                value={employee}
                sx={{ pl: 2 }}
                onClick={() =>
                  handleFilterChange(
                    employee,
                    filterByEmployee,
                    setFilterByEmployee,
                  )
                }
              >
                <Checkbox
                  size="small"
                  checked={filterByEmployee.includes(employee)}
                  onChange={() =>
                    handleFilterChange(
                      employee,
                      filterByEmployee,
                      setFilterByEmployee,
                    )
                  }
                />
                <img
                  className="w-8 h-8 rounded-full mr-2"
                  loading="lazy"
                  src={`../../assets/employees/${employeePfps[employees.indexOf(employee)]}.jpeg`}
                  alt={`${employee} profile`}
                />
                <ListItemText
                  primary={employee.replace(/([A-Z])/g, " $1").trim()}
                  primaryTypographyProps={{
                    fontSize: ".9rem",
                    fontFamily: "Poppins, sans-serif",
                  }}
                />
              </MenuItem>
            ))}
          </Box>
        )}

        <MenuItem onClick={() => toggleSubMenu("type")}>
          <ListItemIcon>
            {openSubMenu === "type" ? <ExpandLess /> : <ExpandMore />}
          </ListItemIcon>
          <ListItemText
            primary="Types"
            primaryTypographyProps={{ fontFamily: "Poppins, sans-serif" }}
          />
        </MenuItem>
        {openSubMenu === "type" &&
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
              <ListItemText
                primary={type.replace(/([A-Z])/g, " $1").trim()}
                primaryTypographyProps={{ fontFamily: "Poppins, sans-serif" }}
              />
            </MenuItem>
          ))}

        <MenuItem onClick={() => toggleSubMenu("priority")}>
          <ListItemIcon>
            {openSubMenu === "priority" ? <ExpandLess /> : <ExpandMore />}
          </ListItemIcon>
          <ListItemText
            primary="Priorities"
            primaryTypographyProps={{ fontFamily: "Poppins, sans-serif" }}
          />
        </MenuItem>
        {openSubMenu === "priority" &&
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
              <ListItemText
                primary={priority}
                primaryTypographyProps={{ fontFamily: "Poppins, sans-serif" }}
              />
            </MenuItem>
          ))}

        <MenuItem onClick={() => toggleSubMenu("status")}>
          <ListItemIcon>
            {openSubMenu === "status" ? <ExpandLess /> : <ExpandMore />}
          </ListItemIcon>
          <ListItemText
            primary="Statuses"
            primaryTypographyProps={{ fontFamily: "Poppins, sans-serif" }}
          />
        </MenuItem>
        {openSubMenu === "status" &&
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
              <ListItemText
                primary={status}
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

export default ServiceFilterDropdown;
