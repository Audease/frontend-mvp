import { useState } from "react";
import { LuPencil } from "react-icons/lu";
import { BKSDFilterButton } from "../../../components/dashboard/FilterButton";
import AccessorDashboardTable from "../../../components/dashboard/AccessorDashboardTable";
import learnersData from "../../../data/learnersData.json";
import AccessorStaffModal from "../accessor-dashboard/accessorModal";
import InductionStaffModal from "./inductionStaffModal";
import PersonaBackButton from "../components/PersonaBackButton";

export default function Accessor({ onViewChange }) {
  const [inductorName, setinductorName] = useState("Induction");
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
    <div className="h-screen overflow-y-auto">
      {/* Accessor Title and Filter Button */}
      <div className="flex flex-row justify-between">
        <div className="flex flex-row space-x-3">
          {/* Back Button */}
          <PersonaBackButton />
          {/* Dashboard Title  */}
          <div>
            <h3 className="font-medium text-2xl pl-3">
              {inductorName} Dashboard
            </h3>
          </div>
          <div>
            {/* Pencil  */}
            <div className="py-1">
              <LuPencil className="text-dashboardButtons w-10 h-5 " />
            </div>
          </div>
        </div>
        {/* The Buttons  */}
        <div className="flex flex-row space-x-4">
          <div>
            <button
              className="flex flex-row rounded-md py-[0.4rem] px-4 bg-black text-white font-medium text-sm"
              onClick={onViewStaffClick}
            >
              View staff
            </button>
          </div>
          {/* Filter Button */}
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

      {/* The table  */}
      <div className="mt-6">
        <AccessorDashboardTable
          learnersData={learnersData.learners}
          checkedItems={checkedItems}
          handleCheckboxChange={handleCheckboxChange}
          onViewChange={onViewChange}
        />
      </div>

            {/* The view staff modal  */}
            <InductionStaffModal show={showBKSDStaffModal} onClose={closeBKSDStaffModal}/>
    </div>
  );
}
