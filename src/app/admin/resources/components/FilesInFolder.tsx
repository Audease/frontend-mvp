import React from "react";
import UploadFileBtn from "./UploadFileBtn";

type Props = {
  folderId: string;
  files: string[];
  error?: string;
  loading: boolean;
};

const FilesInFolder = ({ folderId, files, error, loading }: Props) => {
  const noOfFiles = files ? files.length : 0;

  return (
    <div className="flex flex-col justify-center items-center py-2">
      {loading ? (
        <p className="text-sm text-[#3A3A49] font-normal my-3">
          Loading files...
        </p>
      ) : error ? (
        <p className="text-sm text-[#3A3A49] font-normal my-3">{error}</p>
      ) : !files || files.length === 0 ? (
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

      <UploadFileBtn
        onUploadClick={() => console.log("Upload button clicked")}
      />
    </div>
  );
};

export default FilesInFolder;
