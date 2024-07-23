"use client";
import { useEffect, useState, useRef } from "react";
import Pagination from "./Pagination";

export default function RecruiterDashboardTable({ learnersData }) {
  const [editOptions, setEditOptions] = useState({});
  const menuRef = useRef(null);
  const [checkedItems, setCheckedItems] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(learnersData.length / itemsPerPage);

  const handleCheckboxChange = (index) => {
    setCheckedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const displayedLearners = learnersData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <table className="min-w-full divide-y divide-gray-200 font-inter table-auto rounded-t-lg h-full">
        <thead className="bg-tgrey-6 border border-tgrey6 ">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-normal text-tableText tracking-wider">
              Name
            </th>
            <th className="px-4 py-3 text-left text-xs text-tableText font-normal tracking-wider">
              Date of Birth
            </th>
            <th className="px-4 py-3 text-left text-xs font-normal text-tableText tracking-wider">
              Mobile number
            </th>
            <th className="px-4 py-3 text-left text-xs font-normal text-tableText tracking-wider">
              Email address
            </th>
            <th className="px-4 py-3 text-left text-xs font-normal text-tableText tracking-wider">
              NI Number
            </th>
            <th className="px-4 py-3 text-left text-xs font-normal text-tableText tracking-wider">
              Passport number
            </th>
            <th className="px-4 py-3 text-left text-xs font-normal text-tableText tracking-wider">
              Home address
            </th>
            <th className="px-4 py-3 text-left text-xs font-normal text-tableText tracking-wider">
              Funding
            </th>
            <th className="px-4 py-3 text-left text-xs font-normal text-tableText tracking-wider">
              Level
            </th>
            <th className="px-4 py-3 text-left text-xs font-normal text-tableText tracking-wider">
              Awarding
            </th>
            <th className="px-4 py-3 text-left text-xs font-normal text-tableText tracking-wider">
              Chose course
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {learnersData.length === 0 ? (
            <tr className="border-b">
              <td
                colSpan={11}
                className="px-4 py-4 text-center justify-center text-sm text-tableText2 font-medium"
              >
                Nothing here
              </td>
            </tr>
          ) : (
            displayedLearners.map((row) => (
              <tr key={row.id}>
                <td className="px-2 py-4 whitespace-nowrap text-[10px]  text-tableText2 font-medium flex flex-row">
                  <span className="pr-4">
                    {" "}
                    {/* checkBox  */}
                    <input
                      type="checkbox"
                      className="staff-checkbox h-3 w-3 text-tableText2 rounded-sm focus:ring-tgrey2"
                      onChange={handleCheckboxChange}
                    />
                  </span>
                  {row.name}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-[10px] text-tableText2 font-medium">
                  {row.dateOfBirth}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-[10px] text-tableText2 font-medium">
                  {row.mobileNumber}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-[10px] text-tableText2 font-medium">
                  {row.email}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-[10px] text-tableText2 font-medium">
                  {row.niNumber}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-[10px] text-tableText2 font-medium">
                  {row.passportNumber}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-[10px] text-tableText2 font-medium">
                  {row.homeAddress}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-[10px] text-tableText2 font-medium">
                  {row.funding}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-[10px] text-tableText2 font-medium">
                  {row.level}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-[10px] text-tableText2 font-medium">
                  {row.awarding}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-[10px] text-tableText2 font-medium">
                  {row.choseCourse}
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
          itemsPerPage={itemsPerPage}
          totalItems={learnersData.length}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
