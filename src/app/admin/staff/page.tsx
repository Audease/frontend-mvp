"use client";
import { useState, useMemo, useEffect } from "react";
import { useStaff } from "./hooks/useStaff";
import SearchBox from "../../components/dashboard/SearchBox";
import FilterButton from "../../components/dashboard/FilterButton";
import StaffTable from "./StaffTable";
import Pagination from "../../components/dashboard/Pagination";
import { staffRevalidation } from "../../action";
import LoadingSpinner, { LoadingSpinner2 } from "../../components/dashboard/Spinner";

type CheckedItems = {
  [key: number]: any;
};

export default function Staff() {
  const [activeTab, setActiveTab] = useState("All");
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [staffData, setStaffData] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [checkedItems, setCheckedItems] = useState<CheckedItems>({});
  const [selectedRole, setSelectedRole] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalpages] = useState(1);
  const [totalItems, setTotalItems] = useState(1);

  const { assignStaffRole, fetchStaffData } = useStaff();

  const tabs = useMemo(() => ["All", "Recent", "Deleted"], []);

  const handleRoleSelect = (index, role) => {
    setSelectedRole((prev) => ({
      ...prev,
      [index]: role,
    }));
  };

  const handleAssignRole = async () => {
    setLoading(true);
    const newStaffData = await assignStaffRole(checkedItems, selectedRole);
    staffRevalidation();
    handleFetchStaffData(1);
    setCheckedItems({});
    setLoading(false);
  };

  const handleFetchStaffData = async (page) => {
    const { totalPages, totalItems, result } = await fetchStaffData(page);
    setTotalpages(totalPages);
    setTotalItems(totalItems);
    setStaffData(result);
  };

  const handlePageChange = async (page) => {
    setLoading(true);
    setCurrentPage(page);
    await handleFetchStaffData(page);
    setCheckedItems({});
    setLoading(false);
  };

  useEffect(() => {
    handleFetchStaffData(currentPage);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col space-y-4">
      <div>
        <h3 className="font-medium text-2xl">Staff</h3>
      </div>

      {/* Selection and active bar */}
      <div className="flex flex-col mt-3">
        <div className="flex flex-col xl:flex-row justify-between font-medium text-sm text-tgrey3">
          <div className="flex flex-row space-x-6">
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
          <div className="flex flex-col xl:flex-row xl:space-x-4 space-y-4 xl:space-y-0 my-3 xl:my-0">
            <div className="z-0">
              <SearchBox />
            </div>
            <div>
              <button
                className="bg-dashboardRolesBtn text-white py-2 px-4 rounded focus:outline-none"
                onClick={() => handleAssignRole()}
              >
                Assign a role
              </button>
            </div>
            <FilterButton
              options={dropdownOptions}
              onSelect={() => {}}
              label="Filter"
            />
          </div>
        </div>
      </div>

      {/* The active bar color change */}
      <div className="w-full h-[0.10rem] bg-gray-300 my-2">
        <div className="h-[0.10rem]"></div>
      </div>

      {/* The main body, which is the table list */}
      <div className="w-full overflow-x-auto">
        <div className="flex justify-center">{loading && <LoadingSpinner2 />}</div>
        <StaffTable
          {...{
            staffData,
            setStaffData,
            currentPage,
            setCurrentPage,
            checkedItems,
            setCheckedItems,
          }}
          onRoleSelect={handleRoleSelect}
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
