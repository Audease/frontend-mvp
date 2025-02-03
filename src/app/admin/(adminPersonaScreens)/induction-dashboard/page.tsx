"use client";

// Imports
import { useState } from "react";

// Components
import InductionDashboardTable from "./components/InductionDashboardTable";
import InductionStaffModal from "./components/InductionStaffModal";
import InductionDashboardHeader from "./components/InductionDashboardHeader";
import StaffButton from "./components/StaffButton";
import FilterInduction from "./components/FilterInduction";
import SendBtn from "./components/SendBtn";
import { MeetingFormDialog } from "./components/SendInductionInviteModal";

// Utilities
import { useInductionLearners } from "./utils/useInductionLearners";
import useSendInvite from "./utils/useSendInvite";

export default function AdminBKSDDashboard({
  showHeader = true,
  showStaffButton = true,
}) {
  // 🔹 State Management
  const [roleName, setRoleName] = useState("Induction");
  const [showInductionStaffModal, setShowInductionStaffModal] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [checkedIds, setCheckedIds] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});
  const [loading, setLoading] = useState(false);

  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(1);
  const [allLearners, setAllLearners] = useState([]);
  const { fetchInductionLearnersData } = useInductionLearners();
  const isDisabled = checkedIds.length <= 1;

  // 🔹 Induction Staff Modal Handlers
  const onViewStaffClick = () => setShowInductionStaffModal(true);
  const closeInductionStaffModal = () => setShowInductionStaffModal(false);

  // 🔹 Induction Invite Modal Handlers
  const [openInductionInviteModal, setOpenInductionInviteModalOpen] =
    useState(false);
  const [data, setData] = useState({});
  const {
    loadingProgress,
    successfulEmail,
    failedEmail,
    showSuccessToast,
    showFailureToast,
    sendInvites,
  } = useSendInvite();

  const onOpenInductionInviteModalChange = () => {
    setOpenInductionInviteModalOpen(false);
  };

  const handleInviteFormSubmit = async (values) => {
    setData(values);
    await sendInvites(checkedIds, data);
    setCheckedItems({});
    setCheckedIds([]);
    handleFetchLearnersData(1);
    setOpenInductionInviteModalOpen(false);
  };

  // 🔹 Function for Sending Applications
  const sendApplication = async () => {
    setOpenInductionInviteModalOpen(true);
  };

  // 🔹 Function to Handle Checkbox Changes
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

  // 🔹 Function to Fetch Learner Data
  const handleFetchLearnersData = async (page) => {
    setLoading(true);
    const { totalPages, totalItems, allLearners } =
      await fetchInductionLearnersData(page);
    setTotalPages(totalPages);
    setTotalItems(totalItems);
    setAllLearners(allLearners);
    setLoading(false);
  };

  return (
    <div>
      {/* 🔹 Header Section */}
      <div className="flex flex-col xl:flex-row justify-between">
        {showHeader && <InductionDashboardHeader {...{ roleName }} />}

        {/* 🔹 Button Section */}
        <div className="flex flex-row space-x-4 my-3 xl:my-0">
          <SendBtn onSendClick={sendApplication} disabled={isDisabled} />
          {showStaffButton && <StaffButton {...{ onViewStaffClick }} />}
          <div className="hidden xl:flex">
            {showStaffButton && <FilterInduction />}
          </div>
        </div>
      </div>

      {/* 🔹 Dashboard Table Section */}
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

      {/* 🔹 Staff Modal Section */}
      <InductionStaffModal
        show={showInductionStaffModal}
        onClose={closeInductionStaffModal}
      />

      {/* 🔹 Induction Invite Modal Section */}
      <div>
        <MeetingFormDialog
          isOpen={openInductionInviteModal}
          onOpenChange={onOpenInductionInviteModalChange}
          onSubmit={handleInviteFormSubmit}
          loading={loadingProgress}
        />
      </div>
    </div>
  );
}
