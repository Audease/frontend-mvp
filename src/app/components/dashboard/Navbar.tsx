"use client";

import Image from "next/image";
import Link from "next/link";
import NavLinks from "./NavLinks";
import { useState, useEffect, useRef } from "react";
import Notifications from "./Notifications";
import NavbarPlusButton from "./NavbarPlusButton";
import { useRouter, usePathname } from "next/navigation";
import { useAppSelector, persistor } from "../../../redux/store";
import { useDispatch } from "react-redux";
import { logOut } from "@/redux/features/login/auth-slice";
import { Navbar } from "flowbite-react";
import clsx from "clsx";

const links = [
  { name: "Apps", href: "/admin" },
  { name: "Resources", href: "/admin/resources" },
  { name: "Messenger", href: "/admin/messenger" },
  { name: "Learners", href: "/admin/learners" },
  { name: "Staff", href: "/admin/staff" },
  { name: "Worflows", href: "/admin/workflows" },
];

export default function Nav() {
  const [profileOptions, setProfileOptions] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [plusButton, setPlusButton] = useState(false);
  const [userEmailFirstLetter, setuserEmailFirstLetter] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const router = useRouter();
  const dispatch = useDispatch();

  const toggleVisibility = () => {
    setProfileOptions((prevState) => !prevState);
    if (mobileMenuOpen) setMobileMenuOpen(false);
  };

  const toggleNotifications = () => {
    setNotifications((prevState) => !prevState);
    if (mobileMenuOpen) setMobileMenuOpen(false);
  };

  const togglePlusButton = () => {
    setPlusButton((prevState) => !prevState);
    if (mobileMenuOpen) setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prevState) => !prevState);
    if (profileOptions) setProfileOptions(false);
    if (notifications) setNotifications(false);
    if (plusButton) setPlusButton(false);
  };

  const logout = async () => {
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

  // Click outside to close menus
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

  const pathname = usePathname();

  return (
    <nav className="bg-white shadow-sm px-4 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/audease_logo.png"
            width={100}
            height={30}
            alt="Audease logo"
          />
        </Link>

        {/* Desktop Navigation Links - Centered */}
        <div className="hidden lg:flex items-center justify-center flex-1">
          <ul className="flex space-x-8">
            {links.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={clsx(
                    "font-inter font-medium flex flex-row text-h2 text-tgrey3 space-x-2 rounded my-2 py-1 px-2   hover:text-dashboardButtons transition-colors duration-200",
                    {
                      "bg-tgrey4": pathname === link.href,
                    }
                  )}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Profile and Notifications for Desktop */}
        <div className="hidden lg:flex items-center space-x-6" ref={menuRef}>
          <div
            className="w-8 h-8 bg-profilebg rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors duration-200"
            onClick={toggleVisibility}
            aria-expanded={profileOptions}
            aria-haspopup="true"
          >
            <p className="text-tgrey3 text-lg">{userEmailFirstLetter}</p>
          </div>

          {/* Profile Dropdown */}
          {profileOptions && (
            <div className="absolute top-16 right-4 bg-white shadow-xl rounded-lg p-4 font-medium w-48 space-y-4 z-50">
              {/* My profile  */}
              <div className="flex items-center hover:bg-gray-50 p-2 rounded-lg cursor-pointer">
                <div className="w-6 h-6 bg-profilebg rounded-full flex items-center justify-center">
                  <p className="text-tgrey3 text-h5 font-semibold">
                    {userEmailFirstLetter}
                  </p>
                </div>
                <p className="px-2 text-sm">My Profile</p>
              </div>

              {/* Help and support  */}
              <div className="flex items-center hover:bg-gray-50 p-2 rounded-lg cursor-pointer">
                <Image
                  src={"/help.png"}
                  width={20}
                  height={20}
                  alt="Help and Support"
                />
                <p className="px-3 text-sm">Help and Support</p>
              </div>

              {/* Logout */}
              <div
                className="flex items-center hover:bg-gray-50 p-2 rounded-lg cursor-pointer"
                onClick={logout}
              >
                <Image
                  src={"/logout.png"}
                  width={20}
                  height={20}
                  alt="Logout"
                />
                <p className="px-3 text-sm">Logout</p>
              </div>
            </div>
          )}

          {notifications && <Notifications />}
          {plusButton && <NavbarPlusButton />}
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
          aria-expanded="false"
          onClick={toggleMobileMenu}
        >
          <span className="sr-only">Open main menu</span>
          {/* Hamburger icon */}
          <svg
            className={`${mobileMenuOpen ? "hidden" : "block"} h-6 w-6`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          {/* X icon */}
          <svg
            className={`${mobileMenuOpen ? "block" : "hidden"} h-6 w-6`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`${mobileMenuOpen ? "block" : "hidden"} lg:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 divide-y divide-gray-200">
          {/* Navigation Links */}
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="block py-3 text-base font-medium text-gray-600 hover:text-dashboardButtons"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          {/* User info and profile in mobile */}
          <div className="pt-4 pb-3">
            <div className="flex items-center px-2 py-3">
              <div className="w-8 h-8 bg-profilebg rounded-full flex items-center justify-center">
                <p className="text-tgrey3 text-lg">{userEmailFirstLetter}</p>
              </div>
              <div className="ml-3">
                <div className="text-sm font-medium text-gray-700">
                  {userEmail}
                </div>
              </div>
            </div>

            {/* Mobile Profile Options */}
            <div className="mt-3 space-y-2">
              <button className="block w-full text-left px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900">
                My Profile
              </button>
              <button className="block w-full text-left px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900">
                Help and Support
              </button>
              <button
                className="block w-full text-left px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Old NAVBAR

// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import NavLinks from "./NavLinks";
// import { useState, useEffect, useRef } from "react";
// import Notifications from "./Notifications";
// import NavbarPlusButton from "./NavbarPlusButton";
// import { useRouter } from "next/navigation";
// import { useAppSelector, persistor } from "../../../redux/store";
// import { Navbar } from "flowbite-react";
// import { useDispatch } from "react-redux";
// import { logOut } from "@/redux/features/login/auth-slice";

// const links = [
//   { name: "Apps", href: "/admin" },
//   { name: "Resources", href: "/admin/resources" },
//   { name: "Messenger", href: "/admin/messenger" },
//   { name: "Learners", href: "/admin/learners" },
//   { name: "Staff", href: "/admin/staff" },
//   { name: "Worflows", href: "/admin/workflows" },
// ];

export function OldNav() {
  const [profileOptions, setProfileOptions] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [plusButton, setPlusButton] = useState(false);
  const [userEmailFirstLetter, setuserEmailFirstLetter] = useState("");
  const menuRef = useRef(null);
  const router = useRouter();
  const dispatch = useDispatch();

  const toggleVisibility = () => {
    setProfileOptions((prevState) => !prevState);
  };

  const toggleNotifications = () => {
    setNotifications((prevState) => !prevState);
  };

  const togglePlusButton = () => {
    setPlusButton((prevState) => !prevState);
  };

  const logout = async () => {
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
    <Navbar className="mx-6">
      <Navbar.Brand as={Link} href="/">
        <Image
          src="/audease_logo.png"
          width={100}
          height={30}
          alt="Audease logo"
        />
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <NavLinks links={links} />
        <div className="lg:hidden items-center flex">
          <p
            className="px-2 flex py-2 text-h2 text-tgrey3 hover:text-dashboardButtons  cursor-pointer"
            onClick={logout}
          >
            Logout
          </p>
        </div>

        <div className="hidden xl:block lg:w-32"></div>

        {/* Profile and Notifications */}
        <div className="hidden relative lg:flex flex-col" ref={menuRef}>
          <div className="flex flex-row space-x-4 py-1">
            {/* <Image
              src="/createbutton.png"
              width={30}
              height={30}
              alt="Create button"
              onClick={togglePlusButton}
              aria-expanded={plusButton}
            /> */}
            {/* <Image
              src="/notification.png"
              width={32}
              height={32}
              alt="Notification button"
              onClick={toggleNotifications}
              aria-expanded={notifications}
            /> */}
            <div
              className="w-8 h-8 bg-profilebg rounded-full flex items-center justify-center p-2 cursor-pointer"
              onClick={toggleVisibility}
              aria-expanded={profileOptions}
              aria-haspopup="true"
            >
              <p className="text-tgrey3 text-lg">{userEmailFirstLetter}</p>
            </div>
          </div>
          {profileOptions && (
            <div className="absolute top-14 bg-white shadow-lg rounded-lg p-4 font-medium w-48 right-[0rem] space-y-4">
              {/* My profile  */}
              <div className="flex flex-row">
                <div className="w-6 h-6 bg-profilebg rounded-full flex items-center justify-center p-2">
                  <p className="text-tgrey3 text-h5 font-semibold">
                    {userEmailFirstLetter}
                  </p>
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
              {/* <div className="flex flex-row">
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
              </div> */}
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
      </Navbar.Collapse>
    </Navbar>
  );
}
