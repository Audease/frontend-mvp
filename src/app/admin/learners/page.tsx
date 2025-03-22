"use client";

import { useEffect, useState, useMemo } from "react";
import { learnerRevalidation } from "@/app/action";
import CreateLearner from "./components/CreateLearner";
import LearnersTable from "./components/LearnersTable";
import { SearchComponent } from "@/app/components/dashboard/SearchBox";
import FilterLearner from "../(adminPersonaScreens)/recruiter-dashboard/components/Filter";
import { useLearnerByRecruiter } from "../(adminPersonaScreens)/recruiter-dashboard/utils/useLearnerByRecruiter";

export default function Learners() {
  const [activeTab, setActiveTab] = useState("All");
  const [tableKey, setTableKey] = useState(1);
  const tabs = useMemo(() => ["All", "Recent", "Archive"], []);

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

  const handleLearnerCreated = async () => {
    await learnerRevalidation();
    handleFetchLearnersData(currentPage, 10, "", "", "");
    setTableKey((prev) => prev + 1);
  };

  useEffect(() => {
    handleFetchLearnersData(currentPage, 10, "", "", "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [searchQuery, setSearchQuery] = useState("");

  const searchValue = (searchValue: string) => {
    setSearchQuery(searchValue);
    handleFetchLearnersData(1, 10, "", "", searchValue);
  };

  const onFilterClick = (funding, course) => {
    handleFetchLearnersData(1, 10, funding, course, "");
  };

  const onTabClick = (tab: string) => {
    setActiveTab(tab);

    if (tab === "All") {
      handleFetchLearnersData(1, 10, "", "", "");
    }
  };

  return (
    <div className="font-inter">
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
                  onClick={() => onTabClick(tab)}
                >
                  {tab}
                </h2>
              ))}
            </div>

            {/* The buttons on the right side */}
            <div className="hidden xl:flex flex-row space-x-4 items-center">
              <SearchComponent searchValue={searchValue} />

              <CreateLearner onLearnerCreated={handleLearnerCreated} />

              {/* Filter Button */}
              <FilterLearner onFilterClick={onFilterClick} />
            </div>
          </div>

          {/* The active bar color change */}
          <div className="w-full h-[0.10rem] bg-gray-300 my-2"></div>
        </div>

        {/* The main body, which is the table list */}
        <div className="w-full overflow-x-auto">
          <LearnersTable
            key={tableKey}
            {...{
              allLearners,
              currentPage,
              totalPages,
              totalItems,
              loading,
              handlePageChange,
            }}
          />
        </div>
      </div>
    </div>
  );
}
