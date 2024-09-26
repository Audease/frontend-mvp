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
    showStaffButton = true,  // new prop with default value
  }) {
    return (
      <div className="flex flex-row space-x-4">
        {Object.values(checkedItems).some((isChecked) => isChecked) && (
          <>
            <DeleteLearnerButton {...{ onDeleteClick }} />
            <EditLearnerButton {...{ onEditClick }} />
            <ConfirmEditButton {...{ onConfirmEditButtonClick }} />
            <RevertEditButton {...{ onRevertEditButtonClick }} />
          </>
        )}
        <CreateLearner onLearnerCreated={handleLearnerCreated} />
        <ImportLearner />
  
        {/* Conditionally render the RecruiterStaff button based on the showStaffButton prop */}
        {showStaffButton && <RecruiterStaff />}
        <FilterLearner />
      </div>
    );
  }
  