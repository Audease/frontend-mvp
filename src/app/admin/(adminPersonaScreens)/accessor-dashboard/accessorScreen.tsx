"use client";

import { useState } from "react";
import AccessorDashboardTable from "./components/AccessorDashboardTable";
import AccessorDashboardHeader from "./components/AccessorDashboardHeader";
import AccessorStaffButton from "./components/AccessorStaffButton";
import AccessorFilterButton from "./components/AccessorFilterButton";

export default function Accessor({ onViewChange, showHeader }) {
  const [checkedItems, setCheckedItems] = useState({});
  const handleCheckboxChange = (id) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="h-screen overflow-y-auto">
      {/* Accessor Title and Filter Button */}
      <div className="flex flex-row justify-between">
        {showHeader && <AccessorDashboardHeader />}

        <div className="flex flex-row space-x-4">
          {/* View Staff Button  */}
          {showHeader && <AccessorStaffButton />}
          {showHeader && <AccessorFilterButton />}
        </div>
      </div>

      {/* The table  */}
      <div className="mt-6">
        <AccessorDashboardTable
          checkedItems={checkedItems}
          handleCheckboxChange={handleCheckboxChange}
          onViewChange={onViewChange}
        />
      </div>
    </div>
  );
}
