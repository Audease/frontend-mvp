"use client";

import { Type2Button } from "../../components/dashboard/Button";
import RoleCard from "../../components/dashboard/RoleCard";
import DefaultLeft from "./DefaultLeft";

export default function Role() {
  return (
    <div>
      {/* Body section  */}
      <div className="flex flex-row space-x-16">
        {/* left side  */}
        <DefaultLeft  />    
        {/* right side  */}
        <div className="w-1/3 font-inter">
          <div>
            <h3 className="font-medium text-base text-[#000000]">
              Get started
            </h3>
            <p className="font-normal text-tgrey3 text-sm">
              You can find all settings here.
            </p>
          </div>
          {/* Buttons  */}
          <div>
            <div className="flex flex-row space-x-4 my-2">
              <Type2Button leftIcon={"/role.png"} buttonText={"Role"} />
              <Type2Button
                leftIcon={"/workflowIcon.png"}
                buttonText={"Workflow"}
              />
            </div>
            <div className="flex flex-row space-x-4 my-2">
              <Type2Button leftIcon={"/staffIcon.png"} buttonText={"Staff"} />
              <Type2Button
                leftIcon={"/learnerIcon.png"}
                buttonText={"Learner"}
              />
            </div>
            <div className="flex flex-row space-x-4 my-2">
              <Type2Button
                leftIcon={"/resourcesIcon.png"}
                buttonText={"Resources"}
              />
              <Type2Button leftIcon={"/formIcon.png"} buttonText={"Form"} />
            </div>
          </div>
          {/* Cards Section */}
          <div className="mt-20">
            {/* Header */}
            <div className="font-inter">
              <h3 className="font-medium text-base">What&apos;s new</h3>
              <p className="font-normal text-tgrey3 text-sm">
                You can find all settings here.
              </p>
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
