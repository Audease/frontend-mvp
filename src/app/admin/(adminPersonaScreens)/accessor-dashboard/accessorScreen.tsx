import AccessorDashboardTable from "./components/AccessorDashboardTable";
import AccessorDashboardHeader from "./components/AccessorDashboardHeader";
import AccessorStaffButton from "./components/AccessorStaffButton";
import { SearchComponent } from "@/app/components/dashboard/SearchBox";
import { useAccessorLearners } from "./utils/useAccessorLearners";
import { useEffect, useState } from "react";
import { accessorLearnerRevalidation } from "@/app/action";
import Pagination from "@/app/components/dashboard/Pagination";
import { MultiFilterButton } from "@/app/components/dashboard/MultiFilterButton";

export default function Accessor({ onViewChange, showHeader }) {
  const { fetchAccessorLearnersData } = useAccessorLearners();
  const [allLearners, setallLearners] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalpages] = useState(1);
  const [totalItems, setTotalItems] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const handleFetchAccessorLearnersData = async (
    application_status,
    submission_status,
    page,
    searchQuery
  ) => {
    setLoading(true);
    const { totalPages, totalItems, allLearners } =
      await fetchAccessorLearnersData(application_status, submission_status, page, searchQuery);
    setTotalpages(totalPages);
    setTotalItems(totalItems);
    setallLearners(allLearners);
    setLoading(false);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    handleFetchAccessorLearnersData("","", currentPage, query);
  };

  useEffect(() => {
    handleFetchAccessorLearnersData("", "", currentPage, "");
    accessorLearnerRevalidation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePageChange = async (page) => {
    setCurrentPage(page);
    handleFetchAccessorLearnersData("","", page, "");
  };

  const handleFilter = (approval_status, submission_status) => {
    setCurrentPage(1);
    handleFetchAccessorLearnersData(approval_status, submission_status, 1, "");
  };

  const handlePageReset = async () => {
    setCurrentPage(1);
    setSearchQuery("");
    handleFetchAccessorLearnersData("", "", 1, "");
  };

  return (
    <div className="">
      {/* Accessor Title and Filter Button */}
      <div className="flex flex-col md:flex-row justify-between items-center space-y-3">
        {showHeader && <AccessorDashboardHeader />}

        <div className="flex flex-col md:flex-row space-x-4 items-center space-y-2 md:space-y-0">
          {/* View Staff Button  */}
          <div className="flex flex-col md:flex-row space-x-4 items-center">
            <h3
              className="py-2 px-3 bg-black text-white text-sm rounded-md"
              onClick={handlePageReset}
            >
              All
            </h3>
            <SearchComponent searchValue={handleSearch} />
          </div>
          {showHeader && <AccessorStaffButton />}
          {showHeader && (
            <div>
              {/* <FilterButton
                options={["Pending", "Approved", "Rejected"]}
                onSelect={handleFilter}
                label={"Filter"}
              /> */}

              <MultiFilterButton
                label="Filter"
                sections={[
                  {
                    key: "approval",
                    title: "Approval Status",
                    label: "All Submissions",
                    options: ["Approved", "Pending", "Rejected"],
                    onSelect: (v) => console.log("submission", v),
                  },
                  {
                    key: "submission",
                    title: "Submission",
                    label: "Submissions Status",
                    options: ["Submitted", "Not Started", "pending"],
                    onSelect: (v) => console.log("submission", v),
                  },
                ]}
                onFilterClick={(selections) =>
                  handleFilter(selections.approval, selections.submission)
                }
              />
            </div>
          )}
        </div>
      </div>

      {/* The table  */}
      <div className="mt-6">
        <AccessorDashboardTable
          onViewChange={onViewChange}
          {...{ allLearners, loading }}
        />
        <div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={10}
            totalItems={totalItems}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
