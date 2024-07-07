"use client";

import { SlArrowLeft } from "react-icons/sl";
import { FaPlus, FaCheck } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Avatar } from "flowbite-react";
import Image from "next/image";

export default function Staff({ onClick }) {
  const [emailInput, setEmailInput] = useState("");
  const [staffs, setStaffs] = useState([]);
  const [invitedStaff, setInvitedStaff] = useState([]);
  const [error, setError] = useState("");

  // Handles change in input field
  const handleEmailChange = (e) => {
    setEmailInput(e.target.value);
    setError("");
  };

  // Handles the click on the add button
  const onAddClick = (e) => {
    e.preventDefault();
    if (emailInput.trim() !== "") {
      // Split by commas or spaces
      const emails = emailInput.split(/[\s,]+/).map((email) => email.trim());
      addEmails(emails);
    }
  };

  const addEmails = (emails) => {
    const validEmails = emails.filter(validateEmail);
    const invalidEmails = emails.filter((email) => !validateEmail(email));
    const duplicateEmails = validEmails.filter((email) =>
      staffs.includes(email)
    );
    const newEmails = validEmails.filter((email) => !staffs.includes(email));

    if (newEmails.length > 0) {
      setStaffs((prevStaffs) => [...prevStaffs, ...newEmails]);
    }

    if (invalidEmails.length >= 1) {
      setEmailInput([...invalidEmails, ...duplicateEmails].join(", "));
      setError("Invalid or duplicate email(s) not added.");
    } else if (duplicateEmails.length > 0) {
      setEmailInput(duplicateEmails.join(", "));
      setError("Duplicate email(s) not added.");
    } else {
      setEmailInput("");
      setError("");
    }
  };

  // Handles the enter button press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onAddClick(e);
    }
  };

  // Validates email format
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Handles removing emails
  const handleRemoveClick = (emailToRemove) => {
    setStaffs(staffs.filter((email) => email !== emailToRemove));
  };

  // Invite Now Button
  const inviteNow = () => {
    setInvitedStaff((prevInvitedStaff) => {
      const updatedInvitedStaff = [...prevInvitedStaff, ...staffs];
      localStorage.setItem("invitedStaff", JSON.stringify(updatedInvitedStaff)); // Save to local storage immediately
      return updatedInvitedStaff;
    });
    setStaffs([]);
  };

  // Load invitedStaff from local storage on component mount
  useEffect(() => {
    const storedInvitedStaff = localStorage.getItem("invitedStaff");
    if (storedInvitedStaff) {
      setInvitedStaff(JSON.parse(storedInvitedStaff));
    }
  }, []);

  // Save invitedStaff to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("invitedStaff", JSON.stringify(invitedStaff));
  }, [invitedStaff]);

  return (
    <div className="flex flex-col space-y-4 w-[60rem] font-inter">
      {/* Back Button */}
      <div>
        <button
          className="flex flex-row space-x-2 text-tgrey3"
          type="button"
          onClick={onClick}
        >
          <div className="pt-2">
            <SlArrowLeft className="text-tgrey3 h-[0.6rem]" />
          </div>
          <p className="font-medium text-base">Back</p>
        </button>
      </div>
      {/* The bordered */}
      <div>
        <div className="border-2 rounded-lg p-4 space-y-4">
          <div className="flex flex-col space-y-1">
            <h3 className="text-base font-medium">Add Staffs</h3>
            <p className="font-normal text-sm text-tgrey3">
              You can add multiple staffs at once using their work mail
            </p>
          </div>
          <hr />
          {/* Email Input Field */}
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="font-normal text-sm text-tgrey3 pb-2"
            >
              Email Address
            </label>
            {/* Shows list of temporary emails  */}
            <div className="flex flex-wrap items-center space-x-2 space-y-2">
              {/* The input field  */}
              <input
                type="text"
                value={emailInput}
                placeholder="Enter email"
                className="border-2 rounded-lg border-tgrey2 px-3 py-1 text-h2 text-black font-normal focus:border-gold1 focus:outline-none focus:ring-gold1 w-full"
                onChange={handleEmailChange}
                onKeyDown={handleKeyDown}
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>

          {/* The buttons */}
          <div className="flex flex-row justify-between">
            {/* Add button  */}
            <button
              className="flex flex-row rounded-md py-2 px-3 bg-dashboardButtonsBg text-dashboardButtons font-medium text-sm"
              onClick={onAddClick}
            >
              <span>
                <FaPlus className="text-dashboardButtons my-1 mr-2" />
              </span>{" "}
              Add
            </button>
            {/* Import button  */}
            <button className="flex flex-row rounded-md py-2 px-3 bg-dashboardRolesBtn text-white font-medium text-sm">
              <span>
                <FaPlus className="text-white my-1 mr-2" />
              </span>{" "}
              Import
            </button>
          </div>

          {/* To Invite email / empty */}
          {staffs.length === 0 ? (
            <div className="flex flex-col justify-center items-center">
              <div>
                <Image
                  src={"/email_illustration.png"}
                  width={200}
                  height={200}
                  alt="illustration"
                />
              </div>
              <div className="pt-6 flex flex-col justify-center items-center font-inter">
                <h3 className="font-medium text-base text-[#050708]">
                  No user added
                </h3>
                <p className="font-normal text-sm text-tgrey3">
                  Add a user by clicking on the{" "}
                  <span className="text-dashboardButtons">+ Add</span> button
                </p>
              </div>
            </div>
          ) : (
            // If staff.length is not 0
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[10rem] gap-y-4">
                {staffs.map((email, index) => (
                  <div
                    key={index}
                    className="flex flex-row items-center space-x-4"
                  >
                    {/* <Avatar img={getAvatarUrl(email)} rounded /> */}
                    <Avatar img="/avatar.png" rounded />
                    <div className="py-3">
                      <h2 className="font-medium text-sm text-black">
                        {email}
                      </h2>
                    </div>
                    <div className="my-2">
                      <button
                        className="py-1 px-2 rounded-md bg-tgrey4 text-tgrey3 font-medium text-xs"
                        onClick={() => handleRemoveClick(email)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {/* Number of emails to be Added*/}
              <div>
                <div className="my-4">
                  <h3 className="font-medium text-sm text-tgrey3">
                    <span className="text-dashboardButtons">
                      {staffs.length} email
                    </span>{" "}
                    address(es) listed, Click to add
                  </h3>
                </div>
                {/* Invite now button  */}
                <div>
                  <button
                    className="flex flex-row rounded-md py-2 px-3 bg-black text-white font-medium text-sm"
                    onClick={inviteNow}
                  >
                    <span>
                      <FaCheck className="text-white my-1 mr-2" />
                    </span>
                    Add
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
