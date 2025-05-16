"use client";
import { useState } from "react";
import FilterLazer from "@/app/admin/(adminPersonaScreens)/lazer-dashboard/components/LazerInduction";
import AdminLazerDashboard from "@/app/admin/(adminPersonaScreens)/lazer-dashboard/page";

export default function LazerDashboard() {
  const [roleName, setRoleName] = useState("Learning Platform");
  return (
    <div>
      <div className="flex justify-between">
        <h3 className="font-medium text-2xl">{roleName} Dashboard</h3>
        <FilterLazer />
      </div>
      <AdminLazerDashboard showHeader={false} showStaffButton={false} />
    </div>
  );
}
