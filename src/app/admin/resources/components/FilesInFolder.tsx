import React, { useEffect, useState } from "react";
import UploadFileBtn from "./UploadFileBtn";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  MdOutlineCheckBoxOutlineBlank,
  MdOutlineDeleteForever,
} from "react-icons/md";
import LearnersListModal from "./LearnersListModal";
import CloudinaryUploader from "./UploadFile";
import {
  assignDocToLearners,
  deleteDocument,
  postURLToDb,
} from "../utils/action";
import { DeleteFile } from "./DeleteModal";
import { CiFolderOn } from "react-icons/ci";
import { FaFileDownload } from "react-icons/fa";

/**
 * Component to manage files within a folder.
 * Handles file uploads, deletion, and assignment to learners.
 */
const FilesInFolder = ({
  folderId,
  files,
  error,
  loading,
  createFolder,
  refetchData,
}) => {
  const [openLearnersModal, setOpenLearnersModal] = useState(false);
  const [selectedFileId, setSelectedFileId] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});
  const [selectedIds, setSelectedIds] = useState([]);
  const [learnersSelected, setLearnersSelected] = useState(false);
  const [actionResponse, setActionResponse] = useState("");
  const [fileId, setFileId] = useState("");
  const [deleting, setDeleting] = useState(false);

  /**
   * Opens modal for assigning a file to learners.
   */
  const assignFiles = (id) => {
    setSelectedFileId(id);
    setOpenLearnersModal(true);
  };

  /**
   * Handles file upload completion and updates database.
   */
  const handleUploadComplete = async (result) => {
    if (result !== "Failed to upload file. Please try again.") {
      const payload = {
        fileName: result.display_name,
        fileType: result.format || "docx",
        publicUrl: result.url,
      };
      const status = await postURLToDb(folderId, payload);
      alert(
        status === 201
          ? "File upload successful"
          : "An error occurred, try again"
      );
      refetchData();
    } else {
      alert(result);
    }
    setIsUploadModalOpen(false);
  };

  /**
   * Opens file in a new tab.
   */
  const handleFileClick = (url) => {
    window.open(url, "_blank");
  };

  /**
   * Handles checkbox state for selecting learners.
   */
  const handleCheckboxChange = (id) => {
    setCheckedItems((prev) => {
      const newChecked = { ...prev, [id]: !prev[id] };
      setSelectedIds(Object.keys(newChecked).filter((key) => newChecked[key]));
      return newChecked;
    });
  };

  /**
   * Updates learners selection state when selected IDs change.
   */
  useEffect(() => {
    setLearnersSelected(selectedIds.length > 0);
  }, [selectedIds]);

  /**
   * Closes learner modal and resets selection.
   */
  const closeLearnerModal = () => {
    setOpenLearnersModal(false);
    setSelectedIds([]);
    setCheckedItems({});
    setSelectedFileId("");
    setActionResponse("");
  };

  /**
   * Handles document assignment to learners.
   */
  const handleAddDocumentClick = async () => {
    const response = await assignDocToLearners({
      documentId: selectedFileId,
      studentIds: selectedIds,
    });
    setActionResponse(
      response === 201 ? "201" : "An error occurred, try again"
    );
    setTimeout(() => setActionResponse(""), 10000);
  };

  /**
   * Opens file delete confirmation modal.
   */
  const openFileDeleteModal = (fileId) => {
    setFileId(fileId);
    setOpenDeleteModal(true);
  };

  /**
   * Handles file deletion (currently logs ID for implementation later).
   */
  const handleFileDelete = async () => {
    setDeleting(true);
    await deleteDocument(fileId);
    setDeleting(false);
    refetchData();
  };

  return (
    <div className="flex flex-col py-2">
      {loading ? (
        <p className="text-sm text-gray-700 my-3">Loading files...</p>
      ) : error ? (
        <p className="text-sm text-gray-700 my-3">{error}</p>
      ) : !files || files.length === 0 ? (
        <p className="text-sm text-gray-700 flex justify-center items-center my-1">
          There are no files in this folder.
        </p>
      ) : (
        <ul>
          {files.map((file) => (
            <div
              className="ml-10 flex-col flex md:flex-row space-y-2 justify-between my-3"
              key={file.id}
            >
              <div className="flex flex-row justify-start space-x-3">
                {/* <CiFolderOn /> */}
                <FaFileDownload className="text-dashboardButtons/100 w-4 h-4"/>
                {/* <Image
                  src="/file_icon.png"
                  alt="folder icon"
                  height={10}
                  width={30}
                /> */}
                <p
                  className="text-sm text-gray-700 cursor-pointer"
                  onClick={() => handleFileClick(file.publicUrl)}
                >
                  {file.fileName}
                </p>
              </div>
              <div className="flex flex-row space-x-4 items-center mr-8">
                <MdOutlineDeleteForever
                  className="text-red-600"
                  onClick={() => openFileDeleteModal(file.id)}
                />
                <div
                  className="group flex flex-row items-center space-x-2"
                  onClick={() => assignFiles(file.id)}
                >
                  <MdOutlineCheckBoxOutlineBlank className="text-gray-700 group-hover:text-dashboardButtons" />
                  <p className="text-sm text-gray-700 group-hover:text-dashboardButtons">
                    Assign document
                  </p>
                </div>
              </div>
            </div>
          ))}
        </ul>
      )}

      <LearnersListModal
        show={openLearnersModal}
        onClose={closeLearnerModal}
        checkedItems={checkedItems}
        handleCheckboxChange={handleCheckboxChange}
        learnersSelected={learnersSelected}
        onAddDocClick={handleAddDocumentClick}
        actionResponse={actionResponse}
      />
      {isUploadModalOpen && (
        <div className="modal-backdrop flex text-center justify-center my-2">
          <CloudinaryUploader onUploadComplete={handleUploadComplete} />
        </div>
      )}
      <div className="flex flex-col justify-center items-center lg:flex-row gap-3">
        <Button
          className="bg-dashboardButtons"
          onClick={() => createFolder(folderId)}
        >
          Create Sub-Folder
        </Button>
        <UploadFileBtn
          onUploadClick={() => setIsUploadModalOpen(!isUploadModalOpen)}
        />
      </div>
      <DeleteFile
        openModal={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        onFileDeleteClick={handleFileDelete}
        loading={deleting}
      />
    </div>
  );
};

export default FilesInFolder;
