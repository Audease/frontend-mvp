"use client";

import { Input } from "@/components/ui/input";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
});

export default function Profile() {
  const auth = useSelector((state: any) => state.authReducer?.value || {});

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: auth.userName || "",
      email: auth.userEmail || "",
      phone: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log("Profile submit:", data);
  };

  return (
    <div>
      <div className="font-secondary space-y-6 bg-white px-8 rounded-3xl">
        <div className="md:w-[60%] flex flex-col md:flex-row md:justify-between md:items-start md:space-x-8 pt-6">
          <div>
            <h2 className="font-semibold text-black text-2xl">Settings</h2>
            <p className="text-[#6E6D6D] text-sm py-1">
              Manage your account profile and preferences
            </p>
          </div>

          {/* Right: optional area for avatar or actions */}

          <div className="">
            <div className="flex items-center md:justify-end">
              <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                {/* placeholder avatar */}
                <img
                  src="/Profile_Image_Default.png"
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* <div className="mt-4 md:mt-6 flex md:justify-end">
              <button className="px-4 py-2 border rounded text-sm">
                Edit profile
              </button>
            </div> */}
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2 md:space-y-3">
            <h3 className="font-medium text-[#6E6D6D]">Account information</h3>
          </div>

          <div className="flex flex-col md:flex-row md:items-start md:space-x-8">
            {/* Left: form area - ~60% width on desktop, full width on mobile */}
            <div className="w-full md:w-[60%] space-y-4">
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-[#6E6D6D] block mb-1">
                      Name
                    </label>
                    <Input
                      {...form.register("name")}
                      placeholder="Full name"
                      className="h-10 bg-transparent border-[#C4C4C4]"
                    />
                    {form.formState.errors.name && (
                      <p className="text-destructive text-xs mt-1">
                        {String(form.formState.errors.name?.message)}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm text-[#6E6D6D] block mb-1">
                      Phone
                    </label>
                    <Input
                      {...form.register("phone")}
                      placeholder="Phone number"
                      className="h-10 bg-transparent border-[#C4C4C4]"
                    />
                    {form.formState.errors.phone && (
                      <p className="text-destructive text-xs mt-1">
                        {String(form.formState.errors.phone?.message)}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-sm text-[#6E6D6D] block mb-1">
                    Email
                  </label>
                  <Input
                    {...form.register("email")}
                    placeholder="email@example.com"
                    className="h-10 bg-transparent border-[#C4C4C4]"
                  />
                  {form.formState.errors.email && (
                    <p className="text-destructive text-xs mt-1">
                      {String(form.formState.errors.email?.message)}
                    </p>
                  )}
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-dashboardButtons text-white rounded"
                  >
                    Update Profile
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="pt-6 space-y-4">
          <div className="space-y-1">
            <h3 className="font-primary text-xl md:text-2xl font-semibold">
              Change your password
            </h3>
            <p className="text-[#6E6D6D] text-sm md:text-base py-2">
              You'll need to log in again on all devices after changing your
              password
            </p>
          </div>

          <div>
            <PasswordForm />
          </div>
        </div>
      </div>
    </div>
  );
}

function PasswordForm() {
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

  const onPwSubmit = (data: any) => {
    console.log("Password submit:", data);
    pwForm.reset();
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
          className="px-4 py-2 bg-dashboardButtons text-white rounded"
        >
          Change password
        </button>
      </div>
    </form>
  );
}
