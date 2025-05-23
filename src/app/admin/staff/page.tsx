"use client";
import { useState, useMemo, useEffect } from "react";
import { GetStaffDataProps, useStaff } from "./hooks/useStaff";
import SearchBox, {
  SearchComponent,
} from "../../components/dashboard/SearchBox";
import StaffTable from "./StaffTable";
import Pagination from "../../components/dashboard/Pagination";
import { staffRevalidation } from "../../action";
import LoadingSpinner, {
  LoadingSpinner2,
} from "../../components/dashboard/Spinner";
import SuccessToast, { FailureToast } from "@/app/components/NotificationToast";
import AddStaffScreen from "../roles/components/Staff";
import FilterButton from "@/app/components/dashboard/FilterButton";

type CheckedItems = {
  [key: number]: any;
};

export default function Staff() {
  const [activeTab, setActiveTab] = useState("All");
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [staffData, setStaffData] = useState([]);
  const [checkedItems, setCheckedItems] = useState<CheckedItems>({});
  const [selectedRole, setSelectedRole] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalpages] = useState(1);
  const [totalItems, setTotalItems] = useState(1);
  const [successToast, setSuccessToast] = useState(false);
  const [errorToast, setErrorToast] = useState(false);

  const { assignStaffRole, fetchStaffData } = useStaff();

  const tabs = useMemo(() => ["All", /* "Recent", "Deleted" **/], []);

  const handleRoleSelect = (index, role) => {
    setSelectedRole((prev) => ({
      ...prev,
      [index]: role,
    }));
  };

  const handleAssignRole = async () => {
    try {
      setLoading(true);

      // Assign staff role
      const newStaffData = await assignStaffRole(checkedItems, selectedRole);
      
      // Revalidate and fetch updated staff data
      staffRevalidation();
      handleFetchStaffData({page: currentPage});

      // Reset checked items
      setCheckedItems({});
      setSuccessToast(true);

      // Auto-hide success toast after 5 seconds
      setTimeout(() => setSuccessToast(false), 5000);
    } catch (error) {
      console.error("Error assigning role:", error);
      setErrorToast(true);
      setTimeout(() => setErrorToast(false), 5000);
    } finally {
      setLoading(false);
    }
  };

  const handleFetchStaffData = async ({page, search, status}: GetStaffDataProps) => {
    setLoading2(true);
    const { totalPages, totalItems, result } = await fetchStaffData({page, search, status});
    setTotalpages(totalPages);
    setTotalItems(totalItems);
    setStaffData(result);
    setLoading2(false);
  };

  const handlePageChange = async (page) => {
    setCurrentPage(page);
    await handleFetchStaffData({page});
    setCheckedItems({});
  };

  // Function to handle filter selection
  const handleFilter = async (status) => {
    handleFetchStaffData( {page: 1, search:"", status});
  };

  // Function to handle search input
  const handleSearch = async (search) => {
    handleFetchStaffData( {page: 1, search, status: ""});
  };

  // Function to reset the page to the first page
  const handlePageReset = async () => {
    setCurrentPage(1);
    setCheckedItems({});
    await handleFetchStaffData({page: 1});
  };

  useEffect(() => {
    handleFetchStaffData({page: currentPage});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [activeComponent, setActiveComponent] = useState("StaffTable");

  const renderComponent = () => {
    switch (activeComponent) {
      case "AddStaff":
        return (
          <AddStaffScreen
            onClick={() => {
              handleFetchStaffData({page: currentPage});
              setActiveComponent("StaffTable");
            }}
          />
        );
      default:
        return (
          <>
            <div className="min-h-[22rem]">
              <StaffTable
                {...{
                  staffData,
                  setStaffData,
                  currentPage,
                  setCurrentPage,
                  checkedItems,
                  setCheckedItems,
                  loading2,
                }}
                onRoleSelect={handleRoleSelect}
              />
            </div>

            <div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                itemsPerPage={10}
                totalItems={totalItems}
                onPageChange={handlePageChange}
              />
            </div>
          </>
        );
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <div>
        <h3 className="font-medium text-2xl">Staff</h3>
      </div>

      {/* Selection and active bar */}
      <div className="flex flex-col mt-3">
        <div className="flex flex-col xl:flex-row justify-between font-medium text-sm text-tgrey3">
          <div className="flex flex-row space-x-6 items-center">
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
          <div className="flex flex-col xl:flex-row xl:space-x-4 space-y-4 xl:space-y-0 my-3 xl:my-0 items-center">
            <div className="z-0 flex flex-row space-x-2 items-center">
            <h3
              className="py-2 px-3 bg-black text-white text-sm rounded-md"
              onClick={handlePageReset}
            >
              All
            </h3>
              <SearchComponent searchValue={handleSearch} />
            </div>
            <div>
              <button
                className="bg-dashboardButtons text-white py-2 px-4 rounded focus:outline-none"
                onClick={() => setActiveComponent("AddStaff")}
              >
                Add Staff
              </button>
            </div>
            <div>
              <button
                className={
                  Object.keys(checkedItems).length === 0
                    ? "bg-gray-300 text-gray-500 py-2 px-4 rounded"
                    : "bg-dashboardRolesBtn text-white py-2 px-4 rounded focus:outline-none"
                }
                onClick={() => handleAssignRole()}
                disabled={Object.keys(checkedItems).length === 0}
              >
                Assign a role
              </button>
            </div>
            <FilterButton
              options={["assigned", "unassigned"]}
              onSelect={handleFilter}
              label={"Filter"}
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
        <div className="flex justify-center">
          {loading && <LoadingSpinner2 />}
          <div className="fixed z-50 items-center animate-bounce">
            {successToast && (
              <SuccessToast text={"Role assigned successfully"} />
            )}
            {errorToast && <FailureToast text={"Failed to assign role"} />}
          </div>
        </div>
        <div>{renderComponent()}</div>
      </div>
    </div>
  );
}
