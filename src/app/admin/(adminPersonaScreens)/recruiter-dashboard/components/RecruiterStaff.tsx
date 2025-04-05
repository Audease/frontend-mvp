import { useState } from "react";
import RecruiterStaffModal from "../recruiterStaffModal";

const RecruiterStaff = () => {
    const [showRecruiterStaffModal, setShowRecruiterStaffModal] = useState(false);

    const onViewStaffClick = () => {
      setShowRecruiterStaffModal(true);
    };
  
    const closeRecruiterStaffModal = () => {
      setShowRecruiterStaffModal(false);
    };

  return (
    <div>
      <button
        className="flex flex-row w-24 rounded-md py-[0.4rem] px-3 bg-tgrey3 text-white font-medium text-sm text-center justify-center"
        onClick={onViewStaffClick}
      >
        View staff
      </button>

      {/* Recruiter Staff Modal  */}
      <RecruiterStaffModal
        show={showRecruiterStaffModal}
        onClose={closeRecruiterStaffModal}
      />
    </div>
  );
};

export default RecruiterStaff;
