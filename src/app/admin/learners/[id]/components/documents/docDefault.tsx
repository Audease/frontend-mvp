import React, { useState } from "react";
import { CiCalendar } from "react-icons/ci";

interface DocDefaultProps {
  userId: string;
  onViewClick: () => void;
}

const DocDefault = ({ onViewClick, userId }: DocDefaultProps) => {
  // I want to fetch all the available documents per profile and also allow admin to add documents accross profiles
  const [documents, setDocuments] = useState<any[]>([]);

  return (
    <div className="space-y-4 rounded border border-tgrey2 p-4 mb-8 h-[30rem] font-inter shadow-sm">
      <div>
        <h3 className="font-semibold text-base pb-2">Documents</h3>
        <hr className="w-3/4" />
      </div>
      <div className="flex flex-row space-x-[27rem]">
        <div className="flex flex-row space-x-4">
          <div className="bg-dashboardButtonsBg w-8 h-8 rounded-full flex justify-center items-center">
            <CiCalendar className="w-6 h-6 text-dashboardButtons" />
          </div>
          <div>
            <h2 className="font-medium text-sm py-2">Application form</h2>
          </div>
        </div>
        {/* Buttons  */}
        <div className="flex flex-row space-x-6">
          <button className="flex flex-row bg-dashboardButtonsBg text-dashboardButtons text-sm font-semibold py-2 px-6 rounded-lg">
            Download
          </button>
          <button
            onClick={onViewClick}
            className="flex flex-row bg-black text-white text-sm font-semibold py-2 px-6 rounded-lg"
          >
            View
          </button>
        </div>
      </div>
      <div className="text-center justify-center">
        <p className="font-normal text-sm text-tgrey3 mt-10">
          All documents and files comes here
        </p>
      </div>
    </div>
  );
};

export default DocDefault;
