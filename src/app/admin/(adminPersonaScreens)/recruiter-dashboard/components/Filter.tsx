import { RecruiterFilterButton } from "../../../../components/dashboard/FilterButton";

const FilterLearner = () => {
  const filterOptions = ["Option 1", "Option 2", "Option 3"];
  const categoriesDropdownOptions = ["Category 1", "Category 2", "Category 3"];
  const courseDropdownOptions = ["Course 1", "Course 2", "Course 3"];

  const handleFilterSelect = (filter) => {
    console.log("Selected filter:", filter);
  };

  const handleCategorySelect = (category) => {
    console.log("Selected category:", category);
  };

  const handleCourseSelect = (course) => {
    console.log("Selected course:", course);
  };

  const onFilterClick = () => {};
  return (
    <div>
      <RecruiterFilterButton
        label={"Filters"}
        options={filterOptions}
        onSelect={handleFilterSelect}
        categoriesDropdownOptions={categoriesDropdownOptions}
        onCategorySelect={handleCategorySelect}
        courseDropdownOptions={courseDropdownOptions}
        onCourseSelect={handleCourseSelect}
        onFilterClick={onFilterClick}
      />
    </div>
  );
};

export default FilterLearner;
