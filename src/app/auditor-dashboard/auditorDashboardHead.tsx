"use client";

import { useState } from "react";
import { BKSDFilterButton } from "../components/dashboard/FilterButton";

import learnersData from "../data/learnersData.json";
import { PiBookmarkSimple } from "react-icons/pi";
import { IoAtSharp } from "react-icons/io5";
import Image from "next/image";

export default function AuditorDashboardHead() {
  const [auditorName, setAuditorName] = useState("Audit");
  const filterOptions = ["Option 1", "Option 2", "Option 3"];
  const categoriesDropdownOptions = ["Sent", "Not sent"];
  const [checkedItems, setCheckedItems] = useState({});

  const handleFilterSelect = () => {};

  const handleCategorySelect = () => {};

  const onFilterClick = () => {};

  const handleCheckboxChange = (id) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const stats = [
    {
      icon: <PiBookmarkSimple className="w-5 h-5 text-dashboardButtons" />,
      title: "Registered learners",
      value: "10.2k",
    },
    {
      icon: <IoAtSharp className="w-5 h-5 text-dashboardButtons" />,
      title: "Completed learners",
      value: "3.4k",
    },
    {
      icon: (
        <Image
          className="text-gold1"
          src={"/roleGoldIcon.png"}
          alt="Create"
          width={14}
          height={14}
        />
      ),
      title: "Registered learners",
      value: "450",
    },
  ];

  return (
    <div className="">
      {/* BKSD Title and Filter Button */}
      <div className="flex flex-row justify-between">
        <h3 className="font-medium text-2xl">{auditorName} Dashboard</h3>
        <div className="flex flex-row space-x-6">
          {stats.map((stat, index) => (
            <div className="flex flex-row" key={index}>
              <div className="h-9 w-9 mt-2 rounded-full border mx-2 border-dashboardButtons bg-dashboardButtonsBg flex justify-center items-center">
                {stat.icon}
              </div>
              <div className="font-medium">
                <p className="text-sm text-tgrey3">{stat.title}</p>
                <h3 className="text-black text-2xl">{stat.value}</h3>
              </div>
            </div>
          ))}
        </div>
        <div className="space-x-6">
          {/* Download CSV Button  */}
          {learnersData.learners && learnersData.learners.length > 1 && (
            <button className="font-medium text-sm text-white bg-tgrey9 p-2 rounded-md">
              Download CSV
            </button>
          )}

          {/* Filter Button */}
          <BKSDFilterButton
            label={"Filters"}
            options={filterOptions}
            onSelect={handleFilterSelect}
            categoriesDropdownOptions={categoriesDropdownOptions}
            onCategorySelect={handleCategorySelect}
            onFilterClick={onFilterClick}
          />
        </div>
      </div>

      {/* The table  */}
      <div className="mt-4">
        
      </div>
    </div>
  );
}
