'use client'

import { useState } from "react";
import AccessorDashboard from "../../admin/(adminPersonaScreens)/accessor-dashboard/page";
import AccessorFilterButton from "../../admin/(adminPersonaScreens)/accessor-dashboard/components/AccessorFilterButton";

export default function AccessorPersona() {
  const [roleName, setRoleName] = useState("Application Review");
  return (
    <div className="">
     <div className="flex justify-between">
        <h3 className="font-medium text-2xl">{roleName} Dashboard</h3>
        <AccessorFilterButton />
      </div>
      <AccessorDashboard showHeader={false}/>
    </div>
  );
}
