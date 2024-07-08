"use client";

import { useState, useEffect, useMemo } from "react";
import Button from "../../components/dashboard/Button";
import { SlArrowRight, SlArrowDown } from "react-icons/sl";
import SearchBox from "../../components/dashboard/SearchBox";
import DropdownButton from "../../components/dashboard/DropdownButton";

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


  const [selectedOption, setSelectedOption] = useState(null);
  const handleSelect = (option) => {
    setSelectedOption(option);
    console.log('Selected option:', option);
  };
  const options = ['Option 1', 'Option 2', 'Option 3'];

  return (
    <div>
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
          {/* Search Box */}
          <SearchBox />

          {/* Dropdown Button  */}
          <div>
            <DropdownButton
              options={options}
              onSelect={handleSelect}
              label="Select an option"
            />
            {selectedOption && (
              <p className="mt-4">Selected Option: {selectedOption}</p>
            )}
          </div>

          {/* Create Button */}
          <Button
            buttonText={"Create"}
            className={""}
            arrowDirection={<SlArrowDown />}
            onClick={""}
          />
        </div>
        {/* The active bar color change */}
        <div className="w-full h-[0.10rem] bg-gray-300 my-2">
          <div
            className={`h-[0.10rem] bg-dashboardButtons transition-all duration-300`}
            style={activeBarStyle}
          ></div>
        </div>
      </div>
    </div>
  );
}
