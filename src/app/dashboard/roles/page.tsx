'use client';

import { useRole } from './hooks/useRole';
import DefaultLeft from './DefaultLeft';
import SetUpAccount from './SetUpAccount';
import CreateRole, { AddAuditLearnerModal, RoleCreated } from './CreateRole';
import Staff from './Staff';
import Workflow from '../workflows/Workflow';
import CreateWorkflow, { WorkflowCreated } from '../workflows/CreateWorkflow';
import Rightside from './Rightside';
import AddLearnerModal, { LearnerCreated } from '../learners/learnerModal';


export default function Role() {
  const {
    currentComponent,
    setCurrentComponent,
    isWorkflowModalOpen,
    setIsWorkflowModalOpen,
    isWorkflowSuccessModal,
    setIsWorkflowSuccessModal,
    learnerCreateModalState,
    setLearnerCreateModalState,
    learnerSuccessModal,
    setLearnerSuccessModal,
    addAuditLearnerModal,
    setAddAuditLearnerModal,
    isModalOpen,
    isRoleSuccessModal,
    roleFormData,
    setRoleFormData,
    openModal,
    closeModal,
    closeRoleSuccessModal,
    roleCreate,
    closeLearnerCreateModal,
    onCreateClick,
    closeWorkflowModal,
    closeWorkflowSuccessModal,
    workflowCreate,
    onResourcesClick,
    onFormClick,
    closeAuditLearnerModal,
    showComponent,
    onBackClick,
    onClickSetUpAcct,
    onStaffClick,
    onRoleClick,
    onLearnerClick,
    onWorkflowClick
  } = useRole();

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
          <RoleCreated show={isRoleSuccessModal} onClose={closeRoleSuccessModal} />

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
            onClose={closeLearnerCreateModal} setLearnerSuccessModal={undefined}/>
          <LearnerCreated
            show={learnerSuccessModal}
            onClose={setLearnerSuccessModal}
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
