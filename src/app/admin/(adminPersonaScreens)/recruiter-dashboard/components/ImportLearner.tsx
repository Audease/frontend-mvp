import { useState } from "react";
import { FaPlus, FaCheck } from "react-icons/fa";

import { useLearnerByRecruiter } from "../utils/useLearnerByRecruiter";
import LearnerImportModal from "@/app/admin/learners/components/LearnerImportModal";
import { LearnerImportSuccessModal } from "@/app/admin/learners/components/LearnerImportSuccessModal";
import { learnerRevalidation } from "@/app/action";

const ImportLearner = ({callback}) => {
  const [learnerImportModalState, setLearnerImportModalState] = useState(false);
  const [learnerImportSuccessModal, setLearnerImportSuccessModal] = useState(false);
  const { handleFetchLearnersData } = useLearnerByRecruiter();

  const closeLearnerImportModal = () => {
    setLearnerImportModalState(false);
  };


  const closeLearnerImportSuccessModal = async() => {
    await handleFetchLearnersData(1, 10, '', '', '', 'asc');
    learnerRevalidation();
    setLearnerImportModalState(false);
    setLearnerImportSuccessModal(false);
    if (callback) {
      callback();
    }
  };

  const onImportClick = () => {
    setLearnerImportModalState(true);
  };

  const randomFunction = (callback: () => void) => {
    setLearnerImportModalState(false);
    setLearnerImportSuccessModal(true);
    handleFetchLearnersData(1, 10, '', '', '', 'asc');
    
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
