"use client";

import { useState } from "react";
import Navbar from "../components/dashboard/Navbar";
import Button from "../components/dashboard/Button";

export default function Dashboard() {
  const [firstName, setFirstName] = useState("Nyekachi");
  return (
    <div>
      {/* Body section  */}
      <div className="flex flex-row space-x-10">
        {/* left side  */}
        <div className="flex flex-col w-3/4">
          {/* Welcome  */}
          <div className="flex flex-row justify-between">
            <div className="font-inter space-y-2">
              <h3 className="font-medium text-black text-2xl">
                Welcome back, {firstName}
              </h3>
              <p className="font-normal text-tgrey3 text-base">
                You&apos;re on free trial
              </p>
            </div>
            <div className="mt-2">
              <Button buttonText={"Upgrade"} className={""} />
            </div>
          </div>
          {/* Links */}
          <div>
            
          </div>
        </div>
        {/* right side  */}
        <div className="w-1/5">
          Here is the right side
        </div>
      </div>
    </div>
  );
}
