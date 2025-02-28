"use client";

import React, { useEffect, useState } from "react";
import FolderHead from "./components/FolderHead";
import CreateFolderModal from "./components/CreateFolderModal";
import useFolderModal from "./utils/useFolderModal";
import FolderTableList from "./components/FolderTableList";
import useGetFolders from "./utils/useGetFolders";
import EmptyScreen from "./components/EmptyScreen";
import LoadingSpinner from "@/app/components/dashboard/Spinner";

const Page = () => {
  const {
    showModal,
    folderCreationSuccess,
    folderCreationError,
    loading: modalLoading,
    createFolder,
    folderCreate,
    OnClose,
  } = useFolderModal();

  const { folderData, loading2, error, getFolders } = useGetFolders();
  const [key, setKey] = useState(0);

  const handleClose = () => {
    OnClose();
    setKey((prevKey) => prevKey + 1); 
  };

  useEffect(() => {
    getFolders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return (
    <div>
      <FolderHead createFolder={() => createFolder("")} />
      <div>
        <h3 className="font-medium text-lg">Folders</h3>
      </div>
      <div className="h-min-[40rem] bg-white">
        {loading2 ? (
          <div className="flex justify-center items-center">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : folderData ? (
          <FolderTableList
            folderData={folderData}
            onDeleteClick={(folderId) => console.log(`Deleting Page folder: ${folderId}`)}
            createFolder={createFolder}
          />
        ) : (
          <EmptyScreen createFolder={() => createFolder("")} />
        )}

        <CreateFolderModal
          show={showModal}
          loading={modalLoading}
          folderCreationSuccess={folderCreationSuccess}
          folderCreationError={folderCreationError}
          onClose={handleClose}
          onCreate={(folderName) => folderCreate(folderName)}
        />
      </div>
    </div>
  );
};

export default Page;
