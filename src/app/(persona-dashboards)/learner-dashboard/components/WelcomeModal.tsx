
"use client";

import { Button, Modal } from "flowbite-react";
import { useState } from "react";

export default function WelcomeModal({openModal, closeModal} ) {
    const [userName, setUserName] = useState("Learner");

  return (
    <>
      <Modal show={openModal} size={"sm"}>
        <Modal.Body>
          <div className="space-y-6 text-center">
          <p onClick={closeModal} className="flex justify-end text-tgrey3">x</p>
            <p className="text-2xl text-tblack font-bold leading-relaxed dark:text-gray-400">
              Welcome Onboard
            </p>
            <p className="font-normal text-lg">{userName}</p>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
