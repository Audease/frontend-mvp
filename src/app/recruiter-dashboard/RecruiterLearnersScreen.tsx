"use client";

import { useState, useEffect, useMemo } from "react";
import SearchBox from "../components/dashboard/SearchBox";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FaPlus, FaCheck } from "react-icons/fa";

export default function RecruiterLearnersScreen() {
  const [roleName, setRoleName] = useState("Onny");

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

  const onCreateClick = () => {
    console.log("Create click");
  };

  const onImportClick = () => {};

  return (
    <div>
      <div>
        <h3 className="font-medium text-2xl">{roleName} Dashboard</h3>
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
            {/* Create Button  */}
            <div className="relative inline-block">
              <button
                className="bg-dashboardButtonsBg rounded-md px-3"
                onClick={onCreateClick}
              >
                <div className="flex flex-row text-sm font-medium p-2 text-dashboardButtons ">
                  Create <MdOutlineKeyboardArrowRight className="w-8 h-5" />
                </div>
              </button>
            </div>

            {/* Import Button  */}
            <div>
              <button
                className="flex flex-row rounded-md py-1 px-3 bg-tgrey3 text-white font-medium text-sm"
                onClick={onImportClick}
              >
                <span>
                  <FaPlus className="text-white my-1 mr-2" />
                </span>{" "}
                Import
              </button>
            </div>

            {/* Filter Button  */}
            
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

      <div></div>
    </div>
  );
}
