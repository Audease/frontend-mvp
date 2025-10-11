"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Spinner } from "flowbite-react";

export default function ChangePasswordForm() {
  const passwordSchema = z
    .object({
      currentPassword: z.string().min(6, "Enter your current password"),
      newPassword: z.string().min(8, "Password must be at least 8 characters"),
      confirmPassword: z.string().min(8, "Please confirm your new password"),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  const pwForm = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onPwSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);
      const response = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        }),
      });
      if (response.ok) {
        toast.success("Password changed successfully");
        pwForm.reset();
      } else {
        toast.error(`Failed to change password - ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error in onPwSubmit:", error);
      toast.error(`Error changing password - ${error}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={pwForm.handleSubmit(onPwSubmit)}
      className="space-y-4 max-w-lg"
    >
      <div>
        <label className="text-sm text-[#6E6D6D] block mb-1">
          Current password
        </label>
        <div className="relative">
          <Input
            type={showCurrent ? "text" : "password"}
            {...pwForm.register("currentPassword")}
            className="h-10 bg-transparent border-[#C4C4C4] pr-10"
          />
          <button
            type="button"
            aria-label={
              showCurrent ? "Hide current password" : "Show current password"
            }
            onClick={() => setShowCurrent((s) => !s)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-[#6E6D6D]"
          >
            {showCurrent ? "Hide" : "Show"}
          </button>
        </div>
        {pwForm.formState.errors.currentPassword && (
          <p className="text-destructive text-xs mt-1">
            {String(pwForm.formState.errors.currentPassword?.message)}
          </p>
        )}
      </div>

      <div>
        <label className="text-sm text-[#6E6D6D] block mb-1">
          New password
        </label>
        <div className="relative">
          <Input
            type={showNew ? "text" : "password"}
            {...pwForm.register("newPassword")}
            className="h-10 bg-transparent border-[#C4C4C4] pr-10"
          />
          <button
            type="button"
            aria-label={showNew ? "Hide new password" : "Show new password"}
            onClick={() => setShowNew((s) => !s)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-[#6E6D6D]"
          >
            {showNew ? "Hide" : "Show"}
          </button>
        </div>
        {pwForm.formState.errors.newPassword && (
          <p className="text-destructive text-xs mt-1">
            {String(pwForm.formState.errors.newPassword?.message)}
          </p>
        )}
      </div>

      <div>
        <label className="text-sm text-[#6E6D6D] block mb-1">
          Confirm new password
        </label>
        <div className="relative">
          <Input
            type={showConfirm ? "text" : "password"}
            {...pwForm.register("confirmPassword")}
            className="h-10 bg-transparent border-[#C4C4C4] pr-10"
          />
          <button
            type="button"
            aria-label={
              showConfirm ? "Hide confirm password" : "Show confirm password"
            }
            onClick={() => setShowConfirm((s) => !s)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-[#6E6D6D]"
          >
            {showConfirm ? "Hide" : "Show"}
          </button>
        </div>
        {pwForm.formState.errors.confirmPassword && (
          <p className="text-destructive text-xs mt-1">
            {String(pwForm.formState.errors.confirmPassword?.message)}
          </p>
        )}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-dashboardButtons text-white rounded flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting && (
            <Spinner size="md" color="white" />
          )}
          {isSubmitting ? "Changing..." : "Change password"}
        </button>
      </div>
    </form>
  );
}
