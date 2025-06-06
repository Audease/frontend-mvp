"use client";
import { useEffect, useState, useRef } from "react";
import clsx from "clsx";
import LoadingSpinner from "../../../../components/dashboard/Spinner";

export default function AccessorDashboardTable({ onViewChange, allLearners, loading }) {

  const [editOptionsVisible, setEditOptionsVisible] = useState(null);
  const menuRef = useRef(null);

  const toggleVisibility = (index, rowId) => {
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
  }, [menuRef]);

  return (
    <div className="flex flex-col justify-between min-h-[25rem] my-4 w-full overflow-x-auto">
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
              Chosen course
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
                colSpan={12}
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
                <td className="px-2 py-4 whitespace-nowrap text-[10px] text-tableText2 font-medium flex flex-row">
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
                      "bg-green4 text-green3":
                        row.application_status === "Approved",
                      "bg-tgrey8 text-tblack4":
                        row.application_status === "Pending",
                      "bg-red-200 text-red-600":
                        row.application_status === "Rejected",
                    })}
                  >
                    {row.application_status}
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
                  {editOptionsVisible === index && (
                    <div
                      ref={menuRef}
                      className="bg-white shadow-lg rounded-lg p-2 font-medium w-24 absolute left-[-60px] border-2 right-0 text-tblack3 space-y-4 z-10 top-10"
                    >
                      <p
                        className="hover:text-gold1 cursor-pointer text-black text-left"
                        onClick={() => {
                          onViewChange(row);
                        }}
                      >
                        View
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
