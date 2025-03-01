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