"use client";

import Image from "next/image";
import Link from "next/link";
import NavLinks from "./NavLinks";
import { useState, useEffect, useRef } from "react";
import Notifications from "./Notifications";

export default function Navbar() {
  const [profileOptions, setProfileOptions] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const menuRef = useRef(null);

  const toggleVisibility = () => {
    setProfileOptions((prevState) => !prevState);
  };

  const toggleNotifications = () => {
    setNotifications((prevState) => !prevState);
  }

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setProfileOptions(false);
      setNotifications(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-row space-x-24 mx-10 py-4">
      {/* Logo */}
      <div>
        <Link href="/">
          <Image
            src="/audease_logo.png"
            width={112}
            height={30}
            alt="Audease logo"
          />
        </Link>
      </div>
      {/* Navigation and Options */}
      <div className="flex flex-row space-x-8">
        <div>
          {/* Links */}
        <NavLinks />
        </div>
        
        {/* Search Field */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 border-none rounded-lg w-72 focus:outline-none focus:border-blue-500 text-tgrey3 bg-tgrey4"
            aria-label="Search"
          />
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Image src="/search.svg" width={15} height={15} alt="Search icon" />
          </span>
        </div>
        {/* Profile and Notifications */}
        <div className="relative flex flex-col" ref={menuRef}>
          <div className="flex flex-row space-x-4 py-1">
            <Image
              src="/createbutton.png"
              width={30}
              height={30}
              alt="Create button"
            />
            <Image
              src="/notification.png"
              width={32}
              height={32}
              alt="Notification button"
              onClick={toggleNotifications}
              aria-expanded={notifications}
            />
            <div
              className="w-8 h-8 bg-profilebg rounded-full flex items-center justify-center p-2 cursor-pointer"
              onClick={toggleVisibility}
              aria-expanded={profileOptions}
              aria-haspopup="true"
            >
              <p className="text-tgrey3 text-h5 font-semibold">N</p>
            </div>
          </div>
          {profileOptions && (
            <div className="absolute top-14 bg-white shadow-lg rounded-lg p-4 font-medium w-48 right-[0rem] space-y-4">
              {/* My profile  */}
              <div className="flex flex-row">
                <div className="w-6 h-6 bg-profilebg rounded-full flex items-center justify-center p-2">
                  <p className="text-tgrey3 text-h5 font-semibold">N</p>
                </div>
                <div>
                  <p className="px-2 hover:text-dashboardButtons text-sm cursor-pointer">
                    My Profile
                  </p>
                </div>
              </div>
              {/* Help and support  */}
              <div className="flex flex-row">
                <div>
                  <Image src={"/help.png"} width={20} height={20} alt="Help and Support"/>
                </div>
              <div>
                  <p className="px-3 hover:text-dashboardButtons text-sm cursor-pointer">
                  Help and Support
                  </p>
                </div>
              </div>
              {/* Invite Friends  */}
              <div className="flex flex-row">
                <div>
                  <Image src={"/friends.png"} width={20} height={20} alt="Help and Support"/>
                </div>
              <div>
                  <p className="px-3 hover:text-dashboardButtons text-sm cursor-pointer">
                  Invite Friends
                  </p>
                </div>
              </div>
              {/* Logout */}
              <div className="flex flex-row">
                <div>
                  <Image src={"/logout.png"} width={20} height={20} alt="Help and Support"/>
                </div>
              <div>
                  <p className="px-3 hover:text-dashboardButtons text-sm cursor-pointer">
                  Logout
                  </p>
                </div>
              </div>
            </div>
          )}

          {notifications && (
            <Notifications />
          )}
        </div>
      </div>
    </div>
  );
}
