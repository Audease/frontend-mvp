"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface ResetPasswordModalProps {
  show?: boolean;
  onReset?: (oldPassword: string, newPassword: string) => void;
  onClose?: () => void;
}

export default function ResetPasswordModal({
  show = true,
  onReset,
  onClose,
}: ResetPasswordModalProps) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  if (!show) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      setError("Please fill out both fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    onReset?.(oldPassword, newPassword);
  };

  const EyeToggle = ({
    visible,
    toggle,
  }: {
    visible: boolean;
    toggle: () => void;
  }) => (
    <button
      type="button"
      onClick={toggle}
      className="absolute right-6 bottom-[1px] -translate-y-1/2 text-sm text-gray-600"
      tabIndex={-1}
    >
        {visible ? <EyeOff size={12} /> : <Eye size={12} />}
    </button>
  );

  const PasswordInput = ({
    label,
    value,
    onChange,
    visible,
    toggleVisible,
  }: {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    visible: boolean;
    toggleVisible: () => void;
  }) => (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={visible ? "text" : "password"}
        value={value}
        onChange={onChange}
        className="block w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-dashboardButtons"
      />
      <EyeToggle visible={visible} toggle={toggleVisible} />
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Reset Your Password
        </h2>
        <p className="text-sm text-gray-600 mb-6 text-center">
          You need to set a new password before continuing.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <PasswordInput
            label="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            visible={showOld}
            toggleVisible={() => setShowOld(!showOld)}
          />

          <PasswordInput
            label="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            visible={showNew}
            toggleVisible={() => setShowNew(!showNew)}
          />

          <PasswordInput
            label="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            visible={showConfirm}
            toggleVisible={() => setShowConfirm(!showConfirm)}
          />

          {error && <p className="text-red-600 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-dashboardButtons text-white py-2 px-4 rounded-lg hover:bg-gold1 transition"
          >
            Reset Password
          </button>

         
            <button
              type="button"
              onClick={onClose}
              className="w-full text-sm text-gray-500 hover:underline mt-2"
            >
              Cancel
            </button>
        
        </form>
      </div>
    </div>
  );
}
