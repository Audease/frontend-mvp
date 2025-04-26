export const SendEmail = async (studentId) => {
    const encodedStudentId = encodeURIComponent(studentId);
    try {
      const response = await fetch(
        `/api/sendBKSDMail/?studentId=${encodedStudentId}`,
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
      // console.log("Application sent successfully");
    } catch (error) {
      console.error("Error sending application:", error);
    }
  };
  