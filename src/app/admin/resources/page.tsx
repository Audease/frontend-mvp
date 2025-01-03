"use client";

import React, { useState } from "react";
import EmptyScreen from "./components/EmptyScreen";
import FolderHead from "./components/FolderHead";
import CreateFolderModal from "./components/CreateFolderModal";
import useFolderModal from "./utils/useFolderModal";
import FolderTableList from "./components/FolderTableList";

type Props = {};

const Page = (props: Props) => {
  const {
    showModal,
    folderCreationSuccess,
    folderCreationError,
    loading,
    createFolder,
    folderCreate,
    onClose,
  } = useFolderModal();
  return (
    <div>
      <FolderHead createFolder={createFolder} />
      <div>
        <h3 className="font-medium text-lg">Folders</h3>
      </div>
      <div className="h-min-[40rem] bg-white">
        <FolderTableList />
        <EmptyScreen createFolder={createFolder} />
        <CreateFolderModal
          show={showModal}
          loading = {loading}
          folderCreationSuccess={folderCreationSuccess}
          folderCreationError={folderCreationError}
          onClose={onClose}
          onCreate={folderCreate}
        />
      </div>
    </div>
  );
};

export default Page;
