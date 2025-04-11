import { learnerRevalidation } from '@/app/action';
import { useState } from 'react';

const useSendInvite = () => {
  const [loadingProgress, setloadingProgress] = useState(false);
  const [successfulEmail, setSuccessfulEmail] = useState(0);
  const [failedEmail, setFailedEmail] = useState(0);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showFailureToast, setShowFailureToast] = useState(false);

  const sendInvites = async (learnerIds, payload) => {
    setloadingProgress(true);
    const successfulIds = [];
    const failedIds = [];

    for (const id of learnerIds) {
      try {
        const response = await fetch(`/api/induction/sendInductionInvite?studentId=${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify( payload ),
        });

        if (response.ok) {
          successfulIds.push(id);
        } else {
          failedIds.push(id);
        }
      } catch (error) {
        failedIds.push(id);
      }
    }

    learnerRevalidation();

    if (successfulIds.length > failedIds.length) {
      setSuccessfulEmail(successfulIds.length);
      setFailedEmail(failedIds.length);
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 5000);
    } else {
      setSuccessfulEmail(successfulIds.length);
      setFailedEmail(failedIds.length);
      setShowFailureToast(true);
      setTimeout(() => setShowFailureToast(false), 5000);
    }

    setloadingProgress(false);

    return { successfulIds, failedIds };
  };

  return {
    loadingProgress,
    successfulEmail,
    failedEmail,
    showSuccessToast,
    showFailureToast,
    sendInvites,
  };
};

export default useSendInvite;