import Image from "next/image";
import React, { useState } from "react";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import convertDate from "../utils/convertDate";
import { DeleteLearnerButton } from "../../(adminPersonaScreens)/recruiter-dashboard/components/RecruiterButtons";
import FilesInFolder from "./FilesInFolder";
import useGetFileInFolders from "../utils/useGetFileInFolders";
import LoadingSpinner from "@/app/components/dashboard/Spinner";

type Props = {
  folderData: any[];
  onDeleteClick: (folderId: string) => void;
};

const FolderTableList = ({ folderData, onDeleteClick }: Props) => {
  const [openFolders, setOpenFolders] = useState<Set<string>>(new Set());
  const {fetchFilesInFolder, files, loading, error} = useGetFileInFolders();

  const toggleFolder = (folderId: string) => {
    setOpenFolders((prev) => {
      const newOpenFolders = new Set(prev);
      if (newOpenFolders.has(folderId)) {
        newOpenFolders.delete(folderId);
      } else {
        newOpenFolders.add(folderId);
      }
      return newOpenFolders;
    });

    if (!openFolders.has(folderId)){
      fetchFilesInFolder(folderId)
    }
  };

  return (
    <div className="mt-4">
      {folderData.map((folder) => (
        <div key={folder.id}>
          <div
            key={folder.id}
            className="flex flex-row justify-between border-2 border-gray-50 px-4 py-2 rounded-lg shadow-sm mt-4"
          >
            <div className="flex flex-row text-center items-center space-x-6">
              <Image
                src={"/folder_icon.png"}
                alt={"folder icon"}
                height={10}
                width={30}
              />
              <p className="text-sm text-dashboardButtons">{folder.name}</p>
            </div>
            <div className="flex flex-row space-x-4 text-sm text-center items-center font-normal text-[#3A3A49] justify-between">
              <p>{convertDate(folder.createdAt).newDate}</p>
              <p>{convertDate(folder.createdAt).newTime}</p>
            </div>
            <div className="flex flex-row text-center items-center">
              <DeleteLearnerButton
                onDeleteClick={() => onDeleteClick(folder.id)}
              />
              {openFolders.has(folder.id) ? (
                <MdOutlineKeyboardArrowDown
                  className="w-10 h-10 text-gray-400"
                  onClick={() => toggleFolder(folder.id)}
                />
              ) : (
                <MdOutlineKeyboardArrowRight
                  className="w-10 h-10 text-gray-400"
                  onClick={() => toggleFolder(folder.id)}
                />
              )}
            </div>
          </div>

          <div>
            {openFolders.has(folder.id) && (
              <div className="mt-4">
                <FilesInFolder folderId={folder.id} files={files} loading={loading} error={error} />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FolderTableList;
