import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { fetchRoles } from "../../utils/fetchRoles";
import { fetchArchivedRoles } from "../../utils/fetchArchivedRoles";
import { useRouter } from "next/navigation";
import LoadingSpinner, {
  LoadingSpinner2,
} from "../../../components/dashboard/Spinner";
import { Tooltip, Modal } from "flowbite-react";
import NextTopLoader from "nextjs-toploader";
import { useCreateRole } from "../hooks/useRoleCreate";
import { IoClose } from "react-icons/io5";

export default function RoleTable({ activeTab = "All" }) {
  const [roles, setRoles] = useState([]);
  const [editOptions, setEditOptions] = useState({});
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [archiveReason, setArchiveReason] = useState("");
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const [selectedRoleId, setSelectedRoleId] = useState(null);
  const [selectedRoleName, setSelectedRoleName] = useState("");
  const menuRef = useRef(null);
  const router = useRouter();
  const { roleDataKey } = useCreateRole();

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

  // Fetch roles based on active tab
  const fetchRolesData = async (forceRefresh = false) => {
    setLoading(true);
    let fetchedRoles = [];

    if (activeTab === "Archive") {
      // Use no-cache option to prevent caching for archived roles
      const archivedRoles = await fetchArchivedRoles(forceRefresh);
      if (archivedRoles) {
        fetchedRoles = archivedRoles;
      }
    } else if (activeTab === "Recent") {
      const recentRoles = await fetchRoles("desc");
      if (recentRoles) {
        fetchedRoles = recentRoles;
      }
    } else {
      const allRoles = await fetchRoles();
      if (allRoles) {
        fetchedRoles = allRoles;
      }
    }

    setRoles(fetchedRoles);
    setLoading(false);
  };

  useEffect(() => {
    fetchRolesData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, roleDataKey]);

  // Archive a role
  const handleArchiveRole = async () => {
    if (!selectedRoleId || !archiveReason.trim()) return;

    setLoading2(true);
    try {
      const response = await fetch(
        `/api/archiveRole?roleId=${selectedRoleId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ reason: archiveReason }),
        }
      );

      if (response.ok) {
        // Remove the archived role from the current view immediately
        setRoles((prevRoles) =>
          prevRoles.filter((role) => role.id !== selectedRoleId)
        );

        setShowArchiveModal(false);
        setArchiveReason("");
        setSelectedRoleId(null);
        setSelectedRoleName("");
      }
    } catch (error) {
      console.error("Error archiving role:", error);
    }
    setLoading2(false);
  };

  // Unarchive a role
  const handleUnarchiveRole = async (roleId) => {
    setLoading2(true);
    // Close any open edit options
    setEditOptions({});

    try {
      const response = await fetch(`/api/unarchiveRole?roleId=${roleId}`, {
        method: "POST",
      });

      if (response.ok) {
        // Remove the unarchived role from the archived view immediately
        setRoles((prevRoles) => prevRoles.filter((role) => role.id !== roleId));
      }
    } catch (error) {
      console.error("Error unarchiving role:", error);
    }
    setLoading2(false);
  };

  // Open archive modal
  const openArchiveModal = (roleId, roleName) => {
    setSelectedRoleId(roleId);
    setSelectedRoleName(roleName);
    setArchiveReason("");
    setShowArchiveModal(true);
    // Close any open edit options
    setEditOptions({});
  };

  const permissionsMap = [
    {
      label: "Add student",
      title: "Recruiter dashboard",
      route: "/admin/recruiter-dashboard",
    },
    {
      label: "Send Application",
      title: "Initial Assessment Dashboard",
      route: "/admin/bksd-dashboard",
    },
    {
      label: "Approve/reject application",
      title: "Accessor dashboard",
      route: "/admin/accessor-dashboard",
    },
    {
      label: "Induction",
      title: "Inductor dashboard",
      route: "/admin/induction-dashboard",
    },
    {
      label: "Learning Platform",
      title: "Lazer dashboard",
      route: "/admin/lazer-dashboard",
    },
    {
      label: "Audit",
      title: "Auditor dashboard",
      route: "/admin/auditor-dashboard",
    },
    {
      label: "Certificate",
      title: "Certificate dashboard",
      route: "/admin/certificate-dashboard",
    },
  ];

  const handleRoleClick = (permissions) => {
    setLoading2(true);
    for (const permissionMap of permissionsMap) {
      if (permissions === permissionMap.label) {
        return router.push(permissionMap.route);
      }
    }
    setLoading2(false);
  };

  return (
    <>
      <table className="min-w-full divide-y divide-gray-200 font-inter relative">
        <thead className="bg-tgrey5 border border-tgrey6 rounded-full">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-normal text-tableText tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-sm text-tableText font-normal tracking-wider">
              {activeTab === "Archive" ? "Archived" : "Updated"}
            </th>
            <th className="px-6 py-3 text-left text-sm font-normal text-tableText tracking-wider">
              {activeTab === "Archive" ? "Archive Reason" : "Last editor"}
            </th>
            <th className="px-6 py-3 text-left text-sm font-normal text-tableText tracking-wider"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {loading2 && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 backdrop-blur-sm z-10">
              <LoadingSpinner2 />
            </div>
          )}
          {loading ? (
            <tr className="border-b">
              <td
                colSpan={7}
                className="px-4 py-4 text-center text-sm text-tableText2 font-medium"
              >
                <LoadingSpinner />
              </td>
            </tr>
          ) : roles.length === 0 ? (
            <tr className="border-b">
              <td colSpan={4} className="px-6 py-4">
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="text-gray-400 mb-4">
                    <svg
                      className="w-16 h-16"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <p className="text-sm text-tableText2 font-medium mb-2">
                    {activeTab === "Archive"
                      ? "No archived roles found"
                      : activeTab === "Recent"
                      ? "No recent roles found"
                      : "No roles found"}
                  </p>
                  <p className="text-xs text-tgrey3">
                    {activeTab === "Archive"
                      ? "Roles moved to trash will appear here"
                      : activeTab === "Recent"
                      ? "Newly created roles will appear here"
                      : "Create a role to get started"}
                  </p>

                  {/* Refresh button for Archive tab */}
                  {activeTab === "Archive" && (
                    <button
                      onClick={() => fetchRolesData(true)}
                      className="mt-4 text-sm text-dashboardButtons hover:text-gold1 flex items-center"
                    >
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                      Refresh
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ) : (
            roles.map((row, index) => (
              <tr key={index}>
                <Tooltip
                  content={
                    <div>
                      {row.permissions.map((permission, index) => {
                        const matchedPermission = permissionsMap.find(
                          (permissionMap) => permission === permissionMap.label
                        );

                        return (
                          <div
                            key={index}
                            onClick={() => handleRoleClick(permission)}
                            className="block py-1 text-black hover:text-tgrey1 cursor-pointer"
                          >
                            {matchedPermission
                              ? matchedPermission.title
                              : permission}
                          </div>
                        );
                      })}
                    </div>
                  }
                  placement="right"
                  animation="duration-1000"
                  className="bg-tgrey5"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-tableText2 font-medium flex flex-row cursor-pointer">
                    <span className="pr-4">
                      <Image
                        src="/role.svg"
                        width={18}
                        height={18}
                        alt="role icon"
                      />
                    </span>
                    {row.role}
                  </td>
                </Tooltip>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-tableText2 font-medium">
                  {activeTab === "Archive" ? row.archivedDate : row.createdDate}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-tableText2 font-medium">
                  {activeTab === "Archive" ? (
                    <Tooltip
                      content={row.archiveReason || "No reason provided"}
                      placement="top"
                    >
                      <span className="truncate block max-w-[200px]">
                        {row.archiveReason || "No reason provided"}
                      </span>
                    </Tooltip>
                  ) : (
                    row.lastEditor
                  )}
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
                      className="bg-white shadow-lg rounded-lg p-4 font-medium w-32 absolute 
               transform -translate-y-1/2 right-10 text-tblack3 space-y-4 z-20"
                      style={{
                        // Position above or below based on available space
                        top: "auto",
                        bottom: "auto",
                        ...(window.innerHeight -
                          document.documentElement.scrollTop <
                        200
                          ? { bottom: "100%" }
                          : { top: "0" }),
                      }}
                    >
                      {/* {activeTab !== "Archive" && (
                        <p className="hover:text-gold1 cursor-pointer">Edit</p>
                      )} */}
                      <hr />
                      {activeTab === "Archive" ? (
                        <p
                          className="text-green-600 hover:text-gold1 cursor-pointer"
                          onClick={() => handleUnarchiveRole(row.id)}
                        >
                          Restore
                        </p>
                      ) : (
                        <p
                          className="text-tred1 hover:text-gold1 cursor-pointer"
                          onClick={() => openArchiveModal(row.id, row.role)}
                        >
                          Archive
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

      {/* Archive tab header with refresh button */}
      {activeTab === "Archive" && roles.length > 0 && (
        <div className="flex justify-end mt-2">
          <button
            onClick={() => fetchRolesData(true)}
            className="text-sm text-dashboardButtons hover:text-gold1 flex items-center"
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Refresh
          </button>
        </div>
      )}

      {/* Archive Modal */}
      <Modal
        show={showArchiveModal}
        onClose={() => setShowArchiveModal(false)}
        size="md"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Archive Role</h3>
            <button
              onClick={() => setShowArchiveModal(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <IoClose size={24} />
            </button>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-600">
              You&apos;re about to archive{" "}
              <span className="font-semibold">{selectedRoleName}</span>
            </p>
            <p className="text-sm text-gray-600 mt-2 mb-4">
              Please provide a reason for archiving this role. This helps keep
              track of why changes were made.
            </p>
            <textarea
              className="w-full border border-gray-300 rounded-md p-2 text-sm"
              rows={3}
              placeholder="Reason for archiving..."
              value={archiveReason}
              onChange={(e) => setArchiveReason(e.target.value)}
            ></textarea>
            {archiveReason.trim() === "" && (
              <p className="text-xs text-red-500 mt-1">
                A reason is required to archive this role
              </p>
            )}
          </div>

          <div className="flex justify-end space-x-2">
            <button
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md text-sm"
              onClick={() => setShowArchiveModal(false)}
            >
              Cancel
            </button>
            <button
              className={`px-4 py-2 ${
                archiveReason.trim() === ""
                  ? "bg-red-300"
                  : "bg-red-500 hover:bg-red-600"
              } text-white rounded-md text-sm`}
              onClick={handleArchiveRole}
              disabled={archiveReason.trim() === ""}
            >
              Archive
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
