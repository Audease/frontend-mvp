"use client";
import { useState } from "react";
import AdminBKSDDashboard from "../../admin/(adminPersonaScreens)/bksd-dashboard/page";
import FilterBKSD from "../../admin/(adminPersonaScreens)/bksd-dashboard/components/FilterBKSD";
import ResetPasswordModal from "@/app/components/ResetDefaultPassword";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { setpasswordChangeStatus } from "@/redux/features/login/auth-slice";

export default function BKSDDashboard() {
  const [roleName, setRoleName] = useState("Initial Assessment");
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
        <FilterBKSD />
      </div>
      <AdminBKSDDashboard showHeader={false} showStaffButton={false} />
      {userDefaultPasswordStatus && (
        <ResetPasswordModal
          show={changePasswordModal}
          onClose={handleDefaultPasswordReset}
        />
      )}
    </div>
  );
}
