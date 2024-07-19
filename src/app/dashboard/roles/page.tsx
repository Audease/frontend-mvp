"use client";

import { useState } from "react";
import DefaultLeft from "./DefaultLeft";
import SetUpAccount from "./SetUpAccount";
import CreateRole, { RoleCreated } from "./CreateRole";
import Staff from "./Staff";
import Workflow from "../workflows/Workflow";
import CreateWorkflow, { WorkflowCreated } from "../workflows/CreateWorkflow";
import Rightside from "./Rightside";
import AddLearnerModal, { LearnerCreated } from "../learners/learnerModal"

export default function Role() {
  const [currentComponent, setCurrentComponent] = useState("Default");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWorkflowModalOpen, setIsWorkflowModalOpen] = useState(false);
  const [isRoleSuccessModal, setIsRoleSuccessModal] = useState(false);
  const [isWorkflowSuccessModal, setIsWorkflowSuccessModal] = useState(false);
  const [learnerCreateModalState, setLearnerCreateModalState] = useState(false);
  const [learnerSuccessModal, setLearnerSuccessModal] = useState(false);

  const closeLearnerCreateModal = () => {
    console.log("closed");
    setLearnerCreateModalState(false);
  };

  const onCreateClick = () => {
    setLearnerCreateModalState(false);
    setLearnerSuccessModal(true);
  }

  const closeLearnerSuccessModal = () => {
    setLearnerSuccessModal(false);
  };


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

  const onLearnerClick = () => {
    setLearnerCreateModalState(true);
  }

  const closeRoleSuccessModal = () => {
    setIsRoleSuccessModal(false);
    setRoleFormData({
      roleName: "",
      permission: "",
    });
  };

  const roleCreate = () => {
    console.log(roleFormData);
    setIsRoleSuccessModal(true);
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

  const closeWorkflowSuccessModal = () => {
    setIsWorkflowSuccessModal(false);
  };

  const workflowCreate = () => {
    console.log(roleFormData);
    setIsWorkflowSuccessModal(true);
    setIsWorkflowModalOpen(false);
    setRoleFormData({
      roleName: "",
      permission: "",
    });
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
          <RoleCreated show={isRoleSuccessModal} onClose={closeRoleSuccessModal} />

          {/* Create Workflow Modal  */}
          <CreateWorkflow
            show={isWorkflowModalOpen}
            onClose={closeWorkflowModal}
            onClick={workflowCreate}
            formData={roleFormData}
            setFormData={setRoleFormData}
          />
          {/* Workflow Success Modal */}
          <WorkflowCreated show={isWorkflowSuccessModal} onClose={closeWorkflowSuccessModal} />

          <AddLearnerModal
          show={learnerCreateModalState}
          onClose={closeLearnerCreateModal}
          onCreateClick={onCreateClick}
        />

        <LearnerCreated show={learnerSuccessModal} onClose={closeLearnerSuccessModal}/>

        </div>

        {/* right side  */}
        <div className="w-1/4">
          <Rightside
            onRoleClick={onRoleClick}
            onStaffClick={onStaffClick}
            onWorkflowClick={onWorkflowClick}
            onLearnerClick={onLearnerClick}
          />
        </div>
      </div>
    </div>
  );
}
