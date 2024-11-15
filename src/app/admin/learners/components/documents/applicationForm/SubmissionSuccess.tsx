import React from 'react';

const SubmissionSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full my-20">
      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md mb-4" role="alert">
        <strong className="font-bold">Congratulations!</strong>
        <span className="block sm:inline"> You have successfully completed the form.</span>
      </div>
      <p>Thank you for your time and effort.</p>
    </div>
  );
};

export default SubmissionSuccess;