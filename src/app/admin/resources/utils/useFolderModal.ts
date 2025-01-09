import { adminFolderListRevalidation } from "@/app/action";
import { useState } from "react";


const useFolderModal = () => {
  const [showModal, setShowModal] = useState(false);

  const createFolder = () => {
    setShowModal(true);
  };

  const [error, setError] = useState<string | null>(null);
  const [folderCreationSuccess, setFolderCreationSuccess] = useState(false);
  const [folderCreationError, setFolderCreationError] = useState(false);
  const [loading, setLoading] = useState(false);


  const folderCreate = async (folderName: string) => {
    try {
      setLoading(true);
      const response = await fetch("/api/adminFolders/createFolder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ folder: folderName }),
      });

      if (!response.ok) {
        // throw new Error("Failed to create folder");
        setFolderCreationError(true);
        setLoading(false);
        setTimeout(() => setFolderCreationError(false), 5000);
      }
      setLoading(false);
      adminFolderListRevalidation();
      setFolderCreationSuccess(true);
      setTimeout(() => setFolderCreationSuccess(false), 5000);
    } catch (error) {
      console.error("Error creating folder:", error);
      setError("Failed to create folder. Please try again.");
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
