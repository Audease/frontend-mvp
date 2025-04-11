import { useState } from "react";
import DeleteStaff from "./action";

export const useDeleteStaff = () => {
  const [loading, setLoading] = useState(false);
  const [succesToast, setSuccesToast] = useState(false);
  const [failureToast, setFailureToast] = useState(false);

  const handleRemove = async (staffID) => {
    console.log("Deleting staff with ID:", staffID);
    setLoading(true);
    let deleteSuccess = await DeleteStaff(staffID);
    setLoading(false);
    if (deleteSuccess) {
      setSuccesToast(true);
      setTimeout(() => {
        setSuccesToast(false);
      }, 5000);
    } else if (!deleteSuccess) {
      setFailureToast(true);
      setTimeout(() => {
        setFailureToast(false);
      }, 5000);
    }
  };

  return {
    handleRemove,
    loading,
    succesToast,
    failureToast
  };
};
