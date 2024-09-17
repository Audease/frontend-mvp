"use client";

import { SlArrowLeft } from "react-icons/sl";
import { IoMdSettings, IoMdLock } from "react-icons/io";
import { IoPerson } from "react-icons/io5";
import { FaBell } from "react-icons/fa";
import clsx from "clsx";
import { useState, useEffect } from "react";
// import PropTypes from 'prop-types';
import UserDetailsDefault from "./userDetailsDefault";
import UserDetailsDocuments from "./userDetailsDocuments";
import UserDetailsPassword from "./userDetailsPassword";
import UserDetailsDeactivation from "./userDetailsDeactivation";

export default function UserDetails({ userId: initialUserId, onBackClick }) {
  const [activeSection, setActiveSection] = useState("userDetails");
  const [userId, setUserId] = useState(initialUserId);  

  const [formData, setFormData] = useState({
    learnerName: "",      
    learnerUserName: "",
    email: "",
    phoneNumber: "",
  });

  useEffect(() => {
    if (userId) {
      setFormData({
        learnerName: userId.name,
        learnerUserName: userId.username,
        email: userId.email,
        phoneNumber: userId.phoneNumber,
      });
    }
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSaveChanges = () => {
    setUserId((prevUserId) => ({
      ...prevUserId,
      name: formData.learnerName,
      username: formData.learnerUserName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
    }));
    console.log("Form Data Saved:", formData);
  };

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
        return (
          <UserDetailsDefault
            formData={formData}
            onInputChange={handleInputChange}
            onSaveChanges={handleSaveChanges}
          />
        );
      case "documents":
        return <UserDetailsDocuments />
      case "password":
        return <UserDetailsPassword />
      case "deactivation":
        return <UserDetailsDeactivation />;
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      {/* Back Button */}
      <div>
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
      </div>

      <div className="flex flex-row w-full h-full min-h-[30rem] border border-tgrey2 rounded p-4 space-x-4">
        <div className="text-tgrey3 font-medium text-sm space-y-4">
          {/* User Details */}
          <h2
            className={clsx(
              "flex flex-row cursor-pointer pr-10 py-1 pl-2 rounded",
              {
                "bg-tgrey4": activeSection === "userDetails",
                "bg-white": activeSection !== "userDetails",
              }
            )}
            onClick={onUserDetailsClick}
          >
            <span className="pr-2 py-1">
              <IoMdSettings />
            </span>
            User Details
          </h2>
          {/* Documents */}
          <h2
            className={clsx(
              "flex flex-row cursor-pointer pr-10 py-1 pl-2 rounded",
              {
                "bg-tgrey4": activeSection === "documents",
                "bg-white": activeSection !== "documents",
              }
            )}
            onClick={onDocumentsClick}
          >
            <span className="pr-2 py-1">
              <IoMdLock />
            </span>
            Documents
          </h2>
          {/* Password */}
          <h2
            className={clsx(
              "flex flex-row cursor-pointer pr-10 py-1 pl-2 rounded",
              {
                "bg-tgrey4": activeSection === "password",
                "bg-white": activeSection !== "password",
              }
            )}
            onClick={onPasswordClick}
          >
            <span className="pr-2 py-1">
              <FaBell />
            </span>
            Password
          </h2>
          {/* Deactivation */}
          <h2
            className={clsx(
              "flex flex-row cursor-pointer pr-10 py-1 pl-2 rounded",
              {
                "bg-tgrey4": activeSection === "deactivation",
                "bg-white": activeSection !== "deactivation",
              }
            )}
            onClick={onDeactivationClick}
          >
            <span className="pr-2 py-1">
              <IoPerson />
            </span>
            Deactivation
          </h2>
        </div>
        <div className="flex flex-col pl-4 w-full mr-0">
          {renderActiveSection()}
        </div>
      </div>
    </div>
  );
}

// UserDetails.propTypes = {
//   userId: PropTypes.shape({
//     name: PropTypes.string,
//     username: PropTypes.string,
//     email: PropTypes.string,
//     loginTime: PropTypes.string,
//     funding: PropTypes.string,
//     payment: PropTypes.string,
//   }).isRequired,
//   onBackClick: PropTypes.func.isRequired,
// };
