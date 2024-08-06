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

  useEffect(() => {
    const activeIndex = tabs.indexOf(activeTab);
    const tabWidth = 7 / tabs.length;
    setActiveBarStyle({
      width: `${tabWidth}%`,
      transform: `translateX(${activeIndex * 180}%)`,
    });
  }, [activeTab, tabs, tabs.length]);

  // Dropdown button options and its selected option
  const [selectedOption, setSelectedOption] = useState(null);
  const handleSelect = (option) => {
    setSelectedOption(option);
    console.log("Selected option:", option);
  };
  const options = ["Recruiter", "BKSD", "Accessor", "Inductor", "Lazer"];

  // Staff data
  const [staffData, setStaffData] = useState([]);

  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        const response = await axios.get('/api/listStaff');
        if (response.status === 200) {
          setStaffData(response.data);
          console.log("Here is the table data") // Adjust according to the structure of your response data
        } else {
          console.error('Failed to fetch staff data:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching staff data:', error);
      }
    };

    fetchStaffData();
  }, []);

  // console.log(staffData)

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

          {/* The buttons on the right side  */}
          <div className="flex flex-row space-x-4">
            {/* Search Box */}
            <SearchBox />

            {/* Dropdown Button  */}
            <div>
              <DropdownButton
                options={options}
                onSelect={handleSelect}
                label="Assign a role"
                className={"bg-dashboardRolesBtn text-white py-1 px-4 rounded focus:outline-none"}
              />
              {/* {selectedOption && (
                <p className="mt-4">Selected Option: {selectedOption}</p>
              )} */}
            </div>

            {/* Filter Button */}
            <FilterButton
              options={options}
              onSelect={handleSelect}
              label="Filter"
            />
            {/* {selectedOption && (
                <p className="mt-4">Selected Option: {selectedOption}</p>
              )} */}
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

      {/* The main body, which is the table list  */}
      <div>
        <StaffTable staffData={staffData} />
      </div>
    </div>
  );
}
