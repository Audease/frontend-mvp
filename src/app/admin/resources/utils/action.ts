export const postURLToDb = async (folderId, payload) => {
    try {
        const response = await fetch(
          `/api/adminFolders/fileURLToDb?folderId=${folderId}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
          }
        );
        return response.status
      } catch (error) {
        return error
      } 
}


export const assignDocToLearners = async (payload) => {
  try {
      const response = await fetch(
        `/api/adminFolders/assignDocToLearners`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        }
      );
      return response.status
    } catch (error) {
      return error
    } 
}