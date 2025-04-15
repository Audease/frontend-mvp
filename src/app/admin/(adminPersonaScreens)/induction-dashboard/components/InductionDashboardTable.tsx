"use client";

// Imports
import { useEffect, useState, useRef } from "react";
import Pagination from "../../../../components/dashboard/Pagination";
import clsx from "clsx";
import LoadingSpinner, {
  LoadingSpinner2,
} from "../../../../components/dashboard/Spinner";
import SuccessToast, {
  FailureToast,
} from "../../../../components/NotificationToast";

// State handling
export default function InductionDashboardTable({
  handleMarkPresent,
  handleSingleRowInductionEmail, 
  loading2,
  successfulEmail,
  failedEmail,
  showSuccessToast,
  showFailureToast,
  checkedItems,
  handleCheckboxChange,
  handleFetchLearnersData,
  loading,
  allLearners,
  totalPages,
  totalItems,
}) {
  const [currentPage, setCurrentPage] = useState(1);

  const [editOptionsVisible, setEditOptionsVisible] = useState(null);

  const menuRef = useRef(null);

  // Event handling functions
  const handlePageChange = async (page) => {
    setCurrentPage(page);
    handleFetchLearnersData("", page, 10, "");
  };

  const toggleVisibility = (index) => {
    setEditOptionsVisible((prev) => (prev === index ? null : index));
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setEditOptionsVisible(null);
    }
  };

  // Lifecycle effects
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  // Rendering
  return (
    <div className="flex flex-col justify-between  w-full overflow-x-auto">
      <div className="fixed z-50 right-8 animate-bounce">
        {showSuccessToast && (
          <SuccessToast text={`${successfulEmail} sent successfully. ${failedEmail} failed`} />
        )}
        {showFailureToast && (
          <FailureToast text={`${failedEmail} failed. ${successfulEmail} sent successfully. `} />
        )}
      </div>
      {loading2 && (
        <div className=" flex justify-center items-center">
          <LoadingSpinner2 />
        </div>
      )}
      <table className="min-w-full divide-y divide-gray-200 font-inter table-auto rounded-t-lg h-full">
        <thead className="bg-tgrey-6 border border-tgrey6">
          <tr>
            <th className="px-2 py-2 text-left text-[10px] font-normal text-tableText tracking-wider">
              Name
            </th>
            <th className="px-2 py-2 text-left text-[10px] text-tableText font-normal tracking-wider">
              Date of Birth
            </th>
            <th className="px-2 py-2 text-left text-[10px] font-normal text-tableText tracking-wider">
              Mobile number
            </th>
            <th className="px-2 py-2 text-left text-[10px] font-normal text-tableText tracking-wider">
              Email address
            </th>
            <th className="px-2 py-2 text-left text-[10px] font-normal text-tableText tracking-wider">
              NI Number
            </th>
            <th className="px-2 py-2 text-left text-[10px] font-normal text-tableText tracking-wider">
              Passport number
            </th>
            <th className="px-2 py-2 text-left text-[10px] font-normal text-tableText tracking-wider">
              Home address
            </th>
            <th className="px-2 py-2 text-left text-[10px] font-normal text-tableText tracking-wider">
              Funding
            </th>
            <th className="px-2 py-2 text-left text-[10px] font-normal text-tableText tracking-wider">
              Level
            </th>
            <th className="px-2 py-2 text-left text-[10px] font-normal text-tableText tracking-wider">
              Awarding
            </th>
            <th className="px-2 py-2 text-left text-[10px] font-normal text-tableText tracking-wider">
              Chose course
            </th>
            <th className="px-2 py-2 text-left text-[10px] font-normal text-tableText tracking-wider">
              Attendance
            </th>
            <th className="px-2 py-2 text-left text-[10px] font-normal text-tableText tracking-wider">
              Status
            </th>
            <th className="px-2 py-2 text-left text-[10px] font-normal text-tableText tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {loading ? (
            <tr className="border-b">
              <td
                colSpan={7}
                className="px-4 py-4 text-center text-sm text-tableText2 font-medium"
              >
                <LoadingSpinner />
              </td>
            </tr>
          ) : allLearners.length === 0 ? (
            <tr className="border-b">
              <td
                colSpan={13}
                className="px-4 py-4 text-center justify-center text-sm text-tableText2 font-medium"
              >
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
                      onChange={() => handleCheckboxChange(row.id)}
                      checked={!!checkedItems[row.id]}
                    />
                  </span>
                  {row.name}
                </td>
                <td className="px-2 py-4 whitespace-nowrap text-[9px] text-tableText2 font-medium">
                  {row.date_of_birth}
                </td>
                <td className="px-2 py-4 whitespace-nowrap text-[9px] text-tableText2 font-medium">
                  {row.mobile_number}
                </td>
                <td className="px-2 py-4 whitespace-nowrap text-[9px] text-tableText2 font-medium">
                  {row.email}
                </td>
                <td className="px-2 py-4 whitespace-nowrap text-[9px] text-tableText2 font-medium">
                  {row.NI_number}
                </td>
                <td className="px-2 py-4 whitespace-nowrap text-[9px] text-tableText2 font-medium">
                  {row.passport_number}
                </td>
                <td className="px-2 py-4 whitespace-nowrap text-[9px] text-tableText2 font-medium">
                  {row.home_address}
                </td>
                <td className="px-2 py-4 whitespace-nowrap text-[9px] text-tableText2 font-medium">
                  {row.funding}
                </td>
                <td className="px-2 py-4 whitespace-nowrap text-[9px] text-tableText2 font-medium">
                  {row.level}
                </td>
                <td className="px-2 py-4 whitespace-nowrap text-[9px] text-tableText2 font-medium">
                  {row.awarding}
                </td>
                <td className="px-2 py-4 whitespace-nowrap text-[9px] text-tableText2 font-medium">
                  {row.chosen_course}
                </td>
                <td className="px-2 py-4 whitespace-nowrap text-[9px] text-tableText2 font-medium">
                  <p 
                    className={clsx("text-center p-1 rounded-lg", {
                      "bg-green4 text-green3": row.attendance_status === "present",
                      "bg-tgrey8 text-tblack4":
                        row.attendance_status === "absent",
                    })}
                  >
                    {row.inductor_status === "Not sent" ? "Pending" :  row.attendance_status}
                  </p>
                </td>
                <td className="px-2 py-2 whitespace-nowrap text-[9px] text-tableText2 font-medium">
                  <p
                    className={clsx("text-center p-1 rounded-lg", {
                      "bg-green4 text-green3": row.inductor_status === "Sent",
                      "bg-tgrey8 text-tblack4":
                        row.inductor_status === "Not sent",
                    })}
                  >
                    {row.inductor_status}
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
                  {editOptionsVisible === index && (
                    <div
                      ref={menuRef}
                      className="bg-white shadow-lg rounded-lg p-2 font-medium w-32 absolute left-[-80px]  border-2 right-0 text-tblack3 space-y-4 z-10 top-10"
                    >
                      <p
                        className="hover:text-gold1 cursor-pointer"
                        onClick={() => {
                          handleSingleRowInductionEmail(row.id);
                          setEditOptionsVisible(null);
                        }}
                      >
                        Send Invite
                      </p>
                      <p className="text-green-700 cursor-pointer hover:text-gold1"
                      onClick={() => handleMarkPresent(row.id)}
                      >Mark Present</p>
                    </div>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
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
  );
}
