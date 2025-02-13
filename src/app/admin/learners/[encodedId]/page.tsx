"use client";

import { SlArrowLeft } from "react-icons/sl";
import { IoMdSettings, IoMdLock } from "react-icons/io";
import { AiOutlineHome } from "react-icons/ai";
import { IoPerson } from "react-icons/io5";
import { FaBell } from "react-icons/fa";
import clsx from "clsx";
import { useState, useEffect } from "react";
import UserDetailsDefault from "./UserDetails/userDetailsDefault";
import UserDetailsDocuments from "./UserDetails/documents/userDetailsDocuments";
import UserDetailsPassword from "./UserDetails/userDetailsPassword";
import UserDetailsDeactivation from "./UserDetails/userDetailsDeactivation";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { decodeId } from "../utils/id-encoded";
import { FaRegCalendarMinus } from "react-icons/fa6";
import { PiCirclesFour } from "react-icons/pi";

interface Learner {
  id: string;
  name: string;
  date_of_birth: string;
  mobile_number: string;
  email: string;
  NI_number: string;
  passport_number: string;
  home_address: string;
  funding: string;
  level: number;
  awarding: string;
  chosen_course: string;
  application_mail: string;
  onboarding_status: string;
  created_at: string;
  updated_at: string;
  application_status: string;
}

export default function UserDetails({ backButton = true }) {
  const [activeSection, setActiveSection] = useState("userDetails");
  const router = useRouter();
  const params = useParams();
  const userId = decodeId(params.encodedId as string);
  // console.log(userId)

  const [learner, setLearner] = useState<Learner | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchLearnerInfo() {
      if (!userId) {
        setError("No user ID found");
        return;
      }
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `/api/individualLearner?learnerId=${userId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch learner info");
        }
        const data = await response.json();
        setLearner(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load user details"
        );
        setMessage({ type: "error", text: "Failed to load user details" });
      } finally {
        setIsLoading(false);
      }
    }

    fetchLearnerInfo();
  }, [userId]);

  const onUserDetailsClick = () => {
    setActiveSection("userDetails");
  };

  const onDocumentsClick = () => {
    setActiveSection("documents");
  };

  const onPasswordClick = () => {
    setActiveSection("password");
  };

  const onDeactivationClick = () => {
    setActiveSection("deactivation");
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case "userDetails":
      default:
        return <UserDetailsDefault userId={userId} formData={learner} />;
      case "documents":
        return <UserDetailsDocuments userId={userId}/>;
      case "password":
        return <UserDetailsPassword />;
      case "deactivation":
        return <UserDetailsDeactivation />;
    }
  };

  const onBackClick = () => {
    router.push("/admin/learners");
  };

  
  return (
    <div className="flex flex-col">
      {/* Back Button */}
      <div>
        {backButton && (
          <button
            className="flex flex-row space-x-2 text-tgrey3"
            type="button"
            onClick={onBackClick}
          >
            <div className="pt-2">
              <SlArrowLeft className="text-tgrey3 h-[0.6rem]" />
            </div>
            <p className="font-medium text-base">Back</p>
          </button>
        )}
      </div>

      {message.text && (
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
      <div className="flex flex-col xl:flex-row min-h-[30rem] rounded w-full">
        <div className="text-tgrey3 font-medium text-sm space-y-2 lg:w-[15%] px-6 pt-6 ">
          {/* User Details */}
          <h2
            className={clsx(
              "flex flex-row items-center  cursor-pointer pr-10 py-1 pl-2 rounded",
              {
                "bg-[#FDF5EE]": activeSection === "userDetails",
                "bg-white": activeSection !== "userDetails",
              }
            )}
            onClick={onUserDetailsClick}
          >
            <span className="pr-2 py-1">
              <AiOutlineHome className="w-5 h-5"/>
            </span>
            Home
          </h2>
          {/* Documents */}
          <h2
            className={clsx(
              "flex flex-row items-center cursor-pointer pr-10 py-1 pl-2 rounded",
              {
                "bg-[#FDF5EE]": activeSection === "documents",
                "bg-white": activeSection !== "documents",
              }
            )}
            onClick={onDocumentsClick}
          >
            <span className="pr-2 py-1">
              <FaRegCalendarMinus className="w-5 h-5"/>
            </span>
            Documents
          </h2>
          {/* Password */}
          <h2
            className={clsx(
              "flex flex-row items-center cursor-pointer pr-10 py-1 pl-2 rounded",
              {
                "bg-[#FDF5EE]": activeSection === "password",
                "bg-white": activeSection !== "password",
              }
            )}
            onClick={onPasswordClick}
          >
            <span className="pr-2 py-1">
              <IoMdLock className="w-5 h-5"/>
            </span>
            Password
          </h2>
          {/* Deactivation */}
          <h2
            className={clsx(
              "flex flex-row items-center cursor-pointer pr-10 py-1 pl-2 rounded",
              {
                "bg-[#FDF5EE]": activeSection === "deactivation",
                "bg-white": activeSection !== "deactivation",
              }
            )}
            onClick={onDeactivationClick}
          >
            <span className="pr-2 py-1">
              <PiCirclesFour className="w-6 h-6"/>
            </span>
            Deactivation
          </h2>
        </div>
        <div className="flex flex-col lg:w-[85%]">
          {renderActiveSection()}
        </div>
      </div>
    </div>
  );
}
