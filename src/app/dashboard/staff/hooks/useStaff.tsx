import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { rolesRevalidation, staffRevalidation } from "../../../action"

export const useStaff = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [staffData, setStaffData] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [checkedItems, setCheckedItems] = useState({});
  const [selectedRole, setSelectedRole] = useState({});
  const [reloadTable, setReloadTable] = useState(false);

  const tabs = useMemo(() => ["All", "Recent", "Deleted"], []);

  // Fetch staff data and dropdown options
  const fetchData = async () => {
    setStaffData([]);
    setDropdownOptions([]);
  
    try {
      const [staffResponse, dropdownResponse] = await Promise.all([
        fetch("/api/listStaff"),
        fetch("/api/roleDropdownOptions"),
      ]);
  
      if (staffResponse.ok) {
        const staffData = await staffResponse.json();
        setStaffData(staffData);
      } else {
        console.error("Failed to fetch staff data:", staffResponse.statusText);
      }
  
      if (dropdownResponse.ok) {
        const dropdownData = await dropdownResponse.json();
        const roles = dropdownData.map((item) => item.role); // Extracting the role
        setDropdownOptions(roles);
      } else {
        console.error("Failed to fetch dropdown options:", dropdownResponse.statusText);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [reloadTable]);

  const handleRoleSelect = (index, role) => {
    setSelectedRole((prev) => ({
      ...prev,
      [index]: role,
    }));
  };

  

  const assignRole = async () => {
    let selectedStaff = Object.entries(checkedItems)
      .filter(([index, isChecked]) => isChecked)
      .map(([index]) => {
        const staffItem = staffData[index];
        const role = selectedRole[index]; // Get the selected role for this staff member
        return { ...staffItem, role }; // Attach the selected role
      });

    try {
      for (const staffItem of selectedStaff) {
        const payload = {
          userId: staffItem.id,
          role: selectedRole[Object.keys(selectedRole)[0]],
        };

        const response = await axios.post("/api/assignRole", payload, {
          headers: { "Content-Type": "application/json" },
        });

        console.log("Role assigned successfully:", response.data);
      }

      alert("Role(s) assigned successfully");
      await staffRevalidation();
      await rolesRevalidation();
      setReloadTable((prev) => !prev);
      setCheckedItems({});
      setSelectedRole({});
    } catch (error) {
      console.error("Error assigning role:", error);
    }
  };

  return {
    activeTab,
    setActiveTab,
    tabs,
    dropdownOptions,
    staffData,
    checkedItems,
    setCheckedItems,
    selectedRole,
    handleRoleSelect,
    assignRole,
    reloadTable,
  };
};
