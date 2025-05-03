"use client";

import { useState } from "react";
import Image from "next/image";
import { IoIosCheckmark } from "react-icons/io";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Define the password change schema
const passwordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
      "Password must include uppercase, lowercase, number and special character"
    ),
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type PasswordFormValues = z.infer<typeof passwordSchema>;

export default function UserDetailsPassword() {
  const [passwordToggle, setPasswordToggle] = useState({
    currentPassword: "password",
    newPassword: "password",
    confirmPassword: "password"
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: string; text: string } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    }
  });

  const handleEyeClick = (field: keyof typeof passwordToggle) => {
    setPasswordToggle((prev) => ({
      ...prev,
      [field]: prev[field] === "password" ? "text" : "password"
    }));
  };

  const onSubmit = async (data: PasswordFormValues) => {
    setIsLoading(true);
    setMessage(null);
    
    try {
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
      
      const result = await response.json();
      
      if (response.ok) {
        setMessage({ type: "success", text: "Password changed successfully!" });
        reset();
      } else {
        setMessage({ 
          type: "error", 
          text: result.message || "Failed to change password. Please try again." 
        });
      }
    } catch (error) {
      setMessage({ 
        type: "error", 
        text: "An error occurred. Please try again later." 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 rounded border border-tgrey2 p-4 mb-8 font-inter shadow-sm">
      <div>
        <h3 className="font-semibold text-base pb-2">Password Settings</h3>
        <hr className="w-1/3" />
      </div>

      {message && (
        <div 
          className={`p-4 rounded ${
            message.type === "success" 
              ? "bg-green-100 text-green-700" 
              : "bg-red-100 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div>
          <label
            htmlFor="currentPassword"
            className="font-normal text-sm text-tgrey3"
          >
            Current Password
          </label>
          <div className="relative mt-1 w-72">
            <input
              type={passwordToggle.currentPassword}
              id="currentPassword"
              {...register("currentPassword")}
              className={`border-tgrey2 rounded-md px-2 py-1 text-h2 text-tgrey1 font-normal w-full focus:border-tgrey2 focus:outline-none focus:ring focus:ring-gold1`}
              placeholder="Current Password"
              aria-label="Current Password"
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 transform -translate-y-1/2"
              onClick={() => handleEyeClick("currentPassword")}
              aria-label="Toggle password visibility"
            >
              <Image
                src="/eye.png"
                width={16}
                height={16}
                alt="Toggle visibility"
              />
            </button>
          </div>
          {errors.currentPassword && (
            <p className="text-red-500 text-xs mt-1">{errors.currentPassword.message}</p>
          )}
        </div>
        
        <div>
          <label
            htmlFor="newPassword"
            className="font-normal text-sm text-tgrey3"
          >
            New Password
          </label>
          <div className="relative mt-1 w-72">
            <input
              type={passwordToggle.newPassword}
              id="newPassword"
              {...register("newPassword")}
              className={`border-tgrey2 rounded-md px-2 py-1 text-h2 text-tgrey1 font-normal w-full focus:border-tgrey2 focus:outline-none focus:ring focus:ring-gold1`}
              placeholder="New Password"
              aria-label="New Password"
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 transform -translate-y-1/2"
              onClick={() => handleEyeClick("newPassword")}
              aria-label="Toggle password visibility"
            >
              <Image
                src="/eye.png"
                width={16}
                height={16}
                alt="Toggle visibility"
              />
            </button>
          </div>
          {errors.newPassword && (
            <p className="text-red-500 text-xs mt-1">{errors.newPassword.message}</p>
          )}
        </div>
        
        <div>
          <label
            htmlFor="confirmPassword"
            className="font-normal text-sm text-tgrey3"
          >
            Re-type Password
          </label>
          <div className="relative mt-1 w-72">
            <input
              type={passwordToggle.confirmPassword}
              id="confirmPassword"
              {...register("confirmPassword")}
              className={`border-tgrey2 rounded-md px-2 py-1 text-h2 text-tgrey1 font-normal w-full focus:border-tgrey2 focus:outline-none focus:ring focus:ring-gold1`}
              placeholder="Re-type Password"
              aria-label="Re-type Password"
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 transform -translate-y-1/2"
              onClick={() => handleEyeClick("confirmPassword")}
              aria-label="Toggle password visibility"
            >
              <Image
                src="/eye.png"
                width={16}
                height={16}
                alt="Toggle visibility"
              />
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
          )}
        </div>

        <div className="">
          <button
            type="submit"
            disabled={isLoading}
            className="flex flex-row bg-black text-white text-sm font-semibold py-0 px-5 rounded-lg disabled:opacity-50"
          >
            <IoIosCheckmark className="w-10 h-10" />
            <p className="py-2">
              {isLoading ? "Changing Password..." : "Change Password"}
            </p>
          </button>
        </div>
      </form>
    </div>
  );
}