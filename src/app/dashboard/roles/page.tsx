"use client";

import { useState } from "react";
import { Modal } from "flowbite-react";
import { Type2Button } from "../../components/dashboard/Button";
import RoleCard from "../../components/dashboard/RoleCard";
import DefaultLeft from "./DefaultLeft";
import SetUpAccount from "./SetUpAccount";
import CreateRole, { RoleCreated } from "./CreateRole";
import Staff from "./Staff";

export default function Role() {
  const [currentComponent, setCurrentComponent] = useState("Default");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModal, setIsSuccessModal] = useState(false);

  const [roleFormData, setRoleFormData] = useState({
    roleName: "",
    permission: "",
  });

  const showComponent = (componentName) => {
    setCurrentComponent(componentName);
  };

  const onBackClick = () => {
    setCurrentComponent("Default");
  };

  const onClickSetUpAcct = () => {
    showComponent("SetUpAccount");
  };

  const onStaffClick = () => {
    showComponent("Staff");
  };

  const onRoleClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeSuccessModal = () => {
    setIsSuccessModal(false)
    setRoleFormData({
      roleName: "",
    permission: "",
    })
  }

  const roleCreate = () => {
    console.log(roleFormData)
    setIsSuccessModal(true);
    setIsModalOpen(false);
    setRoleFormData({
      roleName: "",
    permission: "",
    })
  }


  const renderComponent = () => {
    switch (currentComponent) {
      case "SetUpAccount":
        return <SetUpAccount onClick={onBackClick} />;
      case "Staff":
        return <Staff onClick={onBackClick} />;
      default:
        return <DefaultLeft onClickSetUpAcct={onClickSetUpAcct} />;
    }
  };

  return (
    <div>
      {/* Body section  */}
      <div className="flex flex-row space-x-16">
        {/* left side  */}
        {renderComponent()}
        {/* Modal */}
        <CreateRole
          show={isModalOpen}
          onClose={closeModal}
          onClick={roleCreate}
          formData={roleFormData}
          setFormData={setRoleFormData}
        />

        <RoleCreated show={isSuccessModal} onClose={closeSuccessModal}/>

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
              <Type2Button
                leftIcon={"/role.png"}
                buttonText={"Role"}
                onClick={onRoleClick}
              />
              <Type2Button
                leftIcon={"/worflow.png"}
                buttonText={"Workflow"}
                onClick={""}
              />
            </div>
            <div className="flex flex-row space-x-4 my-2">
              <Type2Button
                leftIcon={"/staffIcon.png"}
                buttonText={"Staff"}
                onClick={onStaffClick}
              />
              <Type2Button
                leftIcon={"/learnerIcon.png"}
                buttonText={"Learner"}
                onClick={""}
              />
            </div>
            <div className="flex flex-row space-x-4 my-2">
              <Type2Button
                leftIcon={"/resourcesIcon.png"}
                buttonText={"Resources"}
                onClick={""}
              />
              <Type2Button
                leftIcon={"/formIcon.png"}
                buttonText={"Form"}
                onClick={""}
              />
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
