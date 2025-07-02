"use client";

import { Modal } from "flowbite-react";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface ResetPasswordModalProps {
  show?: boolean;
  onClose?: () => void;
}

const passwordSchema = z
  .string()
  .min(8, "Must be at least 8 characters")
  .regex(/[A-Z]/, "Must contain an uppercase letter")
  .regex(/[0-9]/, "Must contain a number")
  .regex(/[^a-zA-Z0-9]/, "Must contain a symbol");

const formSchema = z
  .object({
    oldPassword: z.string().min(1, "Old password is required"),
    newPassword: passwordSchema,
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type FormValues = z.infer<typeof formSchema>;

export default function ResetPasswordModal({
  show = false,
  onClose,
}: ResetPasswordModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: string; text: string } | null>(
    null
  );

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword: data.oldPassword,
          newPassword: data.newPassword,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage({ type: "success", text: "Password changed successfully!" });
        setTimeout(() => {
          onClose?.();
        }, 5000);
        reset();
      } else {
        setMessage({
          type: "error",
          text:
            result.message || "Failed to change password. Please try again.",
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "An error occurred. Please try again later.",
      });
    } finally {
      setIsLoading(false);
      reset();
    }
  };

  const renderInput = (
    label: string,
    name: keyof FormValues,
    typeVisible: boolean,
    toggleVisible: () => void
  ) => (
    <div className="relative">
      <label className="block text-sm font-medium font-switzer text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={typeVisible ? "text" : "password"}
        {...register(name)}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-dashboardButtons"
      />
      <button
        type="button"
        onClick={toggleVisible}
        className="absolute right-3 top-9 text-gray-500"
        tabIndex={-1}
      >
        {typeVisible ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
      {errors[name] && (
        <p className="text-red-600 text-sm mt-1">
          {errors[name]?.message?.toString()}
        </p>
      )}
    </div>
  );

  return (
    <Modal show={show} size="sm" onClose={onClose}>
      <div className="border-b-2">
        <h3 className="pt-6 text-center text-lg font-bold font-switzer">
          Reset Your Password
        </h3>
      </div>
      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {renderInput("Default Password", "oldPassword", showOld, () =>
            setShowOld(!showOld)
          )}
          {renderInput("New Password", "newPassword", showNew, () =>
            setShowNew(!showNew)
          )}
          {renderInput("Confirm Password", "confirmPassword", showConfirm, () =>
            setShowConfirm(!showConfirm)
          )}

          {message?.type === "success" && (
            <p className="text-sm text-center text-green1">{message.text}</p>
          )}
          {message?.type === "error" && (
            <p className="text-sm text-center text-red-700">{message.text}</p>
          )}

          <button
            type="submit"
            className="w-full bg-dashboardButtons text-white py-2 px-4 rounded-lg hover:bg-gold1 transition"
          >
            {isLoading ? "Updating your password..." : "Reset Password"}
          </button>
          {/* <button
            type="button"
            onClick={onClose}
            className="w-full text-sm text-gray-500 hover:underline mt-2"
          >
            Later...
          </button> */}
        </form>
      </Modal.Body>
    </Modal>
  );
}
