import React, { useEffect, useState } from "react";
import UploadFileBtn from "./UploadFileBtn";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  MdOutlineCheckBoxOutlineBlank,
  MdOutlineDeleteForever,
} from "react-icons/md";
import LearnersListModal from "./LearnersListModal";
import CloudinaryUploader from "./UploadFile";
import { postURLToDb } from "../utils/action";;

type Props = {
  folderId: string;
  files: Document[];
  error?: string;
  loading: boolean;
  createFolder: (folderId: string) => void;
  refetchData: () => void;
};

const FilesInFolder = ({
  folderId,
  files,
  error,
  loading,
  createFolder,
  refetchData,
}: Props) => {
  const noOfFiles = files ? files.length : 0;
  const [openLearnersModal, setOpenLearnersModal] = useState(false);

  const assignFiles = () => {
    setOpenLearnersModal(true);
  };

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const handleUploadComplete = async (result) => {
    if (result !== "Failed to upload file. Please try again.") {
      const payload = {
        fileName: result.display_name,
        fileType: result.format,
        publicUrl: result.url,
      };
      const status = await postURLToDb(folderId, payload);
      if (status === 201) {
        alert("File upload successful");
        refetchData();
      } else {
        alert("ish, there is an issue");
      }
    } else {
      alert(result);
    }
    setIsUploadModalOpen(false);
  };

  const handleFileClick = (url, format) => {
    window.open(url, "_blank");
    console.log(format)
  };

  return (
    <div className="flex flex-col py-2">
      {loading ? (
        <p className="text-sm text-[#3A3A49] font-normal my-3">
          Loading files...
        </p>
      ) : error ? (
        <p className="text-sm text-[#3A3A49] font-normal my-3">{error}</p>
      ) : !files || files.length === 0 ? (
        <p className="text-sm text-[#3A3A49] flex justify-center items-center font-normal my-1">
          There are 0 files in this folder.
        </p>
      ) : (
        <ul>
          {files.map((file: any) => (
            // <li key={file.id}>{file.fileName}</li>
            <div
              className="ml-10 flex-col flex md:flex-row space-y-2 justify-between my-3"
              key={file.id}
            >
              <div className="flex flex-row justify-start space-x-6">
                <Image
                  src={"/file_icon.png"}
                  alt={"folder icon"}
                  height={10}
                  width={30}
                />
                <p className="text-sm font-normal text-[#3A3A49]" onClick={() => handleFileClick(file.publicUrl, file.fileType)}>
                  {file.fileName}
                </p>
              </div>
              <div className="flex flex-row space-x-4 font-normal text-[#3A3A49] items-center mr-8">
                <MdOutlineDeleteForever className="text-red-600" />
                <div
                  className="group flex flex-row justify-start items-center space-x-2"
                  onClick={assignFiles}
                >
                  <MdOutlineCheckBoxOutlineBlank className="text-dashboardButtons group-hover:text-dashboardButtons" />
                  <p className="text-sm font-normal text-[#3A3A49] group-hover:text-dashboardButtons">
                    Assign document
                  </p>
                </div>
              </div>
            </div>
          ))}
        </ul>
      )}

      <LearnersListModal
        show={openLearnersModal}
        onClose={() => setOpenLearnersModal(false)}
      />
      {isUploadModalOpen && (
        <div className="modal-backdrop flex text-center justify-center my-2">
          <div className="modal-content">
            <CloudinaryUploader onUploadComplete={handleUploadComplete} />
          </div>
        </div>
      )}
      <div className="flex flex-col justify-center items-center lg:flex-row gap-3 space-x-4">
        <Button
          className="bg-dashboardButtons"
          onClick={() => createFolder(folderId)}
        >
          Create Sub-Folder
        </Button>
        <UploadFileBtn
          onUploadClick={() => setIsUploadModalOpen(!isUploadModalOpen)}
        />
      </div>
    </div>
  );
};

export default FilesInFolder;
