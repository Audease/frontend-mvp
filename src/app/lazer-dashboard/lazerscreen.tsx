"use client";

import { useState } from "react";
import { BKSDFilterButton } from "../components/dashboard/FilterButton";
import LazerTable from "./lazerTable";
import learnersData from "../data/learnersData.json";

export default function Lazer({onViewChange}) {
  const [LazerName, setLazerName] = useState("Lazer");
  const filterOptions = ["Option 1", "Option 2", "Option 3"];
  const categoriesDropdownOptions = ["Sent", "Not sent"];
  const [checkedItems, setCheckedItems] = useState({});

  const handleFilterSelect = () => {};
  const handleCategorySelect = () => {};

  const handleCheckboxChange = (id) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const onFilterClick = () => {};
  return (
    <div className="">
      <div className="flex flex-row justify-between">
        <h3 className="font-medium text-2xl">{LazerName} Dashboard</h3>
        <BKSDFilterButton
          label={"Filters"}
          options={filterOptions}
          onSelect={handleFilterSelect}
          categoriesDropdownOptions={categoriesDropdownOptions}
          onCategorySelect={handleCategorySelect}
          onFilterClick={onFilterClick}
        />
      </div>
      <div className="mt-8">
        <LazerTable
          learnersData={learnersData.learners}
          checkedItems={checkedItems}
          handleCheckboxChange={handleCheckboxChange}
          onViewChange={onViewChange}
        />
      </div>
    </div>
  );
}
