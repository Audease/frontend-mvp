import React from "react";
import { CiCalendar } from "react-icons/ci";
import { useLearnerDoc } from "../lib/hooks/useLearnerDoc";

interface Document {
  fileName: string;
  fileType: string;
  publicUrl: string;
}

interface DocDefaultProps {
  userId: string;
  onViewClick: () => void;
}

const DocDefault = ({ onViewClick, userId }: DocDefaultProps) => {
  const { documents, loading, error } = useLearnerDoc(userId);

  const onDocumentViewClick = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <div className="space-y-4 rounded border border-tgrey2 p-4 mb-8 h-[30rem] font-inter shadow-sm">
      <div>
        <h3 className="font-semibold text-base pb-2">Documents</h3>
        <hr className="w-3/4" />
      </div>
      
      <div className="flex flex-col md:flex-row justify-between md:w-[70%] space-y-2 md:space-y-0">
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
          <button
            onClick={onViewClick}
            className="flex flex-row bg-black text-white text-sm font-semibold py-2 px-6 rounded-lg"
          >
            View
          </button>
        </div>
      </div>
      {/* Other documents  */}
      <div className="text-center justify-center">
        {loading && (
          <p className="font-normal text-sm text-tgrey3 mt-10">
            Loading other documents ...
          </p>
        )}
        {error && (
          <p className="font-normal text-sm text-red-500 mt-10">
            Error loading documents
          </p>
        )}
        {!loading && !error && documents && documents.length > 0
          ? documents.map((document: Document, index: number) => (
              <div
                className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:justify-between md:w-[70%] py-2"
                key={index}
              >
                <div className="flex flex-row space-x-4">
                  <div className="bg-dashboardButtonsBg w-8 h-8 rounded-full flex justify-center items-center">
                    <CiCalendar className="w-6 h-6 text-dashboardButtons" />
                  </div>
                  <div>
                    <h2 className="font-medium text-sm py-2 ">
                      {document.fileName}.{document.fileType}
                    </h2>
                  </div>
                </div>
                {/* Buttons  */}
                <div className="flex flex-row ">
                  <button
                    onClick={() => onDocumentViewClick(document.publicUrl)}
                    className="flex flex-row bg-black text-white text-sm font-semibold py-2 px-6 rounded-lg"
                  >
                    View
                  </button>
                </div>
              </div>
            ))
          : !loading && (
              <p className="font-normal text-sm text-tgrey3 mt-10">
                You have no documents assigned.
              </p>
            )}
      </div>
    </div>
  );
};

export default DocDefault;
