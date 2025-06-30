"use client";

import { useState } from "react";
import AdminRecruiterdashboard from "../../admin/(adminPersonaScreens)/recruiter-dashboard/page";
import ResetPasswordModal from "@/app/components/ResetDefaultPassword";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { setpasswordChangeStatus } from "@/redux/features/login/auth-slice";

export default function RecruiterDashboard() {
  const [roleName, setRoleName] = useState("Recruiter");
  const [changePasswordModal, setChangePasswordModal] = useState(true);
  const dispatch = useDispatch<AppDispatch>();

  const userDefaultPasswordStatus = useAppSelector(
    (state) => state.authReducer.value.passwordChangeStatus
  );

  const handleDefaultPasswordReset = () => {
    setChangePasswordModal(false);
    dispatch(setpasswordChangeStatus(false));
  };
  return (
    <div>
      <div>
        <h3 className="font-medium text-2xl">{roleName} Dashboard</h3>
      </div>
      <AdminRecruiterdashboard showStaffButton={false} showHeader={false} />
      {userDefaultPasswordStatus && (
        <ResetPasswordModal
          show={changePasswordModal}
          onClose={handleDefaultPasswordReset}
        />
      )}
    </div>
  );
}
