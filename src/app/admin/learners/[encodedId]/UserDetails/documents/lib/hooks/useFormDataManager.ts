import { useState, useEffect } from "react";

interface BackendData {
  [key: string]: {
    id: string;
    data: {
      data: any;
    };
  };
}

export const useFormDataManager = (userId: string) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [formLoading, setFormLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [rawBackendData, setRawBackendData] = useState<BackendData>({});

  const transformFormData = (backendData: BackendData) => {
    return Object.entries(backendData).reduce((acc, [key, value]) => {
      acc[key] = value?.data?.data || null;
      return acc;
    }, {} as Record<string, any>);
  };

  const fetchFormSubmissions = async () => {
    if (!userId) return;
    
    setFormLoading(true);
    try {
      const response = await fetch(
        `/api/enrolmentForm/getSubmission?studentId=${userId}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch form submissions");

      const backendData = await response.json();
      setRawBackendData(backendData);
      setIsSubmitted(backendData.is_submitted);
      setFormData(transformFormData(backendData));
    } catch (error) {
      console.error("Error fetching form submissions:", error);
    } finally {
      setFormLoading(false);
    }
  };

  useEffect(() => {
    fetchFormSubmissions();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const updateFormData = async (formType: string, data: any) => {
    if (!userId || !formType) return;

    const formTypeKey = formType.toLowerCase();
    setFormData(prev => ({
      ...prev,
      [formTypeKey]: { ...prev[formTypeKey], ...data },
    }));

    setFormLoading(true);
    try {
      if ((Object.keys(rawBackendData).length === 0) || !rawBackendData[formTypeKey]) {
        await fetch("/api/enrolmentForm/submissionDraft", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            studentId: userId,
            formType,
            data: { data },
          }),
        });
      } else {
        const formId = rawBackendData[formTypeKey]?.id;
        if (!formId) throw new Error("Form ID not found");

        await fetch(`/api/enrolmentForm/updateDraft/?id=${formId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify( { data } ),
        });
      }
    } catch (error) {
      console.error("Error updating form data:", error);
    } finally {
      setFormLoading(false);
    }
  };

  return {
    formData,
    formLoading,
    isSubmitted,
    updateFormData,
    fetchFormSubmissions,
  };
};