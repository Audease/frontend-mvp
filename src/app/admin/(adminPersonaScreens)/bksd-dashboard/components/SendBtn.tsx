import React from "react";

const SendBtn = ({onSendClick}) => {
  return (
    <div>
      <button
        className="flex flex-row rounded-md py-[0.4rem] px-4 bg-tgrey3 text-white font-medium text-sm"
        onClick={onSendClick}
      >
        Send Application
      </button>
    </div>
  );
};

export default SendBtn;
