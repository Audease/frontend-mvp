"use client";

import React, { useState } from "react";
import UserDetails from "../../admin/learners/userDetails";
import WelcomeModal from "./components/WelcomeModal";

const Learner = () => {
  const [openModal, setOpenModal] = useState(true);
  const closeModal = () => {
    setOpenModal(false);
  };

  return (
    <div>
      {/* <UserDetails userId={"1213232"} onBackClick={false} backButton={false} /> */}
      <WelcomeModal {...{ openModal, closeModal }} />
    </div>
  );
};

export default Learner;
