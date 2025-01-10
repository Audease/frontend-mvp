import { useState, useEffect } from "react";

const useGetFileInFolders = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFilesInFolder = async (folderId: string) => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/adminFolders/viewFolderFiles?folderId=${folderId}&page=${1}&limit=${10}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch files");
      }
      const data = await response.json();
    //   console.log(data)
      setFiles(data.files);
    } catch (error) {
      console.error("Error fetching files:", error);
      setError("Failed to fetch files. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { files, loading, error, fetchFilesInFolder };
};

export default useGetFileInFolders;