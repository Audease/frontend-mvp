"use client";

import { useState } from "react";
import Navbar from "../components/dashboard/Navbar";
import Button from "../components/dashboard/Button";

export default function Dashboard() {
  const [firstName, setFirstName] = useState("Nyekachi");
  return (
    <div>
      {/* Navigation */}
      <div className="border-b-2">
        <Navbar />
      </div>
      {/* Body section  */}
      <div>
        {/* left side  */}
        <div className="flex flex-col">
          {/* Welcome  */}
          <div className="flex flex-row">
            <div className="font-inter">
              <h3 className="font-medium text-black text-2xl">
                Welcome back, {firstName}
              </h3>
              <p className="font-normal text-tgrey3 text-base">
                You&apos;re on free trial
              </p>
            </div>
            <div>
              <Button buttonText={"Upgrade"} className={""} />
            </div>
          </div>
          {/* Links */}
          <div>
            
          </div>
        </div>
        {/* right side  */}
        <div></div>
      </div>
    </div>
  );
}
