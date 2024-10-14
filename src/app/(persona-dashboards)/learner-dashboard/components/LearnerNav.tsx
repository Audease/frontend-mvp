"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import Notifications from "../../../components/dashboard/Notifications";

const LearnerNav = () => {
  const [notifications, setNotifications] = useState(false);
  const [profileOptions, setProfileOptions] = useState(false);
  const menuRef = useRef(null);

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

  const toggleNotifications = () => {
    setNotifications((prevState) => !prevState);
  };

  const toggleVisibility = () => {
    setProfileOptions((prevState) => !prevState);
  };

  const logout = () => {
    console.log("Logout");
  };

  return (
    <nav className="flex flex-row justify-between mx-10 py-4">
      {/* Logo */}
      <div className="flex flex-row space-x-20">
        <Link href="/">
          <Image
            src="/audease_logo.png"
            width={112}
            height={30}
            alt="Audease logo"
          />
        </Link>

        <div></div>
      </div>
      {/* Navigation and Options */}
      <div className="flex flex-row space-x-8">
        {/* Profile and Notifications */}
        <div className="relative flex flex-col">
          <div className="flex flex-row space-x-4 py-1">
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
              {/* Help and support  */}
              <div className="flex flex-row">
                <div>
                  <Image
                    src={"/help.png"}
                    width={20}
                    height={20}
                    alt="Help and Support"
                  />
                </div>
                <div>
                  <p className="px-3 hover:text-dashboardButtons text-sm cursor-pointer">
                    Help and Support
                  </p>
                </div>
              </div>
              {/* Logout */}
              <div className="flex flex-row">
                <div>
                  <Image
                    src={"/logout.png"}
                    width={20}
                    height={20}
                    alt="Help and Support"
                  />
                </div>
                <div>
                  <p
                    className="px-3 hover:text-dashboardButtons text-sm cursor-pointer"
                    onClick={logout}
                  >
                    Logout
                  </p>
                </div>
              </div>
            </div>
          )}

          {notifications && <Notifications />}
        </div>
      </div>
    </nav>
  );
};

export default LearnerNav;
