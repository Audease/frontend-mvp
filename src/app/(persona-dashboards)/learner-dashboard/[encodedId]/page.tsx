"use client";

import React, { useState, useEffect } from "react";
import WelcomeModal from "../components/WelcomeModal";
import UserDetails from "@/app/admin/learners/[encodedId]/page";
import ResetPasswordModal from "@/app/components/ResetDefaultPassword";
import { setpasswordChangeStatus } from "@/redux/features/login/auth-slice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { useParams } from "next/navigation";

const Learner = () => {
  const [openModal, setOpenModal] = useState(true);
  const [changePasswordModal, setChangePasswordModal] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();
  const encodedId = params?.encodedId ?? "";

  const userDefaultPasswordStatus = useAppSelector(
    (state) => state.authReducer.value.passwordChangeStatus
  );

  const handleDefaultPasswordReset = () => {
    setChangePasswordModal(false);
    dispatch(setpasswordChangeStatus(false));
  };
  const closeModal = () => {
    // mark as seen for this learner so we only show welcome once per screen
    try {
      if (encodedId) {
        localStorage.setItem(`seenWelcome_${encodedId}`, "true");
      } else {
        localStorage.setItem("seenWelcome", "true");
      }
    } catch (e) {
      // ignore localStorage errors
    }

    setOpenModal(false);
  };

  useEffect(() => {
    // If reset-password modal is active, never show welcome
    if (userDefaultPasswordStatus) {
      setOpenModal(false);
      return;
    }

    // Only show welcome if user hasn't seen it for this encodedId
    try {
      const key = encodedId ? `seenWelcome_${encodedId}` : "seenWelcome";
      const seen = localStorage.getItem(key) === "true";
      setOpenModal(!seen);
    } catch (e) {
      // fallback: show modal
      setOpenModal(true);
    }
  }, [encodedId, userDefaultPasswordStatus]);

  return (
    <div>
      <UserDetails backButton={false} />
      {!userDefaultPasswordStatus && (
        <WelcomeModal {...{ openModal, closeModal }} />
      )}
      {userDefaultPasswordStatus && (
        <ResetPasswordModal
          show={changePasswordModal}
          onClose={handleDefaultPasswordReset}
        />
      )}
    </div>
  );
};

export default Learner;
