'use client'

import { useState } from "react";
import AdminRecruiterdashboard from "../../admin/(adminPersonaScreens)/recruiter-dashboard/page";


export default function RecruiterDashboard() {
    const [roleName, setRoleName] = useState("Recruiter");
  return (
    <div >
      <div>
        <h3 className="font-medium text-2xl">{roleName} Dashboard</h3>
      </div>
      <AdminRecruiterdashboard showStaffButton={false} showHeader={false}/>
    </div>
  );
}
