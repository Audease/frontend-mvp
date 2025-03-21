import { NewFilterButton } from "../../../../components/dashboard/FilterButton";

const FilterLearner = ( { onFilterClick } ) => {
  

  return (
    <div>
      <NewFilterButton
        label={"Filters"}
        onFilterClick={onFilterClick}
      />
    </div>
  );
};

export default FilterLearner;
