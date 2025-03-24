"use client";

import { useState, useEffect, useMemo } from "react";
import Button from "../../../components/dashboard/Button";
import { SlArrowRight, SlArrowDown } from "react-icons/sl";
import RoleTable from "./RoleTable";
import { useAppSelector } from "../../../../redux/store";


export default function DefaultLeft({ onClickSetUpAcct }) {
  const [firstName, setFirstName] = useState("");
  const [plan, setPlan] = useState("");

  const [activeTab, setActiveTab] = useState("All");

  const userPermissions = useAppSelector(
    (state) => state.authReducer.value.userPermission
  );
  const userPackage = useAppSelector(
    (state) => state.authReducer.value.userPackage
  );

  useEffect(() =>{
    if (userPermissions.length > 4 || userPackage) {
      setPlan(userPackage)
      setFirstName("Admin")
    }
  }, [userPackage, userPermissions])

  const tabs = useMemo(() => ["All","Recent", "Archive"],[]);


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
          <sup className="p-4 mx-2 bg-dashboardButtonsBg rounded-2xl text-dashboardButtons font-medium hidden xl:flex">
            {plan}
          </sup>
        </div>
        {/* complete your step button  */}
        <div className=" flex-row justify-between hidden xl:flex">
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
          <div className="xl:flex flex-row space-x-6 hidden">
            {tabs.map((tab) => (
              <h2
                key={tab}
                className={`cursor-pointer pt-4 ${
                  activeTab === tab ? "text-gold1" : ""
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </h2>
            ))}
          </div>

          {/* Create Button */}
          {/* <Button
            buttonText={"Create"}
            className={""}
            arrowDirection={<SlArrowDown />}
            onClick={""}
          /> */}
        </div>
        {/* The active bar color change */}
        <div className="w-full h-[0.10rem] bg-gray-300 my-2">
          <div
            className={`h-[0.10rem]`}
          ></div>
        </div>
      </div>
      {/* Table  */}
      <div className="mt-8 w-full overflow-x-auto">
        <RoleTable  />
      </div>
    </div>
  );
}
