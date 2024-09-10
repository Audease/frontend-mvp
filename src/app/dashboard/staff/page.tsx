"use client";
import { useStaff } from "./hooks/useStaff";
import SearchBox from "../../components/dashboard/SearchBox";
import FilterButton from "../../components/dashboard/FilterButton";
import StaffTable from "./StaffTable";

export default function Staff() {
  const {
    activeTab,
    setActiveTab,
    tabs,
    dropdownOptions,
    staffData,
    checkedItems,
    setCheckedItems,
    selectedRole,
    handleRoleSelect,
    assignRole,
  } = useStaff();

  return (
    <div className="flex flex-col space-y-4">
      <div>
        <h3 className="font-medium text-2xl">Staff</h3>
      </div>

      {/* Selection and active bar */}
      <div className="flex flex-col mt-3">
        <div className="flex flex-row justify-between font-medium text-sm text-tgrey3">
          <div className="flex flex-row space-x-6">
            {tabs.map((tab) => (
              <h2
                key={tab}
                className={`cursor-pointer pt-4 ${
                  activeTab === tab ? "text-gold1" : ""
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </h2>
            ))}
          </div>

          {/* The buttons on the right side */}
          <div className="flex flex-row space-x-4">
            <SearchBox />
            <div>
              <button
                className="bg-dashboardRolesBtn text-white py-2 px-4 rounded focus:outline-none"
                onClick={assignRole}
              >
                Assign a role
              </button>
            </div>
            <FilterButton
              options={dropdownOptions}
              onSelect={() => {}}
              label="Filter"
            />
          </div>
        </div>
      </div>

       {/* The active bar color change */}
       <div className="w-full h-[0.10rem] bg-gray-300 my-2">
          <div
            className="h-[0.10rem]"
          ></div>
        </div>
      
      {/* The main body, which is the table list */}
      <div>
        <StaffTable
          staffData={staffData}
          onCheckedChange={setCheckedItems}
          onRoleSelect={handleRoleSelect}
        />
      </div>
    </div>
  );
}
