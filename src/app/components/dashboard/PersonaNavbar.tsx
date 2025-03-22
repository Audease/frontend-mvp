"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/store";
import { logOut } from "@/redux/features/login/auth-slice";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import PersonaNavLinks from "./PersonaNavLinks";
import Notifications from "./Notifications";
import NavbarPlusButton from "./NavbarPlusButton";

export default function PersonaNavbar() {
  const [profileOptions, setProfileOptions] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [plusButton, setPlusButton] = useState(false);
  const [userEmailFirstLetter, setUserEmailFirstLetter] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const userEmail = useAppSelector(
    (state) => state.authReducer.value.userEmail
  );

  useEffect(() => {
    if (userEmail) {
      setUserEmailFirstLetter(userEmail.charAt(0).toUpperCase());
    }
  }, [userEmail]);


  const toggleVisibility = () => {
    setProfileOptions((prev) => !prev);
  };

  const toggleNotifications = () => {
    setNotifications((prev) => !prev);
  };

  const togglePlusButton = () => {
    setPlusButton((prev) => !prev);
  };

  const logout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
      });

      if (response.ok) {
        localStorage.removeItem("persist:root");
        dispatch(logOut());
        router.push("/signIn");
      } else {
        console.error("Failed to log out");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const ProfileOption = ({ icon, text, onClick }) => (
    <div
      className="flex flex-row items-center cursor-pointer hover:text-dashboardButtons"
      onClick={onClick}
    >
      <div>
        <Image src={icon} width={20} height={20} alt={text} />
      </div>
      <div>
        <p className="px-3 text-sm">{text}</p>
      </div>
    </div>
  );

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
          <p className="text-tgrey3 text-h5 font-semibold">
            {userEmailFirstLetter}
          </p>
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
          className="flex items-center space-x-2 hover:text-dashboardButtons w-full text-left"
        >
          <Image src="/logout.png" width={18} height={18} alt="Logout" />
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <nav className="sticky top-0 bg-white z-50 shadow-sm">
      <div className="mx-2 px-4 sm:px-6 lg:px-8">
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
            <div className="flex items-center space-x-4">
              <button onClick={togglePlusButton} aria-label="Create new" type="button">
                <Image
                  src="/createbutton.png"
                  width={30}
                  height={30}
                  alt="Create button"
                  className="hover:opacity-80"
                />
              </button>

              <button onClick={toggleNotifications} aria-label="Notifications" type="button">
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
                aria-label="Profile options"
              >
                <p className="text-tgrey3 text-h5 font-semibold">
                  {userEmailFirstLetter}
                </p>
              </button>
            </div>

            {/* Profile Dropdown */}
            {profileOptions && (
              <div className="absolute top-14 bg-white shadow-lg rounded-lg p-4 font-medium w-48 right-8 space-y-4">
                <div className="flex flex-row items-center cursor-pointer hover:text-dashboardButtons">
                  <div className="w-6 h-6 bg-profilebg rounded-full flex items-center justify-center">
                    <p className="text-tgrey3 text-h5 font-semibold">
                      {userEmailFirstLetter}
                    </p>
                  </div>
                  <div>
                    <p className="px-2 text-sm">My Profile</p>
                  </div>
                </div>

                <ProfileOption
                  icon="/help.png"
                  text="Help and Support"
                  onClick={() => router.push("/help")}
                />

                <ProfileOption
                  icon="/friends.png"
                  text="Invite Friends"
                  onClick={() => router.push("/invite")}
                />

                <ProfileOption
                  icon="/logout.png"
                  text="Logout"
                  onClick={logout}
                />
              </div>
            )}

            {notifications && <Notifications />}
            {plusButton && <NavbarPlusButton />}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Menu">
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
