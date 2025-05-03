import {
  // ConfirmEditButton,
  DeleteLearnerButton,
  EditLearnerButton,
  // RevertEditButton,
} from "./RecruiterButtons";

import ImportLearner from "./ImportLearner";
import RecruiterStaff from "./RecruiterStaff";
import FilterLearner from "./Filter";
import CreateLearner from "@/app/admin/learners/components/CreateLearner";
import { SearchComponent } from "@/app/components/dashboard/SearchBox";

export default function ActionButtons({
  searchValue,
  onFilterClick,
  checkedItems,
  onDeleteClick,
  onEditClick,
  // onConfirmEditButtonClick,
  // onRevertEditButtonClick,
  callback,
  handleLearnerCreated,
  showStaffButton = true,
}) {
  return (
    <div className="flex flex-row space-x-4">
      {Object.values(checkedItems).some((isChecked) => isChecked) && (
        <div className="flex space-x-2 my-3 xl:my-0 xl:space-x-4">
          <DeleteLearnerButton {...{ onDeleteClick }} />
          <EditLearnerButton {...{ onEditClick }} />
          {/* <ConfirmEditButton {...{ onConfirmEditButtonClick }} />
          <RevertEditButton {...{ onRevertEditButtonClick }} /> */}
        </div>
      )}

      {!Object.values(checkedItems).some((isChecked) => isChecked) && (
        <SearchComponent searchValue={searchValue}/>
      )}

      <div className="xl:flex flex-row space-x-4 hidden items-center justify-center">
        <CreateLearner onLearnerCreated={handleLearnerCreated} />
        <ImportLearner callback={callback}/>
        {showStaffButton && <RecruiterStaff />}
        <FilterLearner onFilterClick={onFilterClick} />
      </div>
    </div>
  );
}
