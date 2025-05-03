export const SubmitFinal = async (studentId) => {
  const encodedStudentId = encodeURIComponent(studentId);
  try {
    const response = await fetch(
      `/api/enrolmentForm/learnerFinalSubmission?id=${encodedStudentId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
      }
    );

    if (response.status === 201) {
      return true;
    }

    if (!response.ok) {
      return false;
    }
  } catch (error) {
    console.error("Error sending application:", error);
  }
};
