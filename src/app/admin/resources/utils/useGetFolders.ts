import { useEffect, useState } from "react";

export default function useGetFolders() {
  const [folderData, setFolderData] = useState([]);
  const [loading2, setLoading2] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getFolders = async () => {
    try {
      setLoading2(true);
      const response = await fetch("/api/adminFolders/viewFolders", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setFolderData(data);
      } else {
        setError("Failed to fetch folders");
        console.error("Failed to fetch folders:", response.statusText);
      }
    } catch (error) {
      setError("Error fetching folders");
      console.error("Error fetching folders:", error);
    } finally {
      setLoading2(false);
    }
  };

  return {
    folderData,
    getFolders,
    loading2,
    error,
  };
}