import { useState, useEffect } from 'react';

export const INITIAL_FORM_DATA = {
  behavioural: {},
  candidaterecord: {},
  confidentiality: {},
  dataprotection: {},
  equalopportunities: {},
  healthandsafetypolicy: {},
  guidancepolicy: {},
  enrolment: {},
  privacynotice: {},
  awardassessment: {},
  employeragreement: {},
  participantagreement: {},
  extremismpolicy: {},
  childprotection: {},
  skillsassessment: {},
};

export const useFormDataManager = (userId: string) => {
  const USER_DOCS_STORAGE_KEY = `user-docs-${userId}`;
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  // Load form data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem(USER_DOCS_STORAGE_KEY);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData);
      } catch (error) {
        console.error('Error loading saved form data:', error);
      }
    }
  }, [USER_DOCS_STORAGE_KEY]);

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(USER_DOCS_STORAGE_KEY, JSON.stringify(formData));
  }, [formData, USER_DOCS_STORAGE_KEY]);

  // Method to update specific form section
  const updateFormData = async(formType: string, data: any) => {
    setFormData((prevData) => ({
      ...prevData,
      [formType.toLowerCase()]: {
        ...prevData[formType.toLowerCase()],
        ...data,
      },
    }));

    console.log(formType, ":", data);

    try {
        const response = await fetch("/api/enrolmentForm/submissionDraft", {
          method: "POST",
          headers: {
            "Content-Type": "applicatio/json",
          },
          body: JSON.stringify({
            formType: "award_assessment",
            data: {
              data,
            },
          }),
        });
  
        const responseData = await response.json();
        console.log(userId, ":", responseData);
      } catch {}
  };

  return { formData, updateFormData };
};