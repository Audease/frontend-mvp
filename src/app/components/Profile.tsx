"use client";

import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Spinner } from "flowbite-react";
import Image from "next/image";
import ChangePasswordForm from "./ChangePasswordForm";

const schema = z.object({
  first_name: z.string().min(2, "First name must be at least 2 characters"),
  last_name: z.string().min(2, "Last name must be at least 2 characters"),
  username: z.string().optional(),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
});

export default function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      phone: "",
    },
  });

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    if (profileData) {
      form.reset({
        first_name: profileData?.first_name || "",
        last_name: profileData?.last_name || "",
        username: profileData?.username || "",
        email: profileData?.email || "",
        phone: profileData?.phone || "",
      });
    }
  }, [profileData, form]);

  const getProfile = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/auth/get-profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProfileData(data);
      } else {
        console.error("Failed to fetch profile");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: any) => {
    const payload = {
      first_name: data.first_name,
      last_name: data.last_name,
      phone: data.phone,
    };
    try {
      setIsSubmitting(true);
      const response = await fetch("/api/auth/update-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const resData = await response.json();

      if (response.ok) {
        toast.success("Profile updated successfully");
        // Optionally refresh profile data
        await getProfile();
      } else {
        toast.error(resData.message || "Failed to update profile");
      }
    } catch (error: any) {
      console.error("Error updating profile:", error);
      toast.error(`Failed to update profile - ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Skeleton Loader Component
  const SkeletonLoader = () => (
    <div className="w-full md:w-[60%] space-y-4 animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="h-4 w-20 bg-gray-200 rounded mb-2"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
        <div>
          <div className="h-4 w-20 bg-gray-200 rounded mb-2"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="h-4 w-20 bg-gray-200 rounded mb-2"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
        <div>
          <div className="h-4 w-20 bg-gray-200 rounded mb-2"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="h-4 w-20 bg-gray-200 rounded mb-2"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
      </div>
      <div className="flex justify-end">
        <div className="h-10 w-32 bg-gray-200 rounded"></div>
      </div>
    </div>
  );

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
                <Image
                  src="/Profile_Image_Default.png"
                  alt="avatar"
                  className="w-full h-full object-cover"
                  width={96}
                  height={96}
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
            {isLoading ? (
              <SkeletonLoader />
            ) : (
              <div className="w-full md:w-[60%] space-y-4">
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-[#6E6D6D] block mb-1">
                        First Name
                      </label>
                      <Input
                        {...form.register("first_name")}
                        placeholder="First name"
                        className="h-10 bg-transparent border-[#C4C4C4]"
                      />
                      {form.formState.errors.first_name && (
                        <p className="text-destructive text-xs mt-1">
                          {String(form.formState.errors.first_name?.message)}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="text-sm text-[#6E6D6D] block mb-1">
                        Last Name
                      </label>
                      <Input
                        {...form.register("last_name")}
                        placeholder="Last name"
                        className="h-10 bg-transparent border-[#C4C4C4]"
                      />
                      {form.formState.errors.last_name && (
                        <p className="text-destructive text-xs mt-1">
                          {String(form.formState.errors.last_name?.message)}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-[#6E6D6D] block mb-1">
                        Username
                      </label>
                      <Input
                        {...form.register("username")}
                        placeholder="Username"
                        className="h-10 bg-transparent border-[#C4C4C4]"
                        disabled
                      />
                      {form.formState.errors.username && (
                        <p className="text-destructive text-xs mt-1">
                          {String(form.formState.errors.username?.message)}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="text-sm text-[#6E6D6D] block mb-1">
                        Email
                      </label>
                      <Input
                        {...form.register("email")}
                        placeholder="email@example.com"
                        className="h-10 bg-transparent border-[#C4C4C4]"
                        disabled
                      />
                      {form.formState.errors.email && (
                        <p className="text-destructive text-xs mt-1">
                          {String(form.formState.errors.email?.message)}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-4 py-2 bg-dashboardButtons text-white rounded flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting && <Spinner size="md" color="white" />}
                      {isSubmitting ? "Updating..." : "Update Profile"}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>

        <div className="pt-6 space-y-4">
          <div className="space-y-1">
            <h3 className="font-primary text-xl md:text-2xl font-semibold">
              Change your password
            </h3>
            <p className="text-[#6E6D6D] text-sm md:text-base py-2">
              You&apos;ll need to log in again on all devices after changing your
              password
            </p>
          </div>

          <div>
            <ChangePasswordForm />
          </div>
        </div>
      </div>
    </div>
  );
}
