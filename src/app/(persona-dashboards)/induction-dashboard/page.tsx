"use client";
import { useState } from "react";
import AdminInductionDashboard from "../../admin/(adminPersonaScreens)/induction-dashboard/page";
import FilterInduction from "../../admin/(adminPersonaScreens)/induction-dashboard/components/FilterInduction";

export default function InductionDashboard() {
  const [roleName, setRoleName] = useState("Induction");
  return (
    <div>
      <div className="flex justify-between">
        <h3 className="font-medium text-2xl">{roleName} Dashboard</h3>
        <FilterInduction />
      </div>
      <AdminInductionDashboard showHeader={false} showStaffButton={false} />
    </div>
  );
}
