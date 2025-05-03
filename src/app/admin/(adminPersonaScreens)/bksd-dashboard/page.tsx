"use client";

import { useEffect, useState } from "react";
import BKSDDashboardTable from "./components/BKSDDashboardTable";
import BKSDStaffModal from "./components/bksdStaffModal";
import BKSDDashboardHeader from "./components/BKSDDashboardHeader";
import StaffButton from "./components/StaffButton";
import SendBtn from "./components/SendBtn";
import { SendEmail } from "./utils/action";
import { bksdLearnerRevalidation } from "@/app/action";
import { useBKSDLearners } from "./utils/useBKSDLearners";
import { SearchComponent } from "@/app/components/dashboard/SearchBox";
import FilterButton from "@/app/components/dashboard/FilterButton";
import Pagination from "@/app/components/dashboard/Pagination";

export default function AdminBKSDDashboard({
  showHeader = true,
  showStaffButton = true,
}) {
  // State management
  const [roleName, setRoleName] = useState("BKSB");
  const [showBKSDStaffModal, setShowBKSDStaffModal] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [checkedIds, setCheckedIds] = useState([]);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [successfulEmail, setSuccessfulEmail] = useState(0);
  const [failedEmail, setFailedEmail] = useState(0);
  const [showFailureToast, setShowFailureToast] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});
  const [key, setKey] = useState(0);

  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(1);
  const [allLearners, setAllLearners] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const { fetchBKSDLearnersData } = useBKSDLearners();

  const isDisabled = checkedIds.length === 0;

  // Functions for handling modal
  const onViewStaffClick = () => {
    setShowBKSDStaffModal(true);
  };

  const closeBKSDStaffModal = () => {
    setShowBKSDStaffModal(false);
  };

  // Process email sending results
  const processEmailResults = async (successCount, failCount) => {
    // Update counters
    setSuccessfulEmail(successCount);
    setFailedEmail(failCount);
    
    // Show appropriate toast
    if (successCount > 0) {
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 5000);
    }
    
    if (failCount > 0) {
      setShowFailureToast(true);
      setTimeout(() => setShowFailureToast(false), 5000);
    }
    
    // Refresh data
    
    await handleFetchLearnersData(currentPage, "", "");
    await bksdLearnerRevalidation();
    setCheckedItems({});
    setCheckedIds([]);
  };

  // Function for sending application to multiple rows
  const sendBulkApplications = async () => {
    if (checkedIds.length === 0) return;
    
    setLoading2(true);
    let successCount = 0;
    let failCount = 0;
    
    try {
      // Process each checked ID
      for (const id of checkedIds) {
        try {
          const success = await SendEmail(id);
          if (success) {
            successCount++;
            handleFetchLearnersData(currentPage, "", "");
            await bksdLearnerRevalidation();
          } else {
            failCount++;
          }
        } catch (error) {
          console.error(`Error sending email for ID ${id}:`, error);
          failCount++;
        }
      }
      
      processEmailResults(successCount, failCount);
    } catch (error) {
      console.error("General error in sendBulkApplications:", error);
      setShowFailureToast(true);
      setTimeout(() => setShowFailureToast(false), 5000);
    } finally {
      setLoading2(false);
    }
  };

  // Function for sending application to a single row
  const handleSingleRowEmail = async (rowId) => {
    if (!rowId) return;
    
    setLoading2(true);
    let successCount = 0;
    let failCount = 0;
    
    try {
      const success = await SendEmail(rowId);
      if (success) {
        successCount = 1;
        handleFetchLearnersData(currentPage, "", "");
        await bksdLearnerRevalidation();
      } else {
        failCount = 1;
      }
      
      processEmailResults(successCount, failCount);
    } catch (error) {
      console.error(`Error sending email for ID ${rowId}:`, error);
      setShowFailureToast(true);
      setTimeout(() => setShowFailureToast(false), 5000);
      setFailedEmail(1);
      setSuccessfulEmail(0);
    } finally {
      setLoading2(false);
    }
  };

  // Function to handle checkbox changes
  const handleCheckboxChange = (id) => {
    setCheckedItems((prev) => {
      const updatedItems = { ...prev, [id]: !prev[id] };
      
      // Get IDs of checked items
      const updatedIds = Object.keys(updatedItems)
        .filter(key => updatedItems[key])
        .map(key => {
          // Convert back to number if it was a number
          return isNaN(Number(key)) ? key : Number(key);
        });
      
      setCheckedIds(updatedIds);
      return updatedItems;
    });
  };

  // Function to fetch learner data
  const handleFetchLearnersData = async (
    page,
    searchquery,
    application_mail_status
  ) => {
    setLoading(true);
    try {
      const { totalPages, totalItems, allLearners } = await fetchBKSDLearnersData(
        page,
        searchquery,
        application_mail_status
      );
      setTotalPages(totalPages);
      setTotalItems(totalItems);
      setAllLearners(allLearners);
    } catch (error) {
      console.error("Error fetching learner data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    handleFetchLearnersData(1, query, "");
    setCurrentPage(1);
  };

  const handleFilter = (filter) => {
    setCurrentPage(1);
    handleFetchLearnersData(1, "", filter);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    handleFetchLearnersData(page, "", "");
  };

  const handlePageReset = () => {
    setCurrentPage(1);
    handleFetchLearnersData(1, "", "");
  };

  useEffect(() => {
    handleFetchLearnersData(currentPage, "", "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {/* Header Section */}
      <div className="flex flex-col xl:flex-row justify-between items-center">
        {showHeader && <BKSDDashboardHeader {...{ roleName }} />}

        {/* Button Section */}
        <div className="flex flex-col md:flex-row space-x-4 space-y-4 md:space-y-0 my-3 xl:my-0 items-center">
          <h3 className="py-2 px-3 bg-black text-white text-sm rounded-md" onClick={handlePageReset}>All</h3>
          <div>
            <SearchComponent searchValue={handleSearch} />
          </div>

          <SendBtn onSendClick={sendBulkApplications} disabled={isDisabled} />
          {showStaffButton && <StaffButton {...{ onViewStaffClick }} />}
          <div className="hidden xl:flex ">
            {showStaffButton && (
              <FilterButton
                options={["Sent", "Not sent"]}
                onSelect={handleFilter}
                label={"Filter"}
              />
            )}
          </div>
        </div>
      </div>

      {/* Dashboard Table Section */}
      <div className="mt-6">
        <BKSDDashboardTable
          {...{
            key: key,
            handleSingleRowEmail,
            successfulEmail,
            failedEmail,
            loading2,
            showSuccessToast,
            showFailureToast,
            checkedItems,
            handleCheckboxChange,
            loading,
            allLearners,
          }}
        />
        <div className="mt-7">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={10}
            totalItems={totalItems}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      {/* Staff Modal Section */}
      <BKSDStaffModal show={showBKSDStaffModal} onClose={closeBKSDStaffModal} />
    </div>
  );
}