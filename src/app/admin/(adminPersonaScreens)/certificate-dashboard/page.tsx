"use client";

import { useState } from "react";
import CertificateDashboardTable from "./components/CertificateDashboardTable";
import CertificateDashboardHeader from "./components/CertificateDashboardHeader";
import StaffButton from "./components/StaffButton";
import FilterCertificate from "./components/FilterCertificate";
import SendBtn from "./components/SendBtn";
import { SendEmail } from "./utils/action";
import { learnerRevalidation } from "@/app/action";
import { useInductionLearners } from "./utils/useInductionLearners";
import CertificateStaffModal from "./components/CertificateStaffModal";

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

  const { fetchInductionLearnersData } = useInductionLearners();

  const isDisabled = checkedIds.length <= 1;

  // Functions for handling modal
  const onViewStaffClick = () => {
    setShowInductionStaffModal(true);
  };

  const closeInductionStaffModal = () => {
    setShowInductionStaffModal(false);
  };

  // Function for sending applications
  const sendApplication = async () => {
    setLoading2(true);
    const results = await Promise.all(
      checkedIds.map(async (id) => {
        try {
          const success = await SendEmail(id);
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

    learnerRevalidation();
    handleFetchLearnersData(1);
    setCheckedItems({});

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

  // Function to fetch learner data
  const handleFetchLearnersData = async (page) => {
    setLoading(true);
    const { totalPages, totalItems, allLearners } = await fetchInductionLearnersData(
      page
    );
    setTotalPages(totalPages);
    setTotalItems(totalItems);
    setAllLearners(allLearners);
    setLoading(false);
  };

  return (
    <div>
      {/* Header Section */}
      <div className="flex flex-col xl:flex-row justify-between">
        {showHeader && <CertificateDashboardHeader {...{ roleName }} />}

        {/* Button Section */}
        <div className="flex flex-row space-x-4 my-3 xl:my-0">
          <SendBtn onSendClick={sendApplication} disabled={isDisabled} />
          {showStaffButton && <StaffButton {...{ onViewStaffClick }} />}
          <div className="hidden xl:flex">
            {showStaffButton && <FilterCertificate />}
          </div>
        </div>
      </div>

      {/* Dashboard Table Section */}
      <div className="mt-6">
        <CertificateDashboardTable
          {...{
            sendApplication,
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
      <CertificateStaffModal show={showInductionStaffModal} onClose={closeInductionStaffModal} />
    </div>
  );
}
