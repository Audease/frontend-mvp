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
import { Toast } from 'flowbite-react'; // Import Toast from flowbite
import { FiAlertCircle } from "react-icons/fi"; // Import an alert icon

// State handling
export default function InductionDashboardTable({
  handleToggleAttendance,
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
  const [showAttendanceToast, setShowAttendanceToast] = useState(false);
  const [attendanceToastMessage, setAttendanceToastMessage] = useState("");

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

  // Handle attendance toggle attempts for uninvited students
  const handleAttendanceToggleAttempt = (row) => {
    if (row.inductor_status === "Not sent") {
      setAttendanceToastMessage("This student hasn't been sent an induction invite yet. Please send an invite first before marking attendance.");
      setShowAttendanceToast(true);
      setTimeout(() => setShowAttendanceToast(false), 5000);
      return false;
    }
    return true;
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
    <div className="flex flex-col justify-between w-full overflow-x-auto">
      <div className="fixed z-50 right-8">
        {showSuccessToast && (
          <SuccessToast text={`${successfulEmail} sent successfully. ${failedEmail} failed`} />
        )}
        {showFailureToast && (
          <FailureToast text={`${failedEmail} failed. ${successfulEmail} sent successfully. `} />
        )}
        {showAttendanceToast && (
          <div className="animate-bounce">
            <Toast>
              <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500">
                <FiAlertCircle className="h-5 w-5" />
              </div>
              <div className="ml-3 text-sm font-normal">
                {attendanceToastMessage}
              </div>
              <Toast.Toggle onDismiss={() => setShowAttendanceToast(false)} />
            </Toast>
          </div>
        )}
      </div>
      {loading2 && (
        <div className="flex justify-center items-center">
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
                      "bg-green4 text-green3 hover:bg-green-300 cursor-pointer": row.attendance_status === "present" && row.inductor_status !== "Not sent",
                      "bg-tgrey8 text-tblack4 hover:bg-gray-300 cursor-pointer": row.attendance_status === "absent" && row.inductor_status !== "Not sent",
                      "bg-tgrey8 text-tblack4 opacity-70 cursor-not-allowed": row.inductor_status === "Not sent"
                    })}
                    onClick={() => {
                      if (handleAttendanceToggleAttempt(row)) {
                        handleToggleAttendance(
                          row.id, 
                          row.attendance_status === "present" ? "absent" : "present"
                        );
                      }
                    }}
                    title={row.inductor_status === "Not sent" ? "Send induction invite first" : "Click to toggle attendance status"}
                  >
                    {row.inductor_status === "Not sent" ? "Pending" : row.attendance_status}
                  </p>
                </td>
                <td className="px-2 py-2 whitespace-nowrap text-[9px] text-tableText2 font-medium">
                  <p
                    className={clsx("text-center p-1 rounded-lg", {
                      "bg-green4 text-green3": row.inductor_status === "Sent",
                      "bg-tgrey8 text-tblack4": row.inductor_status === "Not sent",
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
                      className="bg-white shadow-lg rounded-lg p-2 font-medium w-32 absolute left-[-80px] border-2 right-0 text-tblack3 space-y-4 z-10 top-10"
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
                      {row.inductor_status !== "Not sent" ? (
                        row.attendance_status === "present" ? (
                          <p 
                            className="text-red-500 cursor-pointer hover:text-gold1"
                            onClick={() => {
                              handleToggleAttendance(row.id, "absent");
                              setEditOptionsVisible(null);
                            }}
                          >
                            Mark Absent
                          </p>
                        ) : (
                          <p 
                            className="text-green-700 cursor-pointer hover:text-gold1"
                            onClick={() => {
                              handleToggleAttendance(row.id, "present");
                              setEditOptionsVisible(null);
                            }}
                          >
                            Mark Present
                          </p>
                        )
                      ) : (
                        <p 
                          className="text-gray-400 cursor-not-allowed"
                          onClick={() => {
                            setAttendanceToastMessage("This student hasn't been sent an induction invite yet. Please send an invite first before marking attendance.");
                            setShowAttendanceToast(true);
                            setTimeout(() => setShowAttendanceToast(false), 5000);
                            setEditOptionsVisible(null);
                          }}
                        >
                          Attendance Unavailable
                        </p>
                      )}
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