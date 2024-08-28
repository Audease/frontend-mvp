import AuditorDashboardHead from "../auditorDashboardHead";
import DoughnutChart, { FundingGraphs, LineGraph } from "./graphs";
import { RiDraggable } from "react-icons/ri";

export default function AuditorAnalytics() {
  return (
    <div className=" ">
      {/* Auditor Dahsboard */}
      <AuditorDashboardHead />

      {/* The Graphs  */}
      <div className="flex flex-col my-12">
        <div className="flex flex-row space-x-6 justify-center ">
          <div className="w-[65%]">
            <LineGraph />
          </div>
          <div className="w-[30%]">
            <DoughnutChart />
          </div>
        </div>

        {/* The graphs */}
        <div className="m-6 border border-gray-200 shadow-xl rounded-md p-4 ">
          <div className="flex flex-row justify-between px-6 items-center">
            <div>
              <h3 className="font-medium text-lg">
              Funding bodies
              </h3>
              <p className="font-normal text-sm text-tgrey3">
              Bodies with graph analysis
              </p>
            </div>
            <div>
              <RiDraggable className="w-6 h-6" />
            </div>
          </div>
          <div>
           <FundingGraphs />
          </div>
        </div>
      </div>
    </div>
  );
}
