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
        console.log(data.data);
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