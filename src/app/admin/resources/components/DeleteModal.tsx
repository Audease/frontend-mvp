"use client";

import Button from "@/app/components/button";
import { Modal } from "flowbite-react";

export function DeleteFile({ openModal, onClose, onFileDeleteClick, loading }) {
  return (
    <>
      <Modal show={openModal} onClose={onClose} size={"sm"}>
        <Modal.Header>Confirm action</Modal.Header>
        <Modal.Body>
          <div className="flex flex-row justify-end space-x-6">
            <Button
              className="bg-red-600 text-black hover:bg-red px-3 hover:bg-red-700"
              buttonText={loading ? "Deleting..." : "Yes, Delete"}
              buttonClick={onFileDeleteClick}
            />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export function DeleteFolder({
  openModal,
  onClose,
  onFolderDeleteClick,
  loading,
}) {
  return (
    <>
      <Modal show={openModal} onClose={onClose} size={"sm"}>
        <Modal.Header>Confirm action</Modal.Header>
        <Modal.Body>
          <p className="text-sm text-tgrey1 py-2">
            Note: Deleting will remove both the folder and its content.
          </p>
          <div className="flex flex-row justify-end space-x-6">
            <Button
              className="bg-red-600 text-black hover:bg-red px-3 hover:bg-red-700"
              buttonText={loading ? "Deleting..." : "Yes, Delete"}
              buttonClick={onFolderDeleteClick}
            />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
