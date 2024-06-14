"use client";

import { useState } from "react";
import Button from "../../components/dashboard/Button";
import RoleLinks from "../../components/dashboard/RoleLinks";
import { SlArrowRight, SlArrowDown } from "react-icons/sl";
import { VscSettings } from "react-icons/vsc";
import RoleTable from "../../components/dashboard/RoleTable";

export default function DefaultLeft( { onClickSetUpAcct } ) {
  const [firstName, setFirstName] = useState("Nyekachi");
  const [plan, setPlan] = useState("Free trial");

  const data = [
    {
      id: 1,
      name: "John Doe",
      updated: "1 month ago",
      lastEditor: "Engineer",
      role: "role",
    },
    {
      id: 2,
      name: "Jane Smith",
      updated: "2 months ago",
      lastEditor: "Doctor",
      role: "workflow",
    },
    {
      id: 3,
      name: "Sam Green",
      updated: "3 months ago",
      lastEditor: "Designer",
      role: "role",
    },
  ];

  const dataIcons = [
    { role: "role", roleIcon: "/role.svg" },
    { role: "workflow", roleIcon: "/workflow.svg" },
    { role: "staff", roleIcon: "/staffIcon.png" },
    { role: "learner", roleIcon: "/learnerIcon.png" },
    { role: "resource", roleIcon: "/resourcesIcon.png" },
    { role: "form", roleIcon: "/formIcon.png" },
  ];

  return (
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
              Please complete a few steps to finalise your account
            </p>
          </div>
          <div className="mb-4">
            <Button
              buttonText={"Setup Account"}
              className={""}
              arrowDirection={<SlArrowRight />}
              onClick={ onClickSetUpAcct }
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
            onClick={onClickSetUpAcct}
          />
          <button className=" flex flex-row p-1 rounded-md border-2 ">
            <span className="font-inter font-medium pr-2 py-1">
              {<VscSettings />}
            </span>
            <span className="font-inter font-normal text-black text-sm">
              Filters
            </span>
            <span className="font-inter font-medium text-sm pl-6 py-1">
              {<SlArrowDown />}
            </span>
          </button>
        </div>
      </div>
      {/* Table  */}
      <div className="mt-8">
        <RoleTable data={data} roleIcons={dataIcons} />
      </div>
    </div>
  );
}
