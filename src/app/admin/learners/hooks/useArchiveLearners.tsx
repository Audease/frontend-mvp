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
      const response = await fetch(
        `/api/learner/archiveLearner?studentId=${learnerId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ reason: "Archived by admin" }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setArchiveLoading(false);
      } else {
        console.error("Failed to archive learner");
      }
    } catch (error) {
      console.error("Error archiving learner:", error);
    }
  };

  const getArchivedLearners = async (
    page: number,
    limit: number,
    search: string
  ) => {
    setArchiveLoading(true)
    try {
      const response = await fetch(
        `/api/learner/getArchivedLearners??page=${page}&limit=${limit}&search=${search}`
      );
      const data = await response.json();
      if (response.ok) {
        const totalArchivedPages = data.totalPages;
        const totalArchivedItems = data.total;
        const archivedLearners = data.data;
        setTotalArchivedItems(totalArchivedItems);
        setTotalArchivedPages(totalArchivedPages)
        setArchivedLearners(archivedLearners)
        setArchiveLoading(false)
        return { totalArchivedPages, totalArchivedItems, archivedLearners };
      } else {
        console.error("Failed to fetch staff data:", data);
        setArchiveLoading(false)
      }
    } catch (error) {
      console.error("Error fetching archived learners.");
      setArchiveLoading(false)
    }
  };

  const handleUnArchiveLearner = async (learnerId) => {
    setArchiveLoading(true)
    try {
      const response = await fetch(
        `/api/learner/restoreLearner?studentId=${learnerId}`
      );
      const data = await response.json();
      console.log(data)
    } catch {
      console.error("Error fetching archived learners.");
    }
    setArchiveLoading(false)
    console.log(learnerId)
  }

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
