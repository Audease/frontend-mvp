import { useState } from "react";
import { FaPlus, FaCheck } from "react-icons/fa";

import { useLearnerByRecruiter } from "../utils/useLearnerByRecruiter";
import LearnerImportModal, { LearnerImportSuccessModal } from "@/app/admin/learners/components/LearnerImportModal";

const ImportLearner = () => {
  const [learnerImportModalState, setLearnerImportModalState] = useState(false);
  const [learnerImportSuccessModal, setLearnerImportSuccessModal] = useState(false);
  const { handleFetchLearnersData } = useLearnerByRecruiter();

  const closeLearnerImportModal = () => {
    setLearnerImportModalState(false);
  };


  const closeLearnerImportSuccessModal = () => {
    setLearnerImportModalState(false);
    setLearnerImportSuccessModal(false);
  };

  const onImportClick = () => {
    setLearnerImportModalState(true);
  };

  const randomFunction = () => {
    setLearnerImportModalState(false);
    setLearnerImportSuccessModal(true);
    handleFetchLearnersData(1, 10, '', '', '');
  };

  return (
    <div>
      <button
        className="flex flex-row rounded-md py-[0.4rem] px-3 bg-tgrey3 text-white font-medium text-sm"
        onClick={onImportClick}
      >
        <span>
          <FaPlus className="text-white my-1 mr-2" />
        </span>{" "}
        Import
      </button>
      {/* Learner Import Modal  */}
      <div>
        <LearnerImportModal
          show={learnerImportModalState}
          onClose={closeLearnerImportModal}
          {...{randomFunction}}
        />

        <LearnerImportSuccessModal
          show={learnerImportSuccessModal}
          onClose={closeLearnerImportSuccessModal}
        />
      </div>
    </div>
  );
};

export default ImportLearner;
