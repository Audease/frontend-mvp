"use client";

import React, { useState } from "react";
import WelcomeModal from "../components/WelcomeModal";
import UserDetails from "@/app/admin/learners/[encodedId]/page";

const Learner = () => {
  const [openModal, setOpenModal] = useState(true);
  const closeModal = () => {
    setOpenModal(false);
  };

  return (
    <div>
      <UserDetails backButton={false} />
      <WelcomeModal {...{ openModal, closeModal }} />
    </div>
  );
};

export default Learner;
