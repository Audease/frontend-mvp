"use client";
import LoadingSpinner from "../../../components/dashboard/Spinner";

export default function LearnerModalTable({
  checkedItems,
  handleCheckboxChange,
  isEditing,
  loading,
  allLearners,
  handleInputChange,
}) {
  return (
    <div className="flex flex-col justify-between  w-full overflow-x-auto overflow-y-auto">
      <table className="min-w-full divide-y divide-gray-200 font-inter table-auto rounded-t-lg h-full">
        <thead className="bg-tgrey-6 border border-tgrey6 ">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-normal text-tableText tracking-wider">
              Name
            </th>
            <th className="px-4 py-3 text-left text-xs font-normal text-tableText tracking-wider">
              Email address
            </th>
            <th className="px-4 py-3 text-left text-xs font-normal text-tableText tracking-wider">
              Funding
            </th>
            <th className="px-4 py-3 text-left text-xs font-normal text-tableText tracking-wider">
              Level
            </th>
            <th className="px-4 py-3 text-left text-xs font-normal text-tableText tracking-wider">
              Chose course
            </th>
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
                colSpan={11}
                className="px-4 py-4 text-center justify-center text-sm text-tableText2 font-medium"
              >
                Nothing here
              </td>
            </tr>
          ) : (
            allLearners.map((row) => (
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
                  {isEditing && checkedItems[row.id] ? (
                    <input
                      type="text"
                      value={row.name}
                      onChange={(e) =>
                        handleInputChange(row.id, "name", e.target.value)
                      }
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
                      value={row.email}
                      onChange={(e) =>
                        handleInputChange(row.id, "email", e.target.value)
                      }
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
                      value={row.funding}
                      onChange={(e) =>
                        handleInputChange(row.id, "funding", e.target.value)
                      }
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
                      onChange={(e) =>
                        handleInputChange(row.id, "level", e.target.value)
                      }
                      className="p-0 border-none  whitespace-nowrap text-[10px] text-tblack3 font-medium  focus:ring-tgrey1 rounded-sm px-1 w-20"
                    />
                  ) : (
                    row.level
                  )}
                </td>

                <td className="px-4 py-4 whitespace-nowrap text-[10px] text-tableText2 font-medium">
                  {isEditing && checkedItems[row.id] ? (
                    <select
                      name=""
                      id=""
                      className="p-0 border-none  whitespace-nowrap text-[10px] text-tblack3 font-medium  focus:ring-tgrey1 rounded-sm px-1 space-y-2"
                    >
                      <option value="">Adultcare</option>
                      <option value="">Children Care</option>
                    </select>
                  ) : (
                    row.chosen_course
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
