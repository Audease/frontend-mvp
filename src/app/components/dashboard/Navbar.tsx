"use client";

import Image from "next/image";
import Link from "next/link";
import NavLinks from "./NavLinks";
import { useState, useEffect, useRef } from "react";
import Notifications from "./Notifications";
import NavbarPlusButton from "./NavbarPlusButton";
import { useRouter } from "next/navigation";
import { useAppSelector } from "../../../redux/store";

export default function Navbar() {
  const [profileOptions, setProfileOptions] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [plusButton, setPlusButton] = useState(false);
  const [userEmailFirstLetter, setuserEmailFirstLetter] = useState("");
  const menuRef = useRef(null);
  const router = useRouter();

  const links = [
    { name: "Apps", href: "/admin" },
    { name: "Resources", href: "#" },
    { name: "Messenger", href: "/admin/messenger" },
    { name: "Learners", href: "/admin/learners" },
    { name: "Staff", href: "/admin/staff" },
    { name: "Worflows", href: "/admin/workflows" },
  ];

  const toggleVisibility = () => {
    setProfileOptions((prevState) => !prevState);
  };

  const toggleNotifications = () => {
    setNotifications((prevState) => !prevState);
  };

  const togglePlusButton = () => {
    setPlusButton((prevState) => !prevState);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setProfileOptions(false);
      setNotifications(false);
      setPlusButton(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const logout = async () => {
    const response = await fetch("/api/logout", {
      method: "POST",
    });

    if (response.ok) {
      router.push("/signIn");
    } else {
      console.error("Failed to log out");
    }
  };

  const userEmail = useAppSelector(
    (state) => state.authReducer.value.userEmail
  );
  useEffect(() => {
    if (userEmail) {
      const firstLetter = userEmail.charAt(0).toUpperCase();
      setuserEmailFirstLetter(firstLetter);
    }
  }, [userEmail]);

  return (
    <div className="flex flex-row space-x-24 mx-auto py-4  justify-center">
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
          <NavLinks links={links} />
        </div>

        {/* Search Field */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 border-none rounded-lg w-72 focus:outline focus:ring-tgrey1 text-tgrey3 bg-tgrey4"
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
              onClick={togglePlusButton}
              aria-expanded={plusButton}
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
              <p className="text-tgrey3 text-lg">
                {userEmailFirstLetter}
              </p>
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
              {/* Invite Friends  */}
              <div className="flex flex-row">
                <div>
                  <Image
                    src={"/friends.png"}
                    width={20}
                    height={20}
                    alt="Help and Support"
                  />
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

          {plusButton && <NavbarPlusButton />}
        </div>
      </div>
    </div>
  );
}
