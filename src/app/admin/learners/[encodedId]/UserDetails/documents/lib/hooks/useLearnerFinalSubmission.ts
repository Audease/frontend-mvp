import { useState, useEffect } from "react";

interface LearnerFinalSubmission {
  id: string;
}

const useLearnerFinalSubmission = (encodedId: string) => {
  const [submission, setSubmission] = useState<LearnerFinalSubmission | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubmission = async () => {
    try {
      setLoading(true);
      setError(null);

      // Replace with your API call
      const response = await fetch(`/api/enrolmentForm/learnerFinalSubmission`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ studentId: encodedId }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch submission");
      }

      const data: LearnerFinalSubmission = await response.json();
      setSubmission(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { fetchSubmission, submission, loading, error };
};

export default useLearnerFinalSubmission;
