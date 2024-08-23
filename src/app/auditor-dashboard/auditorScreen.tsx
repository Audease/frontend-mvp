"use client";

import { useState } from "react";
import AuditorDashboardTable from "../components/dashboard/AuditorDashboardTable";
import learnersData from "../data/learnersData.json";
import AuditorDashboardHead from "./auditorDashboardHead";

export default function Auditor() {
  const [checkedItems, setCheckedItems] = useState({});

  const handleCheckboxChange = (id) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="h-screen overflow-y-auto">
      {/* BKSD Title and Filter Button */}
      <AuditorDashboardHead />

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
