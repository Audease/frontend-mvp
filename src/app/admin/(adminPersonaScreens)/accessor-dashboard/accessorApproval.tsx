"use client";

import { SlArrowLeft } from "react-icons/sl";
import { IoIosCheckmark } from "react-icons/io";
import { ApproveLearner, RejectLearner } from "./utils/action";
import { useState } from "react";
import SuccessToast, {
  FailureToast,
} from "../../../components/NotificationToast";
import LoadingSpinner from "../../../components/dashboard/Spinner";
import LearnerDocument from "./LearnerDocument";

export default function AccessorApproval({ learner, onBack }) {
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showFailureToast, setShowFailureToast] = useState(false);
  const [loading, setLoading] = useState(false);

  const approve = async () => {
    setLoading(true);
    const success = await ApproveLearner(learner.id);
    setLoading(false);
    if (success) {
      setShowSuccessToast(true);
      setTimeout(() => {
        setShowSuccessToast(false);
      }, 5000);
    } else if (!success) {
      setShowFailureToast(true);
      setTimeout(() => {
        setShowFailureToast(false);
      }, 5000);
    }
  };

  const rejection = async () => {
    setLoading(true);
    const success = await RejectLearner(learner.id);
    setLoading(false);
    if (success) {
      setShowSuccessToast(true);
      setTimeout(() => {
        setShowSuccessToast(false);
      }, 5000);
    } else if (!success) {
      setShowFailureToast(true);
      setTimeout(() => {
        setShowFailureToast(false);
      }, 5000);
    }
  };

  return (
    <div className="space-y-4 min-h-[35rem]">
      {/* Back Button */}
      <div className="pt-1 ">
        <button
          className="flex flex-row space-x-2 text-tgrey3"
          type="button"
          onClick={onBack}
        >
          <div className="pt-2">
            <SlArrowLeft className="text-tgrey3 h-[0.6rem]" />
          </div>
          <p className="font-medium text-base">Back</p>
        </button>
      </div>
      {/* Toasts  */}
      <div className="fixed z-50 right-8 animate-bounce">
        {showSuccessToast && (
          <SuccessToast text={"Approval/Rejection successful."} />
        )}
        {showFailureToast && <FailureToast text={"Fail to Approve/Reject"} />}
      </div>
        
      <div className="border rounded-md w-full  p-6">
        {loading && <LoadingSpinner />}
        {learner ? (
          <div>
            <div className="flex flex-col md:flex-row justify-between">
              <div>
                <p className="text-xl font-medium">{learner.name}</p>
              </div>
              <div className="flex flex-col md:flex-row  my-4 md:mt-0 justify-between md:space-x-6">
                {/* Approve Button */}
                {/* <button
                  onClick={approve}
                  className="flex flex-row bg-black text-white text-sm font-semibold my-4 md:my-0 py-0 px-3 rounded-lg"
                >
                  <IoIosCheckmark className="w-10 h-10" />
                  <p className="py-2">Approve</p>
                </button> */}
                {/* Reject Button */}
                {/* <button
                  onClick={rejection}
                  className="flex flex-row bg-white text-tred2 text-sm font-semibold py-0 px-3 rounded-lg border border-tred2"
                >
                  <span className="p-2">x</span>
                  <p className="py-2">Reject</p>
                </button> */}
              </div>
            </div>
            <div className="mt-5">
              <LearnerDocument userId={learner.id} />
            </div>
          </div>
        ) : (
          <p>
            <LoadingSpinner />
          </p>
        )}
      </div>
      
    </div>
  );
}
