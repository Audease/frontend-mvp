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

export default function AdminRecruiterdashboard({
  showStaffButton = true,
  showHeader = true,
}) {
  const [roleName, setRoleName] = useState("Onny");
  const [activeTab, setActiveTab] = useState("All");
  const [activeBarStyle, setActiveBarStyle] = useState({});
  const [checkedItems, setCheckedItems] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const tabs = useMemo(() => ["All", "Recent", "Deleted"], []);
  const [tableKey, setTableKey] = useState(1);
  const [loading2, setLoading2] = useState(false);

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

  useEffect(() => {
    const activeIndex = tabs.indexOf(activeTab);
    const tabWidth = 7 / tabs.length;
    setActiveBarStyle({
      width: `${tabWidth}%`,
      transform: `translateX(${activeIndex * 180}%)`,
    });
  }, [activeTab, tabs, tabs.length]);

  const onEditClick = () => {
    setIsEditing((prev) => !prev);
  };

  const handleCheckboxChange = (id: string | number) => {
    setCheckedItems((prev) => {
      const newCheckedState = { ...prev };

      if (newCheckedState[id]) {
        delete newCheckedState[id];
      } else {
        newCheckedState[id] = true;
      }
      if (Object.keys(newCheckedState).length === 0) {
        return {};
      }
      return newCheckedState;
    });
  };

  const onDeleteClick = async () => {
    const checkedIds = Object.keys(checkedItems).filter(
      (id) => checkedItems[id]
    );

    if (checkedIds.length > 0) {
      try {
        setLoading2(true);
        await DeleteStudent(checkedIds);
        await learnerRevalidation();
        handleFetchLearnersData(1);
        setCheckedItems({});
      } catch (error) {
        console.error("Error deleting students:", error);
      } finally {
        setLoading2(false);
      }
    } else {
      console.log("No students selected for deletion.");
    }
  };

  const onConfirmEditButtonClick = async () => {
    setLoading2(true);
    setIsEditing(false);
    console.log("Changed values:", changedValues);

    const checkedIds = Object.keys(checkedItems).filter(
      (id) => checkedItems[id]
    );

    for (const id of checkedIds) {
      const changesForLearner = changedValues[id]?.changed;

      if (changesForLearner) {
        await UpdateLearner(id, changesForLearner);
      }
    }

    await learnerRevalidation();
    setCheckedItems({});
    setChangedValues({});
    setLoading2(false);
  };

  const onRevertEditButtonClick = () => {
    setIsEditing(false);
    handleRevertChanges();
    setCheckedItems({});
  };

  const handleLearnerCreated = async () => {
    await learnerRevalidation();
    handleFetchLearnersData(1);
  };

  return (
    <div className="flex flex-col">
      {/* section 1  */}
      <section className="flex flex-row space-x-3">
        {showHeader && <DashboardHeader roleName={roleName} />}
      </section>

      {/* Selection and active bar */}
      <section className="mt-4 flex-col">
        <div className="flex flex-row justify-between font-medium text-sm text-tgrey3">
          <div className="flex flex-row space-x-6">
            {tabs.map((tab) => (
              <h2
                key={tab}
                className={`cursor-pointer pt-4 ${
                  activeTab === tab ? "text-black" : ""
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </h2>
            ))}
          </div>
          {/* The buttons on the right side  */}
          <div>
            <ActionButtons
              {...{
                checkedItems,
                onDeleteClick,
                onEditClick,
                onConfirmEditButtonClick,
                onRevertEditButtonClick,
                handleLearnerCreated,
                showStaffButton,
              }}
            />
          </div>
        </div>
        {/* The active bar color change */}
        <div className="w-full h-[0.10rem] bg-gray-300 my-2">
          <div
            className={`h-[0.10rem] bg-dashboardButtons transition-all duration-300`}
            style={activeBarStyle}
          ></div>
        </div>
      </section>

      <section>
        <div className="min-h-[35rem]">
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
        </div>

        <div className="mt-2">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={10}
            totalItems={totalItems}
            onPageChange={handlePageChange}
          />
        </div>
      </section>
    </div>
  );
}
