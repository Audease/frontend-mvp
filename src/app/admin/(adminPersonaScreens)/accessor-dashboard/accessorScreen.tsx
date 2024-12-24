
import AccessorDashboardTable from "./components/AccessorDashboardTable";
import AccessorDashboardHeader from "./components/AccessorDashboardHeader";
import AccessorStaffButton from "./components/AccessorStaffButton";
import AccessorFilterButton from "./components/AccessorFilterButton";

export default function Accessor({ onViewChange, showHeader }) {

  return (
    <div className="h-screen overflow-y-auto">
      {/* Accessor Title and Filter Button */}
      <div className="flex flex-row justify-between">
        {showHeader && <AccessorDashboardHeader />}

        <div className="flex flex-row space-x-4">
          {/* View Staff Button  */}
          {showHeader && <AccessorStaffButton />}
          {showHeader && <AccessorFilterButton />}
        </div>
      </div>

      {/* The table  */}
      <div className="mt-6">
        <AccessorDashboardTable onViewChange={onViewChange} />
      </div>
    </div>
  );
}
