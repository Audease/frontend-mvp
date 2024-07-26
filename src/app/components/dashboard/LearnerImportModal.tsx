"use client";

import { Modal } from "flowbite-react";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import { SlCloudUpload } from "react-icons/sl";
import type { CustomFlowbiteTheme } from "flowbite-react";
import { Progress } from "flowbite-react";
import { useState } from "react";
import { MdCancel, MdOutlineDeleteForever } from "react-icons/md";

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

export default function LearnerImportModal({ show, onClose, onCreateClick }) {
  const [fileName, setFileName] = useState("File Name");
  const [fileSelected, setFileSelected] = useState(false);
  const [uploadingError, setUploadingError] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploaded, setUploaded] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      setUploading(true);
      setUploadProgress(0);
      setUploadingError("");

      // Mock upload process
      const uploadInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(uploadInterval);
            setUploading(false);
            setUploaded(true);
            return 100;
          }
          return prev + 10;
        });
      }, 500);
    }
  };

  const handleFileRemove = () => {
    setFileName("File Name");
    setUploadingError("");
    setUploading(false);
    setUploaded(false);
    setUploadProgress(0);
  };

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
            <div className="bg-dashboardButtonsBg w-80 h-60 border-dashed border border-red-200 flex flex-col items-center justify-center">
              <div className="pb-12">
                <SlCloudUpload className="w-12 h-12 text-dashboardButtons" />
              </div>
              <div className="space-y-2">
                <input
                  type="file"
                  className="hidden"
                  id="fileInput"
                  onChange={handleFileUpload}
                />
                <label
                  htmlFor="fileInput"
                  className="cursor-pointer font-bold text-base"
                >
                  Drag & drop files or{" "}
                  <span className="text-dashboardButtons">Browse</span>
                </label>
                <p className="text-xs text-gray-500">
                  Supported formats: PDF, DOCS, DOCX
                </p>
              </div>
            </div>

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
                    Uploaded
                  </h2>
                </div>
                <div className="border-2 border-green2 rounded-lg shadow-sm py-2 w-80">
                  <div className="flex flex-row justify-between px-2">
                    <p className="text-left py-1 text-xs font-normal">
                      {fileName}
                    </p>
                    <MdOutlineDeleteForever
                      className="text-tred2 cursor-pointer"
                      onClick={handleFileRemove}
                    />
                  </div>
                </div>
              </div>
            )}

            {uploadingError && (
              <div className="flex flex-col my-4">
                <div>
                  <h2 className="text-sm text-gray-500 font-bold text-left pb-2">
                    Uploading Error
                  </h2>
                </div>
                <div className="border-2 border-tred2 rounded-lg shadow-sm py-2 w-80">
                  <div className="flex flex-row justify-between px-2">
                    <p className="text-left py-1 text-xs font-normal">
                      {fileName}
                    </p>
                    <MdCancel className="text-tred2" />
                  </div>
                </div>
                <p className="text-[10px] text-tred2 font-medium pt-1">
                  {uploadingError}
                </p>
              </div>
            )}

            <div className="flex items-center justify-center mt-4">
              <button
                type="button"
                className="bg-dashboardButtons hover:bg-tgrey1 text-white w-72 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline opacity-75"
                onClick={onCreateClick}
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

export function LearnerImportSuccessModal({ show, onClose }) {
  return (
    <div>
      <Modal show={show} onClose={onClose} className="modal p-10" size={"2xl"}>
        <div className="flex flex-col text-center items-center py-16 font-inter">
          <Image
            src={"/role_success.png"}
            width={79}
            height={79}
            alt="Success"
            className="pb-8"
          />
          <h3 className="text-2xl font-bold pb-4">Upload completed</h3>
          <p className="font-normal text-lg">You can view them now</p>
        </div>

        <div className="flex items-center justify-center mb-6">
          <button
            type="button"
            className="bg-dashboardButtons hover:bg-tgrey1 text-white w-96 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={onClose}
          >
            Go to Dashboard
          </button>
        </div>
      </Modal>
    </div>
  );
}