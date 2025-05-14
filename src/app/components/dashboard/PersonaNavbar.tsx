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
import { Menu, X, Search } from "lucide-react";
import PersonaNavLinks from "./PersonaNavLinks";
import Notifications from "./Notifications";
import NavbarPlusButton from "./NavbarPlusButton";

export default function PersonaNavbar() {
  const [profileOptions, setProfileOptions] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [plusButton, setPlusButton] = useState(false);
  const [userEmailFirstLetter, setUserEmailFirstLetter] = useState("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const menuRef = useRef(null);
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

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setProfileOptions(false);
        setNotifications(false);
        setPlusButton(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const toggleVisibility = () => {
    setProfileOptions((prev) => !prev);
    setNotifications(false);
    setPlusButton(false);
  };

  const toggleNotifications = () => {
    setNotifications((prev) => !prev);
    setProfileOptions(false);
    setPlusButton(false);
  };

  const togglePlusButton = () => {
    setPlusButton((prev) => !prev);
    setProfileOptions(false);
    setNotifications(false);
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

  const ProfileOption = ({ icon, text, onClick }: { icon: string; text: string; onClick?: () => void }) => (
    <div
      className="flex items-center py-2 px-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors duration-200"
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
    <div className="flex flex-col space-y-6 p-2 pt-6">
      {/* <div className="relative w-full">
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 bg-gray-50"
          aria-label="Search"
        />
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="h-4 w-4 text-gray-500" />
        </span>
      </div> */}

      <div className="block md:hidden mt-4">
        <h3 className="font-medium text-sm text-gray-500 mb-2">NAVIGATION</h3>
        <div className="space-y-1">
          <PersonaNavLinks
            mobile={true}
            onItemClick={() => setIsSheetOpen(false)}
          />
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <h3 className="font-medium text-sm text-gray-500 mb-2">ACCOUNT</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
            <div className="w-8 h-8 bg-profilebg rounded-full flex items-center justify-center">
              <p className="text-tgrey3 text-base font-semibold">
                {userEmailFirstLetter}
              </p>
            </div>
            <p className="text-sm font-medium">My Profile</p>
          </div>

          <Link
            href="/help-and-support"
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/help.png"
              width={20}
              height={20}
              alt="Help and Support"
            />
            <span className="text-sm font-medium">Help and Support</span>
          </Link>

          <button
            onClick={() => {
              setIsSheetOpen(false);
              logout();
            }}
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 w-full text-left"
          >
            <Image src="/logout.png" width={20} height={20} alt="Logout" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <nav className="sticky top-0 bg-white z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/audease_logo.png"
                width={112}
                height={30}
                alt="Audease logo"
                className="h-8 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation Links - Centered */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <PersonaNavLinks
              mobile={true}
              onItemClick={() => setIsSheetOpen(false)}
            />
          </div>

          {/* Desktop Right Menu: Profile, Notifications */}
          <div className="hidden lg:flex items-center space-x-6" ref={menuRef}>
            <div
              className="w-8 h-8 bg-profilebg rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors duration-200"
              onClick={toggleVisibility}
            >
              <p className="text-tgrey3 text-lg font-medium">
                {userEmailFirstLetter}
              </p>
            </div>

            {/* Profile Dropdown */}
            {profileOptions && (
              <div className="absolute top-16 right-6 bg-white shadow-xl rounded-lg p-3 font-medium w-52 space-y-1 z-50 border border-gray-100">
                <div className="flex items-center py-2 px-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors duration-200">
                  <div className="w-6 h-6 bg-profilebg rounded-full flex items-center justify-center">
                    <p className="text-tgrey3 text-sm font-semibold">
                      {userEmailFirstLetter}
                    </p>
                  </div>
                  <div>
                    <p className="px-3 text-sm">My Profile</p>
                  </div>
                </div>

                <Link
                  href="/help-and-support"
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ProfileOption
                  icon="/help.png"
                  text="Help and Support"
                />
                </Link>

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
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Menu">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] sm:w-[350px] py-8"
              >
                <MobileMenu />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
