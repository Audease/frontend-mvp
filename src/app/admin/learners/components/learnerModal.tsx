import { Modal } from "flowbite-react";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import RegistrationForm from "./CreateLearnerForm";

export default function AddLearnerModal({
  show,
  onClose,
  setLearnerSuccessModal,
  onLearnerCreated,
}) {
  return (
    <div className="font-inter">
      <Modal {...{ show, onClose }} className="modal h-10" size={"3xl"}>
        <div className="flex flex-col p-4">
          <div className="flex flex-row justify-between items-center">
            <h2 className="font-medium text-lg text-tblack3 ml-[18rem]">
              Create Learner
            </h2>
            <IoClose
              className="text-tgrey3 cursor-pointer"
              width={14}
              height={14}
              onClick={onClose}
            />
          </div>
          <hr className="my-4" />
          <div className="overflow-y-auto h-[30rem]">
            <RegistrationForm
              onLearnerCreated={onLearnerCreated}
              onClose={onClose}
              setLearnerSuccessModal={setLearnerSuccessModal}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}

export function LearnerCreated({ show, onClose }) {
  return (
    <div>
      <Modal {...{ show, onClose }} className="modal p-10" size={"3xl"}>
        <div className="flex flex-col text-center items-center py-16 font-inter">
          <Image
            src={"/role_success.png"}
            width={79}
            height={79}
            alt="Success"
            className="pb-8"
          />
          <h3 className="text-2xl font-bold pb-4">Yippe!</h3>
          <p className="font-normal text-lg">You just created a learner</p>
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
