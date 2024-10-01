import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { fetchRoles } from "../../utils/fetchRoles";
import { useRouter } from "next/navigation";
import LoadingSpinner from "../../../components/dashboard/Spinner";

export default function RoleTable() {
  const [availableRoles, setAvailableRoles] = useState([]);
  const [editOptions, setEditOptions] = useState({});
  const [loading, setLoading] = useState(false);
  const menuRef = useRef(null);
  const router = useRouter();

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
      setLoading(true);
      const allRoles = await fetchRoles();
      if (allRoles) {
        setAvailableRoles(allRoles);
      }
      setLoading(false);
    };

    roleData();
  }, []);

  // const dataIcons = [
  //   { rolePermision: "Add student", roleIcon: "/role.svg" },
  //   { rolePermision: "staff", roleIcon: "/staffIcon.png" },
  //   { rolePermision: "learner", roleIcon: "/learnerIcon.png" },
  //   { rolePermision: "resource", roleIcon: "/resourcesIcon.png" },
  //   { rolePermision: "form", roleIcon: "/formIcon.png" },
  // ];

  // const getRoleIcon = (role) => {
  //   const foundIcon = dataIcons.find((icon) => role.includes(icon.rolePermision));
  //   return foundIcon ? foundIcon.roleIcon : "";
  // };

  const permissionsMap = [
    {
      label: "Add student",
      route: "/admin/recruiter-dashboard",
    },
    {
      label: "Send Application",
      route: "/admin/bksd-dashboard",
    },
    {
      label: "Approve/reject application",
      route: "/admin/accessor-dashboard",
    },
    {
      label: "Induction",
      route: "/admin/induction-dashboard",
    },
    {
      label: "Learning Platform",
      route: "/admin/lazer-dashboard",
    },
    {
      label: "Audit",
      route: "/admin/auditor-dashboard",
    },
    {
      label: "Certificate",
      route: "/admin/certificate-dashboard",
    },
  ];

  const handleRoleClick = (permissions) => {
    if (permissions.length > 4) {
      return router.push("/admin");
    } else {
      for (const permissionMap of permissionsMap) {
        if (permissions.includes(permissionMap.label)) {
          return router.push(permissionMap.route);
        }
      }
    }
  };

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
        {loading ? (
          <tr className="border-b">
            <td
              colSpan={7}
              className="px-4 py-4 text-center text-sm text-tableText2 font-medium"
            >
             <LoadingSpinner />
            </td>
          </tr>
        ) : availableRoles.length === 0 ? (
          <tr className="border-b">
            <td
              colSpan={4}
              className="px-6 py-4 text-center text-sm text-tableText2 font-medium"
            >
              Nothing here
            </td>
          </tr>
        ) : (
          availableRoles.map((row, index) => (
            <tr key={index}>
              <td
                className="px-6 py-4 whitespace-nowrap text-sm  text-tableText2 font-medium flex flex-row cursor-pointer"
                onClick={() => handleRoleClick(row.permissions)}
              >
                <span className="pr-4">
                  <Image
                    src={"/role.svg"}
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
                  onClick={() => toggleVisibility(index)}
                  aria-expanded={editOptions[index] || false}
                  aria-haspopup="true"
                  className="cursor-default"
                >
                  ...
                </p>
                {editOptions[index] && (
                  <div
                    ref={menuRef}
                    className="bg-white shadow-lg rounded-lg p-4 font-medium w-32 absolute top-full border-2 right-20 text-tblack3 space-y-4 "
                  >
                    <p className="hover:text-gold1 cursor-pointer">Edit</p>
                    {/* <p className="hover:text-gold1 cursor-pointer">Rename</p>
                    <p className="hover:text-gold1 cursor-pointer">Duplicate</p>
                    <p className="hover:text-gold1 cursor-pointer">Move to folder</p> */}
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
  );
}
