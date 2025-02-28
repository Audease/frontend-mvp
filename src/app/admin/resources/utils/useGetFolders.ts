import { useState } from "react";

export interface Folder {
  id: string;
  name: string;
  userId: string;
  parentFolderId: string | null;
  createdAt: string;
  childFolders: Folder[];
  documents: Document[];
}

interface FolderData {
  data: Folder[];
}

export default function useGetFolders() {
  const [folderData, setFolderData] = useState<FolderData | null>(null);;
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
        // console.log(data.data)
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