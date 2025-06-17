"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { IoCloudUploadOutline } from "react-icons/io5";
import { IoIosCheckmark } from "react-icons/io";
import ProgressStepper from "../../components/ProgressIndicator";
import { useUserRole } from "./documents/lib/hooks/useUserRole";



interface UserDetailsDefaultProps {
  userId: string;
  formData?: Partial<{
    name: string;
    learnerUserName: string;
    email: string;
    mobile_number: string;
    application_status?: string;
    application_mail?: string;
    certificate_status?: string;
    lazer_status?: string;
    inductor_status?: string;
  }>;
}

export default function UserDetailsDefault({
  userId,
  formData: initialFormData,
}: UserDetailsDefaultProps) {
  const [formData, setFormData] = useState({
    learnerName: initialFormData?.name || "",
    learnerUserName: initialFormData?.learnerUserName || "",
    email: initialFormData?.email || "",
    phoneNumber: initialFormData?.mobile_number || "",
  });
 

  const progressData = [
    { id: 1, label: 'Application', status: 'completed' },
    { id: 2, label: 'Initial Assessment', status: initialFormData?.application_mail === 'Sent' ? 'completed' : 'current' },
    { id: 3, label: 'Application Review', status: initialFormData?.application_mail !== 'Sent' ? 'pending' : 
      initialFormData?.application_status === 'Approved' ? 'completed' : 'current' },
    { id: 4, label: 'Induction', status: initialFormData?.application_status !== 'Approved' ? 'pending' :
      initialFormData?.inductor_status === 'Sent' ? 'completed' : 'current' },
    { id: 5, label: 'Learning Platform', status: initialFormData?.inductor_status !== 'Sent' ? 'pending' :
      initialFormData?.lazer_status === 'Approved' ? 'completed' : 'current' },
    { id: 6, label: 'Certificate', status: initialFormData?.lazer_status !== 'Approved' ? 'pending' :
      initialFormData?.certificate_status === 'Approved' ? 'completed' : 'current' }
  ];

  // console.log(initialFormData)

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Update form data when initialFormData changes
  useEffect(() => {
    if (initialFormData) {
      setFormData({
        learnerName: initialFormData.name || "",
        learnerUserName: initialFormData.learnerUserName || "",
        email: initialFormData.email || "",
        phoneNumber: initialFormData.mobile_number || "",
      });
    }
  }, [initialFormData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to save changes");
      }

      setMessage({ type: "success", text: "Changes saved successfully" });
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Failed to save changes",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateContact = async (type: "email" | "phone") => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/users/${userId}/verify-${type}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          [type]: formData[type === "email" ? "email" : "phoneNumber"],
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update ${type}`);
      }

      setMessage({
        type: "success",
        text: `Verification sent to your ${type}. Please check for confirmation.`,
      });
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error instanceof Error ? error.message : `Failed to update ${type}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const userRole = useUserRole();

  return (
    <div className="space-y-4 border-t-[1px] border-tgrey2 border-l-[1px] p-4 md:p-8">
      <div className="md:pb-8 pb-2">
        <p className="font-normal text-sm text-tgrey3">
          Your Application Status
        </p>
        <ProgressStepper data={progressData}/>
      </div>

      {/* {Personal details} */}
      <div className="space-y-4 rounded border border-tgrey2 border-e-0 p-4 mb-8 shadow-sm mr-8">
        <div>
          <h3 className="font-semibold text-base pb-2">Personal Details</h3>
          <hr className="w-1/2" />
        </div>

        {/* <div className="flex flex-row items-center space-x-4">
          <div className="relative w-[70px] h-[70px]">
            <Image
              src={"/Profile_Image_Default.png"}
              alt="userImage"
              layout="fill"
              objectFit="cover"
              className="rounded-full"
            />
          </div>
          <button
            className="px-4 py-2 text-sm text-dashboardButtons bg-dashboardButtonsBg rounded flex items-center space-x-2 hover:bg-opacity-80 transition-colors"
            disabled={isLoading}
          >
            <IoCloudUploadOutline className="w-5 h-5" />
            <span>Upload Profile Image</span>
          </button>
        </div> */}

        <div className="space-y-6">
          <div className="flex md:flex-row flex-col md:space-x-6 md:space-y-0 space-y-4">
            <div className="flex flex-col space-y-2">
              <label htmlFor="learnerName" className="text-sm text-tgrey3">
                Name
              </label>
              <input
                type="text"
                id="learnerName"
                name="learnerName"
                value={formData.learnerName}
                onChange={handleInputChange}
                className="rounded-lg py-2 px-3 border border-gray-400 md:w-60 focus:ring focus:ring-dashboardButtons focus:border-transparent"
                disabled={userRole !== "admin" || isLoading}
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="learnerUserName" className="text-sm text-tgrey3">
                Username
              </label>
              <div className="flex">
                <input
                  type="text"
                  id="learnerUserName"
                  name="learnerUserName"
                  value={formData.learnerUserName}
                  onChange={handleInputChange}
                  className="rounded-l-lg py-2 px-3 border border-gray-400 w-[9rem] md:w-52 focus:ring focus:ring-dashboardButtons focus:border-transparent"
                  disabled={userRole !== "admin" || isLoading}
                />
                <span className="rounded-r-lg py-2 px-3 border border-l-0 border-gray-400 bg-tgrey4 md:w-24">
                  .learner
                </span>
              </div>
            </div>
          </div>

          <div className="bg-tgrey4 p-3 rounded-lg md:w-[35.5rem]">
            <p className="text-xs text-tgrey3">
              Note : You can only change username by reaching out to your
              school.
            </p>
          </div>

          {userRole === "admin" && (
            <button
              onClick={handleSaveChanges}
              disabled={isLoading}
              className="flex items-center space-x-2 bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              <IoIosCheckmark className="w-6 h-6" />
              <span>{isLoading ? "Saving..." : "Save changes"}</span>
            </button>
          )}
        </div>
      </div>

      <div className="space-y-4 rounded border border-tgrey2 border-e-0 p-4 shadow-sm mr-8">
        <div>
          <h3 className="font-semibold text-base pb-2">
            Email and Phone Details
          </h3>
          <hr className="w-1/2" />
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm text-tgrey3">
              Email Address
            </label>
            <div className="flex space-x-2">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="rounded-lg py-2 px-3 border border-gray-400 w-60 focus:ring focus:ring-dashboardButtons focus:border-transparent"
                disabled={userRole !== "admin" || isLoading}
              />
              {userRole === "admin" && (
                <button
                  onClick={() => handleUpdateContact("email")}
                  disabled={isLoading}
                  className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
                >
                  {isLoading ? "Updating..." : "Update"}
                </button>
              )}
            </div>
            <div className="bg-tgrey4 p-3 rounded-lg md:w-[30rem]">
              <p className="text-xs text-tgrey3">
                Note : You can only change email by reaching out to your school.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="phoneNumber" className="text-sm text-tgrey3">
              Phone Number
            </label>
            <div className="flex space-x-2">
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="rounded-lg py-2 px-3 border border-gray-400 md:w-60 focus:ring focus:ring-dashboardButtons focus:border-transparent"
                disabled={userRole !== "admin" || isLoading}
              />
              {userRole === "admin" && (
                <button
                  onClick={() => handleUpdateContact("phone")}
                  disabled={isLoading}
                  className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
                >
                  {isLoading ? "Updating..." : "Update"}
                </button>
              )}
            </div>
            <div className="bg-tgrey4 p-3 rounded-lg md:w-[30rem]">
              <p className="text-xs text-tgrey3">
                Note : You can only change phone number by reaching out to your
                school.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
