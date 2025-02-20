import React from "react";
import UploadFileBtn from "./UploadFileBtn";
import { Button } from "@/components/ui/button";

type Props = {
  folderId: string;
  files: string[];
  error?: string;
  loading: boolean;
  createFolder: (folderId: string) => void;
};

const FilesInFolder = ({ folderId, files, error, loading, createFolder }: Props) => {
  const noOfFiles = files ? files.length : 0;

  return (
    <div className="flex flex-col justify-center items-center py-2">
      {loading ? (
        <p className="text-sm text-[#3A3A49] font-normal my-3">
          Loading files...
        </p>
      ) : // error ? (
      //   <p className="text-sm text-[#3A3A49] font-normal my-3">{error}</p>
      // )
      !files || files.length === 0 ? (
        <p className="text-sm text-[#3A3A49] font-normal my-3">
          There are 0 files in this folder.
        </p>
      ) : (
        <ul>
          {files.map((file: any) => (
            <li key={file.id}>{file.name}</li>
          ))}
        </ul>
      )}
      <div className="flex flex-col lg:flex-row gap-3 space-x-4">
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
