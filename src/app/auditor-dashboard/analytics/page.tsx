import AuditorDashboardHead from "../auditorDashboardHead";
import  DoughnutChart , { LineGraph } from "./graphs"

export default function AuditorAnalytics() {
  return (
    <div className=" overflow-y-auto">
      {/* BKSD Title and Filter Button */}
      <AuditorDashboardHead />

      {/* The table  */}
      <div className="flex flex-col mt-12">
        <div className="flex flex-row space-x-6 items-center align-center justify-center">
            <div className="w-[65%] "><LineGraph /> </div>
            <div className="w-[30%]"><DoughnutChart /></div>
        </div>
        <div className="mt-5">
            <LineGraph />
        </div>
      </div>
    </div>
  );
}
