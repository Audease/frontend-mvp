"use client";

import { useEffect, useState, useRef } from "react";
import clsx from "clsx";
import LoadingSpinner, { LoadingSpinner2 } from "../../../../components/dashboard/Spinner";
import SuccessToast, { FailureToast } from "../../../../components/NotificationToast";

export default function BKSDDashboardTable({
  handleSingleRowEmail, 
  loading2,
  successfulEmail,
  failedEmail,
  showSuccessToast,
  showFailureToast,
  checkedItems,
  handleCheckboxChange,
  loading,
  allLearners
}) {
  const [editOptionsVisible, setEditOptionsVisible] = useState(null);
  const menuRef = useRef(null);

  const toggleVisibility = (index) => {
    setEditOptionsVisible((prev) => (prev === index ? null : index));
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setEditOptionsVisible(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col justify-between w-full min-h-80 overflow-x-auto">
      <div className="fixed z-50 right-8 animate-bounce">
        {showSuccessToast && (
          <SuccessToast text={`${successfulEmail} sent successfully. ${failedEmail} failed`} />
        )}
        {showFailureToast && (
          <FailureToast text={`${failedEmail} failed. ${successfulEmail} sent successfully.`} />
        )}
      </div>
      
      {loading2 && (
        <div className="flex justify-center items-center z-50 fixed top-0 left-0 right-0 bottom-0 bg-white bg-opacity-50">
          <LoadingSpinner2 />
        </div>
      )}
      
      <table className="min-w-full divide-y divide-gray-200 font-inter table-auto rounded-t-lg h-full">
        <thead className="bg-tgrey-6 border border-tgrey6">
          <tr>
            <th className="px-2 py-2 text-left text-[10px] font-normal text-tableText tracking-wider">Name</th>
            <th className="px-2 py-2 text-left text-[10px] text-tableText font-normal tracking-wider">Date of Birth</th>
            <th className="px-2 py-2 text-left text-[10px] font-normal text-tableText tracking-wider">Mobile number</th>
            <th className="px-2 py-2 text-left text-[10px] font-normal text-tableText tracking-wider">Email address</th>
            <th className="px-2 py-2 text-left text-[10px] font-normal text-tableText tracking-wider">NI Number</th>
            <th className="px-2 py-2 text-left text-[10px] font-normal text-tableText tracking-wider">Passport number</th>
            <th className="px-2 py-2 text-left text-[10px] font-normal text-tableText tracking-wider">Home address</th>
            <th className="px-2 py-2 text-left text-[10px] font-normal text-tableText tracking-wider">Funding</th>
            <th className="px-2 py-2 text-left text-[10px] font-normal text-tableText tracking-wider">Level</th>
            <th className="px-2 py-2 text-left text-[10px] font-normal text-tableText tracking-wider">Awarding</th>
            <th className="px-2 py-2 text-left text-[10px] font-normal text-tableText tracking-wider">Chose course</th>
            <th className="px-2 py-2 text-left text-[10px] font-normal text-tableText tracking-wider">Application</th>
            <th className="px-2 py-2 text-left text-[10px] font-normal text-tableText tracking-wider">Action</th>
          </tr>
        </thead>
        
        <tbody className="bg-white divide-y divide-gray-200">
          {loading ? (
            <tr className="border-b">
              <td colSpan={13} className="px-4 py-4 text-center text-sm text-tableText2 font-medium">
                <LoadingSpinner />
              </td>
            </tr>
          ) : allLearners.length === 0 ? (
            <tr className="border-b">
              <td colSpan={13} className="px-4 py-4 text-center justify-center text-sm text-tableText2 font-medium">
                Nothing here
              </td>
            </tr>
          ) : (
            allLearners.map((row, index) => (
              <tr key={row.id}>
                <td className="px-2 py-4 whitespace-nowrap text-[10px] text-tableText2 font-medium flex flex-row cursor-pointer">
                  <span className="pr-4">
                    <input
                      type="checkbox"
                      className="staff-checkbox h-3 w-3 text-tableText2 rounded-sm focus:ring-tgrey2"
                      onChange={() => row.application_mail !== "Sent" &&  handleCheckboxChange(row.id)}
                      checked={row.application_mail !== "Sent" && !!checkedItems[row.id]}
                    />
                  </span>
                  {row.name}
                </td>
                <td className="px-2 py-4 whitespace-nowrap text-[9px] text-tableText2 font-medium">{row.date_of_birth}</td>
                <td className="px-2 py-4 whitespace-nowrap text-[9px] text-tableText2 font-medium">{row.mobile_number}</td>
                <td className="px-2 py-4 whitespace-nowrap text-[9px] text-tableText2 font-medium">{row.email}</td>
                <td className="px-2 py-4 whitespace-nowrap text-[9px] text-tableText2 font-medium">{row.NI_number}</td>
                <td className="px-2 py-4 whitespace-nowrap text-[9px] text-tableText2 font-medium">{row.passport_number}</td>
                <td className="px-2 py-4 whitespace-nowrap text-[9px] text-tableText2 font-medium">{row.home_address}</td>
                <td className="px-2 py-4 whitespace-nowrap text-[9px] text-tableText2 font-medium">{row.funding}</td>
                <td className="px-2 py-4 whitespace-nowrap text-[9px] text-tableText2 font-medium">{row.level}</td>
                <td className="px-2 py-4 whitespace-nowrap text-[9px] text-tableText2 font-medium">{row.awarding}</td>
                <td className="px-2 py-4 whitespace-nowrap text-[9px] text-tableText2 font-medium">{row.chosen_course}</td>
                <td className="px-2 py-2 whitespace-nowrap text-[9px] text-tableText2 font-medium">
                  <p
                    className={clsx("text-center p-1 rounded-lg", {
                      "bg-green4 text-green3": row.application_mail === "Sent",
                      "bg-tgrey8 text-tblack4": row.application_mail === "Not sent",
                    })}
                  >
                    {row.application_mail}
                  </p>
                </td>
                <td className="px-2 py-4 whitespace-nowrap text-[9px] text-tableText2 font-bold text-center relative">
                  <p
                    onClick={() => toggleVisibility(index)}
                    aria-expanded={editOptionsVisible === index}
                    aria-haspopup="true"
                    className="cursor-pointer font-bold"
                  >
                    ...
                  </p>
                  {row.application_mail !== "Sent" && editOptionsVisible === index && (
                    <div
                      ref={menuRef}
                      className="bg-white shadow-lg rounded-lg p-2 font-medium w-32 absolute left-[-80px] border-2 right-0 text-tblack3 space-y-4 z-10 top-10"
                    >
                      <p
                        className="hover:text-gold1 cursor-pointer"
                        onClick={() => {
                          handleSingleRowEmail(row.id);
                          setEditOptionsVisible(null);
                        }}
                      >
                        Send Application
                      </p>
                    </div>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}