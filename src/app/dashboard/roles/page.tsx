'use client';

import { useState } from 'react';
import DefaultLeft from './DefaultLeft';
import SetUpAccount from './SetUpAccount';
import CreateRole, { AddAuditLearnerModal, RoleCreated } from './CreateRole';
import Staff from './Staff';
import Workflow from '../workflows/Workflow';
import CreateWorkflow, { WorkflowCreated } from '../workflows/CreateWorkflow';
import Rightside from './Rightside';
import AddLearnerModal, { LearnerCreated } from '../learners/learnerModal';
import { useCreateRole } from './hooks/useRoleCreate'; 

export default function Role() {
  const [currentComponent, setCurrentComponent] = useState('Default');
  const [isWorkflowModalOpen, setIsWorkflowModalOpen] = useState(false);
  const [isWorkflowSuccessModal, setIsWorkflowSuccessModal] = useState(false);
  const [learnerCreateModalState, setLearnerCreateModalState] = useState(false);
  const [learnerSuccessModal, setLearnerSuccessModal] = useState(false);
  const [addAuditLearnerModal, setAddAuditLearnerModal] = useState(false);

  // Using the useCreateRole hook
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

  const closeLearnerCreateModal = () => {
    setLearnerCreateModalState(false);
  };

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
    setCurrentComponent('Default');
  };

  const onClickSetUpAcct = () => {
    showComponent('SetUpAccount');
  };

  const onStaffClick = () => {
    showComponent('Staff');
  };

  const onRoleClick = () => {
    openModal();
    roleCreate()
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
      roleName: '',
      permission: '',
    });
  };

  const onResourcesClick = () => {
    console.log('Resources Clicked');
  };

  const onFormClick = () => {
    console.log('Forms Clicked');
  };

  const closeAuditLearnerModal = () => {
    setAddAuditLearnerModal(false);
  };

  const renderComponent = () => {
    switch (currentComponent) {
      case 'SetUpAccount':
        return <SetUpAccount onClick={onBackClick} />;
      case 'Staff':
        return <Staff onClick={onBackClick} />;
      case 'Workflow':
        return <Workflow onClick={onBackClick} />;
      default:
        return <DefaultLeft onClickSetUpAcct={onClickSetUpAcct} />;
    }
  };

  return (
    <div>
      {/* Body section */}
      <div className="flex flex-row space-x-12">
        {/* Left side */}
        <div className="w-3/4">
          {renderComponent()}
          {/* Role Modal */}
          <CreateRole {...{ isModalOpen, closeModal }} />
          <RoleCreated
            show={isRoleSuccessModal}
            onClose={closeRoleSuccessModal}
          />

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
          <AddLearnerModal
            show={learnerCreateModalState}
            onClose={closeLearnerCreateModal}
            onCreateClick={onCreateClick}
          />
          <LearnerCreated
            show={learnerSuccessModal}
            onClose={closeLearnerSuccessModal}
          />

          {/* Audit Learner Modal */}
          <AddAuditLearnerModal
            show={addAuditLearnerModal}
            onClose={closeAuditLearnerModal}
          />
        </div>

        {/* Right side */}
        <div className="w-1/4">
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
