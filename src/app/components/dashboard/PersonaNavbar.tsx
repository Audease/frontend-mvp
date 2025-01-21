"use client";

import Image from "next/image";
import Link from "next/link";
import PersonaNavLinks from "./PersonaNavLinks";
import { useState, useEffect, useRef } from "react";
import Notifications from "./Notifications";
import NavbarPlusButton from "./NavbarPlusButton";
import { useRouter } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export default function PersonaNavbar() {
  const [profileOptions, setProfileOptions] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [plusButton, setPlusButton] = useState(false);
  const menuRef = useRef(null);
  const router = useRouter();

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
    console.log("logout");
    const response = await fetch("/api/logout", {
      method: "POST",
    });
    if (response.ok) {
      router.push("/signIn");
    } else {
      console.error("Failed to log out");
    }
  };

  const MobileMenu = () => (
    <div className="flex flex-col space-y-4 p-4">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 border-none rounded-lg focus:outline focus:ring-tgrey1 text-tgrey3 bg-tgrey4"
          aria-label="Search"
        />
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <Image src="/search.svg" width={15} height={15} alt="Search icon" />
        </span>
      </div>

      <div className="block md:hidden">
        <PersonaNavLinks />
      </div>

      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-profilebg rounded-full flex items-center justify-center">
          <p className="text-tgrey3 text-h5 font-semibold">N</p>
        </div>
        <p className="text-sm">My Profile</p>
      </div>

      <div className="space-y-2">
        <Link
          href="/help"
          className="flex items-center space-x-2 hover:text-dashboardButtons"
        >
          <Image
            src="/help.png"
            width={18}
            height={18}
            alt="Help and Support"
          />
          <span className="text-sm">Help and Support</span>
        </Link>

        <Link
          href="/invite"
          className="flex items-center space-x-2 hover:text-dashboardButtons"
        >
          <Image
            src="/friends.png"
            width={18}
            height={18}
            alt="Invite Friends"
          />
          <span className="text-sm">Invite Friends</span>
        </Link>

        <button
          onClick={logout}
          className="flex items-center space-x-2 hover:text-dashboardButtons w-full"
        >
          <Image src="/logout.png" width={18} height={18} alt="Logout" />
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <nav className="sticky top-0 bg-white z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Main Nav */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/audease_logo.png"
                width={112}
                height={30}
                alt="Audease logo"
              />
            </Link>

            <div className="hidden md:block ml-20">
              <PersonaNavLinks />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border-none rounded-lg w-72 focus:outline focus:ring-tgrey1 text-tgrey3 bg-tgrey4"
                aria-label="Search"
              />
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Image
                  src="/search.svg"
                  width={15}
                  height={15}
                  alt="Search icon"
                />
              </span>
            </div>

            <div className="flex items-center space-x-4" ref={menuRef}>
              <button onClick={togglePlusButton}>
                <Image
                  src="/createbutton.png"
                  width={30}
                  height={30}
                  alt="Create button"
                  className="hover:opacity-80"
                />
              </button>

              <button onClick={toggleNotifications}>
                <Image
                  src="/notification.png"
                  width={32}
                  height={32}
                  alt="Notification button"
                  className="hover:opacity-80"
                />
              </button>

              <button
                onClick={toggleVisibility}
                className="w-8 h-8 bg-profilebg rounded-full flex items-center justify-center hover:opacity-80"
              >
                <p className="text-tgrey3 text-h5 font-semibold">N</p>
              </button>
            </div>

            {/* Profile Dropdown */}
            {profileOptions && (
              <div className="absolute top-14 bg-white shadow-lg rounded-lg p-4 font-medium w-48 right-[4rem] space-y-4">
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

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <MobileMenu />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
