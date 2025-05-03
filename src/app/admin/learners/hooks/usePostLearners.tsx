import { useState } from "react";

export const usePostLearners = () => {
  const [error, setError] = useState(null);

  const createLearner = async (formData) => {
    try {
      const response = await fetch("/api/addLearner", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setError(null);
        return true;
      } else {
        console.error("Error adding learner", data);
        setError(data);
        return false;
      }
    } catch (error) {
      console.error("error adding learner", error);
      setError("An unexpected error occurred");
      return false;
    }
  };

  return {
    createLearner,
    error,
  };
};