export const GetPersonaStaff = async ({personaPermission}) => {
    const payload = {
      permission: personaPermission,
      page: 1,
      limit: 100,
    };
    try {
      const response = await fetch(`/api/personaStaff`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      const data = await response.json()
  
      if (response.status === 200) {
        return data.data;
      }
  
      if (!response.ok) {
        return false;
      }
      console.log("Staff retrieval succesful");
    } catch (error) {
      console.error("Error retrieving staff:", error);
    }
  };


  const DeleteStaff = async (staffId) => {
    const encodedStaffId = encodeURIComponent(staffId);
    try {
      const response = await fetch(
        `/api/deleteStaff/?studentId=${encodedStaffId}`,
        {
          method: "DELETE",
        }
      );
  
      if (response.status === 204) {
        return true
      }
  
      if (!response.ok) {
        throw new Error("Failed to delete student");
      }
      console.log("Student deleted successfully");
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };
  
  export default DeleteStaff;