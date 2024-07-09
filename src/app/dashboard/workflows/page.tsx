"use client";

import { useState } from "react";
import SetUpAccount from "../roles/SetUpAccount";
import CreateRole, { RoleCreated } from "../roles/CreateRole";
import Staff from "../roles/Staff";
import Workflow from "./Workflow";
import { useRouter } from "next/navigation";
import Rightside from "../roles/Rightside";

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
          {/* Modal */}
          <CreateRole
            show={isModalOpen}
            onClose={closeModal}
            onClick={roleCreate}
            formData={roleFormData}
            setFormData={setRoleFormData}
          />
          <RoleCreated show={isSuccessModal} onClose={closeSuccessModal} />
        </div>

        {/* right side  */}
        <div >
          <Rightside
            onRoleClick={onRoleClick}
            onStaffClick={onStaffClick}
            onWorkflowClick={onWorkflowClick}
          />
        </div>
      </div>
    </div>
  );
}
