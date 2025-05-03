import { adminFolderListRevalidation } from "@/app/action";
import { useState } from "react";

const useFolderModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [folderId, setFolderId] = useState("");

  const createFolder = (folderId) => {
    setShowModal(true);
    setFolderId(folderId);
  };

  const [folderCreationSuccess, setFolderCreationSuccess] = useState(false);
  const [folderCreationError, setFolderCreationError] = useState(false);
  const [loading, setLoading] = useState(false);

  const folderCreate = async (folderName: string) => {
    const payload: { name: string; parentFolderId?: string | null } = {
      name: folderName,
    };

    if (folderId) {
      payload.parentFolderId = folderId;
    }

    try {
      setLoading(true);
      const response = await fetch("/api/adminFolders/createFolder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        setFolderCreationError(true);
        setTimeout(() => setFolderCreationError(false), 5000);
      } else {
        adminFolderListRevalidation();
        setFolderCreationSuccess(true);
        setTimeout(() => setFolderCreationSuccess(false), 5000);
      }
    } catch (error) {
      console.error("Error creating folder:", error);
      setFolderCreationError(true);
      setTimeout(() => setFolderCreationError(false), 5000);
    } finally {
      setLoading(false);
    }
  };

  const OnClose = () => {
    setShowModal(false);
  };

  return {
    showModal,
    folderCreationSuccess,
    folderCreationError,
    loading,
    createFolder,
    folderCreate,
    OnClose,
  };
};

export default useFolderModal;
