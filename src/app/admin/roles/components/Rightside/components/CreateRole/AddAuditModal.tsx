import { RecruiterFilterButton } from "@/app/components/dashboard/FilterButton";
import { Avatar, Modal } from "flowbite-react";
import { IoClose } from "react-icons/io5";
import learnersData from "../../../../../../data/learnersData.json";

export function AddAuditLearnerModal({ show, onClose }) {

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
    const handleLearnerAdd = () => {};
    return (
      <div>
        <Modal {...{show, onClose}} className="modal p-12" size={"xl"}>
          <div className="flex flex-row justify-between items-center p-4">
            <div className="flex flex-col">
              <h2 className="font-medium text-lg text-tblack3">Learners</h2>
              <p className="font-normal text-sm text-tgrey3">
                Staff under the recruiter role
              </p>
            </div>
            <IoClose
              className="text-tgrey3 cursor-pointer"
              width={14}
              height={14}
              onClick={onClose}
            />
          </div>
  
          {/* Search Bar */}
          <div className="flex flex-col space-y-2 px-4">
            <label htmlFor="" className="font-normal text-sm text-tgrey3">
              Search
            </label>
            <div className="flex flex-row justify-between space-x-2">
              <input
                type="text"
                placeholder="Enter staff name"
                className="border-1 border-tgrey2 rounded py-1 focus:ring-gold1 w-full focus:border-none focus:ring"
              />
  
              {/* Filter Button  */}
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
          </div>
  
          {/* Line Break */}
          <hr className="my-2 mx-4" />
  
          {/* Search Results */}
          <div className="flex flex-col px-4 space-y-4 h-80 overflow-y-auto">
            {learnersData.learners.map((learner) => (
              <div
                key={learner.id}
                className="flex flex-row justify-between space-x-2 items-center"
              >
                <div className="flex flex-row space-x-2">
                  <div>
                    <Avatar
                      img={"/avatar.img"}
                      alt={`Image of ${learner.name}`}
                      rounded
                    />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="font-medium text-sm">{learner.name}</h4>
                    <p className="font-normal text-xs text-tgrey3">
                      {learner.email}
                    </p>
                  </div>
                </div>
                {/* Remove Button */}
                <div>
                  <button
                    onClick={() => handleLearnerAdd()}
                    className="py-1 px-2 text-[#23AB0D] bg-[#F3FDE9] rounded-md text-sm"
                  >
                    Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Modal>
      </div>
    );
  }