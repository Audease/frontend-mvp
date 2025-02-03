"use client";

import { useEffect, useState, useMemo } from "react";
import FilterButton from "@/app/components/dashboard/FilterButton";
import { useLearners } from "./hooks/useLearners";
import { learnerRevalidation } from "@/app/action";
import { useRouter } from "next/navigation";
import CreateLearner from "./components/CreateLearner";
import LearnersTable from "./components/LearnersTable";

export default function Learners() {
  const [allLearners, setAllLearners] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(1);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");
  const [selectedOption, setSelectedOption] = useState(null);
  const [tableKey, setTableKey] = useState(1);

  const route = useRouter();
  const { fetchLearnersData } = useLearners();

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

  const handleFetchLearnersData = async (page) => {
    setLoading(true);
    const { totalPages, totalItems, allLearners } = await fetchLearnersData(
      page
    );
    setTotalPages(totalPages);
    setTotalItems(totalItems);
    setAllLearners(allLearners);
    setLoading(false);
  };

  const handlePageChange = async (page) => {
    setCurrentPage(page);
    handleFetchLearnersData(page);
  };

  const handleSelect = (option) => {
    setSelectedOption(option);
    console.log("Selected option:", option);
  };

  const handleLearnerCreated = async () => {
    await learnerRevalidation();
    handleFetchLearnersData(1);
  };

  useEffect(() => {
    handleFetchLearnersData(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                options={["Recruiter", "BKSD", "Accessor", "Inductor", "Lazer"]}
                onSelect={handleSelect}
                label="Filter"
              />
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
