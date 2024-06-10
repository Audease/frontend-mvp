"use client";

import { useState } from "react";
import Button from "../components/dashboard/Button";
import { Type2Button } from "../components/dashboard/Button";
import RoleLinks from "../components/dashboard/RoleLinks";
import { SlArrowRight, SlArrowDown } from "react-icons/sl";
import { VscSettings } from "react-icons/vsc";

export default function Dashboard() {
  const [firstName, setFirstName] = useState("Nyekachi");
  const [plan, setPlan] = useState("Free trial");

  return (
    <div>
      {/* Body section  */}
      <div className="flex flex-row space-x-10">
        {/* left side  */}
        <div className="flex flex-col w-3/4">
          {/* Welcome  */}
          <div className="flex flex-col">
            {/* User ID  */}
            <div className="flex flex-row">
              <div>
                <h3 className="font-medium text-black text-2xl">
                  Welcome back, {firstName}
                </h3>
              </div>
              <sup className="p-4 mx-2 bg-dashboardButtonsBg rounded-2xl text-dashboardButtons font-medium">
                {plan}
              </sup>
            </div>
            {/* complete your step and button  */}
            <div className="flex flex-row justify-between">
              <div className="">
                <p className="font-normal font-inter text-tgrey3 text-base pt-4">
                  Please complete few steps to finalise your account
                </p>
              </div>
              <div className="mb-4">
                <Button
                  buttonText={"Setup Account"}
                  className={""}
                  arrowDirection={<SlArrowRight />}
                />
              </div>
            </div>
          </div>
          {/* Links */}
          <div className="flex flex-row justify-between mt-4 border-b-2 ">
            <RoleLinks />
            <div className="flex flex-row space-x-4 mb-4">
              <Button
                buttonText={"Create"}
                className={""}
                arrowDirection={<SlArrowDown />}
              />
              <button className=" flex flex-row p-1 rounded-md border-2 ">
              <span className="font-inter font-medium pr-2 py-1">{<VscSettings />}</span>
              <span className="font-inter font-normal text-black text-sm">Filters</span>
              <span className="font-inter font-medium text-sm pl-6 py-1">{<SlArrowDown />}</span>
              </button>
            </div>
          </div>
        </div>
        {/* right side  */}
        <div className="w-1/5 font-inter">
          <div>
            <h3 className="font-medium text-base text-[#000000]">Get started</h3>
            <p className="font-normal text-tgrey3 text-sm">You can find all settings here.</p>
          </div>
          {/* Buttons  */}
          <div>
            <Type2Button leftIcon={""} buttonText={""}/>
          </div>
        </div>
      </div>
    </div>
  );
}
