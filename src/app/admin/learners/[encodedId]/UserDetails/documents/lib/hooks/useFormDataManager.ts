import { useState, useEffect } from "react";

interface BackendData {
  [key: string]: {
    data: {
      data: any;
    };
  };
}

export const useFormDataManager = (userId: string) => {
  const [formData, setFormData] = useState({});
  const [formLoading, setFormLoading] = useState(false);
  // const [isSubmitted, setIsSubmitted] = useState(false);
  let isSubmitted = false;

  const transformFormData = (backendData: BackendData) => {
    const usableData = Object.entries(backendData).reduce(
      (acc, [key, value]) => {
        acc[key] = value?.data?.data || null;
        return acc;
      },
      {} as Record<string, any>
    );
    setFormData(usableData);
  };

  useEffect(() => {
    const fetchFormSubmissions = async () => {
      try {
        setFormLoading(true);
        const response = await fetch(
          `/api/enrolmentForm/getSubmission?studentId=${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch form submissions");
        }

        const backendData = await response.json();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        isSubmitted = backendData.is_submitted
        // setIsSubmitted(backendData.is_submitted);
        transformFormData(backendData);
        
      } catch (error) {
        // console.error("Error fetching form submissions:", error);
      }
      setFormLoading(false);
    };

    fetchFormSubmissions();
  }, [userId]);

  const updateFormData = async (formType: string, data: any) => {
    setFormData((prevData) => ({
      ...prevData,
      [formType.toLowerCase()]: {
        ...prevData[formType.toLowerCase()],
        ...data,
      },
    }));

    try {
      setFormLoading(true);
      const response = await fetch("/api/enrolmentForm/submissionDraft", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentId: userId,
          formType: formType,
          data: {
            data,
          },
        }),
      });
      const responseData = await response.json();
      
    } catch {}
    setFormLoading(false);
  };

  return { formData, formLoading, isSubmitted, updateFormData };
};
