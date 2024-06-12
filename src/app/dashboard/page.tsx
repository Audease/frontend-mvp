"use client";

import { useState } from "react";
import Button from "../components/dashboard/Button";
import { Type2Button } from "../components/dashboard/Button";
import RoleLinks from "../components/dashboard/RoleLinks";
import { SlArrowRight, SlArrowDown } from "react-icons/sl";
import { VscSettings } from "react-icons/vsc";
import RoleTable from "../components/dashboard/RoleTable";
import RoleCard from "../components/dashboard/RoleCard";

export default function Dashboard() {
  const [firstName, setFirstName] = useState("Nyekachi");
  const [plan, setPlan] = useState("Free trial");

  const data = [
    { id:1, name: 'John Doe', updated: '1 months ago', lastEditor: 'Engineer', role:'role' },
    { id:2, name: 'Jane Smith', updated: '2 months ago', lastEditor: 'Doctor', role:'workflow' },
    { id:3, name: 'Sam Green', updated: '3 months ago', lastEditor: 'Designer', role:'staff' },
  ];

  const dataIcons = [
    {role: 'role', roleIcon: '/role.png'},
    {role: 'workflow', roleIcon: '/workflowIcon.png'},
    {role: 'staff', roleIcon: '/staffIcon.png'},
    {role: 'learner', roleIcon: '/learnerIcon.png'},
    {role: 'resource', roleIcon: '/resourcesIcon.png'},
    {role: 'form', roleIcon: '/formIcon.png'},
  ]

  return (
    <div>
      {/* Body section  */}
      <div className="flex flex-row space-x-16">
        {/* left side  */}
        <div className="flex flex-col w-[60rem]">
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
          {/* Table  */}
          <div className="mt-8">
          <RoleTable data={data} roleIcons={dataIcons} />
          </div>
        </div>
        {/* right side  */}
        <div className="w-1/3 font-inter">
          <div>
            <h3 className="font-medium text-base text-[#000000]">Get started</h3>
            <p className="font-normal text-tgrey3 text-sm">You can find all settings here.</p>
          </div>
          {/* Buttons  */}
          <div>
          <div className="flex flex-row space-x-4 my-2">
            <Type2Button leftIcon={"/role.png"} buttonText={"Role"}/>
            <Type2Button leftIcon={"/workflowIcon.png"} buttonText={"Workflow"}/>
          </div>
          <div className="flex flex-row space-x-4 my-2">
            <Type2Button leftIcon={"/staffIcon.png"} buttonText={"Staff"}/>
            <Type2Button leftIcon={"/learnerIcon.png"} buttonText={"Learner"}/>
          </div>
          <div className="flex flex-row space-x-4 my-2">
            <Type2Button leftIcon={"/resourcesIcon.png"} buttonText={"Resources"}/>
            <Type2Button leftIcon={"/formIcon.png"} buttonText={"Form"}/>
          </div>
          </div>
          {/* Cards Section */}
          <div className="mt-20">
            {/* Header */}
            <div className="font-inter">
              <h3 className="font-medium text-base">What&apos;s new</h3>
              <p className="font-normal text-tgrey3 text-sm">You can find all settings here.</p>
            </div>
            {/* cards */}
            <div className="my-2 space-y-4">
              <RoleCard />
              <RoleCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
