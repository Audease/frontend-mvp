import { useEffect, useState, useCallback } from "react";

export const useAccountStatus = () => {
  
  const [progress, setProgress] = useState(20);
  const [staffStatus, setStaffStatus] = useState("");
  const [roleStatus, setRoleStatus] = useState("");
  const [workflowStatus, setWorkflowStatus] = useState("");
  const [learnerStatus, setLearnerStatus] = useState("");

  const gradientStop = `${progress}%`;

  const progressBarStyle = {
    width: gradientStop,
    background: `linear-gradient(to right, #FDF5E9, #F9A22B)`,
  };

  const getStaffStatus = useCallback(async () => {
    try {
      const response = await fetch("/api/getAccountStatus");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json(); 
      // Update individual statuses based on the response
      setStaffStatus(data.staff);
      setRoleStatus(data.role);
      setWorkflowStatus(data.workflow);
      setLearnerStatus(data.prospective_student);

      // Calculate progress based on completed statuses
      const completedStatuses = [data.staff, data.role, data.workflow, data.prospective_student].filter(status => status === "completed").length;
      setProgress(completedStatuses * 25); // 25% for each completed status
    } catch (error) {
      console.error("Error getting staff status:", error);
      // Set all statuses to "Error" in case of failure
      setStaffStatus("Error");
      setRoleStatus("Error");
      setWorkflowStatus("Error");
      setLearnerStatus("Error");
    }
  }, []);

  useEffect(() => {
    getStaffStatus();
  }, [getStaffStatus]);

  return {
    getStaffStatus,
    staffStatus,
    progressBarStyle,
    roleStatus,
    workflowStatus,
    learnerStatus,
    progress,
  };
};