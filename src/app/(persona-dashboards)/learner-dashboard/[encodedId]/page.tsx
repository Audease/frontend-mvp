"use client";

import React, { useState } from "react";
import WelcomeModal from "../components/WelcomeModal";
import UserDetails from "@/app/admin/learners/[encodedId]/page";
import ResetPasswordModal from "@/app/components/ResetDefaultPassword";
import { setpasswordChangeStatus } from "@/redux/features/login/auth-slice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";

const Learner = () => {
  const [openModal, setOpenModal] = useState(true);
  const [changePasswordModal, setChangePasswordModal] = useState(true);
  const dispatch = useDispatch<AppDispatch>();

  const userDefaultPasswordStatus = useAppSelector(
    (state) => state.authReducer.value.passwordChangeStatus
  );

  const handleDefaultPasswordReset = () => {
    setChangePasswordModal(false);
    dispatch(setpasswordChangeStatus(false));
  };
  const closeModal = () => {
    setOpenModal(false);
  };

  return (
    <div>
      <UserDetails backButton={false} />
      {!userDefaultPasswordStatus && (
        <WelcomeModal {...{ openModal, closeModal }} />
      )}
      {!userDefaultPasswordStatus && (
        <ResetPasswordModal
          show={changePasswordModal}
          onClose={handleDefaultPasswordReset}
        />
      )}
    </div>
  );
};

export default Learner;
