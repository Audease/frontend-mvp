import React from "react";

const SendBtn = ({ onSendClick, disabled }) => {
  return (
    <div>
      <button
        className={`flex flex-row rounded-md py-[0.4rem] px-4 bg-tgrey3 text-white font-medium text-sm ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={onSendClick}
        disabled={disabled}
      >
        Send Certificate
      </button>
    </div>
  );
};

export default SendBtn;
