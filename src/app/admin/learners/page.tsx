"use client";

import { useEffect, useState, useMemo } from "react";
import {
  archivedLearnersRevalidation,
  learnerRevalidation,
} from "@/app/action";
import CreateLearner from "./components/CreateLearner";
import LearnersTable from "./components/LearnersTable";
import { SearchComponent } from "@/app/components/dashboard/SearchBox";
import FilterLearner from "../(adminPersonaScreens)/recruiter-dashboard/components/Filter";
import { useLearnerByRecruiter } from "../(adminPersonaScreens)/recruiter-dashboard/utils/useLearnerByRecruiter";
import { useArchiveLearners } from "./hooks/useArchiveLearners";
import { LoadingSpinner2 } from "@/app/components/dashboard/Spinner";
import ArchivedLearnersTable from "./components/ArchivedLearnersTable";

export default function Learners() {
  const [activeTab, setActiveTab] = useState("Active");
  const [tableKey, setTableKey] = useState(1);
  const tabs = useMemo(() => ["Active", "Recent", "Archive"], []);

  const {
    allLearners,
    currentPage,
    totalPages,
    totalItems,
    loading,
    handlePageChange,
    handleFetchLearnersData,
  } = useLearnerByRecruiter();

  const {
    archiveLoading,
    archiveLearner,
    handleUnArchiveLearner,
    getArchivedLearners,
    totalArchivedPages,
    totalArchivedItems,
    archivedLearners,
  } = useArchiveLearners();

  const handleLearnerCreated = async () => {
    await learnerRevalidation();
    handleFetchLearnersData(currentPage, 10, "", "", "");
    setTableKey((prev) => prev + 1);
  };

  useEffect(() => {
    getArchivedLearners(1, 10, "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [searchQuery, setSearchQuery] = useState("");

  const searchValue = (searchValue: string) => {
    setSearchQuery(searchValue);
    if (renderTable === "learnerTable") {
      handleFetchLearnersData(1, 10, "", "", searchValue);
    } else if (renderTable === "archivedTable") {
      getArchivedLearners(1, 10, searchValue);
    } else {
      handleFetchLearnersData(1, 10, "", "", searchValue);
    }
  };

  const onFilterClick = (funding, course) => {
    handleFetchLearnersData(1, 10, funding, course, "");
  };

  const onTabClick = (tab: string) => {
    setActiveTab(tab);

    if (tab === "Active") {
      setRenderTable("learnerTable");
      handleFetchLearnersData(1, 10, "", "", "");
      setTableKey((prev) => prev + 1);
    }

    if (tab === "Archive") {
      archivedLearnersRevalidation();
      setTableKey((prev) => prev + 1);
      setRenderTable("archivedTable");
    }
  };

  const handleArchiveLearner = async (learnerId: string) => {
    await archiveLearner(learnerId);
    await handleFetchLearnersData(currentPage, 10, "", "", "");
    await getArchivedLearners(1, 10, "");
    await learnerRevalidation();
    await archivedLearnersRevalidation();
    setTableKey((prev) => prev + 1);
  };

  const [renderTable, setRenderTable] = useState("learnersTable");

  const renderLearnerTable = () => {
    switch (renderTable) {
      case "learnersTable":
        return (
          <LearnersTable
            key={tableKey}
            {...{
              handleArchiveLearner,
              allLearners,
              currentPage,
              totalPages,
              totalItems,
              loading,
              handlePageChange,
            }}
          />
        );
      case "archivedTable":
        return (
          <ArchivedLearnersTable
            key={tableKey}
            handleUnArchiveLearner={handleUnArchiveLearner}
            allLearners={archivedLearners}
            currentPage={currentPage}
            totalPages={totalArchivedPages}
            totalItems={totalArchivedItems}
            loading={archiveLoading}
            handlePageChange={handlePageChange}
          />
        );
      default:
        return (
          <LearnersTable
            key={tableKey}
            {...{
              handleArchiveLearner,
              allLearners,
              currentPage,
              totalPages,
              totalItems,
              loading,
              handlePageChange,
            }}
          />
        );
    }
  };

  const handlePageReset = () => {
    if (activeTab === "Active") {
      setRenderTable("learnerTable");
      handleFetchLearnersData(1, 10, "", "", "");
      setTableKey((prev) => prev + 1);
    }

    if (activeTab === "Archive") {
      getArchivedLearners(1, 10, "");
      archivedLearnersRevalidation();
      setTableKey((prev) => prev + 1);
      setRenderTable("archivedTable");
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
              <div className="flex flex-row items-center space-x-2">
                <h3
                  className="py-2 px-3 bg-black text-white text-sm rounded-md"
                  onClick={handlePageReset}
                >
                  All
                </h3>
                <SearchComponent searchValue={searchValue} />
              </div>

              <CreateLearner onLearnerCreated={handleLearnerCreated} />

              {/* Filter Button */}
              <FilterLearner onFilterClick={onFilterClick} />
            </div>
          </div>

          {/* The active bar color change */}
          <div className="w-full h-[0.10rem] bg-gray-300 my-2"></div>
        </div>

        {/* The main body, which is the table list */}
        <div className="w-full overflow-x-auto relative">
          {archiveLoading && (
            <div className="flex justify-center items-center absolute inset-0 z-0 bg-white/50 backdrop-blur-sm">
              <LoadingSpinner2 />
            </div>
          )}
          {renderLearnerTable()}
        </div>
      </div>
    </div>
  );
}
