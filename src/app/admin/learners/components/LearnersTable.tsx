"use client";
import { useEffect, useState, useRef } from "react";
import LoadingSpinner from "@/app/components/dashboard/Spinner";
import Pagination from "@/app/components/dashboard/Pagination";
import { useRouter } from "next/navigation";
import { encodeId } from "../utils/id-encoded";
import { format, parseISO, isValid } from "date-fns"; // For date formatting

export default function LearnersTable({
  handleArchiveLearner,
  allLearners,
  currentPage,
  totalPages,
  totalItems,
  loading,
  handlePageChange,
}) {
  const [editOptions, setEditOptions] = useState({});
  const router = useRouter();

  const menuRef = useRef(null);

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

  const handleViewLearner = (learnerId) => {
    router.push(`/admin/learners/${encodeId(learnerId)}`);
  };
  
  // Format date to a more human-readable form
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    
    try {
      const date = parseISO(dateString);
      
      if (!isValid(date)) return "Invalid date";
      
      return format(date, "MMM d, yyyy h:mm a");
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid date";
    }
  };

  return (
    <div>
      <div className="min-h-[20rem]">
        <table className="min-w-full divide-y divide-gray-200 font-inter table-auto rounded-t-lg h-full">
          <thead className="bg-tgrey-6 border border-tgrey6 ">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-normal text-tableText tracking-wider">
                Name
              </th>
              <th className="px-4 py-3 text-left text-sm text-tableText font-normal tracking-wider">
                Username
              </th>
              <th className="px-4 py-3 text-left text-sm font-normal text-tableText tracking-wider">
                Email
              </th>
              <th className="px-4 py-3 text-left text-sm font-normal text-tableText tracking-wider">
                Last Login
              </th>
              <th className="px-4 py-3 text-left text-sm font-normal text-tableText tracking-wider">
                Funding
              </th>
              <th className="px-4 py-3 text-left text-sm font-normal text-tableText tracking-wider">
                Course
              </th>
              <th className="px-4 py-3 text-left text-sm font-normal text-tableText tracking-wider"></th>
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
                  colSpan={7}
                  className="px-4 py-4 text-center text-sm text-tableText2 font-medium"
                >
                  Nothing here
                </td>
              </tr>
            ) : (
              allLearners.map((row) => (
                <tr key={row.id} className="group">
                  <td className="px-2 py-4 whitespace-nowrap text-sm text-tableText2 font-medium flex flex-row ">
                    {row.name}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-tableText2 font-medium ">
                    {row.user?.username || "N/A"}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-tableText2 font-medium ">
                    {row.email}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-tableText2 font-medium ">
                    {row.user?.last_login_at ? formatDate(row.user.last_login_at) : "Never logged in"}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-tableText2 font-medium ">
                    {row.funding}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-tableText2 font-medium ">
                    {row.chosen_course}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-tableText2 font-medium flex flex-col justify-end relative ">
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
                        className="bg-white shadow-lg rounded-lg p-4 font-medium w-32 absolute top-full border-2 right-16 text-tblack3 space-y-4 "
                      >
                        <p
                          className="hover:text-gold1 cursor-pointer"
                          onClick={() => handleViewLearner(row.id)}
                        >
                          View
                        </p>
                        <p className="text-tred1 hover:text-gold1 cursor-pointer" onClick={() => handleArchiveLearner(row.id)}>
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