import { LoadingSpinner2 } from "@/app/components/dashboard/Spinner";
import { Modal } from "flowbite-react";
import React, { useState } from "react";

import { IoClose } from "react-icons/io5";

interface Props {
  show: boolean;
  onClose: () => void;
  onCreate: (folderName: string) => void;
  folderCreationSuccess: boolean;
  folderCreationError: boolean;
  loading: boolean;
}

const CreateFolderModal = ({
  show,
  onClose,
  onCreate,
  folderCreationSuccess,
  folderCreationError,
  loading,
}: Props) => {
  const [folderName, setFolderName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (folderName.trim()) {
      onCreate(folderName);
      setFolderName("");
    }
  };

  return (
    <Modal show={show} onClose={onClose} className="modal p-10" size={"sm"}>
      <div className="flex flex-row justify-between px-4 py-2">
        <h3 className="font-medium text-lg">Create Folder</h3>
        <IoClose
          className="text-tgrey3 cursor-pointer"
          width={14}
          height={14}
          onClick={onClose}
        />
      </div>
      <hr className="mx-4 " />
      <div className="absolute top-24 left-40 flex items-center justify-center ">{loading && <LoadingSpinner2 />}</div>
      <form
        className="flex flex-col text-left p-4 font-inter space-y-4"
        onSubmit={handleSubmit}
      >
        <h3 className="text-sm font-normal">Folder Name</h3>
        <input
          type="text"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          className="border-1 border-tgrey2 rounded py-1 focus:ring-gold1 w-full focus:border-none focus:ring"
          placeholder="Enter folder name"
          required
        />
        <button
          type="submit"
          className="bg-dashboardButtons hover:bg-tgrey1 text-white w-full font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline"
        >
          Create
        </button>
        <div className="text-sm">
          {folderCreationSuccess && (
            <p className="text-green-900 ">Folder Successfully Created!</p>
          )}
          {folderCreationError && (
            <p className="text-tred1 ">
              Failure to create folder, refresh and try again!
            </p>
          )}
        </div>
      </form>
    </Modal>
  );
};

export default CreateFolderModal;
