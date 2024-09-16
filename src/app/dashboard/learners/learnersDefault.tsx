"use client";

import { useState, useMemo } from "react";
import FilterButton from "../../components/dashboard/FilterButton";

import CreateButton from "../../components/dashboard/CreateButton";
import AddLearnerModal, { LearnerCreated } from "./learnerModal";
import LearnersTable from "./LearnersTable";
import { usePostLearners } from "./hooks/usePostLearners";

export default function LearnersDefault({ learnersData, showUserDetailsPage }) {
  const [activeTab, setActiveTab] = useState("All");
  const [selectedOption, setSelectedOption] = useState(null);
  const [learnerCreateModalState, setLearnerCreateModalState] = useState(false)
  const [learnerSuccessModal, setLearnerSuccessModal] = useState(false)

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

  const closeLearnerCreateModal = () => {
    setLearnerCreateModalState(false);
  };

  const closeLearnerSuccessModal = () => {
    setLearnerSuccessModal(false);
  };

  return (
    <div className="flex flex-col space-y-4">
      <div>
        <h3 className="font-medium text-2xl">Learners</h3>
      </div>
      {/* Selection and active bar */}
      <div className="flex flex-col mt-3">
        <div className="flex flex-row justify-between font-medium text-sm text-tgrey3">
          <div className="flex flex-row space-x-6 w-auto">
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
          <div className="flex flex-row space-x-4">
            <CreateButton
              label={"Create"}
              onClick={() => setLearnerCreateModalState(true)}
            />

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
      <div>
        <LearnersTable
          learnersData={learnersData}
          showUserDetailsPage={showUserDetailsPage}
        />

        {learnerCreateModalState && (
          <AddLearnerModal
            {...{setLearnerSuccessModal}}
            show={learnerCreateModalState}
            onClose={closeLearnerCreateModal}
          />
        )}

        {learnerSuccessModal && (
          <LearnerCreated
          show={learnerSuccessModal}
          onClose={closeLearnerSuccessModal}
        />
        )}

        
      </div>
    </div>
  );
}
