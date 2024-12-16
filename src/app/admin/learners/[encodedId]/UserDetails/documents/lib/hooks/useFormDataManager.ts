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
  const learnerIdd = "75630d1a-048c-41b2-ad0b-06e4902b4532";

  // Load form data  on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/enrolmentForm/getSubmission/?learnerId=${learnerIdd}`,
          {
            method: "GET",
          }
        );
    
        if (response.ok) {
          const data = await response.json();
          console.log(data.data)
          setFormData(data.data);
        } else {
          throw new Error("Failed to fetch submissions");
        }
      } catch (error) {
        console.error("Error fetching submissions:", error);
      }
    };
   
    fetchData();
   }, [userId]);

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
            formType: "behavioral",
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