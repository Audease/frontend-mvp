"use client";

import React, { useEffect, useState } from "react";
import FolderHead from "./components/FolderHead";
import CreateFolderModal from "./components/CreateFolderModal";
import useFolderModal from "./utils/useFolderModal";
import FolderTableList from "./components/FolderTableList";
import useGetFolders from "./utils/useGetFolders";
import EmptyScreen from "./components/EmptyScreen";
import LoadingSpinner from "@/app/components/dashboard/Spinner";
import { adminFolderListRevalidation } from "@/app/action";
import { DeleteFolder } from "./components/DeleteModal";
import { deleteFolder } from "./utils/action";

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
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [key, setKey] = useState(0);

  const handleClose = () => {
    OnClose();
    setKey((prevKey) => prevKey + 1);
  };

  const handleUIUpdate = async () => {
    await getFolders();
    adminFolderListRevalidation();
    setKey((prevKey) => prevKey + 1);
  };

  useEffect(() => {
    getFolders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const [folderId, setFolderId] = useState("");

  const openFolderDeleteModal = (folderId) => {
    setFolderId(folderId);
    setOpenDeleteModal(true);
  };

  const handleDocDelete = async () => {
    setDeleting(true);
    await deleteFolder(folderId);
    setDeleting(false);
    setOpenDeleteModal(false);
    await adminFolderListRevalidation();
    await getFolders();
  };

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
            onDeleteClick={(id) => openFolderDeleteModal(id)}
            createFolder={createFolder}
            refetchData={() => handleUIUpdate()}
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

        <DeleteFolder
          openModal={openDeleteModal}
          onClose={() => setOpenDeleteModal(false)}
          onFolderDeleteClick={handleDocDelete}
          loading={deleting}
        />
      </div>
    </div>
  );
};

export default Page;
