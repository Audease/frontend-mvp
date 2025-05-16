"use client";

import { useEffect, useState } from "react";
import LazerDashboardTable from "./components/LazerDashboardTable";
import LazerStaffModal from "./components/LazerStaffModal";
import LazerDashboardHeader from "./components/LazerDashboardHeader";
import StaffButton from "./components/StaffButton";
import { LazerApproveLearner } from "./utils/action";
import { lazerLearnerRevalidation } from "@/app/action";
import { lazerLearner, useLazerLearners } from "./utils/useLazerLearners";
import ApproveBtn from "./components/ApproveBtn";
import FilterButton from "@/app/components/dashboard/FilterButton";
import { SearchComponent } from "@/app/components/dashboard/SearchBox";

export default function AdminLazerDashboard({
  showHeader = true,
  showStaffButton = true,
}) {
  // State management
  const [roleName, setRoleName] = useState("Learning Platform");
  const [showInductionStaffModal, setShowInductionStaffModal] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [checkedIds, setCheckedIds] = useState([]);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [success, setSuccess] = useState<number>();
  const [failed, setFailed] = useState<number>();
  const [showFailureToast, setShowFailureToast] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});
  const [key, setKey] = useState(0);

  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(1);
  const [allLearners, setAllLearners] = useState([]);

  const { fetchLazerLearnersData } = useLazerLearners();

  const isDisabled = checkedIds.length <= 1;

  // Functions for handling modal
  const onViewStaffClick = () => {
    setShowInductionStaffModal(true);
  };

  const closeInductionStaffModal = () => {
    setShowInductionStaffModal(false);
  };

  // Function for sending bulk applications
  const approveLazer = async () => {
    setLoading2(true);
    const results = await Promise.all(
      checkedIds.map(async (id) => {
        try {
          const success = await LazerApproveLearner(id);
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

    lazerLearnerRevalidation();
    handleFetchLearnersData({ page: 1 });
    setCheckedItems({});

    if (successfulIds.length > failedIds.length) {
      setSuccess(successfulIds.length);
      setFailed(failedIds.length);
      setShowSuccessToast(true);
      setKey((prev) => prev + 1);
      setTimeout(() => setShowSuccessToast(false), 5000);
    } else {
      setSuccess(successfulIds.length);
      setFailed(failedIds.length);
      setShowFailureToast(true);
      setTimeout(() => setShowFailureToast(false), 5000);
    }

    setLoading2(false);

    return { successfulIds, failedIds };
  };

  // Function to handle single row approval
  const handleSingleRowApprove = async (id) => {
    setLoading2(true);
    try {
      const success = await LazerApproveLearner(id);
      if (success) {
        setSuccess(1);
        setFailed(0);
        setShowSuccessToast(true);
        setTimeout(() => setShowSuccessToast(false), 5000);
        handleFetchLearnersData({ page: 1 });
        await lazerLearnerRevalidation();
        setKey((prev) => prev + 1);
      } else {
        setSuccess(0);
        setFailed(1);
        setShowFailureToast(true);
        setTimeout(() => setShowFailureToast(false), 5000);
      }
    } catch (error) {
      console.error("Error approving learner:", error);
      setSuccess(0);
      setFailed(1);
      setShowFailureToast(true);
      setTimeout(() => setShowFailureToast(false), 5000);
    } finally {
      setLoading2(false);
    }
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
  const handleFetchLearnersData = async ({
    lazer_status,
    page,
    searchQuery,
  }: lazerLearner) => {
    setLoading(true);
    const { totalPages, totalItems, allLearners } =
      await fetchLazerLearnersData({ lazer_status, page, searchQuery });
    setTotalPages(totalPages);
    setTotalItems(totalItems);
    setAllLearners(allLearners);
    setLoading(false);
  };

  useEffect(
    () => {
      handleFetchLearnersData({ page: 1 });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // Function to handle filter selection
  const handleFilter = async (lazer_status) => {
    handleFetchLearnersData({ lazer_status, page: 1 });
  };

  // Function to handle search input
  const handleSearch = async (search) => {
    handleFetchLearnersData({ page: 1, searchQuery: search });
  };

  // Function to reset the page
  const handlePageReset = async () => {
    handleFetchLearnersData({ page: 1 });
  };

  return (
    <div>
      {/* Header Section */}
      <div className="flex flex-col xl:flex-row justify-between items-center">
        {showHeader && <LazerDashboardHeader {...{ roleName }} />}

        {/* Button Section */}
        <div className="flex flex-col  md:flex-row space-x-4 space-y-2 md:space-y-0 my-3 xl:my-0 items-center">
          <div className="flex flex-col md:flex-row space-x-4 md:space-y-0 my-3 xl:my-0 items-center">
            <h3
              className="py-2 px-3 bg-black text-white text-sm rounded-md"
              onClick={handlePageReset}
            >
              All
            </h3>
            <SearchComponent searchValue={handleSearch} />
          </div>
          <ApproveBtn onSendClick={approveLazer} disabled={isDisabled} />
          {showStaffButton && <StaffButton {...{ onViewStaffClick }} />}
          <div className="hidden xl:flex">
            {showStaffButton && (
              <FilterButton
                options={["Approved", "Pending"]}
                onSelect={handleFilter}
                label={"Filter"}
              />
            )}
          </div>
        </div>
      </div>

      {/* Dashboard Table Section */}
      <div className="mt-6">
        <LazerDashboardTable
          {...{
            key,
            handleSingleRowApprove,
            success,
            failed,
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
      <LazerStaffModal
        show={showInductionStaffModal}
        onClose={closeInductionStaffModal}
      />
    </div>
  );
}
