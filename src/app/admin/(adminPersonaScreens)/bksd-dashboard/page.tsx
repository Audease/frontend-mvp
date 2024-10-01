"use client";

import { useState } from "react";
import BKSDDashboardTable from "./components/BKSDDashboardTable";
import BKSDStaffModal from "./components/bksdStaffModal";
import BKSDDashboardHeader from "./components/BKSDDashboardHeader";
import StaffButton from "./components/StaffButton";
import FilterBKSD from "./components/FilterBKSD";

export default function AdminBKSDDashboard({
  showHeader = true,
  showStaffButton = true,
}) {
  const [roleName, setRoleName] = useState("BKSD");
  
  const [showBKSDStaffModal, setShowBKSDStaffModal] = useState(false);

  const onViewStaffClick = () => {
    setShowBKSDStaffModal(true);
  };

  const closeBKSDStaffModal = () => {
    setShowBKSDStaffModal(false);
  };

  return (
    <div>
      <div className="flex flex-row justify-between">
        {showHeader && <BKSDDashboardHeader {...{ roleName }} />}
        {/* THe buttons  */}
        <div className="flex flex-row space-x-4">
          {/* View Staff Button  */}
          {showStaffButton && <StaffButton {...{ onViewStaffClick }} />}
          {/* Filter Button  */}
          {showStaffButton && (<FilterBKSD />)}
        </div>
      </div>

      {/* The Table */}
      <div className="mt-6">
        <BKSDDashboardTable />
      </div>

      {/* The view staff modal  */}
      <BKSDStaffModal show={showBKSDStaffModal} onClose={closeBKSDStaffModal} />
    </div>
  );
}
