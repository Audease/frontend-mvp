"use client";
import { useEffect, useState, useRef } from "react";
import DropdownButton from "../../components/dashboard/DropdownButton";
import { fetchRoles } from "../utils/fetchRoles";
import LoadingSpinner from "../../components/dashboard/Spinner";

export default function StaffTable({
  staffData,
  loading2,
  checkedItems,
  setCheckedItems,
  onRoleSelect,
}) {
  const [editOptions, setEditOptions] = useState({});
  const menuRef = useRef(null);
  const [selectedRole, setSelectedRole] = useState({});
  const [fullDropdownResponseData, setFullDropdownResponseData] = useState([]);
  const options = fullDropdownResponseData.map((item) => item.role);

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

  // Handle the check box change
  const handleCheckboxChange = (staffId: string) => {
    if (staffData) {
      const staffItem = staffData.find((staff) => staff.id === staffId);

      setCheckedItems((prev) => {
        const isCurrentlyChecked = prev[staffId];
        if (isCurrentlyChecked) {
          const { [staffId]: removedItem, ...rest } = prev;
          return rest;
        } else {
          return {
            ...prev,
            [staffId]: staffItem,
          };
        }
      });
    } else {
      console.error("Invalid index or staffData is not populated yet");
    }
  };

  // Fetch dropdown options
  useEffect(() => {
    const getAllRoles = async () => {
      const rolesData = await fetchRoles();
      if (rolesData) {
        setFullDropdownResponseData(rolesData);
      }
    };

    getAllRoles();
  }, []);

  // Handle selected options
  const handleSelect = (index, selectedRole) => {
    const selectedRoleData = fullDropdownResponseData.find(
      (item) => item.role === selectedRole
    );

    if (selectedRoleData) {
      const selectedRoleId = selectedRoleData.id;

      setSelectedRole((prev) => ({
        ...prev,
        [index]: selectedRole,
      }));
      onRoleSelect(index, selectedRoleId);
    } else {
      console.error("Selected role not found in the dropdown data");
    }
  };

  return (
    <div>
      <table className="min-w-full divide-y divide-gray-200 font-inter table-auto rounded-t-lg ">
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
          {loading2 ? (
          <tr>
            <td colSpan={5} className="px-4 py-4 text-center text-sm text-tableText2 font-medium">
              Loading...
            </td>
          </tr>
        ) : staffData.length === 0 ? (
            <tr className="border-b">
              <td
                colSpan={4}
                className="px-4 py-4 text-center text-sm text-tableText2 font-medium"
              >
                Nothing here
              </td>
            </tr>
          ) : (
            staffData.map((staff, index) => (
              <tr key={staff.id}>
                <td
                  className="px-2 py-4 whitespace-nowrap text-sm text-tableText2 font-medium flex flex-row cursor-pointer"
                  onClick={() => handleCheckboxChange(staff.id)}
                >
                  <span className="pr-4">
                    {" "}
                    {/* checkBox  */}
                    <input
                      type="checkbox"
                      className="staff-checkbox h-4 w-4 text-tableText2 rounded-md focus:ring-tgrey2"
                      checked={checkedItems[staff.id] || false}
                      onClick={() => handleCheckboxChange(staff.id)}
                      onChange={() => handleCheckboxChange(staff.id)}
                    />
                  </span>
                  {staff.email}
                </td>
                <td className="px-4 py-4 whitespace-wrap text-sm text-tableText2 font-medium">
                  <DropdownButton
                    options={options}
                    onSelect={(option) => handleSelect(staff.id, option)}
                    label={selectedRole[staff.id] || "Assign"}
                    disabled={!checkedItems[staff.id]}
                    className={`py-1 px-4 rounded focus:outline-none ${
                      selectedRole[staff.id]
                        ? "bg-dashboardButtons text-white"
                        : "bg-tgrey5 text-[#625F65]"
                    }`}
                  />
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-tableText2 font-medium">
                  {staff.status}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-tableText2 font-medium">
                  {staff.username}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-tableText2 font-medium flex flex-col justify-end relative">
                  <p
                    onClick={() => toggleVisibility(staff.id)}
                    aria-expanded={editOptions[staff.id] || false}
                    aria-haspopup="true"
                    className="cursor-pointer font-bold hover:text-dashboardButtons"

                  >
                    ...
                  </p>
                  {editOptions[staff.id] && (
                    <div
                      ref={menuRef}
                      className="bg-white shadow-lg rounded-lg p-4 font-medium w-32 absolute top-full border-2 right-20 text-tblack3 space-y-4 "
                    >
                      {/* <p className="hover:text-gold1 cursor-pointer">Edit</p>
                      <hr /> */}
                      <p className="text-tred1 hover:text-gold1 cursor-pointer">
                        Archive
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
