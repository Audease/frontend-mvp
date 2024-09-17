import { useState } from "react";
import { BKSDFilterButton } from "../../components/dashboard/FilterButton";
import AccessorDashboardTable from "../../components/dashboard/AccessorDashboardTable";
import learnersData from "../../data/learnersData.json";

export default function Accessor({ onViewChange }) {
  const [AccessorName, setAccessorName] = useState("Accessor");
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

  return (
    <div className="h-screen overflow-y-auto">
      {/* Accessor Title and Filter Button */}
      <div className="flex flex-row justify-between">
        <h3 className="font-medium text-2xl">{AccessorName} Dashboard</h3>
        {/* Filter Button */}
        <BKSDFilterButton
          label={"Filters"}
          options={filterOptions}
          onSelect={handleFilterSelect}
          categoriesDropdownOptions={categoriesDropdownOptions}
          onCategorySelect={handleCategorySelect}
          onFilterClick={onFilterClick}
        />
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
    </div>
  );
}
