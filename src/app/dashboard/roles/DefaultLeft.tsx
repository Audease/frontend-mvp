"use client";

import { useState, useEffect, useMemo } from "react";
import Button from "../../components/dashboard/Button";
// import RoleLinks from "../../components/dashboard/RoleLinks";
import { SlArrowRight, SlArrowDown } from "react-icons/sl";
// import { VscSettings } from "react-icons/vsc";
import RoleTable from "../../components/dashboard/RoleTable";

export default function DefaultLeft({ onClickSetUpAcct }) {
  const [firstName, setFirstName] = useState("Nyekachi");
  const [plan, setPlan] = useState("Free trial");

  const [activeTab, setActiveTab] = useState("All");
  const [activeBarStyle, setActiveBarStyle] = useState({});


  const tabs = useMemo(() => ["All","Recent", "Starred", "Modules", "Folders", "Thrash"],[]);

  useEffect(() => {
    const activeIndex = tabs.indexOf(activeTab);
    const tabWidth = 45 / tabs.length;
    setActiveBarStyle({
      width: `${tabWidth}%`,
      transform: `translateX(${activeIndex * 100}%)`,
    });
  }, [activeTab,tabs, tabs.length]);

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
    <div className="flex flex-col">
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
        {/* complete your step button  */}
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
              onClick={onClickSetUpAcct}
            />
          </div>
        </div>
      </div>

      {/* Selection and active bar */}
      <div className="flex flex-col mt-3">
        <div className="flex flex-row justify-between font-medium text-sm text-tgrey3">
          <div className="flex flex-row space-x-6">
            {tabs.map((tab) => (
              <h2
                key={tab}
                className={`cursor-pointer pt-4 ${
                  activeTab === tab ? "text-black" : ""
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </h2>
            ))}
          </div>

          {/* Create Button */}
          <Button
            buttonText={"Create"}
            className={""}
            arrowDirection={<SlArrowDown />}
            onClick={""}
          />
        </div>
        {/* The active bar color change */}
        <div className="w-full h-[0.10rem] bg-gray-300 my-2">
          <div
            className={`h-[0.10rem] bg-dashboardButtons transition-all duration-300`}
            style={activeBarStyle}
          ></div>
        </div>
      </div>
      {/* Table  */}
      <div className="mt-8">
        <RoleTable data={data} roleIcons={dataIcons} />
      </div>
    </div>
  );
}
