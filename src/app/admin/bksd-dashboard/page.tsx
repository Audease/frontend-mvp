"use client";

import { useState } from "react";
import { LuPencil } from "react-icons/lu";
import { SlArrowLeft } from "react-icons/sl";
import { BKSDFilterButton } from "../../components/dashboard/FilterButton";
import BKSDDashboardTable from "../../components/dashboard/BKSDDashboardTable";
import learnersData from "../../data/learnersData.json";
import BKSDStaffModal from "./bksdStaffModal";

export default function AdminBKSDDashboard() {
  const [BKSDName, setBKSDName] = useState("BKSD");
  const onBackClick = () => {};

  const filterOptions = ["Option 1", "Option 2", "Option 3"];
  const categoriesDropdownOptions = ["Sent", "Not sent"];
  const [checkedItems, setCheckedItems] = useState({});

  const handleFilterSelect = () => {};

  const handleCategorySelect = () => {};

  const onFilterClick = () => {};

  const handleCheckboxChange = (id) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const [showBKSDStaffModal, setShowBKSDStaffModal] = useState(false);

  const onViewStaffClick = () => {
    setShowBKSDStaffModal(true);
  }

  const closeBKSDStaffModal = () => {
    setShowBKSDStaffModal(false);
  }
  return (
    <div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-row space-x-3">
          {/* Back Button */}
          <div className="pt-1 ">
            <button
              className="flex flex-row space-x-2 text-tgrey3"
              type="button"
              onClick={onBackClick}
            >
              <div className="pt-2">
                <SlArrowLeft className="text-tgrey3 h-[0.6rem]" />
              </div>
              <p className="font-medium text-base">Back</p>
            </button>
          </div>
          {/* Dashboard Title  */}
          <div>
            <h3 className="font-medium text-2xl pl-3">{BKSDName} Dashboard</h3>
          </div>
          <div>
            {/* Pencil  */}
            <div className="py-1">
              <LuPencil className="text-dashboardButtons w-10 h-5 " />
            </div>
          </div>
        </div>
        {/* THe buttons  */}
        <div className="flex flex-row space-x-4">
          {/* View Staff Button  */}
          <div>
            <button
              className="flex flex-row rounded-md py-[0.4rem] px-4 bg-black text-white font-medium text-sm"
              onClick={onViewStaffClick}
            >
              View staff
            </button>
          </div>

          {/* Filter Button  */}
          <div>
            <BKSDFilterButton
              label={"Filters"}
              options={filterOptions}
              onSelect={handleFilterSelect}
              categoriesDropdownOptions={categoriesDropdownOptions}
              onCategorySelect={handleCategorySelect}
              onFilterClick={onFilterClick}
            />
          </div>
        </div>
      </div>

      {/* The Table */}
      <div className="mt-6">
        <BKSDDashboardTable
          learnersData={learnersData.learners}
          checkedItems={checkedItems}
          handleCheckboxChange={handleCheckboxChange}
        />
      </div>

      {/* The view staff modal  */}
       <BKSDStaffModal show={showBKSDStaffModal} onClose={closeBKSDStaffModal}/>
    </div>
  );
}
