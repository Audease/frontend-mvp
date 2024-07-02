"use client";

import { SlArrowLeft } from "react-icons/sl";
import { FaPlus, FaCheck } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import { useState } from "react";
import { Avatar } from "flowbite-react";
import md5 from "md5";
import Image from "next/image";
import SearchBox from "../../components/dashboard/SearchBox";

export default function Staff({ onClick }) {
  const [emailInput, setEmailInput] = useState("");
  const [temporaryEmails, setTemporaryEmails] = useState([]);
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
      addEmails([emailInput.trim()]);
    }
    if (temporaryEmails.length > 0) {
      addEmails(temporaryEmails);
    }
    setTemporaryEmails([]);
    setEmailInput("");
  };

  const addEmails = (emails) => {
    const newEmails = emails.filter(
      (email) => validateEmail(email) && !staffs.includes(email)
    );

    if (newEmails.length > 0) {
      setStaffs([...staffs, ...newEmails]);
      setEmailInput("");
    } else {
      setError("Please enter valid email addresses.");
    }
  };

  // Handles the space and enter button press
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const trimmedEmail = emailInput.trim();
      if (
        validateEmail(trimmedEmail) &&
        !temporaryEmails.includes(trimmedEmail)
      ) {
        setTemporaryEmails([...temporaryEmails, trimmedEmail]);
        setEmailInput("");
      } else {
        setError("Please enter a valid email address.");
      }
    }
  };

  // Removes temporary email
  const handleRemoveTemporaryEmail = (emailToRemove) => {
    setTemporaryEmails(
      temporaryEmails.filter((email) => email !== emailToRemove)
    );
  };

  // Validates emial format
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
    setInvitedStaff((prevInvitedStaff) => [...prevInvitedStaff, ...staffs]);
    setStaffs([]);
  };

  // Remive invited Button
  const handleRemoveInvite = (staffToRemove) => {
    setInvitedStaff(invitedStaff.filter((staff) => staff !== staffToRemove));
  };

  const getAvatarUrl = (email) => {
    const hash = md5(email.trim().toLowerCase());
    return `https://robohash.org/${hash}.png`;
  };

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
              {temporaryEmails.map((email, index) => (
                <div
                  key={index}
                  className="flex items-center bg-blue-100 px-2 py-1 rounded-full space-x-2"
                >
                  <span>{email}</span>
                  <button
                    className="text-red-500"
                    onClick={() => handleRemoveTemporaryEmail(email)}
                  >
                    x
                  </button>
                </div>
              ))}
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

              {/* No to be Invited */}
              <div>
                <div className="my-4">
                  <h3 className="font-medium text-sm text-tgrey3">
                    <span className="text-dashboardButtons">
                      {staffs.length} email
                    </span>{" "}
                    address added to invite, Click to send invite
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
                    Invite Now
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Invited  */}
        {invitedStaff.length === 0 ? (
          <div></div>
        ) : (
          <div className="my-8 ml-3">
            {/* Add staff and the search box  */}
            <div className="flex flex-row justify-between">
              <div className="flex flex-col space-y-1">
                <h3 className="text-base font-medium">Add Staffs</h3>
                <p className="font-normal text-sm text-tgrey3">
                  You can add multiple staffs at once using their work mail
                </p>
              </div>
              {/* The search box */}
              <div>
                <SearchBox />
              </div>
            </div>
            {/* Invited emails  */}
            <div className="overflow-y-auto h-[18rem]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-6 ">
                {invitedStaff.map((email, index) => (
                  <div key={index} className="flex flex-row space-x-2 ">
                    <div>
                      <Avatar img="/avatar.png" rounded size={"sm"} />
                    </div>

                    <div className="py-3">
                      <h2 className="font-medium text-xs text-black">
                        {email}
                      </h2>
                    </div>
                    <div className="my-2">
                      <button className="py-1 px-2 rounded-md bg-tgrey4 text-tgrey3 font-medium text-xs">
                        Pending
                      </button>
                    </div>
                    <div className="my-2">
                      <button className="py-1 px-2 rounded-md bg-dashboardButtonsBg text-dashboardButtons font-medium text-xs">
                        Invite again
                      </button>
                    </div>
                    <div className="my-3">
                      <IoCloseOutline
                        onClick={() => handleRemoveInvite(email)}
                        className="text-tgrey1"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
