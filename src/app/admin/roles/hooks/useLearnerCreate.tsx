import { useState } from 'react';
import axios from 'axios';

export const useCreateLearner = () => {
  const [learnerFormData, setLearnerFormData] = useState({
    name: '',
    email: '',
    role: '',
  });
  const [isLearnerModalOpen, setIsLearnerModalOpen] = useState(false);
  const [isLearnerSuccessModal, setIsLearnerSuccessModal] = useState(false);

  const openLearnerModal = () => {
    setIsLearnerModalOpen(true);
  };

  const closeLearnerModal = () => {
    setIsLearnerModalOpen(false);
  };

  const closeLearnerSuccessModal = () => {
    setIsLearnerSuccessModal(false);
  };

  const learnerCreate = async () => {
    try {
      const response = await axios.post('/api/createLearner', learnerFormData);
      if (response.status === 201) {
        console.log('Learner created successfully:', response.data);
        setIsLearnerSuccessModal(true);
        closeLearnerModal();
        // Clear form data after success
        setLearnerFormData({ name: '', email: '', role: '' });
      } else {
        console.error('Failed to create learner:', response.data.message);
      }
    } catch (error) {
      console.error('Error creating learner:', error);
    }
  };

  return {
    isLearnerModalOpen,
    isLearnerSuccessModal,
    learnerFormData,
    setLearnerFormData,
    openLearnerModal,
    closeLearnerModal,
    closeLearnerSuccessModal,
    learnerCreate,
  };
};
