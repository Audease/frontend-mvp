"use client";
import { useEffect, useState, useRef } from "react";
import DropdownButton from "./DropdownButton";

export default function StaffTable({ staffData }) {
  const [editOptions, setEditOptions] = useState({});
  const menuRef = useRef(null);
  const [checkedItems, setCheckedItems] = useState({});
  const [selectedRole, setSelectedRole] = useState("");
  const options = ["Recruiter", "BKSD", "Accessor", "Inductor", "Lazer"];

  // Row edit button toggle
  const toggleVisibility = (rowId) => {
    setEditOptions((prevState) => ({
      ...prevState,
      [rowId]: !prevState[rowId],
    }));
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setEditOptions({});
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCheckboxChange = (index) => {
    setCheckedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleSelect = (option) => {
    setSelectedRole(option);
    console.log("Selected option:", option);
  };

  return (
    <div>
      <table className="min-w-full divide-y divide-gray-200 font-inter table-auto rounded-t-lg">
        <thead className="bg-tgrey-6 border border-tgrey6 ">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-normal text-tableText tracking-wider">
              Email
            </th>
            <th className="px-4 py-3 text-left text-sm text-tableText font-normal tracking-wider">
              Role
            </th>
            <th className="px-4 py-3 text-left text-sm font-normal text-tableText tracking-wider">
              Status
            </th>
            <th className="px-4 py-3 text-left text-sm font-normal text-tableText tracking-wider">
              Username
            </th>
            <th className="px-4 py-3 text-left text-sm font-normal text-tableText tracking-wider"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {staffData.length === 0 ? (
            <tr className="border-b">
              <td
                colSpan={4}
                className="px-4 py-4 text-center text-sm text-tableText2 font-medium"
              >
                Nothing here
              </td>
            </tr>
          ) : (
            staffData.map((row) => (
              <tr key={row.id}>
                <td className="px-2 py-4 whitespace-nowrap text-sm  text-tableText2 font-medium flex flex-row">
                  <span className="pr-4">
                    {" "}
                    {/* checkBox  */}
                    <input
                      type="checkbox"
                      className="staff-checkbox h-4 w-4 text-tableText2 rounded-md focus:ring-tgrey2"
                      onChange={handleCheckboxChange}
                    />
                  </span>
                  {row.email}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-tableText2 font-medium">
                  <DropdownButton
                    options={options}
                    onSelect={handleSelect}
                    label="Assign"
                    className={"bg-tgrey5 text-[#625F65] py-1 px-4 rounded focus:outline-none"}
                  />
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-tableText2 font-medium">
                  {row.status}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-tableText2 font-medium">
                  {row.username}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-tableText2 font-medium flex flex-col justify-end relative">
                  <p
                    onClick={() => toggleVisibility(row.id)}
                    aria-expanded={editOptions[row.id] || false}
                    aria-haspopup="true"
                    className="cursor-default font-bold"
                  >
                    ...
                  </p>
                  {editOptions[row.id] && (
                    <div
                      ref={menuRef}
                      className="bg-white shadow-lg rounded-lg p-4 font-medium w-32 absolute top-full border-2 right-20 text-tblack3 space-y-4 "
                    >
                      <p className="hover:text-gold1 cursor-pointer">Edit</p>
                      <p className="hover:text-gold1 cursor-pointer">Rename</p>
                      <p className="hover:text-gold1 cursor-pointer">Duplicate</p>
                      <p className="hover:text-gold1 cursor-pointer">Move to folder</p>
                      <hr />
                      <p className="text-tred1 hover:text-gold1 cursor-pointer">
                        Move to Trash
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
