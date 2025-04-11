"use client";

// Imports
import { useEffect, useState } from "react";

// Components
import InductionDashboardTable from "./components/InductionDashboardTable";
import InductionStaffModal from "./components/InductionStaffModal";
import InductionDashboardHeader from "./components/InductionDashboardHeader";
import StaffButton from "./components/StaffButton";
import SendBtn from "./components/SendBtn";
import { MeetingFormDialog } from "./components/SendInductionInviteModal";

// Utilities
import { useInductionLearners } from "./utils/useInductionLearners";
import useSendInvite from "./utils/useSendInvite";
import { SearchComponent } from "@/app/components/dashboard/SearchBox";
import FilterButton from "@/app/components/dashboard/FilterButton";

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
  const [key, setKey] = useState(0);

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
    handleFetchLearnersData(1, 10, "", "");
    setKey((prev) => prev + 1);
    setOpenInductionInviteModalOpen(false);
  };

  // 🔹 Function for Sending Applications
  const sendApplication = async () => {
    setOpenInductionInviteModalOpen(true);
  };

  const handleSingleRowInductionEmail = async (learnerId) => {
    setCheckedIds([learnerId]);
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
  const handleFetchLearnersData = async (
    induction_status,
    page,
    limit,
    search
  ) => {
    setLoading(true);
    const { totalPages, totalItems, allLearners } =
      await fetchInductionLearnersData(induction_status, page, limit, search);
    setTotalPages(totalPages);
    setTotalItems(totalItems);
    setAllLearners(allLearners);
    setLoading(false);
  };

  useEffect(() => {
    handleFetchLearnersData("", 1, 10, "");
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  , []);

  const handleSearch = (query) => {
    handleFetchLearnersData("sent", 1, 10, query);
  };

  const handleFilter = (filter) => {
    handleFetchLearnersData(filter, 1, 10, "");
  };

  const handlePageReset = () => {
    handleFetchLearnersData("", 1, 10, "");
  };
  return (
    <div>
      {/* 🔹 Header Section */}
      <div className="flex flex-col xl:flex-row justify-between items-center">
        {showHeader && <InductionDashboardHeader {...{ roleName }} />}

        {/* 🔹 Button Section */}
        <div className="flex flex-row space-x-4 my-3 xl:my-0 items-center">
          <div className="flex flex-col md:flex-row space-x-4 space-y-4 md:space-y-0 my-3 xl:my-0 items-center">
            <h3
              className="py-2 px-3 bg-black text-white text-sm rounded-md"
              onClick={handlePageReset}
            >
              All
            </h3>
            <SearchComponent searchValue={handleSearch} />
          </div>
          <SendBtn onSendClick={sendApplication} disabled={isDisabled} />
          {showStaffButton && <StaffButton {...{ onViewStaffClick }} />}
          <div className="hidden xl:flex">
            {showStaffButton && (
              <FilterButton
                options={["Sent", "Not sent"]}
                onSelect={handleFilter}
                label={"Filter"}
              />
            )}
          </div>
        </div>
      </div>

      {/* 🔹 Dashboard Table Section */}
      <div className="mt-6">
        <InductionDashboardTable
          {...{
            key,
            handleSingleRowInductionEmail,
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
