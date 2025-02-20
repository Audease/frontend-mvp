import React, { useState } from "react";
import convertDate from "../utils/convertDate";
import FolderItem from "./FolderItem";
import EmptyScreen from "./EmptyScreen";

type Props = {
  folderData;
  onDeleteClick: (folderId: string) => void;
  createFolder: (folderId: string) => void;
};

const FolderTableList = ({ folderData, onDeleteClick, createFolder }: Props) => {
  
  const handleToggle = (folderId: string) => {
    // Do anything with toggled folder
  };

  const folderContent = folderData?.data;

  if (!folderContent || folderContent.length === 0) {
    return <EmptyScreen createFolder={() => createFolder("")} />; 
  }

  return (
    <div className="mt-4">
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
          createFolder={() => createFolder(folder.id)}
        />
      ))}
    </div>
  );
};

export default FolderTableList;
