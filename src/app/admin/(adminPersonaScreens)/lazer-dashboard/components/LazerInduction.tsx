import React from "react";
import { BKSDFilterButton } from "../../../../components/dashboard/FilterButton";

const FilterLazer = () => {
    const filterOptions = ["Option 1", "Option 2", "Option 3"];
  const categoriesDropdownOptions = ["Sent", "Not sent"];

  const handleFilterSelect = () => {};

  const handleCategorySelect = () => {};

  const onFilterClick = () => {};
  return (
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
  );
};

export default FilterLazer;
