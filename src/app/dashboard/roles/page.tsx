"use client";

import { useState } from "react";
import DefaultLeft from "./DefaultLeft";
import SetUpAccount from "./SetUpAccount";
import CreateRole, { RoleCreated } from "./CreateRole";
import Staff from "./Staff";
import Workflow from "../workflows/Workflow";
import CreateWorkflow, { WorkflowCreated } from "../workflows/CreateWorkflow";
import Rightside from "./Rightside";

export default function Role() {
  const [currentComponent, setCurrentComponent] = useState("Default");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWorflowModalOpen, setIsWorkflowModalOpen] = useState(false);
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
    setIsWorkflowModalOpen(true);
  };

  const closeWorkflowModal = () => {
    setIsWorkflowModalOpen(false);
  };

  const renderComponent = () => {
    switch (currentComponent) {
      case "SetUpAccount":
        return <SetUpAccount onClick={onBackClick} />;
      case "Staff":
        return <Staff onClick={onBackClick} />;
      case "Workflow":
        return <Workflow onClick={onBackClick} />;
      default:
        return <DefaultLeft onClickSetUpAcct={onClickSetUpAcct} />;
    }
  };

  return (
    <div>
      {/* Body section  */}
      <div className="flex flex-row space-x-12">
        {/* left side  */}
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

          {/* Create Workflow Modal  */}
          <CreateWorkflow
            show={isWorflowModalOpen}
            onClose={closeWorkflowModal}
            onClick={WorkflowCreated}
            formData={roleFormData}
            setFormData={setRoleFormData}
          />
          {/* Success Modal  */}
          <WorkflowCreated show={isSuccessModal} onClose={closeSuccessModal} />
        </div>

        {/* right side  */}
        <div className="w-1/4">
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
