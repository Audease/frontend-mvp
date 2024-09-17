import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { fetchRoles } from "../../utils/fetchRoles";

export default function RoleTable({ data, roleIcons }) {
  const [availableRoles, setAvailableRoles] = useState([]);
  const getRoleIcon = (role) => {
    const icon = roleIcons.find((icon) => icon.role === role);
    return icon ? icon.roleIcon : "";
  };

  const [editOptions, setEditOptions] = useState({});
  const menuRef = useRef(null);

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

  useEffect(() => {
    const roleData = async () => {
      const allRoles = await fetchRoles();
      if (allRoles) {
        setAvailableRoles(allRoles);
      }
    }

    roleData();
  }, [])

  return (
    <table className="min-w-full divide-y divide-gray-200 font-inter">
      <thead className="bg-tgrey5 border border-tgrey6 rounded-full">
        <tr>
          <th className="px-6 py-3 text-left text-sm font-normal text-tableText tracking-wider">
            Name
          </th>
          <th className="px-6 py-3 text-left text-sm text-tableText font-normal tracking-wider">
            Updated
          </th>
          <th className="px-6 py-3 text-left text-sm font-normal text-tableText tracking-wider">
            Last editor
          </th>
          <th className="px-6 py-3 text-left text-sm font-normal text-tableText tracking-wider"></th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {availableRoles.length === 0 ? (
          <tr className="border-b">
            <td
              colSpan={4}
              className="px-6 py-4 text-center text-sm text-tableText2 font-medium"
            >
              Nothing here
            </td>
          </tr>
        ) : (
          availableRoles.map((row) => (
            <tr key={row.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm  text-tableText2 font-medium flex flex-row">
              <span className="pr-4">
                  <Image
                    src={getRoleIcon(row.role)}
                    width={18}
                    height={18}
                    alt="role icon"
                  />
                </span>
                {row.role}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-tableText2 font-medium">
                {row.createdDate}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-tableText2 font-medium">
                {row.lastEditor}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-tableText2 font-medium flex flex-col justify-end relative">
                <p
                  onClick={() => toggleVisibility(row.id)}
                  aria-expanded={editOptions[row.id] || false}
                  aria-haspopup="true"
                  className="cursor-default"
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
                    <p className="text-tred1 hover:text-gold1 cursor-pointer">Move to Trash</p>
                  </div>
                )}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
