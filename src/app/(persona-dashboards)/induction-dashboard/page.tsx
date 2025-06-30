"use client";
import { useState } from "react";
import AdminInductionDashboard from "../../admin/(adminPersonaScreens)/induction-dashboard/page";
import FilterInduction from "../../admin/(adminPersonaScreens)/induction-dashboard/components/FilterInduction";
import ResetPasswordModal from "@/app/components/ResetDefaultPassword";
import { setpasswordChangeStatus } from "@/redux/features/login/auth-slice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";

export default function InductionDashboard() {
  const [roleName, setRoleName] = useState("Induction");
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
      <div className="flex justify-between">
        <h3 className="font-medium text-2xl">{roleName} Dashboard</h3>
        <FilterInduction />
      </div>
      <AdminInductionDashboard showHeader={false} showStaffButton={false} />
      {userDefaultPasswordStatus && (
        <ResetPasswordModal
          show={changePasswordModal}
          onClose={handleDefaultPasswordReset}
        />
      )}
    </div>
  );
}
