"use client";

import { useState } from "react";

import DefaultLeft from "./components/DefaultLeft";
import Staff from "./components/Staff";
import SetUpAccount from "./components/SetUpAccount";
import { AddAuditLearnerModal } from "./components/Rightside/components/CreateRole/CreateRoleModal";
import Workflow from "../workflows/Workflow";
import CreateWorkflow, { WorkflowCreated } from "../workflows/CreateWorkflow";
import Rightside from "./components/Rightside/Rightside";

import { useCreateRole } from "./hooks/useRoleCreate";
import { learnerRevalidation } from "@/app/action";
import AddLearnerModal, { LearnerCreated } from "../learners/components/learnerModal";


export default function Role() {
  const [currentComponent, setCurrentComponent] = useState("Default");
  const [isWorkflowModalOpen, setIsWorkflowModalOpen] = useState(false);
  const [isWorkflowSuccessModal, setIsWorkflowSuccessModal] = useState(false);
  const [learnerCreateModalState, setLearnerCreateModalState] = useState(false);
  const [learnerSuccessModal, setLearnerSuccessModal] = useState(false);
  const [addAuditLearnerModal, setAddAuditLearnerModal] = useState(false);

  const onCreateClick = () => {
    setLearnerCreateModalState(false);
    setLearnerSuccessModal(true);
  };

  const closeLearnerSuccessModal = () => {
    setLearnerSuccessModal(false);
  };

  const showComponent = (componentName) => {
    setCurrentComponent(componentName);
  };

  const onBackClick = () => {
    setCurrentComponent("Default");
  };

  const closeLearnerCreateModal = () => {
    setLearnerCreateModalState(false);
  };

  const onClickSetUpAcct = () => {
    showComponent("SetUpAccount");
  };

  const onStaffClick = () => {
    showComponent("Staff");
  };

  const onRoleClick = () => {
    openModal();
  };

  const onLearnerClick = () => {
    setLearnerCreateModalState(true);
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
      permission: [],
    });
  };

  const onResourcesClick = () => {
    console.log("Resources Clicked");
  };

  const onFormClick = () => {
    console.log("Forms Clicked");
  };

  const closeAuditLearnerModal = () => {
    setAddAuditLearnerModal(false);
  };

  const {
    isModalOpen,
    isRoleSuccessModal,
    roleFormData,
    setRoleFormData,
    openModal,
    closeModal,
    closeRoleSuccessModal,
    roleCreate,
  } = useCreateRole();

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

  const onLearnerCreated = async () => {
    await learnerRevalidation();
  };

  return (
    <div>
      {/* Body section */}
      <div className="flex flex-row space-x-12">
        {/* Left side */}
        <div className="w-full xl:w-3/4">
          {renderComponent()}
          {/* Role Modal */}

          {/* Workflow Modal */}
          <CreateWorkflow
            show={isWorkflowModalOpen}
            onClose={closeWorkflowModal}
            onClick={workflowCreate}
            formData={roleFormData}
            setFormData={setRoleFormData}
          />
          <WorkflowCreated
            show={isWorkflowSuccessModal}
            onClose={closeWorkflowSuccessModal}
          />

          {/* Learner Modals */}
          {learnerCreateModalState && (
            <AddLearnerModal
              {...{ setLearnerSuccessModal, onLearnerCreated }}
              show={learnerCreateModalState}
              onClose={closeLearnerCreateModal}
            />
          )}
          {learnerSuccessModal && (
            <LearnerCreated
              show={learnerSuccessModal}
              onClose={closeLearnerSuccessModal}
            />
          )}

          {/* Audit Learner Modal */}
          <AddAuditLearnerModal
            show={addAuditLearnerModal}
            onClose={closeAuditLearnerModal}
          />
        </div>

        {/* Right side */}
        <div className="w-1/4 hidden xl:flex">
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
