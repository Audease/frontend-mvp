import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export default function RoleTable({ data, roleIcons }) {
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
      setEditOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
        {data.length === 0 ? (
          <tr className="border-b">
            <td
              colSpan={3}
              className="px-6 py-4 text-center text-sm text-tableText2 font-medium"
            >
              Nothing here
            </td>
          </tr>
        ) : (
          data.map((row) => (
            <tr key={row.id}>
              <td className="px-6 py-4 whitespace-nowrap test-sm text-tableText2 font-medium">
                <span>
                  <Image
                    src={getRoleIcon(row.role)}
                    width={12}
                    height={12}
                    alt="role icon"
                  />
                </span>
                {row.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap test-sm text-tableText2 font-medium">
                {row.updated}
              </td>
              <td className="px-6 py-4 whitespace-nowrap test-sm text-tableText2 font-medium">
                {row.lastEditor}
              </td>
              <td
                className="px-6 py-4 whitespace-nowrap test-sm text-tableText2 font-medium flex flex-col justify-end"
                onClick={() => toggleVisibility(row.id)}
                aria-expanded={editOptions[row.id] || false}
                aria-haspopup="true"
              >
                ...
                {editOptions && (
                  <div className="bg-white shadow-lg rounded-lg p-4 font-medium w-32">
                    <p>Edit</p>
                    <p>Rename</p>
                    <p>Duplicate</p>
                    <p>Move to folder</p>
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
