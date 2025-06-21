"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Notifications from "../../../components/dashboard/Notifications";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/store";
import { Menu, X, Bell, HelpCircle, LogOut } from "lucide-react";
import Link from "next/link";

const LearnerNav = () => {
  const [notifications, setNotifications] = useState(false);
  const [profileOptions, setProfileOptions] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userEmailFirstLetter, setUserEmailFirstLetter] = useState("");
  const menuRef = useRef(null);
  const notificationRef = useRef(null);
  const router = useRouter();

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setProfileOptions(false);
    }
    if (
      notificationRef.current &&
      !notificationRef.current.contains(event.target)
    ) {
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
    if (profileOptions) setProfileOptions(false);
  };

  const toggleProfileOptions = () => {
    setProfileOptions((prevState) => !prevState);
    if (notifications) setNotifications(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prevState) => !prevState);
  };

  const logout = async () => {
    const response = await fetch("/api/logout", {
      method: "POST",
    });

    if (response.ok) {
      localStorage.removeItem("lastActiveAt");
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
      setUserEmailFirstLetter(firstLetter);
    }
  }, [userEmail]);

  return (
    <nav className="w-full shadow-sm bg-white">
      <div className="max-w-screen-2xl mx-auto">
        {/* Desktop Navigation */}
        <div className="hidden md:flex w-full">
          {/* Logo */}
          <div className="flex items-center justify-center border-r border-tgrey2 w-[13rem] p-4">
            <Image
              src="/audease_logo.png"
              width={112}
              height={30}
              alt="Audease logo"
              className="object-contain"
            />
          </div>

          {/* Navigation and Options */}
          <div className="flex justify-between items-center flex-grow px-6 py-3">
            <div className="flex items-center">
              <h3 className="font-medium text-tgrey3 transition-colors">
                Eden College
              </h3>
            </div>

            {/* Profile and Notifications */}
            <div className="flex items-center space-x-4">
              <div className="relative" ref={notificationRef}>
                <button
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  onClick={toggleNotifications}
                  aria-expanded={notifications}
                  aria-label="Notifications"
                >
                  <Bell size={20} className="text-gray-600" />
                </button>
                {notifications && (
                  <div className="absolute right-0 mt-2 z-10">
                    <Notifications />
                  </div>
                )}
              </div>

              <div className="relative" ref={menuRef}>
                <button
                  className="w-8 h-8 bg-profilebg rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                  onClick={toggleProfileOptions}
                  aria-expanded={profileOptions}
                  aria-haspopup="true"
                  aria-label="User profile"
                >
                  <p className="text-tgrey3 font-semibold">
                    {userEmailFirstLetter}
                  </p>
                </button>

                {profileOptions && (
                  <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg py-2 w-48 z-10">
                    <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                      <HelpCircle size={16} className="mr-2" />
                      <Link
                        href="/help-and-support"
                        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span>Help and Support</span>
                      </Link>
                    </button>
                    <button
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={logout}
                    >
                      <LogOut size={16} className="mr-2" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <div className="flex items-center justify-between p-4">
            <Image
              src="/audease_logo.png"
              width={100}
              height={28}
              alt="Audease logo"
              className="object-contain"
            />

            <div className="flex items-center space-x-2">
              <button
                className="p-2 rounded-full hover:bg-gray-100 transition-colors relative"
                onClick={toggleNotifications}
                aria-expanded={notifications}
                aria-label="Notifications"
              >
                <Bell size={20} className="text-gray-600" />
              </button>

              <button
                className="w-8 h-8 bg-profilebg rounded-full flex items-center justify-center"
                aria-expanded={profileOptions}
                aria-haspopup="true"
                aria-label="User profile"
              >
                <p className="text-tgrey3 font-semibold">
                  {userEmailFirstLetter}
                </p>
              </button>

              <button
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                onClick={toggleMobileMenu}
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X size={20} className="text-gray-600" />
                ) : (
                  <Menu size={20} className="text-gray-600" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile menu dropdown */}
          {mobileMenuOpen && (
            <div className="bg-white border-t border-gray-200 py-2">
              <div className="px-4 py-3 border-b border-gray-200">
                <h3 className="font-medium text-tgrey3">Eden College</h3>
              </div>
              <div className="px-4 py-2">
                <button className="flex items-center w-full py-2 text-sm text-gray-700">
                  <HelpCircle size={16} className="mr-2" />
                  <Link
                        href="/help-and-support"
                        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span>Help and Support</span>
                      </Link>
                </button>
                <button
                  className="flex items-center w-full py-2 text-sm text-gray-700"
                  onClick={logout}
                >
                  <LogOut size={16} className="mr-2" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}

          {/* Mobile notifications dropdown */}
          {notifications && (
            <div className="fixed inset-x-0 top-[72px] bg-white shadow-lg z-10 max-h-[70vh] overflow-y-auto">
              <Notifications />
            </div>
          )}

          {/* Mobile profile options dropdown */}
          {profileOptions && !mobileMenuOpen && (
            <div className="fixed inset-x-0 top-[72px] bg-white shadow-lg z-10">
              <div className="py-2">
                <button className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-100">
                  <HelpCircle size={16} className="mr-2" />
                  <span>Help and Support</span>
                </button>
                <button
                  className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={logout}
                >
                  <LogOut size={16} className="mr-2" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default LearnerNav;
