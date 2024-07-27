"use client";

import { useState } from "react";
import { BKSDFilterButton } from "../components/dashboard/FilterButton";
import AuditorDashboardTable from "../components/dashboard/AuditorDashboardTable";
import learnersData from "../data/learnersData.json";

export default function Auditor() {
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

  return (
    <div className="h-screen overflow-y-auto">
      {/* BKSD Title and Filter Button */}
      <div className="flex flex-row justify-between">
        <h3 className="font-medium text-2xl">{auditorName} Dashboard</h3>
        <div className="space-x-4">
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
        <AuditorDashboardTable
          learnersData={learnersData.learners}
          checkedItems={checkedItems}
          handleCheckboxChange={handleCheckboxChange}
        />
      </div>
    </div>
  );
}
