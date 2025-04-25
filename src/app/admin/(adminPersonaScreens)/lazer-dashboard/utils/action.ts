export const LazerApproveLearner = async (studentId) => {
    const encodedStudentId = encodeURIComponent(studentId);
    try {
      const response = await fetch(
        `/api/Lazer/approveLazerLearner?studentId=${encodedStudentId}`,
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
  