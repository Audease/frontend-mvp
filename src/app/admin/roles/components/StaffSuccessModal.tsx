import { Modal } from "flowbite-react";
import { useRouter } from "next/navigation";
import React from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";

type Props = {
  show: boolean;
  onClose: () => void;
};

const StaffSuccessModal = ({ show, onClose }: Props) => {
  const route = useRouter();
  const handleButtonClick = () => {
    onClose();
    route.push("/admin/staff");
  };

  return (
    <Modal show={show} onClose={onClose} size={"md"}>
      <div className="bg-white border-b-2 border-tgrey1">
        <div className="flex items-center">
          <h3 className="text-lg font-bold text-gray-900 p-2">
            Staff Added Successfully
          </h3>
          <button
            className="ml-auto p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-900 rounded-lg"
            onClick={onClose}
          >
            <IoCloseSharp className="w-6 h-6"/>
          </button>
        </div>
      </div>
      <Modal.Body>
        <div className="text-center flex flex-col items-center">
          <FaRegCheckCircle className="text-green-700 w-12 h-12 mx-4 my-2" />

          <p className="text-gray-700 text-lg font-switzerbold">
            The staff has been new created successfully.
          </p>
          <p className="text-gray-700 text-sm font-switzer">
            You can now assign roles to the staff.
          </p>
          <button
            onClick={handleButtonClick}
            className="mt-4 px-4 py-2 bg-dashboardButtons text-white rounded hover:bg-tgrey1"
          >
            Staff Board
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default StaffSuccessModal;
