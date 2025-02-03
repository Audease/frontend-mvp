import { useState } from "react";
import { SendEmail } from "./action";

export const useSendApplication = async () => {
    setLoading2(true);
    const results = await Promise.all(
      checkedIds.map(async (id) => {
        try {
          const success = await SendEmail(id);
          return { id, success };
        } catch (error) {
          return { id, success: false, error };
        }
      })
    );

    const successfulIds = results
      .filter((result) => result.success)
      .map((result) => result.id);
    const failedIds = results
      .filter((result) => !result.success)
      .map((result) => result.id);

    learnerRevalidation();
    handleFetchLearnersData(1);
    setCheckedItems({});

    if (successfulIds.length > failedIds.length) {
      setSuccessfulEmail(successfulIds.length);
      setFailedEmail(failedIds.length);
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 5000);
    } else {
      setSuccessfulEmail(successfulIds.length);
      setFailedEmail(failedIds.length);
      setShowFailureToast(true);
      setTimeout(() => setShowFailureToast(false), 5000);
    }

    setLoading2(false);

    return { successfulIds, failedIds };
     
}