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
        transformFormData(backendData);
      } catch (error) {
        // console.error("Error fetching form submissions:", error);
      }
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
  };

  return { formData, updateFormData };
};
