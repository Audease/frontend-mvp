"use client";

import { useState, useEffect, useMemo } from "react";
import SearchBox from "../../components/dashboard/SearchBox";
import FilterButton from "../../components/dashboard/FilterButton";
import LearnersTable from "../../components/dashboard/LearnersTable";
import CreateButton from "../../components/dashboard/CreateButton";
import AddLearnerModal, { LearnerCreated } from "./learnerModal";

export default function LearnersDefault({ learnersData, showUserDetailsPage }) {
  const [activeTab, setActiveTab] = useState("All");
  const [activeBarStyle, setActiveBarStyle] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);

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

  useEffect(() => {
    const activeIndex = tabs.indexOf(activeTab);
    const tabWidth = 10 / tabs.length;
    setActiveBarStyle({
      width: `${tabWidth}%`,
      transform: `translateX(${activeIndex * 380}%)`,
    });
  }, [activeTab, tabs]);

  const handleSelect = (option) => {
    setSelectedOption(option);
    console.log("Selected option:", option);
  };

  const options = ["Recruiter", "BKSD", "Accessor", "Inductor", "Lazer"];

  const [learnerCreateModalState, setLearnerCreateModalState] = useState(false);
  const [learnerSuccessModal, setLearnerSuccessModal] = useState(false);

  const showLearnerCreateModal = () => {
    setLearnerCreateModalState(true);
  };

  const closeLearnerCreateModal = () => {
    console.log("closed");
    setLearnerCreateModalState(false);
  };

  const onCreateClick = () => {
    setLearnerCreateModalState(false);
    setLearnerSuccessModal(true);
  }

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
                  activeTab === tab ? "text-black" : ""
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </h2>
            ))}
          </div>

          {/* The buttons on the right side */}
          <div className="flex flex-row space-x-4">
            {/* Search Box */}
            {/* <SearchBox /> */}
            <CreateButton label={"Create"} onClick={showLearnerCreateModal} />

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
        <div className="w-full h-[0.10rem] bg-gray-300 my-2">
          <div
            className={`h-[0.10rem] bg-dashboardButtons transition-all duration-300`}
            style={activeBarStyle}
          ></div>
        </div>
      </div>

      {/* The main body, which is the table list */}
      <div>
        <LearnersTable
          learnersData={learnersData}
          showUserDetailsPage={showUserDetailsPage}
        />

        <AddLearnerModal
          show={learnerCreateModalState}
          onClose={closeLearnerCreateModal}
          onCreateClick={onCreateClick}
        />

        <LearnerCreated show={learnerSuccessModal} onClose={closeLearnerSuccessModal}/>
      </div>
    </div>
  );
}
