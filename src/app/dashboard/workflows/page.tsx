"use client";

import { useState } from "react";
import SetUpAccount from "../roles/components/SetUpAccount";
import Staff from "../roles/components/Staff";
import Workflow from "./Workflow";
import { useRouter } from "next/navigation";
import Rightside from "../roles/components/Rightside/Rightside";

export default function Role() {
  const [currentComponent, setCurrentComponent] = useState("Default");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModal, setIsSuccessModal] = useState(false);
  const route = useRouter();

  const [roleFormData, setRoleFormData] = useState({
    roleName: "",
    permission: "",
  });

  const showComponent = (componentName) => {
    setCurrentComponent(componentName);
  };

  const onBackClick = () => {
    route.push("/dashboard");
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
    setIsSuccessModal(false);
    setRoleFormData({
      roleName: "",
      permission: "",
    });
  };

  const roleCreate = () => {
    console.log(roleFormData);
    setIsSuccessModal(true);
    setIsModalOpen(false);
    setRoleFormData({
      roleName: "",
      permission: "",
    });
  };

  const onWorkflowClick = () => {
    showComponent("Workflow");
  };

  const onLearnerClick = () => {
    console.log("Clicked")
  }

  const onResourcesClick = () => {
    console.log("Resources Clicked")
  }

  const onFormClick = () => {
    console.log("Forms Clicked")
  }

  const renderComponent = () => {
    switch (currentComponent) {
      case "Staff":
        return <Staff onClick={onBackClick} />;
      case "SetUpAccount":
        return <SetUpAccount onClick={onBackClick} />;
      default:
        return <Workflow onClick={onBackClick} />;
    }
  };

  return (
    <div>
      {/* left side  */}
      <div className="flex flex-row space-x-12">
        <div className="w-3/4">
          {renderComponent()}
        </div>

        {/* right side  */}
        <div >
          <Rightside
            onRoleClick={onRoleClick}
            onStaffClick={onStaffClick}
            onWorkflowClick={onWorkflowClick}
            onLearnerClick={onLearnerClick}
            onResourcesClick={onResourcesClick}
            onFormClick={onFormClick}
          />
        </div>
      </div>
    </div>
  );
}
