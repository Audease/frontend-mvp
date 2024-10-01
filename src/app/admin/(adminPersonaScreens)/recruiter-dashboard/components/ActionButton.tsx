import {
    ConfirmEditButton,
    DeleteLearnerButton,
    EditLearnerButton,
    RevertEditButton,
  } from "./RecruiterButtons";
  import CreateLearner from "../../../learners/components/CreateLearner";
  import ImportLearner from "./ImportLearner";
  import RecruiterStaff from "./RecruiterStaff";
  import FilterLearner from "./Filter";
  
  export default function ActionButtons({
    checkedItems,
    onDeleteClick,
    onEditClick,
    onConfirmEditButtonClick,
    onRevertEditButtonClick,
    handleLearnerCreated,
    showStaffButton = true,  
  }) {
    return (
      <div className="flex flex-row space-x-4">
        {Object.values(checkedItems).some((isChecked) => isChecked) && (
          <div className="flex space-x-4">
            <DeleteLearnerButton {...{ onDeleteClick }} />
            <EditLearnerButton {...{ onEditClick }} />
            <ConfirmEditButton {...{ onConfirmEditButtonClick }} />
            <RevertEditButton {...{ onRevertEditButtonClick }} />
          </div>
        )}
        <CreateLearner onLearnerCreated={handleLearnerCreated} />
        <ImportLearner />

        {showStaffButton && <RecruiterStaff />}
        <FilterLearner />
      </div>
    );
  }
  