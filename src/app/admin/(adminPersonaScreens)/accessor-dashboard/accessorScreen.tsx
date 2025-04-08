import AccessorDashboardTable from "./components/AccessorDashboardTable";
import AccessorDashboardHeader from "./components/AccessorDashboardHeader";
import AccessorStaffButton from "./components/AccessorStaffButton";
import AccessorFilterButton from "./components/AccessorFilterButton";
import { SearchComponent } from "@/app/components/dashboard/SearchBox";
import { useAccessorLearners } from "./utils/useAccessorLearners";
import { useEffect, useState } from "react";
import { accessorLearnerRevalidation } from "@/app/action";
import Pagination from "@/app/components/dashboard/Pagination";

export default function Accessor({ onViewChange, showHeader }) {
  

  const { fetchAccessorLearnersData } = useAccessorLearners();
  const [allLearners, setallLearners] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalpages] = useState(1);
  const [totalItems, setTotalItems] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");


  const handleFetchAccessorLearnersData = async (page, searchQuery) => {
    setLoading(true);
    const { totalPages, totalItems, allLearners } =
      await fetchAccessorLearnersData(page, searchQuery);
    setTotalpages(totalPages);
    setTotalItems(totalItems);
    setallLearners(allLearners);
    setLoading(false);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    handleFetchAccessorLearnersData(currentPage, query);
  };

  useEffect(() => {
    handleFetchAccessorLearnersData(currentPage, "");
    accessorLearnerRevalidation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePageChange = async (page) => {
    setCurrentPage(page);
    handleFetchAccessorLearnersData(page, "");
  };

  const handlePageReset = async () => {
    setCurrentPage(1);
    setSearchQuery("");
    handleFetchAccessorLearnersData(1, "");
  };

  return (
    <div className="">
      {/* Accessor Title and Filter Button */}
      <div className="flex flex-col md:flex-row justify-between items-center space-y-3">
        {showHeader && <AccessorDashboardHeader />}

        <div className="flex flex-col md:flex-row space-x-4 items-center space-y-2 md:space-y-0">
          {/* View Staff Button  */}
          <div className="flex flex-col md:flex-row space-x-4 items-center">
            <h3 className="py-2 px-3 bg-black text-white text-sm rounded-md" onClick= {handlePageReset}>All</h3>
            <SearchComponent searchValue={handleSearch} />
          </div>
          {showHeader && <AccessorStaffButton />}
          {showHeader && <AccessorFilterButton />}
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
