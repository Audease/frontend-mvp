export const ApproveLearner = async (studentId) => {
  const encodedStudentId = encodeURIComponent(studentId);

  try {
    const response = await fetch(
      `/api/accessorApproval/?studentId=${encodedStudentId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

export const RejectLearner = async (studentId, reason) => {
  const encodedStudentId = encodeURIComponent(studentId);

  try {
    const response = await fetch(
      `/api/accessorRejection/?studentId=${encodedStudentId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reason: reason }),
      }
      
    );

    if (response.ok) {
      // console.log("Application Rejected successfully.");
      return true;
    } else {
      console.error("Rejection failed with status:", response.status);
      return false;
    }
  } catch (error) {
    console.error("Error Rejecting Learner:", error);
    return false;
  }
};
