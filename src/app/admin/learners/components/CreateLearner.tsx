import React, { useState } from "react";
import CreateButton from "../../../components/dashboard/CreateButton";
import AddLearnerModal, { LearnerCreated } from "../learnerModal";

type Props = {};

const CreateLearner = ({ onLearnerCreated }) => {
  const [learnerCreateModalState, setLearnerCreateModalState] = useState(false);
  const [learnerSuccessModal, setLearnerSuccessModal] = useState(false);
  const closeLearnerCreateModal = () => {
    setLearnerCreateModalState(false);
  };

  const closeLearnerSuccessModal = () => {
    setLearnerSuccessModal(false);
  };
  return (
    <div>
      <CreateButton
        label={"Create"}
        onClick={() => setLearnerCreateModalState(true)}
      />

      {learnerCreateModalState && (
        <AddLearnerModal
          {...{ setLearnerSuccessModal, onLearnerCreated }}
          show={learnerCreateModalState}
          onClose={closeLearnerCreateModal}
        />
      )}

      {learnerSuccessModal && (
        <LearnerCreated
          show={learnerSuccessModal}
          onClose={closeLearnerSuccessModal}
        />
      )}
    </div>
  );
};

export default CreateLearner;
