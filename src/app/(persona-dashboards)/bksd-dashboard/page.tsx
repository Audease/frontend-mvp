"use client";
import { useState } from "react";
import AdminBKSDDashboard from "../../admin/(adminPersonaScreens)/bksd-dashboard/page";
import FilterBKSD from "../../admin/(adminPersonaScreens)/bksd-dashboard/components/FilterBKSD";

export default function BKSDDashboard() {
  const [roleName, setRoleName] = useState("BKSD");
  return (
    <div>
      <div className="flex justify-between">
        <h3 className="font-medium text-2xl">{roleName} Dashboard</h3>
        <FilterBKSD />
      </div>
      <AdminBKSDDashboard showHeader={false} showStaffButton={false} />
    </div>
  );
}
