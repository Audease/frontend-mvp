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

    if (response.status === 204) {
      return true;
    }

    if (!response.ok) {
      return false;
    }
    console.log("Approval Succesful");
  } catch (error) {
    console.error("Error Approving Learner:", error);
  }
};

export const RejectLearner = async (studentId) => {
  const encodedStudentId = encodeURIComponent(studentId);
  try {
    const response = await fetch(
      `/api/accessorRejection/?studentId=${encodedStudentId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 204) {
      return true;
    }

    if (!response.ok) {
      return false;
    }
    console.log("Approval Succesful");
  } catch (error) {
    console.error("Error Approving Learner:", error);
  }
};


