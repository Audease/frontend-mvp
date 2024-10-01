"use client";
import { useEffect, useState, useRef } from "react";
import Pagination from "../../../../components/dashboard/Pagination";
import clsx from "clsx";
import LoadingSpinner from "../../../../components/dashboard/Spinner";
import { SendEmail } from "../utils/action";
import { learnerRevalidation } from "../../../../action";
import SuccessToast, { FailureToast } from "../../../../components/NotificationToast";
import { useBKSDLearners } from "../utils/useBKSDLearners";

export default function BKSDDashboardTable({}) {
  const handlePageChange = async (page) => {
    setCurrentPage(page);
    handleFetchLearnersData(page);
  };

  const [editOptionsVisible, setEditOptionsVisible] = useState(null);
  const menuRef = useRef(null);

  const toggleVisibility = (index, rowId) => {
    if (checkedItems[rowId]) {
      setEditOptionsVisible((prev) => (prev === index ? null : index));
    } else {
      setEditOptionsVisible(null);
    }
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

  const [allLearners, setallLearners] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalpages] = useState(1);
  const [totalItems, setTotalItems] = useState(1);
  const [loading, setLoading] = useState(true);

  const { fetchBKSDLearnersData } = useBKSDLearners();

  const handleFetchLearnersData = async (page) => {
    setLoading(true);
    const { totalPages, totalItems, allLearners } = await fetchBKSDLearnersData(
      page
    );
    setTotalpages(totalPages);
    setTotalItems(totalItems);
    setallLearners(allLearners);
    setLoading(false);
  };

  useEffect(() => {
    handleFetchLearnersData(currentPage);
  }, []);

  const [checkedItems, setCheckedItems] = useState({});
  const [checkedIds, setCheckedIds] = useState([]);

  const handleCheckboxChange = (id: string) => {
    setCheckedItems((prev) => {
      const updatedItems = { ...prev, [id]: !prev[id] };

      const updatedIds = Object.keys(updatedItems).filter(
        (key) => updatedItems[key]
      );
      setCheckedIds(updatedIds);

      return updatedItems;
    });
  };

  // console.log(checkedIds);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showFailureToast, setShowFailureToast] = useState(false);
  const sendApplication = async () => {
    const results = await Promise.all(
      checkedIds.map((id) => SendEmail(id)) 
    );
    
    const allSuccess = results.every((result) => result === true);

    if (allSuccess) {
      await learnerRevalidation();
      setCheckedItems({});
      setShowSuccessToast(true);
      setTimeout(() => {
        setShowSuccessToast(false);
      }, 5000);
    } else {
      setCheckedItems({});
      setShowFailureToast(true);
      setTimeout(() => {
        setShowFailureToast(false);
      }, 5000);
    }
  };

  return (
    <div className="flex flex-col justify-between min-h-[35rem] w-full overflow-x-auto">
      <div className="fixed z-50 right-8 animate-bounce">
        {showSuccessToast && <SuccessToast text={"Application(s) successfully."}/>}
        {showFailureToast && <FailureToast text={"Fail to send Application(s)"}/>}
      </div>
      <table className="min-w-full divide-y divide-gray-200 font-inter table-auto rounded-t-lg h-full">
        <thead className="bg-tgrey-6 border border-tgrey6 ">
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
              Application
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
                <td
                  className="px-2 py-4 whitespace-nowrap text-[10px] text-tableText2 font-medium flex flex-row cursor-pointer"
                  // onClick={() => handleCheckboxChange(row.id)}
                >
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
                    onClick={() => toggleVisibility(index, row.id)}
                    aria-expanded={editOptionsVisible === index}
                    aria-haspopup="true"
                    className="cursor-pointer font-bold"
                  >
                    ...
                  </p>
                  {editOptionsVisible === index && checkedItems[row.id] && (
                    <div
                      ref={menuRef}
                      className="bg-white shadow-lg rounded-lg p-2 font-medium w-32 absolute left-[-80px]  border-2 right-0 text-tblack3 space-y-4 z-10 top-10"
                    >
                      <p
                        className="hover:text-gold1 cursor-pointer"
                        onClick={sendApplication}
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
