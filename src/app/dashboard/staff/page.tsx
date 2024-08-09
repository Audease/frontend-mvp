"use client";

import { useState, useEffect, useMemo } from "react";
import SearchBox from "../../components/dashboard/SearchBox";
import DropdownButton from "../../components/dashboard/DropdownButton";
import FilterButton from "../../components/dashboard/FilterButton";
import StaffTable from "../../components/dashboard/StaffTable";
import axios from "axios";

export default function Staff() {
  const [activeTab, setActiveTab] = useState("All");
  const [activeBarStyle, setActiveBarStyle] = useState({});
  const tabs = useMemo(() => ["All", "Recent", "Deleted"], []);
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [staffData, setStaffData] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    const activeIndex = tabs.indexOf(activeTab);
    const tabWidth = 7 / tabs.length;
    setActiveBarStyle({
      width: `${tabWidth}%`,
      transform: `translateX(${activeIndex * 180}%)`,
    });
  }, [activeTab, tabs]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [staffResponse, dropdownResponse] = await Promise.all([
          axios.get("/api/listStaff"),
          axios.get("/api/roleDropdownOptions"),
        ]);

        if (staffResponse.status === 200) {
          setStaffData(staffResponse.data);
          // console.log(staffResponse.data);
        } else {
          console.error(
            "Failed to fetch staff data:",
            staffResponse.data.message
          );
        }

        if (dropdownResponse.status === 200) {
          const roles = dropdownResponse.data.map((item) => item.role); // Extracting the role
          setDropdownOptions(roles);
          // console.log(roles);
        } else {
          console.error(
            "Failed to fetch dropdown options:",
            dropdownResponse.data.message
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSelect = (option) => {
    setSelectedOption(option);
    console.log("Selected option:", option);
  };

  const assignRole = async () => {
    
    console.log("Assigning role");

    const payload = {
      userID: "", 
      role: selectedOption, 
    };

    try {
      const response = await axios.post(
        "https://audease-dev.onrender.com/v1/admin/staffs/assign-role",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("Role assigned succesfully");
      console.log("Role assigned successfully:", response.data);
    } catch (error) {
      console.error("Error assigning role:", error);
    }
  };

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
              <button className="bg-dashboardRolesBtn text-white py-2 px-4 rounded focus:outline-none" onClick={assignRole}>
                Assign a role
              </button>
            </div>

            {/* Filter Button */}
            <FilterButton
              options={dropdownOptions}
              onSelect={handleSelect}
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
        <StaffTable staffData={staffData} />
      </div>
    </div>
  );
}
