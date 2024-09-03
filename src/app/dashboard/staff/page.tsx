"use client";

import { useState, useEffect, useMemo } from "react";
import SearchBox from "../../components/dashboard/SearchBox";
import DropdownButton from "../../components/dashboard/DropdownButton";
import FilterButton from "../../components/dashboard/FilterButton";
import StaffTable from "../../components/dashboard/StaffTable";
import axios from "axios";
import { rolesRevalidation, staffRevalidation } from "../../action";

export default function Staff() {
  const [activeTab, setActiveTab] = useState("All");
  const [activeBarStyle, setActiveBarStyle] = useState({});
  const tabs = useMemo(() => ["All", "Recent", "Deleted"], []);
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [staffData, setStaffData] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [checkedItems, setCheckedItems] = useState({});
  const [selectedRole, setSelectedRole] = useState({});
  const [reloadTable, setReloadTable] = useState(false);

  // The active tab
  useEffect(() => {
    const activeIndex = tabs.indexOf(activeTab);
    const tabWidth = 7 / tabs.length;
    setActiveBarStyle({
      width: `${tabWidth}%`,
      transform: `translateX(${activeIndex * 180}%)`,
    });
  }, [activeTab, tabs]);

  // Fetching the data - staff list and dropdownoptions
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
        // console.log("Emails:", staffData.map(item => item.email));
      } else {
        console.error(
          "Failed to fetch staff data:",
          staffResponse.statusText
        );
      }
  
      if (dropdownResponse.ok) {
        const dropdownData = await dropdownResponse.json();
        const roles = dropdownData.map((item) => item.role); // Extracting the role
        setDropdownOptions(roles);
        // console.log(roles);
      } else {
        console.error(
          "Failed to fetch dropdown options:",
          dropdownResponse.statusText
        );
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

  // console.log(staffData)
  // console.log("Selected role option:", selectedRole);

  const assignRole = async () => {
    let selectedStaff = Object.entries(checkedItems)
      .filter(([index, isChecked]) => isChecked)
      .map(([index]) => {
        const staffItem = staffData[index];
        const role = selectedRole[index]; // Get the selected role for this staff member

        return {
          ...staffItem,
          role, // Attach the selected role
        };
      });

    selectedStaff.forEach((staffItem) => {
      const payload = {
        role: staffItem.role,
        userId: staffItem.id,
      };

      console.log(`Prepared payload for ${staffItem.email}:`, payload);
    });

    try {
      for (const staffItem of selectedStaff) {
        const payload = {
          userId: staffItem.id, // Assuming `id` is the identifier you need
          role: selectedRole[Object.keys(selectedRole)[0]],
        };

        console.log(`Assigning role to ${staffItem.email}`);

        const response = await axios.post("/api/assignRole", payload, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log("Role assigned successfully:", response.data);
      }

      alert("Role(s) assigned successfully");
      // Refresh the table data after role and staff assignment
      await staffRevalidation();
      await rolesRevalidation();
      // Toggle reloadTable state to force a re-render
      setReloadTable((prev) => !prev);
      // Clear selection state
      selectedStaff = [];
      setCheckedItems({});
      setSelectedRole({});
    } catch (error) {
      console.error("Error assigning role:", error);
    }
  };

  const handleCheckedChange = (newCheckedItems) => {
    // console.log("Received checkedItems in Staff component:", newCheckedItems);
    setCheckedItems(newCheckedItems);
  };

  const handleFilterSelect = () => {};

  return (
    <div className="flex flex-col space-y-4">
      <div>
        <h3 className="font-medium text-2xl">Staff</h3>
      </div>

      {/* Selection and active bar */}
      <div className="flex flex-col mt-3">
        <div className="flex flex-row justify-between font-medium text-sm text-tgrey3">
          <div className="flex flex-row space-x-6">
            {tabs.map((tab) => (
              <h2
                key={tab}
                className={`cursor-pointer pt-4 ${
                  activeTab === tab ? "text-black" : ""
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </h2>
            ))}
          </div>

          {/* The buttons on the right side */}
          <div className="flex flex-row space-x-4">
            {/* Search Box */}
            <SearchBox />

            {/* Dropdown Button */}
            <div>
              {/* <DropdownButton
                options={dropdownOptions}
                onSelect={handleSelect}
                label="Assign a role"
                className={"bg-dashboardRolesBtn text-white py-2 px-4 rounded focus:outline-none"}
              /> */}
              <button
                className="bg-dashboardRolesBtn text-white py-2 px-4 rounded focus:outline-none"
                onClick={assignRole}
              >
                Assign a role
              </button>
            </div>

            {/* Filter Button */}
            <FilterButton
              options={dropdownOptions}
              onSelect={handleFilterSelect}
              label="Filter"
            />
          </div>
        </div>

        {/* The active bar color change */}
        <div className="w-full h-[0.10rem] bg-gray-300 my-2">
          <div
            className={`h-[0.10rem] bg-dashboardButtons transition-all duration-300`}
            style={activeBarStyle}
          ></div>
        </div>
      </div>

      {/* The main body, which is the table list */}
      <div>
        <StaffTable
          staffData={staffData}
          onCheckedChange={handleCheckedChange}
          onRoleSelect={handleRoleSelect}
        />
      </div>
    </div>
  );
}
