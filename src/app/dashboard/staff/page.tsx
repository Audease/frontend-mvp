"use client";
import { useState, useMemo, useEffect } from "react";
import { useStaff } from "./hooks/useStaff";
import SearchBox from "../../components/dashboard/SearchBox";
import FilterButton from "../../components/dashboard/FilterButton";
import StaffTable from "./StaffTable";
import Pagination from "../../components/dashboard/Pagination";

type CheckedItems = {
  [key:number]: any
}

export default function Staff() {
  const [activeTab, setActiveTab] = useState("All");
  const [dropdownOptions, setDropdownOptions] = useState([]);

  const [staffData, setStaffData] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [checkedItems, setCheckedItems] = useState<CheckedItems>({});
  const [selectedRole, setSelectedRole] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalpages] = useState(1);
  const [totalItems, setTotalItems] = useState(1);

  const {
    assignStaffRole,
    fetchStaffData
  } = useStaff();

  const tabs = useMemo(() => ["All", "Recent", "Deleted"], []);

  const handleRoleSelect = (index, role) => {
    setSelectedRole((prev) => ({
      ...prev,
      [index]: role,
    }));
  };

  const handleAssignRole = async () => {
    console.log(checkedItems)
    const newStaffData = await assignStaffRole(checkedItems, selectedRole)
    // setStaffData(newStaffData)
  }

  const handleFetchStaffData = async(page) => {
    const { totalPages, totalItems, result } = await fetchStaffData(page)
    setTotalpages(totalPages)
    setTotalItems(totalItems)
    setStaffData(result)
  }

  const handlePageChange = async (page) => {
    setCurrentPage(page)
    handleFetchStaffData(page)
  };

  useEffect(() => {
    handleFetchStaffData(currentPage)
  }, [])
 
  return (
    <div className="flex flex-col space-y-4">
      <div>
        <h3 className="font-medium text-2xl">Staff</h3>
      </div>

      {/* Selection and active bar */}
      <div className="flex flex-col mt-3">
        <div className="flex flex-row justify-between font-medium text-sm text-tgrey3">
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
          <div className="flex flex-row space-x-4">
            <SearchBox />
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
      <div>
        <StaffTable
          {...{staffData, setStaffData, currentPage, setCurrentPage, checkedItems, setCheckedItems}}
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
