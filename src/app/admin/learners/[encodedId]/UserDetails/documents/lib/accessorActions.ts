import {
  ApproveLearner,
  RejectLearner,
} from "@/app/admin/(adminPersonaScreens)/accessor-dashboard/utils/action";

export const accessorReject = async (
  userId: string,
  reason: string,
  setLoading: (loading: boolean) => void,
  setShowDialog: (show: boolean) => void,
  setFormContent: (content: string) => void
) => {
  setLoading(true);
  try {
    const success = await RejectLearner(userId, reason);
    setShowDialog(false);

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
  setLoading: (loading: boolean) => void,
  setShowDialog: (show: boolean) => void,
  setFormContent: (content: string) => void
) => {
  setLoading(true);

  try {
    const success = await ApproveLearner(userId);
    setShowDialog(false);
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
