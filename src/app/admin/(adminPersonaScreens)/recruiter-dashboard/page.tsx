"use client";

import { useState, useEffect, useMemo } from "react";
import RecruiterDashboardTable from "./RecruiterDashboardTable";
import DeleteStudent, { UpdateLearner } from "./utils/action";
import { learnerRevalidation } from "../../../action";
import Pagination from "../../../components/dashboard/Pagination";
import { useLearnerByRecruiter } from "./utils/useLearnerByRecruiter";
import ActionButtons from "./components/ActionButton";
import DashboardHeader from "./components/DashBoardHeader";
import LoadingSpinner from "../../../components/dashboard/Spinner";
import LearnerEditForm from "./components/LearnerEditModal";

export default function AdminRecruiterdashboard({
  showStaffButton = true,
  showHeader = true,
}) {
  // State Management
  const [roleName, setRoleName] = useState("Recruiter");
  const [activeTab, setActiveTab] = useState("All");
  const [activeBarStyle, setActiveBarStyle] = useState({});
  const [checkedItems, setCheckedItems] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [tableKey, setTableKey] = useState(1);
  const [loading2, setLoading2] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [onLearnerEditClick, setOnLearnerEditClick] = useState(false);
  const [editingLearner, setEditingLearner] = useState(null);
  const [patchLoading, setPatchLoading] = useState(false);
  const [apiError, setApiError] = useState(false);
  const [apiSuccess, setApiSuccess] = useState(false);

  const tabs = useMemo(() => ["All", "Recent", "Archive"], []);

  // Fetch learners data hook
  const {
    allLearners,
    currentPage,
    totalPages,
    totalItems,
    loading,
    changedValues,
    setChangedValues,
    handlePageChange,
    handleRevertChanges,
    handleInputChange,
    handleFetchLearnersData,
  } = useLearnerByRecruiter();

  // Update active tab bar styling
  useEffect(() => {
    const activeIndex = tabs.indexOf(activeTab);
    const tabWidth = 7 / tabs.length;
    setActiveBarStyle({
      width: `${tabWidth}%`,
      transform: `translateX(${activeIndex * 180}%)`,
    });
  }, [activeTab, tabs]);

  // Handle checkbox selection
  const handleCheckboxChange = (id) => {
    setCheckedItems((prev) => {
      const newCheckedState = { ...prev };
      newCheckedState[id]
        ? delete newCheckedState[id]
        : (newCheckedState[id] = true);
      return Object.keys(newCheckedState).length ? newCheckedState : {};
    });
  };

  // Handle delete action
  const onDeleteClick = async () => {
    const checkedIds = Object.keys(checkedItems).filter(
      (id) => checkedItems[id]
    );
    if (checkedIds.length === 0)
      return alert("No students selected for deletion.");
    try {
      setLoading2(true);
      await DeleteStudent(checkedIds);
      await learnerRevalidation();
      handleFetchLearnersData(1, 10, "", "", "", "");
      setTableKey((prev) => prev + 1);
      setCheckedItems({});
    } catch (error) {
      console.error("Error deleting students:", error);
    } finally {
      setLoading2(false);
    }
  };

  // Handle confirm edit button
  // const onConfirmEditButtonClick = async () => {
  //   setLoading2(true);
  //   setIsEditing(false);
  //   const checkedIds = Object.keys(checkedItems).filter((id) => checkedItems[id]);
  //   for (const id of checkedIds) {
  //     if (changedValues[id]?.changed) {
  //       await UpdateLearner(id, changedValues[id].changed);
  //     }
  //   }
  //   await learnerRevalidation();
  //   setCheckedItems({});
  //   setChangedValues({});
  //   setLoading2(false);
  // };

  // Revert edit changes
  // const onRevertEditButtonClick = () => {
  //   setIsEditing(false);
  //   handleRevertChanges();
  //   setCheckedItems({});
  // };

  // Handle new learner creation
  const handleLearnerCreated = async () => {
    await learnerRevalidation();
    handleFetchLearnersData(1, 10, "", "", "", "");
  };

  // Handle filtering
  const onFilterClick = (funding, course) => {
    handleFetchLearnersData(1, 10, funding, course, "", "");
  };

  // Handle search input
  const searchValue = (searchValue) => {
    setSearchQuery(searchValue);
    handleFetchLearnersData(1, 10, "", "", searchValue, "");
  };

  // Handle tab switching
  const onTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === "All") handleFetchLearnersData(1, 10, "", "", "", "");
  };

  // Handle edit modal close
  const onEditModalClose = () => {
    setOnLearnerEditClick(false);
    setIsEditing(false);
    setCheckedItems({});
  };

  // Handle edit button click
  const onEditClick = () => {
    const checkedIds = Object.keys(checkedItems).filter(
      (id) => checkedItems[id]
    );
    if (checkedIds.length === 0)
      return alert("No students selected for editing.");
    if (checkedIds.length > 1)
      return alert("Please select only one student for editing.");
    setEditingLearner(
      allLearners.find((learner) => learner.id === checkedIds[0])
    );
    setOnLearnerEditClick(true);
    setIsEditing(true);
    setCheckedItems({});
  };

  // Handle Patch action
  const handlePatch = async (learnerId, data) => {
    setPatchLoading(true);
    try {
      const patch = await UpdateLearner(learnerId, data);
      if (patch.status === 200) {
        setApiSuccess(true);
        setTimeout(() => {
          setApiSuccess(false);
        }, 3000);
      } else {
        setApiError(true);
        setTimeout(() => {
          setApiError(false);
        }, 3000);
      }
      await learnerRevalidation();
      handleFetchLearnersData(currentPage, 10, "", "", searchQuery, "");
      setTableKey((prev) => prev + 1);
    } catch (error) {
      console.error("Error updating learner:", error);
    } finally {
      setPatchLoading(false);
    }
  };

  const callback = async () => {
    await handleFetchLearnersData(currentPage, 10, "", "", searchQuery, "");
    await learnerRevalidation();
    setTableKey((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col">
      {/* Header Section */}
      {showHeader && <DashboardHeader roleName={roleName} />}

      {/* Tabs and Actions */}
      <section className="mt-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="flex space-x-6">
            {tabs.map((tab) => (
              <h2
                key={tab}
                className={`cursor-pointer pt-4 ${
                  activeTab === tab ? "text-black" : ""
                }`}
                onClick={() => onTabClick(tab)}
              >
                {tab}
              </h2>
            ))}
          </div>
          <ActionButtons
            {...{
              searchValue,
              checkedItems,
              onDeleteClick,
              onEditClick,
              handleLearnerCreated,
              showStaffButton,
              onFilterClick,
              callback
            }}
          />
        </div>
        <div className="w-full h-[0.10rem] bg-gray-300 my-2">
          <div
            className="h-[0.10rem] bg-dashboardButtons transition-all duration-300"
            style={activeBarStyle}
          ></div>
        </div>
      </section>

      {/* Table Section */}
      <section>
        {loading2 && <LoadingSpinner />}
        <RecruiterDashboardTable
          key={tableKey}
          {...{
            checkedItems,
            handleCheckboxChange,
            isEditing,
            loading,
            handleInputChange,
            allLearners,
          }}
        />
        <div className={`z-10 ${onLearnerEditClick ? "fixed inset-0 bg-black bg-opacity-50" : ""}`}>
          <LearnerEditForm
            show={onLearnerEditClick}
            onClose={onEditModalClose}
            learner={editingLearner}
            handlePatchLearner={handlePatch}
            patchLoading={patchLoading}
            apiError={apiError}
            apiSuccess={apiSuccess}
          />
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={10}
          totalItems={totalItems}
          onPageChange={handlePageChange}
        />
      </section>
    </div>
  );
}
