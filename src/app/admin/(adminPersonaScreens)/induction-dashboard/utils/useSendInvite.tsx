import { learnerRevalidation } from '@/app/action';
import { useState } from 'react';

const useSendInvite = () => {
  const [loadingProgress, setloadingProgress] = useState(false);
  const [successfulEmail, setSuccessfulEmail] = useState(0);
  const [failedEmail, setFailedEmail] = useState(0);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showFailureToast, setShowFailureToast] = useState(false);

  const sendInvites = async (learnerIds, payload) => {
    console.log("sendInvites called with payload:", payload);
    
    setloadingProgress(true);
    const successfulIds = [];
    const failedIds = [];
  
    // Determine if this is from the paste tab by checking for meetingInfo
    const isPasteTab = payload.meetingInfo && payload.meetingInfo.trim() !== '';
    console.log("Detected submission from tab:", isPasteTab ? "paste" : "manual");
  
    // Process each learner
    for (const id of learnerIds) {
      try {
        console.log(`Sending invite to learner ${id}`);
        
        const response = await fetch(`/api/induction/sendInductionInvite?studentId=${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
          cache: 'no-store',
        });
  
        // Log the response for debugging
        const responseText = await response.text();
        console.log(`Response for learner ${id}:`, response.status, responseText);
        
        // Try to parse the response if possible
        let responseData;
        try {
          responseData = JSON.parse(responseText);
        } catch (e) {
          responseData = { text: responseText };
        }
  
        if (response.ok) {
          console.log(`Successfully sent invite to learner ${id}`);
          successfulIds.push(id);
        } else {
          console.error(`Failed to send invite to learner ${id}:`, responseData);
          failedIds.push(id);
        }
      } catch (error) {
        console.error(`Error sending invite to learner ${id}:`, error);
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
    sendInvites,
    loadingProgress,
    successfulEmail,
    failedEmail,
    showSuccessToast,
    showFailureToast,
  };
}

export default useSendInvite;