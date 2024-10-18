"use client";
import { useState } from "react";
import AdminCertificateDashboard from "@/app/admin/(adminPersonaScreens)/certificate-dashboard/page";
import FilterCertificate from "@/app/admin/(adminPersonaScreens)/certificate-dashboard/components/FilterCertificate";

export default function CertificateDashboard() {
  const [roleName, setRoleName] = useState("Certificate");
  return (
    <div>
      <div className="flex justify-between">
        <h3 className="font-medium text-2xl">{roleName} Dashboard</h3>
        <FilterCertificate />
      </div>
      <AdminCertificateDashboard showHeader={false} showStaffButton={false} />
    </div>
  );
}
