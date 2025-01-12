export const certificateApproveLearner = async (studentId) => {
  const encodedStudentId = encodeURIComponent(studentId);
  try {
    const response = await fetch(
      `/api/Certificate/approveCertificateLearner?studentId=${encodedStudentId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
      }
    );

    if (response.status === 200) {
      return true;
    }

    if (!response.ok) {
      return false;
    }
  } catch (error) {
    console.error("Error sending application:", error);
  }
};
