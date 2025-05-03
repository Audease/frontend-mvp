"use client";

import { useEffect, useState } from "react";
import CertificateDashboardTable from "./components/CertificateDashboardTable";
import CertificateDashboardHeader from "./components/CertificateDashboardHeader";
import StaffButton from "./components/StaffButton";
import SendBtn from "./components/SendBtn";
import { certificateApproveLearner } from "./utils/action";
import { certificateLearnerRevalidation } from "@/app/action";
import { useCertificateLearners } from "./utils/useCertificateLearners";
import CertificateStaffModal from "./components/CertificateStaffModal";
import { SearchComponent } from "@/app/components/dashboard/SearchBox";
import FilterButton from "@/app/components/dashboard/FilterButton";

export default function AdminCertificateDashboard({
  showHeader = true,
  showStaffButton = true,
}) {
  // State management
  const [roleName, setRoleName] = useState("Certificate");
  const [showInductionStaffModal, setShowInductionStaffModal] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [checkedIds, setCheckedIds] = useState([]);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [successfulEmail, setSuccessfulEmail] = useState<number>();
  const [failedEmail, setFailedEmail] = useState<number>();
  const [showFailureToast, setShowFailureToast] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(1);
  const [allLearners, setAllLearners] = useState([]);
  const [key, setKey] = useState(0);

  const { fetchCertificateLearnersData } = useCertificateLearners();

  const isDisabled = checkedIds.length <= 1;

  // Functions for handling modal
  const onViewStaffClick = () => {
    setShowInductionStaffModal(true);
  };

  const closeInductionStaffModal = () => {
    setShowInductionStaffModal(false);
  };

  // Function to fetch learner data
  const handleFetchLearnersData = async (page: number, searchValue: string, certificateStatus: string) => {
    setLoading(true);
    const { totalPages, totalItems, allLearners } =
      await fetchCertificateLearnersData(page,searchValue,certificateStatus);
    setTotalPages(totalPages);
    setTotalItems(totalItems);
    setAllLearners(allLearners);
    setLoading(false);
  };

  useEffect(
    () => {
      handleFetchLearnersData(1,"", "");
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // Function for sending bulk applications
  const approveCertificate = async () => {
    setLoading2(true);
    const results = await Promise.all(
      checkedIds.map(async (id) => {
        try {
          const success = await certificateApproveLearner(id);
          return { id, success };
        } catch (error) {
          return { id, success: false, error };
        }
      })
    );

    const successfulIds = results
      .filter((result) => result.success)
      .map((result) => result.id);
    const failedIds = results
      .filter((result) => !result.success)
      .map((result) => result.id);

    certificateLearnerRevalidation();
    handleFetchLearnersData(1,"", "");
    setCheckedItems({});
    setKey((prev) => prev + 1);
    setCheckedIds([]);
    setLoading(false);
    setLoading2(false);

    if (successfulIds.length > failedIds.length) {
      setSuccessfulEmail(successfulIds.length);
      setFailedEmail(failedIds.length);
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 5000);
    } else {
      setSuccessfulEmail(successfulIds.length);
      setFailedEmail(failedIds.length);
      setShowFailureToast(true);
      setTimeout(() => setShowFailureToast(false), 5000);
    }

    setLoading2(false);

    return { successfulIds, failedIds };
  };

  // Function to handle single row certification
  const handleSingleRowCertify = async (id) => {
    setLoading2(true);
    try {
      const success = await certificateApproveLearner(id);
      if (success) {
        setSuccessfulEmail(1);
        setFailedEmail(0);
        setShowSuccessToast(true);
        setTimeout(() => setShowSuccessToast(false), 5000);
      } else {
        setFailedEmail(1);
        setShowFailureToast(true);
        setTimeout(() => setShowFailureToast(false), 5000);
      }
      handleFetchLearnersData(1, "", "");
      await certificateLearnerRevalidation();
      setKey((prev) => prev + 1);
    } catch (error) {
      setFailedEmail(1);
      setShowFailureToast(true);
      setTimeout(() => setShowFailureToast(false), 5000);
    } finally {
      setLoading2(false);
    }
  };

  // Function to handle checkbox changes
  const handleCheckboxChange = (id) => {
    setCheckedItems((prev) => {
      const updatedItems = { ...prev, [id]: !prev[id] };
      const updatedIds = Object.keys(updatedItems).filter(
        (key) => updatedItems[key]
      );
      setCheckedIds(updatedIds);
      return updatedItems;
    });
  };

  // Function to handle search input
  const handleSearch = (searchValue: string) => {
    handleFetchLearnersData(1, searchValue, "");
  };

  // Function to reset the page
  const handlePageReset = () => {
    handleFetchLearnersData(1, "", "");
  };

  // Function to handle filter selection
  const handleFilter = (selectedOption) => {
    handleFetchLearnersData(1,"", selectedOption);
  }

  return (
    <div>
      {/* Header Section */}
      <div className="flex flex-col xl:flex-row justify-between items-center">
        {showHeader && <CertificateDashboardHeader {...{ roleName }} />}
        {/* Button Section */}
        <div className="flex flex-col md:flex-row space-x-4 space-y-2 md:space-y-0 my-3 xl:my-0 items-center">
          <div className="flex flex-col md:flex-row space-x-4 space-y-2 md:space-y-0 my-3 xl:my-0 items-center">
            <h3
              className="py-2 px-3 bg-black text-white text-sm rounded-md"
              onClick={handlePageReset}
            >
              All
            </h3>
            <SearchComponent searchValue={handleSearch} />
          </div>
          <SendBtn onSendClick={approveCertificate} disabled={isDisabled} />
          {showStaffButton && <StaffButton {...{ onViewStaffClick }} />}
          <div className="hidden xl:flex">
            {showStaffButton && (
              <FilterButton
                options={["Approved", "Pending"]}
                onSelect={handleFilter}
                label={"Filter"}
              />
            )}
          </div>
        </div>
      </div>

      {/* Dashboard Table Section */}
      <div className="mt-6">
        <CertificateDashboardTable
          key={key}
          {...{
            handleSingleRowCertify,
            successfulEmail,
            failedEmail,
            loading2,
            showSuccessToast,
            showFailureToast,
            checkedItems,
            handleCheckboxChange,
            handleFetchLearnersData,
            loading,
            allLearners,
            totalPages,
            totalItems,
          }}
        />
      </div>

      {/* Staff Modal Section */}
      <CertificateStaffModal
        show={showInductionStaffModal}
        onClose={closeInductionStaffModal}
      />
    </div>
  );
}
