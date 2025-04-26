export const postURLToDb = async (folderId, payload) => {
  try {
    const response = await fetch(
      `/api/adminFolders/fileURLToDb?folderId=${folderId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    return response.status;
  } catch (error) {
    return error;
  }
};

export const assignDocToLearners = async (payload) => {
  try {
    const response = await fetch(`/api/adminFolders/assignDocToLearners`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    return response.status;
  } catch (error) {
    return error;
  }
};

export const deleteDocument = async (docId) => {
  try {
    const response = await fetch(
      `/api/adminFolders/deleteFile?documentId=${docId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    // console.log(error);
    return { error: error.message, status: "failed" };
  }
};

export const deleteFolder = async (folderId) => {
  try {
    const response = await fetch(
      `/api/adminFolders/deleteFolder?folderId=${folderId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    // console.log(error);
    return { error: error.message, status: "failed" };
  }
};
