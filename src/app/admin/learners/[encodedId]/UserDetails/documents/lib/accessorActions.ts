import {
  ApproveLearner,
  RejectLearner,
} from "@/app/admin/(adminPersonaScreens)/accessor-dashboard/utils/action";

export const accessorReject = async (
  userId: string,
  setLoading: (loading: boolean) => void,
  setShowDialog: (show: boolean) => void,
  setIsSubmitted: (submitted: boolean) => void,
  setFormContent: (content: string) => void
) => {
  setLoading(true);
  try {
    const success = await RejectLearner(userId);
    setShowDialog(false);
    setIsSubmitted(false);

    if (success) {
      setFormContent("AccessorRejectPage");
    } else {
      alert("Failed to reject learner.");
    }
  } catch (error) {
    console.error("Error during rejection:", error);
    alert("An unexpected error occurred. Please try again.");
  } finally {
    setLoading(false);
  }
};

export const accessorApprove = async (
  userId: string,
  formData: any,
  USER_DOCS_STORAGE_KEY: string,
  setLoading: (loading: boolean) => void,
  setShowDialog: (show: boolean) => void,
  setIsSubmitted: (submitted: boolean) => void,
  setFormContent: (content: string) => void
) => {
  setLoading(true);

  try {
    const success = await ApproveLearner(userId);
    setShowDialog(false);
    setIsSubmitted(true);
    if (success) {
      setFormContent("AccessorSuccessPage");
    } else {
      alert("An unexpected error occurred. Please try again.");
    }
  } catch (error) {
    console.error("Error during approval:", error);
    alert("An unexpected error occurred. Please try again.");
  } finally {
    setLoading(false);
  }
};
