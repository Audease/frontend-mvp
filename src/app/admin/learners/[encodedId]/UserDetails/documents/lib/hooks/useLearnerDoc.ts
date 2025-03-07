"use client";

import { useEffect, useState } from "react";

export const useLearnerDoc = (learnerId : string) => {
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getLearnerDoc = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/adminFolders/getLearnerDocs?studentId=${learnerId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setDocuments(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLearnerDoc();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [learnerId]);

  return {
    documents,
    loading,
    error
  };
};