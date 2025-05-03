import React from "react";

const StaffButton = ({onViewStaffClick}) => {
  return (
    <div>
      <button
        className="flex flex-row rounded-md py-[0.4rem] px-4 bg-black text-white font-medium text-sm"
        onClick={onViewStaffClick}
      >
        View staff
      </button>
    </div>
  );
};

export default StaffButton;
