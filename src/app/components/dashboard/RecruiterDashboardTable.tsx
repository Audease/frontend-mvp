"use client";
import { useState,  } from "react";
import Pagination from "./Pagination";
import DatePicker from "./Datepicker";



export default function RecruiterDashboardTable({ 
  learnersData,
  checkedItems,
  handleCheckboxChange,
  isEditing,
  setLearnersData, 
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(learnersData.length / itemsPerPage);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const displayedLearners = learnersData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleInputChange = (id, field, value) => {
    setLearnersData((prevData) =>
      prevData.map((learner) =>
        learner.id === id ? { ...learner, [field]: value } : learner
      )
    );
  };

  return (
    <div className="flex flex-col justify-between min-h-[35rem] w-full overflow-x-auto">
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
                <td className="px-2 py-4 whitespace-nowrap text-[10px] text-tableText2 font-medium flex flex-row">
                  <span className="pr-4">
                    <input
                      type="checkbox"
                      className="staff-checkbox h-3 w-3 text-tableText2 rounded-sm focus:ring-tgrey2"
                      onChange={() => handleCheckboxChange(row.id)}
                      checked={!!checkedItems[row.id]}
                    />
                  </span>
                  {isEditing && checkedItems[row.id] ?(
                    <input
                      type="text"
                      value={row.name}
                      onChange={(e) => handleInputChange(row.id, 'name', e.target.value)}
                      className="p-0 border-none  whitespace-nowrap text-[10px] text-tblack3 font-medium  focus:ring-tgrey1 rounded-sm px-1 w-20"
                    />
                  ) : (
                    row.name
                  )}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-[10px] text-tableText2 font-medium">
                  {isEditing && checkedItems[row.id] ? (
                    <input
                      type="text"
                      value={row.dateOfBirth}
                      onChange={(e) => handleInputChange(row.id, 'dateOfBirth', e.target.value)}
                      className="p-0 border-none  whitespace-nowrap text-[10px] text-tblack3 font-medium  focus:ring-tgrey1 rounded-sm px-1 w-20"
                    />
                  ) : (
                    row.dateOfBirth
                  )}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-[10px] text-tableText2 font-medium">
                  {isEditing && checkedItems[row.id] ? (
                    <input
                      type="text"
                      value={row.mobileNumber}
                      onChange={(e) => handleInputChange(row.id, 'mobileNumber', e.target.value)}
                      className="p-0 border-none  whitespace-nowrap text-[10px] text-tblack3 font-medium  focus:ring-tgrey1 rounded-sm px-1 w-20"
                    />
                  ) : (
                    row.mobileNumber
                  )}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-[10px] text-tableText2 font-medium">
                  {isEditing && checkedItems[row.id] ? (
                    <input
                      type="text"
                      value={row.email}
                      onChange={(e) => handleInputChange(row.id, 'email', e.target.value)}
                      className="p-0 border-none  whitespace-nowrap text-[10px] text-tblack3 font-medium  focus:ring-tgrey1 rounded-sm px-1 w-20"
                    />
                  ) : (
                    row.email
                  )}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-[10px] text-tableText2 font-medium">
                  {isEditing && checkedItems[row.id] ? (
                    <input
                      type="text"
                      value={row.niNumber}
                      onChange={(e) => handleInputChange(row.id, 'niNumber', e.target.value)}
                      className="p-0 border-none  whitespace-nowrap text-[10px] text-tblack3 font-medium  focus:ring-tgrey1 rounded-sm px-1 w-20"
                    />
                  ) : (
                    row.niNumber
                  )}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-[10px] text-tableText2 font-medium">
                  {isEditing && checkedItems[row.id] ? (
                    <input
                      type="text"
                      value={row.passportNumber}
                      onChange={(e) => handleInputChange(row.id, 'passportNumber', e.target.value)}
                      className="p-0 border-none  whitespace-nowrap text-[10px] text-tblack3 font-medium  focus:ring-tgrey1 rounded-sm px-1 w-20"
                    />
                  ) : (
                    row.passportNumber
                  )}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-[10px] text-tableText2 font-medium">
                  {isEditing && checkedItems[row.id] ? (
                    <input
                      type="text"
                      value={row.homeAddress}
                      onChange={(e) => handleInputChange(row.id, 'homeAddress', e.target.value)}
                      className="p-0 border-none  whitespace-nowrap text-[10px] text-tblack3 font-medium  focus:ring-tgrey1 rounded-sm px-1 w-20"
                    />
                  ) : (
                    row.homeAddress
                  )}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-[10px] text-tableText2 font-medium">
                  {isEditing && checkedItems[row.id] ? (
                    <input
                      type="text"
                      value={row.funding}
                      onChange={(e) => handleInputChange(row.id, 'funding', e.target.value)}
                      className="p-0 border-none  whitespace-nowrap text-[10px] text-tblack3 font-medium  focus:ring-tgrey1 rounded-sm px-1 w-20"
                    />
                  ) : (
                    row.funding
                  )}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-[10px] text-tableText2 font-medium">
                  {isEditing && checkedItems[row.id] ? (
                    <input
                      type="text"
                      value={row.level}
                      onChange={(e) => handleInputChange(row.id, 'level', e.target.value)}
                      className="p-0 border-none  whitespace-nowrap text-[10px] text-tblack3 font-medium  focus:ring-tgrey1 rounded-sm px-1 w-20"
                    />
                  ) : (
                    row.level
                  )}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-[10px] text-tableText2 font-medium">
                  {isEditing && checkedItems[row.id] ? (
                    <input
                      type="text"
                      value={row.awarding}
                      onChange={(e) => handleInputChange(row.id, 'awarding', e.target.value)}
                      className="p-0 border-none  whitespace-nowrap text-[10px] text-tblack3 font-medium  focus:ring-tgrey1 rounded-sm px-1 w-20"
                    />
                  ) : (
                    row.awarding
                  )}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-[10px] text-tableText2 font-medium">
                  {isEditing && checkedItems[row.id] ? (
                    <select name="" id=""
                    className="p-0 border-none  whitespace-nowrap text-[10px] text-tblack3 font-medium  focus:ring-tgrey1 rounded-sm px-1 space-y-2">
                      <option value="" >Adultcare</option>
                      <option value="">Children Care</option>
                    </select>
                  ) : (
                    row.choseCourse
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
          itemsPerPage={itemsPerPage}
          totalItems={learnersData.length}
          onPageChange={handlePageChange}
        />
      </div>
      <div className="w-60 text-sm">
      {/* <DatePicker /> */}
      </div>
    </div>
  );
}
