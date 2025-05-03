import React, { useState } from "react";
import convertDate from "../utils/convertDate";
import FolderItem from "./FolderItem";
import EmptyScreen from "./EmptyScreen";
import Image from "next/image";

type Props = {
  folderData;
  onDeleteClick: (folderId: string) => void;
  createFolder: (folderId: string) => void;
  refetchData: () => void;
};

const FolderTableList = ({
  folderData,
  onDeleteClick,
  createFolder,
  refetchData,
}: Props) => {
  const handleToggle = (folderId: string) => {
    // Do anything with toggled folder
  };

  const folderContent = folderData?.data;

  if (!folderContent || folderContent.length === 0) {
    return <EmptyScreen createFolder={() => createFolder("")} />;
  }

  return (
    <div className="mt-4">
      {/* Application Form Folder  */}
      {/* <div className="flex flex-col md:flex-row justify-between bg-white/100 border-2 border-gray-50 px-4 py-2 rounded-lg shadow-md mt-4">
        <div className="flex flex-row text-center items-center space-x-6">
          <Image
            src={"/folder_icon.png"}
            alt={"folder icon"}
            height={10}
            width={30}
          />
          <p className="text-sm text-dashboardButtons">Application Form</p>
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
      </div> */}
      {folderContent.map((folder) => (
        <FolderItem
          key={folder.id}
          folder={folder}
          onToggle={handleToggle}
          onDelete={onDeleteClick}
          convertDate={convertDate}
          files={folder.documents}
          loading={false}
          error={null}
          createFolder={createFolder}
          refetchData={refetchData}
        />
      ))}
    </div>
  );
};

export default FolderTableList;
