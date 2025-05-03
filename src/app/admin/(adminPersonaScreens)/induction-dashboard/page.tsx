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
import { boolean } from "zod";

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
  const [showAttendanceToast, setShowAttendanceToast] = useState(false);
  const [attendanceToastMessage, setAttendanceToastMessage] = useState("");
  const { fetchInductionLearnersData } = useInductionLearners();
  const isDisabled = checkedIds.length <= 0;

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
    // console.log("handleInviteFormSubmit received values:", values);
    
    // Store the form values
    setData(values);
    
    // Check if this is from paste tab (has meetingInfo) or manual tab
    const isPasteTab = values.meetingInfo && values.meetingInfo.trim() !== '';
    // console.log("Form submission from tab:", isPasteTab ? "paste" : "manual");
    
    // Always send the data regardless of which tab
    await sendInvites(checkedIds, values);
    
    // Reset state
    setCheckedItems({});
    setCheckedIds([]);
    handleFetchLearnersData("", 1, 10, "");
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
    handleFetchLearnersData("", 1, 10, query);
  };

  const handleFilter = (filter) => {
    handleFetchLearnersData(filter, 1, 10, "");
  };

  const handlePageReset = () => {
    handleFetchLearnersData("", 1, 10, "");
  };

  // Function to toggle attendance between present and absent
  const handleToggleAttendance = async (learnerId, status) => {
    setLoading2(true);
    try {
      const response = await fetch(
        `/api/induction/markPresent?studentId=${learnerId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            attendance_status: status,
          }),
          cache: "no-store",
        }
      );
      
      if (response.ok) {
        // Update just this row in the local state
        setAllLearners(prevLearners => 
          prevLearners.map(learner => 
            learner.id === learnerId 
              ? { ...learner, attendance_status: status } 
              : learner
          )
        );
      } else {
        console.error(`Failed to mark as ${status}`);
      }
    } catch (error) {
      console.error(`Error marking as ${status}:`, error);
    } finally {
      setLoading2(false);
    }
  };

  // Function to handle bulk toggle of attendance status
  // Function to handle bulk toggle of attendance status
const handleBulkAttendanceToggle = async () => {
  if (checkedIds.length === 0) return;
  
  // Filter out students who haven't been sent invites
  const eligibleIds = checkedIds.filter(id => {
    const learner = allLearners.find(l => l.id === id);
    return learner && learner.inductor_status !== "Not sent";
  });
  
  // Check if there are any ineligible students
  const ineligibleCount = checkedIds.length - eligibleIds.length;
  if (ineligibleCount > 0) {
    // Show toast notification about ineligible students
    // You'll need to add this state and UI component
    setShowAttendanceToast(true);
    setAttendanceToastMessage(`${ineligibleCount} student(s) haven't been sent invites and won't have attendance updated.`);
    setTimeout(() => setShowAttendanceToast(false), 5000);
    
    // If all selected students are ineligible, exit the function
    if (eligibleIds.length === 0) return;
  }
  
  setLoading2(true);
  
  // Determine if we're marking all as present or all as absent
  // Only consider eligible students for this determination
  const hasAbsentLearners = eligibleIds.some(id => {
    const learner = allLearners.find(l => l.id === id);
    return !learner || learner.attendance_status !== "present";
  });
  
  const newStatus = hasAbsentLearners ? "present" : "absent";
  
  for (const id of eligibleIds) {
    try {
      const response = await fetch(
        `/api/induction/markPresent?studentId=${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            attendance_status: newStatus,
          }),
          cache: "no-store",
        }
      );
      
      if (!response.ok) {
        console.error(`Failed to toggle attendance status for student ${id}`);
      }
    } catch (error) {
      console.error(`Error toggling attendance status:`, error);
    }
  }
  
  // Update local state for the affected items
  setAllLearners(prevLearners => 
    prevLearners.map(learner => {
      if (eligibleIds.includes(learner.id)) {
        return {
          ...learner,
          attendance_status: newStatus
        };
      }
      return learner;
    })
  );
  
  setCheckedItems({});
  setCheckedIds([]);
  setKey(prev => prev + 1);
  setLoading2(false);
};

  // 🔹 Render Component
  return (
    <div>
      {/* 🔹 Header Section */}
      <div className="flex flex-col xl:flex-row justify-between items-center">
        {showHeader && <InductionDashboardHeader {...{ roleName }} />}

        {/* 🔹 Button Section */}
        <div className="flex flex-col md:flex-row space-x-4 space-y-2 md:space-y-0 my-3 xl:my-0 items-center">
          <div className="flex flex-col md:flex-row space-x-4 space-y-4 md:space-y-0 my-3 xl:my-0 items-center">
            <h3
              className="py-2 px-3 bg-black text-white text-sm rounded-md cursor-pointer"
              onClick={handlePageReset}
            >
              All
            </h3>
            <SearchComponent searchValue={handleSearch} />
          </div>
          {!isDisabled && (
            <h3 
              className="py-2 px-3 bg-tgrey1 text-white text-sm rounded-md hover:text-black cursor-pointer" 
              onClick={handleBulkAttendanceToggle}
            >
              Toggle Attendance
            </h3>
          )}
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
            handleToggleAttendance,
            handleSingleRowInductionEmail,
            successfulEmail,
            failedEmail,
            loading2,
            showSuccessToast,
            showFailureToast,
            showAttendanceToast,
            setShowAttendanceToast,
            attendanceToastMessage,
            setAttendanceToastMessage,
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