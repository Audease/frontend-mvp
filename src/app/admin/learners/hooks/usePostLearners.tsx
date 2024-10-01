import { useState, useEffect } from "react";

export const usePostLearners = () => {
  const [formData, setFormData] = useState({
    name: "",
    date_of_birth: "",
    mobile_number: "",
    email: "",
    NI_number: "",
    passport_number: "",
    home_address: "",
    funding: "",
    level: 1,
    awarding: "",
    chosen_course: "AdultCare",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'level' ? parseInt(value, 10) || 0 : value,
    });
  };

  const [error, setError] = useState(null);

  const createLearner = async () => {
    const payload = formData;
    try {
      const response = await fetch("/api/addLearner", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
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
    formData,
    handleChange,
    createLearner,
    error,
  };
};
