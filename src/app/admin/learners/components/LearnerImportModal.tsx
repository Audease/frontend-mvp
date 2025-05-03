"use client";

import { Modal } from "flowbite-react";
import { IoClose } from "react-icons/io5";
import { SlCloudUpload } from "react-icons/sl";
import type { CustomFlowbiteTheme } from "flowbite-react";
import { Progress } from "flowbite-react";
import { MdCancel, MdOutlineDeleteForever } from "react-icons/md";
import { useLearnerImport } from "@/app/admin/(adminPersonaScreens)/recruiter-dashboard/utils/useLearnerUpload";


const customTheme: CustomFlowbiteTheme["progress"] = {
  base: "w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700",
  label: "mb-1 flex justify-between font-medium dark:text-white",
  bar: "space-x-2 rounded-full text-center font-medium leading-none text-cyan-300 dark:text-cyan-100",
  color: {
    progressColor: "bg-dashboardButtons",
  },
  size: {
    sm: "h-1",
    md: "h-2.5",
    lg: "h-4",
    xl: "h-6",
  },
};

export default function LearnerImportModal({ show, onClose, randomFunction}) {
  const {
    fileName,
    fileSelected,
    file,
    uploadingError,
    uploadProgress,
    uploaded,
    uploading,
    handleFileUpload,
    onUploadClick,
    handleFileRemove,
  } = useLearnerImport(randomFunction);



  return (
    <div className="font-inter">
      <Modal show={show} onClose={onClose} className="modal" size={"2xl"}>
        <div className="flex flex-col p-4">
          <div className="flex flex-row justify-between items-center">
            <h2 className="font-medium text-lg text-tblack3 ml-[15rem]">
              Import Files
            </h2>
            <IoClose
              className="text-tgrey3 cursor-pointer"
              width={14}
              height={14}
              onClick={onClose}
            />
          </div>
          <hr className="my-4" />
          <div className="flex flex-col text-center justify-center items-center">
            <div className="bg-dashboardButtonsBg w-80 h-48 border-dashed border border-red-200 flex flex-col items-center justify-center">
              <div className="pb-6">
                <SlCloudUpload className="w-10 h-10 text-dashboardButtons" />
              </div>
              <div className="space-y-2">
                <input
                  type="file"
                  accept=".csv"
                  className="hidden"
                  id="fileInput"
                  onChange={handleFileUpload}
                />
                <label
                  htmlFor="fileInput"
                  className="cursor-pointer font-bold text-base"
                >
                  Select files to{" "}
                  <span className="text-dashboardButtons">Upload</span>
                </label>
                <p className="text-xs text-gray-500">
                  Supported formats: CSV
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 pt-2">
                  <span className="text-tred2 font-bold">Note:</span> Please
                  <span className="text-dashboardButtons cursor-pointer"> <a href="/file/learner_upload_template.csv" target="_blank">download</a> </span> the template before uploading your file.
                </p>
              </div>
            </div>

            {file && !uploading && (
              <div className="flex flex-col my-4">
                <div>
                  <h2 className="text-sm text-gray-500 font-bold text-left pb-2">
                    Upload
                  </h2>
                </div>
                <div className="border-2 border-tgrey2 rounded-lg shadow-sm pt-2 w-80">
                  <div className="flex flex-row justify-between px-2">
                    <p className="text-left py-1 text-xs font-normal">
                      {fileName}
                    </p>
                    <MdCancel
                      className="text-gray-400 cursor-pointer"
                      onClick={handleFileRemove}
                    />
                  </div>
                </div>
              </div>
            )}

            {uploading && (
              <div className="flex flex-col my-4">
                <div>
                  <h2 className="text-sm text-gray-500 font-bold text-left pb-2">
                    Uploading
                  </h2>
                </div>
                <div className="border-2 border-tgrey2 rounded-lg shadow-sm pt-2 w-80">
                  <div className="flex flex-row justify-between px-2">
                    <p className="text-left py-1 text-xs font-normal">
                      {fileName}
                    </p>
                    <MdCancel
                      className="text-gray-400 cursor-pointer"
                      onClick={handleFileRemove}
                    />
                  </div>
                  <Progress
                    progress={uploadProgress}
                    size="sm"
                    color="progressColor"
                    theme={customTheme}
                  />
                </div>
              </div>
            )}

            {uploaded && (
              <div className="flex flex-col my-4">
                <div>
                  <h2 className="text-sm text-gray-500 font-bold text-left pb-2">
                    Uploaded Successfully
                  </h2>
                </div>
                {/* <div className="border-2 border-green2 rounded-lg shadow-sm py-2 w-80">
                  <div className="flex flex-row justify-between px-2">
                    <p className="text-left py-1 text-xs font-normal">
                      {fileName}
                    </p>
                    <MdOutlineDeleteForever
                      className="text-tred2 cursor-pointer"
                      onClick={handleFileRemove}
                    />
                  </div> 
                </div> */}
              </div>
            )}

            {uploadingError && (
              <div className="flex flex-col mt-2">
                <div>
                  <h2 className="text-sm text-gray-500 font-bold text-left pb-2">
                    Uploading Error : <span className="text-sm text-tred2 font-medium pt-1">{uploadingError}</span>
                  </h2>
                </div>
                {/* <div className="border-2 border-tred2 rounded-lg shadow-sm py-2 w-80">
                  <div className="flex flex-row justify-between px-2">
                    <p className="text-left py-1 text-xs font-normal">
                      {fileName}
                    </p>
                    <MdCancel
                      className="text-tred2"
                      onClick={handleFileRemove}
                    />
                  </div>
                </div> */}
                <p >
                  
                </p>
              </div>
            )}

            <div className="flex items-center justify-center mt-4">
              <button
                type="button"
                className="bg-dashboardButtons hover:bg-tgrey1 text-white w-72 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline opacity-75"
                onClick={onUploadClick}
                disabled={uploading}
              >
                Upload Files
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}