import { useState } from 'react';
import { useCreateRole } from './useRoleCreate'; 


export const useRole = () => {
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
      permission: [],
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

  return {
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
  };
};
