import { Modal } from "flowbite-react";
import Image from "next/image";

export function LearnerImportSuccessModal({ show, onClose }) {
    return (
      <div>
        <Modal show={show} onClose={onClose} className="modal p-10" size={"2xl"}>
          <div className="flex flex-col text-center items-center py-16 font-inter">
            <Image
              src={"/role_success.png"}
              width={79}
              height={79}
              alt="Success"
              className="pb-8"
            />
            <h3 className="text-2xl font-bold pb-4">Upload completed</h3>
            <p className="font-normal text-lg">You can view them now</p>
          </div>
  
          <div className="flex items-center justify-center mb-6">
            <button
              type="button"
              className="bg-dashboardButtons hover:bg-tgrey1 text-white w-96 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={onClose}
            >
              Go to Dashboard
            </button>
          </div>
        </Modal>
      </div>
    );
  }