const DeleteStudent = async (studentId) => {
  const encodedStudentId = encodeURIComponent(studentId);
  try {
    const response = await fetch(
      `/api/deleteStudent/?studentId=${encodedStudentId}`,
      {
        method: "DELETE",
      }
    );

    if (response.status === 204) {
      return
    }

    if (!response.ok) {
      throw new Error("Failed to delete student");
    }
    console.log("Student deleted successfully");
  } catch (error) {
    console.error("Error deleting student:", error);
  }
};

export default DeleteStudent;


export const UpdateLearner = async (studentId, payload) => {
  const encodedStudentId = encodeURIComponent(studentId);
  try {
    const response = await fetch(
      `/api/updateLearner/?studentId=${encodedStudentId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify(payload),
      }
    );
    return response;
  } catch (error) {
    console.error("Error updating student:", error);
  }
};
