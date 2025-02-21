import React, { useState } from "react";
import UploadFileBtn from "./UploadFileBtn";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  MdOutlineCheckBoxOutlineBlank,
  MdOutlineDeleteForever,
} from "react-icons/md";
import LearnersListModal from "./LearnersListModal";

type Props = {
  folderId: string;
  files: string[];
  error?: string;
  loading: boolean;
  createFolder: (folderId: string) => void;
};

const FilesInFolder = ({
  folderId,
  files,
  error,
  loading,
  createFolder,
}: Props) => {
  const noOfFiles = files ? files.length : 0;
  const [openLearnersModal, setOpenLearnersModal] = useState(false);

  const assignFiles = () => {
    setOpenLearnersModal(true);
  };

  return (
    <div className="flex flex-col py-2">
      {loading ? (
        <p className="text-sm text-[#3A3A49] font-normal my-3">
          Loading files...
        </p>
      ) : // error ? (
      //   <p className="text-sm text-[#3A3A49] font-normal my-3">{error}</p>
      // )
      !files || files.length === 0 ? (
        <p className="text-sm text-[#3A3A49] flex justify-center items-center font-normal my-1">
          {/* There are 0 files in this folder. */}
        </p>
      ) : (
        <ul>
          {files.map((file: any) => (
            <li key={file.id}>{file.name}</li>
          ))}
        </ul>
      )}

      <div className="ml-10 flex-col flex md:flex-row space-y-2 justify-between my-3">
        <div className="flex flex-row justify-start space-x-6">
          <Image
            src={"/file_icon.png"}
            alt={"folder icon"}
            height={10}
            width={30}
          />
          <p className="text-sm font-normal text-[#3A3A49]">My File.jpg</p>
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
      
      <LearnersListModal show={openLearnersModal} onClose={() => setOpenLearnersModal(false)} />

      <div className="flex flex-col justify-center items-center lg:flex-row gap-3 space-x-4">
        <Button
          className="bg-dashboardButtons"
          onClick={() => createFolder(folderId)}
        >
          Create Sub-Folder
        </Button>
        <UploadFileBtn onUploadClick={() => console.log(folderId)} />
      </div>
    </div>
  );
};

export default FilesInFolder;
