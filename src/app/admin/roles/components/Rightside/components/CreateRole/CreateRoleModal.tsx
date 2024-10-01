'use client';

import { Modal } from "flowbite-react";
import { IoClose } from "react-icons/io5";
import { PlainButton } from "../../../../../../components/dashboard/Button";
import { useState } from "react";
import Image from "next/image";
import learnersData from "../../../../../../data/learnersData.json";
import { Avatar } from "flowbite-react";
import FilterButton, {
  RecruiterFilterButton,
} from "../../../../../../components/dashboard/FilterButton";
  import { useCreateRole } from "../../../../hooks/useRoleCreate";
import { rolesRevalidation } from "../../../../../../action";
import LoadingSpinner from "../../../../../../components/dashboard/Spinner";

export default function CreateRoleModal({ isRoleModalOpen, closeRoleModal, setSuccess }) {
  const [inputedPermission, setInputedPermission] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const {
    roleFormData,
    setRoleFormData,
    roleCreate,
  } = useCreateRole();

  const clearPermission = () => {
    setInputedPermission([]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoleFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const removeTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
    if (indexToRemove === 0) {
      clearPermission();
    }
  };

  const addPermissions = (permission: string) => (e) => {
    e.preventDefault();
    if (!tags.includes(permission)) {
      setTags((prevData) => [...prevData, permission]);
      setRoleFormData((prevData) => ({
        ...prevData,
        permission: [...prevData.permission || [], permission], 
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const roleCreated = await roleCreate();
    setLoading(false);
    if (roleCreated) {
      rolesRevalidation();
      setSuccess(true);
    }
  };



  return (
    <div>
      <Modal show={isRoleModalOpen} onClose={closeRoleModal} className="modal" size={"md"}>
        <div className="flex flex-col p-4">
          <div className="flex flex-row justify-between items-center">
            <h2 className="font-medium text-lg text-tblack3">Create Role</h2>
            <IoClose
              className="text-tgrey3 cursor-pointer"
              width={14}
              height={14}
              onClick={ () => {
                closeRoleModal();
                setRoleFormData({ roleName: "", permission: []});
              }}
            />
          </div>
          <hr className="my-4" />
          <form onSubmit={handleSubmit}>
            {/* Role name input */}
            <div className="mb-4">
              <label
                className="block text-tgrey3 text-sm font-normal mb-2"
                htmlFor="roleName"
              >
                Role Name
              </label>
              <input
                id="roleName"
                name="roleName"
                type="text"
                className="border-1 rounded-lg border-tgrey2 px-3 py-1 text-h2 text-black font-normal focus:border-gold1 focus:outline-none focus:ring-gold1 w-full"
                value={roleFormData.roleName || ""}
                onChange={handleChange}
              />
            </div>

            {/* Permissions */}
            <div className="mb-4">
              <label
                className="block text-tgrey3 text-sm font-normal mb-2"
                htmlFor="permission"
              >
                Permission (You can only select one permission)
              </label>
              {/* Tag Input Field */}
              <div className="flex flex-wrap items-center border p-2 border-1 rounded-lg border-tgrey2 py-1 text-h2 h-16 gap-2">
                {tags.map((tag, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-gray-200 rounded px-2"
                  >
                    <span className="text-gray-700 mr-2">{tag}</span>
                    <button
                      className="text-gray-500 hover:text-gray-700"
                      onClick={() => removeTag(index)}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
              {/* Options */}
              <div className="my-4 flex flex-row flex-wrap justify-left">
                <div className="text-sm">
                  <PlainButton
                    text={"Add student"}
                    onClick={addPermissions("Add student")}
                  />
                </div>

                <div className="text-sm ml-3">
                  <PlainButton
                    text={"Induction"}
                    onClick={addPermissions("Induction")}
                  />
                </div>

                <div className="text-sm mx-2">
                  <PlainButton
                    text={"Learning Platform"}
                    onClick={addPermissions("Learning Platform")}
                  />
                </div>

                <div className="mt-4 text-sm">
                  <PlainButton
                    text={"Approve/reject application"}
                    onClick={addPermissions("Approve/reject application")}
                  />
                </div>

                <div className="mt-4 text-sm ml-1">
                  <PlainButton
                    text={"Send Application"}
                    onClick={addPermissions("Send Application")}
                  />
                </div>

                <div className="mt-4 text-sm ml-1">
                  <PlainButton
                    text={"Certificate"}
                    onClick={addPermissions("Certificate")}
                  />
                </div>

                <div className="text-sm mt-4 ml-3">
                  <PlainButton
                    text={"Audit"}
                    onClick={addPermissions("Audit")}
                  />
                </div>
              </div>
            </div>
            {loading && (
         <LoadingSpinner />
        )}
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-dashboardButtons hover:bg-tgrey1 text-white w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}

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
