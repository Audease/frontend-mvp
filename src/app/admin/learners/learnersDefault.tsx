"use client";

import { useState, useMemo } from "react";
import FilterButton from "../../components/dashboard/FilterButton";
import LearnersTable from "./LearnersTable";
import CreateLearner from "./components/CreateLearner";
import { learnerRevalidation } from "../../action";

export default function LearnersDefault({ showUserDetailsPage }) {
  const [activeTab, setActiveTab] = useState("All");
  const [selectedOption, setSelectedOption] = useState(null);
  const [tableKey, setTableKey] = useState(1);

  const tabs = useMemo(
    () => [
      "All",
      "Recent",
      "No funder",
      "Funding one",
      "Funding two",
      "Deleted",
    ],
    []
  );

  const handleSelect = (option) => {
    setSelectedOption(option);
    console.log("Selected option:", option);
  };

  const options = ["Recruiter", "BKSD", "Accessor", "Inductor", "Lazer"];

  const handleLearnerCreated = () => {
    learnerRevalidation(); 
    setTableKey((prev) => prev + 1); 
  };

  return (
    <div className="flex flex-col space-y-4">
      <div>
        <h3 className="font-medium text-2xl">Learners</h3>
      </div>
      {/* Selection and active bar */}
      <div className="flex flex-col mt-3">
        <div className="flex flex-row justify-between font-medium text-sm text-tgrey3">
          <div className="hidden xl:flex flex-row space-x-6 w-auto ">
            {tabs.map((tab) => (
              <h2
                key={tab}
                className={`cursor-pointer pt-4 ${
                  activeTab === tab ? "text-gold1" : ""
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </h2>
            ))}
          </div>

          {/* The buttons on the right side */}
          <div className="hidden xl:flex flex-row space-x-4">
          <CreateLearner onLearnerCreated={handleLearnerCreated} />

            {/* Filter Button */}
            <FilterButton
              options={options}
              onSelect={handleSelect}
              label="Filter"
            />
            {/* {selectedOption && (
              <p className="mt-4">Selected Option: {selectedOption}</p>
            )} */}
          </div>
        </div>

        {/* The active bar color change */}
        <div className="w-full h-[0.10rem] bg-gray-300 my-2"></div>
      </div>

      {/* The main body, which is the table list */}
      <div className="w-full overflow-x-auto">
        <LearnersTable key={tableKey} showUserDetailsPage={showUserDetailsPage} />
      </div>
    </div>
  );
}
