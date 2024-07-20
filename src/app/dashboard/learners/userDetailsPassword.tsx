"use client";

import { useState } from "react";
import Image from "next/image";
import { IoIosCheckmark } from "react-icons/io";

export default function UserDetailsPassword() {
  const [passwordToggle, setPasswordToggle] = useState("password");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEyeClick = () => {
    setPasswordToggle((prevState) =>
      prevState === "password" ? "text" : "password"
    );
  };

  const onSaveChanges = () => {
    console.log("Update Password");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError("");
  };

  return (
    <div className="space-y-6 rounded border border-tgrey2 p-4 mb-8 font-inter shadow-sm">
      <div>
        <h3 className="font-semibold text-base pb-2">Password Settings</h3>
        <hr className="w-1/3" />
      </div>

      <form action="" className="space-y-3">
        <div>
          <label
            htmlFor="curentPassword"
            className="font-normal text-sm text-tgrey3"
          >
            Current Password
          </label>
          <div className="relative mt-1 w-72">
            <input
              type={passwordToggle}
              name="password"
              className={`border-tgrey2 rounded-md px-2 py-1 text-h2 text-tgrey1 font-normal w-full focus:border-tgrey2 focus:outline-none focus:ring focus:ring-gold1 ${
                password ? "bg-gray-100" : ""
              }`}
              placeholder="Password"
              onChange={handlePasswordChange}
              required
              aria-label="Password"
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 transform -translate-y-1/2"
              onClick={handleEyeClick}
              aria-label="Toggle password visibility"
            >
              <Image
                src="/eye.png"
                width={16}
                height={16}
                alt="Toggle visibility"
              />
            </button>
          </div>
        </div>
        <div>
          <label
            htmlFor="newPassword"
            className="font-normal text-sm text-tgrey3"
          >
            New Password
          </label>
          <div className="relative mt-1 w-72">
            <input
              type={passwordToggle}
              name="password"
              className={`border-tgrey2 rounded-md px-2 py-1 text-h2 text-tgrey1 font-normal w-full focus:border-tgrey2 focus:outline-none focus:ring focus:ring-gold1 ${
                password ? "bg-gray-100" : ""
              }`}
              placeholder="New Password"
              onChange={handlePasswordChange}
              required
              aria-label="Password"
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 transform -translate-y-1/2"
              onClick={handleEyeClick}
              aria-label="Toggle password visibility"
            >
              <Image
                src="/eye.png"
                width={16}
                height={16}
                alt="Toggle visibility"
              />
            </button>
          </div>
        </div>
        <div>
          <label
            htmlFor="retypePassword"
            className="font-normal text-sm text-tgrey3"
          >
            Re-type Password
          </label>
          <div className="relative mt-1 w-72">
            <input
              type={passwordToggle}
              name="password"
              className={`border-tgrey2 rounded-md px-2 py-1 text-h2 text-tgrey1 font-normal w-full focus:border-tgrey2 focus:outline-none focus:ring focus:ring-gold1 ${
                password ? "bg-gray-100" : ""
              }`}
              placeholder="Re-type Password"
              onChange={handlePasswordChange}
              required
              aria-label="Re-type Password"
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 transform -translate-y-1/2"
              onClick={handleEyeClick}
              aria-label="Toggle password visibility"
            >
              <Image
                src="/eye.png"
                width={16}
                height={16}
                alt="Toggle visibility"
              />
            </button>
          </div>
        </div>

        <div className="">
          <button
            onClick={onSaveChanges}
            className="flex flex-row bg-black text-white text-sm font-semibold py-0 px-5 rounded-lg"
          >
            <IoIosCheckmark className="w-10 h-10" />
            <p className="py-2">Change Password</p>
          </button>
        </div>
      </form>
    </div>
  );
}
