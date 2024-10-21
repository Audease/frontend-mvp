'use client';

import { Modal } from "flowbite-react";
import { IoClose } from "react-icons/io5";
import Image from "next/image";

export function RoleCreatedModal({ success, closeSuccessModal }) {
  return (
    <div>
      <Modal show={success} onClose={closeSuccessModal} className="modal p-10" size={"md"}>
        <div className="flex flex-row justify-end p-4">
          <IoClose
            className="text-tgrey3 cursor-pointer"
            width={14}
            height={14}
            onClick={closeSuccessModal}
          />
        </div>
        <div className="flex flex-col text-center items-center py-20 font-inter">
          <Image
            src={"/role_success.png"}
            width={79}
            height={79}
            alt="Success"
            className="pb-4"
          />
          <h3 className="text-2xl font-bold">Role Created</h3>
          <p className="font-normal text-lg">You can view them now</p>
        </div>
      </Modal>
    </div>
  );
}