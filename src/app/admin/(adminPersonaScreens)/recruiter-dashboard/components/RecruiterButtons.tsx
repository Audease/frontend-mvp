import { FaRegCircleXmark } from "react-icons/fa6";
import { FaRegCheckCircle } from "react-icons/fa";
import { GoPencil } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";

// RevertEditButton Component
export const RevertEditButton = ({ onRevertEditButtonClick }) => {
  return (
    <div
      className="w-10 h-9 flex justify-center items-center rounded-md shadow-sm border cursor-pointer"
      onClick={onRevertEditButtonClick}
    >
      <FaRegCircleXmark className="text-tred2 h-5 w-5" />
    </div>
  );
};

// ConfirmEditButton Component
export const ConfirmEditButton = ({ onConfirmEditButtonClick }) => {
  return (
    <div
      className="w-10 h-9 flex justify-center items-center rounded-md shadow-sm border cursor-pointer"
      onClick={onConfirmEditButtonClick}
    >
      <FaRegCheckCircle className="text-[#08930D] h-5 w-5" />
    </div>
  );
};

// EditLearnerButton Component
export const EditLearnerButton = ({ onEditClick }) => {
  return (
    <div>
      <button
        className="flex flex-row rounded-md border py-[0.4rem] px-3 text-dashboardRolesBtn font-medium text-sm"
        onClick={onEditClick}
      >
        <span>
          <GoPencil className="text-dashboardRolesBtn my-1 mr-2" />
        </span>
        Edit
      </button>
    </div>
  );
};

// DeleteLearnerButton Component
export const DeleteLearnerButton = ({ onDeleteClick }) => {
  return (
    <div>
      <button
        className="flex flex-row border border-tred2 rounded-md py-[0.4rem] px-3 text-tred2 font-medium text-sm"
        onClick={onDeleteClick}
      >
        <span>
          <RiDeleteBin6Line className="text-tred2 my-1 mr-2" />
        </span>
        Delete
      </button>
    </div>
  );
};
