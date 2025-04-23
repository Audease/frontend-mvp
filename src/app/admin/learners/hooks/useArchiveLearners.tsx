import { useState } from "react";

export const useArchiveLearners = () => {
  const [archivedLearners, setArchivedLearners] = useState();
  const [learnerId, setLearnerId] = useState("");
  const [archiveLoading, setArchiveLoading] = useState(false);
  const [archiveError, setArchiveError] = useState(null);
  const [archiveSuccess, setArchiveSuccess] = useState(false);
  const [totalArchivedPages, setTotalArchivedPages] = useState();
  const [totalArchivedItems, setTotalArchivedItems] = useState();

  const archiveLearner = async (learnerId: string) => {
    setArchiveLoading(true);
    try {
      // Add timestamp to prevent caching
      const timestamp = new Date().getTime();
      const response = await fetch(
        `/api/learner/archiveLearner?studentId=${learnerId}&t=${timestamp}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache, no-store, must-revalidate",
            "Pragma": "no-cache",
            "Expires": "0"
          },
          body: JSON.stringify({ reason: "Archived by admin" }),
          cache: "no-store"
        }
      );

      if (response.ok) {
        const data = await response.json();
        setArchiveLoading(false);
        return true;
      } else {
        console.error("Failed to archive learner");
        setArchiveLoading(false);
        return false;
      }
    } catch (error) {
      console.error("Error archiving learner:", error);
      setArchiveLoading(false);
      return false;
    }
  };

  const getArchivedLearners = async (
    page: number,
    limit: number,
    search: string
  ) => {
    setArchiveLoading(true);
    try {
      // Add timestamp to prevent caching
      const timestamp = new Date().getTime();
      const response = await fetch(
        `/api/learner/getArchivedLearners?page=${page}&limit=${limit}&search=${search}&t=${timestamp}`,
        {
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
            "Pragma": "no-cache",
            "Expires": "0"
          },
          cache: "no-store"
        }
      );
      
      const data = await response.json();
      if (response.ok) {
        const totalArchivedPages = data.totalPages;
        const totalArchivedItems = data.total;
        const archivedLearners = data.data;
        setTotalArchivedItems(totalArchivedItems);
        setTotalArchivedPages(totalArchivedPages);
        setArchivedLearners(archivedLearners);
        setArchiveLoading(false);
        return { totalArchivedPages, totalArchivedItems, archivedLearners };
      } else {
        console.error("Failed to fetch archived learners:", data);
        setArchiveLoading(false);
        return { totalArchivedPages: 0, totalArchivedItems: 0, archivedLearners: [] };
      }
    } catch (error) {
      console.error("Error fetching archived learners:", error);
      setArchiveLoading(false);
      return { totalArchivedPages: 0, totalArchivedItems: 0, archivedLearners: [] };
    }
  };

  const handleUnArchiveLearner = async (learnerId) => {
    setArchiveLoading(true);
    try {
      // Add timestamp to prevent caching
      const timestamp = new Date().getTime();
      const response = await fetch(
        `/api/learner/restoreLearner?studentId=${learnerId}&t=${timestamp}`,
        {
          method: "POST",
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
            "Pragma": "no-cache",
            "Expires": "0"
          },
          cache: "no-store"
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        console.log("Restore response:", data);
        setArchiveLoading(false);
        return true;
      } else {
        console.error("Error restoring learner");
        setArchiveLoading(false);
        return false;
      }
    } catch (error) {
      console.error("Error restoring learner:", error);
      setArchiveLoading(false);
      return false;
    }
  };

  return {
    archiveLearner,
    handleUnArchiveLearner,
    getArchivedLearners,
    totalArchivedItems,
    totalArchivedPages,
    archivedLearners,
    learnerId,
    archiveLoading,
    archiveError,
    archiveSuccess,
  };
};