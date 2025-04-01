"use client";

import { useState } from "react";
import BKSDDashboardTable from "./components/BKSDDashboardTable";
import BKSDStaffModal from "./components/bksdStaffModal";
import BKSDDashboardHeader from "./components/BKSDDashboardHeader";
import StaffButton from "./components/StaffButton";
import FilterBKSD from "./components/FilterBKSD";
import SendBtn from "./components/SendBtn";
import { SendEmail } from "./utils/action";
import { learnerRevalidation } from "@/app/action";
import { useBKSDLearners } from "./utils/useBKSDLearners";

export default function AdminBKSDDashboard({
  showHeader = true,
  showStaffButton = true,
}) {
  // State management
  const [roleName, setRoleName] = useState("BKSB");
  const [showBKSDStaffModal, setShowBKSDStaffModal] = useState(false);
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

  const { fetchBKSDLearnersData } = useBKSDLearners();

  const isDisabled = checkedIds.length <= 1;

  // Functions for handling modal
  const onViewStaffClick = () => {
    setShowBKSDStaffModal(true);
  };

  const closeBKSDStaffModal = () => {
    setShowBKSDStaffModal(false);
  };

  // Function for sending applications
  const sendApplication = async () => {
    setLoading2(true);
    const results = await Promise.all(
      checkedIds.map(async (id) => {
        try {
          const success = await SendEmail(id);
          return { id, success };
        } catch (error) {
          return { id, success: false, error };
        }
      })
    );

    const successfulIds = results
      .filter((result) => result.success)
      .map((result) => result.id);
    const failedIds = results
      .filter((result) => !result.success)
      .map((result) => result.id);

    learnerRevalidation();
    handleFetchLearnersData(1);
    setCheckedItems({});

    if (successfulIds.length > failedIds.length) {
      setSuccessfulEmail(successfulIds.length);
      setFailedEmail(failedIds.length);
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 5000);
    } else {
      setSuccessfulEmail(successfulIds.length);
      setFailedEmail(failedIds.length);
      setShowFailureToast(true);
      setTimeout(() => setShowFailureToast(false), 5000);
    }

    setLoading2(false);

    return { successfulIds, failedIds };
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
    const { totalPages, totalItems, allLearners } = await fetchBKSDLearnersData(
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
        {showHeader && <BKSDDashboardHeader {...{ roleName }} />}

        {/* Button Section */}
        <div className="flex flex-row space-x-4 my-3 xl:my-0">
          <SendBtn onSendClick={sendApplication} disabled={isDisabled} />
          {showStaffButton && <StaffButton {...{ onViewStaffClick }} />}
          <div className="hidden xl:flex">
            {showStaffButton && <FilterBKSD />}
          </div>
        </div>
      </div>

      {/* Dashboard Table Section */}
      <div className="mt-6">
        <BKSDDashboardTable
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
      <BKSDStaffModal show={showBKSDStaffModal} onClose={closeBKSDStaffModal} />
    </div>
  );
}
