import React, { useState } from "react";
import { Folder } from "../utils/useGetFolders";
import FilesInFolder from "./FilesInFolder";
import Image from "next/image";
import { DeleteLearnerButton } from "../../(adminPersonaScreens)/recruiter-dashboard/components/RecruiterButtons";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

interface FolderItemProps {
  folder: Folder;
  onToggle: (folderId: string) => void;
  onDelete: (folderId: string) => void;
  convertDate: (dateString: string) => { newDate: string; newTime: string };
  textClassName?: string;
  files: any[];
  loading: boolean;
  error: string | null;
  createFolder: (folderId: string) => void;
}

const FolderItem: React.FC<FolderItemProps> = ({
  folder,
  onToggle,
  onDelete,
  convertDate,
  createFolder,
  textClassName = "text-sm text-dashboardButtons",
  files,
  loading,
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
    onToggle(folder.id);
  };

  return (
    <div>
      {/* Folder Header */}
      <div className="flex flex-col md:flex-row justify-between bg-white/100 border-2 border-gray-50 px-4 py-2 rounded-lg shadow-md mt-4">
        <div className="flex flex-row text-center items-center space-x-6">
          <Image
            src={"/folder_icon.png"}
            alt={"folder icon"}
            height={10}
            width={30}
          />
          <p className={textClassName}>{folder.name}</p>
        </div>
        <div className="flex flex-row space-x-4 text-sm text-center items-center font-normal text-[#3A3A49] justify-between mt-2 md:mt-0">
          <p>{convertDate(folder.createdAt).newDate}</p>
          <p>{convertDate(folder.createdAt).newTime}</p>
        </div>
        <div className="flex flex-row text-center items-center mt-2 md:mt-0">
          <DeleteLearnerButton onDeleteClick={() => onDelete(folder.id)} />
          {isOpen ? (
            <MdOutlineKeyboardArrowDown
              className="w-10 h-10 text-gray-400 cursor-pointer"
              onClick={handleToggle}
            />
          ) : (
            <MdOutlineKeyboardArrowRight
              className="w-10 h-10 text-gray-400 cursor-pointer"
              onClick={handleToggle}
            />
          )}
        </div>
      </div>

      {/* Folder Content (Files and Subfolders) */}
      {isOpen && (
        <div>
          {/* Recursively Render Subfolders */}
          {folder.subFolders && folder.subFolders.length > 0 && (
            <div className="ml-4 md:ml-10">
              {folder.subFolders.map((subFolder) => (
                <FolderItem
                  key={subFolder.id}
                  folder={subFolder}
                  onToggle={onToggle}
                  onDelete={onDelete}
                  convertDate={convertDate}
                  textClassName="text-sm text-green-500"
                  files={files}
                  loading={loading}
                  error={error}
                  createFolder={() => createFolder(subFolder.id)}
                />
              ))}
            </div>
          )}

          <div className="mt-4">
            <FilesInFolder
              folderId={folder.id}
              files={files}
              loading={loading}
              error={error}
              createFolder={() => createFolder(folder.id)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FolderItem;