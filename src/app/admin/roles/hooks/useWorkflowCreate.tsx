import { useState } from 'react';
import axios from 'axios';

export const useCreateWorkflow = () => {
  const [workflowFormData, setWorkflowFormData] = useState({
    workflowName: '',
    description: '',
  });
  const [isWorkflowModalOpen, setIsWorkflowModalOpen] = useState(false);
  const [isWorkflowSuccessModal, setIsWorkflowSuccessModal] = useState(false);

  const openWorkflowModal = () => {
    setIsWorkflowModalOpen(true);
  };

  const closeWorkflowModal = () => {
    setIsWorkflowModalOpen(false);
  };

  const closeWorkflowSuccessModal = () => {
    setIsWorkflowSuccessModal(false);
  };

  const workflowCreate = async () => {
    try {
      const response = await axios.post('/api/createWorkflow', workflowFormData);
      if (response.status === 201) {
        // console.log('Workflow created successfully:', response.data);
        setIsWorkflowSuccessModal(true);
        closeWorkflowModal();
        // Clear form data after success
        setWorkflowFormData({ workflowName: '', description: '' });
      } else {
        console.error('Failed to create workflow:', response.data.message);
      }
    } catch (error) {
      console.error('Error creating workflow:', error);
    }
  };

  return {
    isWorkflowModalOpen,
    isWorkflowSuccessModal,
    workflowFormData,
    setWorkflowFormData,
    openWorkflowModal,
    closeWorkflowModal,
    closeWorkflowSuccessModal,
    workflowCreate,
  };
};
