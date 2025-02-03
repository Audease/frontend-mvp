"use client";

import { useState } from "react";
import InductionDashboardTable from "./components/InductionDashboardTable";
import InductionStaffModal from "./components/InductionStaffModal";
import InductionDashboardHeader from "./components/InductionDashboardHeader";
import StaffButton from "./components/StaffButton";
import FilterInduction from "./components/FilterInduction";
import SendBtn from "./components/SendBtn";
import { SendEmail } from "./utils/action";
import { learnerRevalidation } from "@/app/action";
import { useInductionLearners } from "./utils/useInductionLearners";
import { MeetingFormDialog } from "./components/SendInductionInviteModal";

export default function AdminBKSDDashboard({
  showHeader = true,
  showStaffButton = true,
}) {
  // State management
  const [roleName, setRoleName] = useState("Induction");
  const [showInductionStaffModal, setShowInductionStaffModal] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [checkedIds, setCheckedIds] = useState([]);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [successfulEmail, setSuccessfulEmail] = useState<number>();
  const [failedEmail, setFailedEmail] = useState<number>();
  const [showFailureToast, setShowFailureToast] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});

  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(1);
  const [allLearners, setAllLearners] = useState([]);

  const { fetchInductionLearnersData } = useInductionLearners();

  const isDisabled = checkedIds.length <= 1;

  // Functions for handling modal
  const onViewStaffClick = () => {
    setShowInductionStaffModal(true);
  };

  const closeInductionStaffModal = () => {
    setShowInductionStaffModal(false);
  };

  const [open, setOpen] = useState(false);
  const onOpenChange = () => {
   setOpen(false)
  }

  // Function for sending applications
  const sendApplication = async () => {
    setOpen(true)
  };

  // Function to handle checkbox changes
  const handleCheckboxChange = (id) => {
    setCheckedItems((prev) => {
      const updatedItems = { ...prev, [id]: !prev[id] };
      const updatedIds = Object.keys(updatedItems).filter(
        (key) => updatedItems[key]
      );
      setCheckedIds(updatedIds);
      return updatedItems;
    });
  };

  // Function to fetch learner data
  const handleFetchLearnersData = async (page) => {
    setLoading(true);
    const { totalPages, totalItems, allLearners } = await fetchInductionLearnersData(
      page
    );
    setTotalPages(totalPages);
    setTotalItems(totalItems);
    setAllLearners(allLearners);
    setLoading(false);
  };

  

  return (
    <div>
      {/* Header Section */}
      <div className="flex flex-col xl:flex-row justify-between">
        {showHeader && <InductionDashboardHeader {...{ roleName }} />}

        {/* Button Section */}
        <div className="flex flex-row space-x-4 my-3 xl:my-0">
          <SendBtn onSendClick={sendApplication} disabled={isDisabled} />
          {showStaffButton && <StaffButton {...{ onViewStaffClick }} />}
          <div className="hidden xl:flex">
            {showStaffButton && <FilterInduction />}
          </div>
        </div>
      </div>

      {/* Dashboard Table Section */}
      <div className="mt-6">
        <InductionDashboardTable
          {...{
            sendApplication,
            successfulEmail,
            failedEmail,
            loading2,
            showSuccessToast,
            showFailureToast,
            checkedItems,
            handleCheckboxChange,
            handleFetchLearnersData,
            loading,
            allLearners,
            totalPages,
            totalItems,
          }}
        />
      </div>

      {/* Staff Modal Section */}
      <InductionStaffModal show={showInductionStaffModal} onClose={closeInductionStaffModal} />

      <MeetingFormDialog isOpen={open} onOpenChange={onOpenChange} />
    </div>
  );
}
