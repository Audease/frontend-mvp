"use client";

import { useState, useEffect, useMemo } from "react";
import SearchBox from "../../components/dashboard/SearchBox";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FaPlus, FaCheck } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GoPencil } from "react-icons/go";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaRegCircleXmark } from "react-icons/fa6";
import { SlArrowLeft } from "react-icons/sl";
import { LuPencil } from "react-icons/lu";

import { RecruiterFilterButton } from "../../components/dashboard/FilterButton";
import RecruiterDashboardTable from "../../components/dashboard/RecruiterDashboardTable";
import AddLearnerModal, {
  LearnerCreated,
} from "../../dashboard/learners/learnerModal";

import RecruiterStaffModal from "./recruiterStaffModal";
import { AddAuditLearnerModal } from "../../dashboard/roles/components/Rightside/components/CreateRole/CreateRoleModal";
import LearnerImportModal, { LearnerImportSuccessModal } from "../../dashboard/learners/LearnerImportModal";

export default function AdminRecruiterdashboard() {
  const [roleName, setRoleName] = useState("Onny");
  const [activeTab, setActiveTab] = useState("All");
  const [activeBarStyle, setActiveBarStyle] = useState({});
  const [checkedItems, setCheckedItems] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const tabs = useMemo(() => ["All", "Recent", "Deleted"], []);

  useEffect(() => {
    const activeIndex = tabs.indexOf(activeTab);
    const tabWidth = 7 / tabs.length;
    setActiveBarStyle({
      width: `${tabWidth}%`,
      transform: `translateX(${activeIndex * 180}%)`,
    });
  }, [activeTab, tabs, tabs.length]);

  const onCreateClick = () => {
    setLearnerCreateModalState(true);
    console.log("Create click");
  };

  const onImportClick = () => {
    setLearnerImportModalState(true);
  };

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

  const onDeleteClick = () => {
    // Filter out the checked items
    const remainingItems = learnersData.filter(
      (learner) => !checkedItems[learner.id]
    );
    setLearnersData(remainingItems);
  };

  const onEditClick = () => {
    setIsEditing((prev) => !prev);
  };

  const handleCheckboxChange = (id) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const onConfirmEditButtonClick = () => {
    setIsEditing(false);
  };

  const onRevertEditButtonClick = () => {
    setCheckedItems({});
  };

  const [learnersData, setLearnersData] = useState([
    {
      id: 1,
      name: "Alice Johnson",
      dateOfBirth: "1995-06-15",
      mobileNumber: "123-456-7890",
      email: "alice.johnson@example.com",
      niNumber: "AB123456C",
      passportNumber: "123456789",
      homeAddress: "123 Elm Street, Springfield",
      funding: "Scholarship",
      level: "Level 3",
      awarding: "AQA",
      choseCourse: "Computer Science",
    },
    {
      id: 2,
      name: "Bob Smith",
      dateOfBirth: "1998-12-22",
      mobileNumber: "987-654-3210",
      email: "bob.smith@example.com",
      niNumber: "XY987654Z",
      passportNumber: "987654321",
      homeAddress: "456 Oak Avenue, Metropolis",
      funding: "Self-funded",
      level: "Level 2",
      awarding: "Edexcel",
      choseCourse: "Business Administration",
    },
    {
      id: 3,
      name: "Carol White",
      dateOfBirth: "1990-04-10",
      mobileNumber: "555-123-4567",
      email: "carol.white@example.com",
      niNumber: "CD345678D",
      passportNumber: "345678901",
      homeAddress: "789 Pine Lane, Gotham",
      funding: "Government Grant",
      level: "Level 4",
      awarding: "OCR",
      choseCourse: "Healthcare Management",
    },
    {
      id: 4,
      name: "David Brown",
      dateOfBirth: "1985-08-30",
      mobileNumber: "444-567-8901",
      email: "david.brown@example.com",
      niNumber: "EF456789E",
      passportNumber: "456789012",
      homeAddress: "321 Birch Boulevard, Star City",
      funding: "Employer-sponsored",
      level: "Level 5",
      awarding: "City & Guilds",
      choseCourse: "Engineering",
    },
    {
      id: 5,
      name: "Eva Green",
      dateOfBirth: "1993-03-18",
      mobileNumber: "333-678-9012",
      email: "eva.green@example.com",
      niNumber: "GH567890F",
      passportNumber: "567890123",
      homeAddress: "654 Maple Drive, Central City",
      funding: "Loan",
      level: "Level 1",
      awarding: "Pearson",
      choseCourse: "Graphic Design",
    },
    {
      id: 6,
      name: "Frank Adams",
      dateOfBirth: "1991-11-05",
      mobileNumber: "222-789-0123",
      email: "frank.adams@example.com",
      niNumber: "IJ678901G",
      passportNumber: "678901234",
      homeAddress: "321 Cedar Street, Springfield",
      funding: "Scholarship",
      level: "Level 2",
      awarding: "AQA",
      choseCourse: "Mathematics",
    },
    {
      id: 7,
      name: "Grace Bell",
      dateOfBirth: "1997-07-27",
      mobileNumber: "555-234-5678",
      email: "grace.bell@example.com",
      niNumber: "KL789012H",
      passportNumber: "789012345",
      homeAddress: "789 Elm Avenue, Metropolis",
      funding: "Self-funded",
      level: "Level 3",
      awarding: "Edexcel",
      choseCourse: "Biology",
    },
    {
      id: 8,
      name: "Henry Clark",
      dateOfBirth: "1989-02-14",
      mobileNumber: "444-345-6789",
      email: "henry.clark@example.com",
      niNumber: "MN890123I",
      passportNumber: "890123456",
      homeAddress: "456 Oak Boulevard, Gotham",
      funding: "Government Grant",
      level: "Level 4",
      awarding: "OCR",
      choseCourse: "Chemistry",
    },
    {
      id: 9,
      name: "Ivy Davis",
      dateOfBirth: "1992-09-19",
      mobileNumber: "333-456-7890",
      email: "ivy.davis@example.com",
      niNumber: "OP901234J",
      passportNumber: "901234567",
      homeAddress: "654 Pine Drive, Star City",
      funding: "Employer-sponsored",
      level: "Level 5",
      awarding: "City & Guilds",
      choseCourse: "Physics",
    },
    {
      id: 10,
      name: "Jack Evans",
      dateOfBirth: "1987-05-30",
      mobileNumber: "222-567-8901",
      email: "jack.evans@example.com",
      niNumber: "QR012345K",
      passportNumber: "012345678",
      homeAddress: "321 Birch Lane, Central City",
      funding: "Loan",
      level: "Level 1",
      awarding: "Pearson",
      choseCourse: "History",
    },
    {
      id: 11,
      name: "Kate Foster",
      dateOfBirth: "1994-08-25",
      mobileNumber: "555-678-9012",
      email: "kate.foster@example.com",
      niNumber: "ST123456L",
      passportNumber: "123456789",
      homeAddress: "789 Cedar Avenue, Springfield",
      funding: "Scholarship",
      level: "Level 3",
      awarding: "AQA",
      choseCourse: "Geography",
    },
    {
      id: 12,
      name: "Leo Garcia",
      dateOfBirth: "1996-03-15",
      mobileNumber: "444-789-0123",
      email: "leo.garcia@example.com",
      niNumber: "UV234567M",
      passportNumber: "234567890",
      homeAddress: "456 Elm Boulevard, Metropolis",
      funding: "Self-funded",
      level: "Level 2",
      awarding: "Edexcel",
      choseCourse: "Philosophy",
    },
    {
      id: 13,
      name: "Mia Harris",
      dateOfBirth: "1999-01-10",
      mobileNumber: "333-890-1234",
      email: "mia.harris@example.com",
      niNumber: "WX345678N",
      passportNumber: "345678901",
      homeAddress: "654 Oak Drive, Gotham",
      funding: "Government Grant",
      level: "Level 4",
      awarding: "OCR",
      choseCourse: "Political Science",
    },
    {
      id: 14,
      name: "Nina Jackson",
      dateOfBirth: "1988-04-22",
      mobileNumber: "222-901-2345",
      email: "nina.jackson@example.com",
      niNumber: "YZ456789O",
      passportNumber: "456789012",
      homeAddress: "321 Pine Lane, Star City",
      funding: "Employer-sponsored",
      level: "Level 5",
      awarding: "City & Guilds",
      choseCourse: "Sociology",
    },
    {
      id: 15,
      name: "Oscar King",
      dateOfBirth: "1991-06-07",
      mobileNumber: "555-012-3456",
      email: "oscar.king@example.com",
      niNumber: "AB567890P",
      passportNumber: "567890123",
      homeAddress: "789 Birch Avenue, Central City",
      funding: "Loan",
      level: "Level 1",
      awarding: "Pearson",
      choseCourse: "Psychology",
    },
    {
      id: 16,
      name: "Paul Lee",
      dateOfBirth: "1993-11-03",
      mobileNumber: "444-123-4567",
      email: "paul.lee@example.com",
      niNumber: "CD678901Q",
      passportNumber: "678901234",
      homeAddress: "456 Cedar Street, Springfield",
      funding: "Scholarship",
      level: "Level 3",
      awarding: "AQA",
      choseCourse: "Anthropology",
    },
    {
      id: 17,
      name: "Quinn Miller",
      dateOfBirth: "1997-02-28",
      mobileNumber: "333-234-5678",
      email: "quinn.miller@example.com",
      niNumber: "EF789012R",
      passportNumber: "789012345",
      homeAddress: "654 Elm Lane, Metropolis",
      funding: "Self-funded",
      level: "Level 2",
      awarding: "Edexcel",
      choseCourse: "Linguistics",
    },
    {
      id: 18,
      name: "Rose Nelson",
      dateOfBirth: "1992-07-15",
      mobileNumber: "222-345-6789",
      email: "rose.nelson@example.com",
      niNumber: "GH890123S",
      passportNumber: "890123456",
      homeAddress: "321 Oak Drive, Gotham",
      funding: "Self-funded",
      level: "Level 2",
      awarding: "Edexcel",
      choseCourse: "Linguistics",
    },
  ]);

  const [learnerCreateModalState, setLearnerCreateModalState] = useState(false);
  const [learnerSuccessModal, setLearnerSuccessModal] = useState(false);
  const [learnerImportModalState, setLearnerImportModalState] = useState(false);
  const [learnerImportSuccessModal, setLearnerImportSuccessModal] = useState(false);

  const closeLearnerCreateModal = () => {
    console.log("closed");
    setLearnerCreateModalState(false);
  };

  const closeLearnerSuccessModal = () => {
    setLearnerSuccessModal(false);
  };

  const onLearnerCreateClick = () => {
    setLearnerCreateModalState(false);
    setLearnerSuccessModal(true);
  };

  const closeLearnerImportModal = () => {
    setLearnerImportModalState(false);
  };

  const onLearnerImportClick = () => {
    setLearnerImportSuccessModal(true);
    setLearnerImportModalState(false);
  };

  const closeLearnerImportSuccessModal = () => {
    setLearnerImportModalState(false);
    setLearnerImportSuccessModal(false);
  };

  const [showRecruiterStaffModal, setShowRecruiterStaffModal] = useState(false);

  const onBackClick = () => {};

  const onViewStaffClick = () => {
    setShowRecruiterStaffModal(true);
  }

  const closeRecruiterStaffModal = () => {
    setShowRecruiterStaffModal(false);
  }


  return (
    <div className="relative">
      <div className="flex flex-row space-x-3">
        {/* Back Button */}
        <div className="pt-1 ">
          <button
            className="flex flex-row space-x-2 text-tgrey3"
            type="button"
            onClick={onBackClick}
          >
            <div className="pt-2">
              <SlArrowLeft className="text-tgrey3 h-[0.6rem]" />
            </div>
            <p className="font-medium text-base">Back</p>
          </button>
        </div>
        {/* Dashboard Title  */}
        <div>
          <h3 className="font-medium text-2xl pl-3">{roleName} Dashboard</h3>
        </div>
        <div>
          {/* Pencil  */}
          <div className="py-1">
            <LuPencil className="text-dashboardButtons w-10 h-5 " />
          </div>
        </div>
      </div>

      {/* Selection and active bar */}
      <div className="flex flex-col mt-3">
        <div className="flex flex-row justify-between font-medium text-sm text-tgrey3">
          <div className="flex flex-row space-x-6">
            {tabs.map((tab) => (
              <h2
                key={tab}
                className={`cursor-pointer pt-4 ${
                  activeTab === tab ? "text-black" : ""
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </h2>
            ))}
          </div>

          {/* The buttons on the right side  */}
          <div className="flex flex-row space-x-4">
            {/* Delete Button */}
            {Object.values(checkedItems).some((isChecked) => isChecked) && (
              <div>
                <button
                  className="flex flex-row border border-tred2 rounded-md py-[0.4rem] px-3 text-tred2 font-medium text-sm"
                  onClick={onDeleteClick}
                >
                  <span>
                    <RiDeleteBin6Line className="text-tred2 my-1 mr-2" />
                  </span>{" "}
                  Delete
                </button>
              </div>
            )}
            {/* Edit Button */}
            {Object.values(checkedItems).some((isChecked) => isChecked) && (
              <div>
                <button
                  className="flex flex-row rounded-md border py-[0.4rem] px-3 text-dashboardRolesBtn font-medium text-sm"
                  onClick={onEditClick}
                >
                  <span>
                    <GoPencil className="text-dashboardRolesBtn my-1 mr-2" />
                  </span>{" "}
                  Edit
                </button>
              </div>
            )}

            {/* Confirm Edit Button */}
            {Object.values(checkedItems).some((isChecked) => isChecked) && (
              <div
                className="w-10 h-9 flex justify-center items-center rounded-md shadow-sm border cursor-pointer"
                onClick={onConfirmEditButtonClick}
              >
                <FaRegCheckCircle className="text-[#08930D] h-5 w-5" />
              </div>
            )}

            {/* Revert Edit Changes Button */}
            {Object.values(checkedItems).some((isChecked) => isChecked) && (
              <div
                className="w-10 h-9 flex justify-center items-center rounded-md shadow-sm border cursor-pointer"
                onClick={onRevertEditButtonClick}
              >
                <FaRegCircleXmark className="text-tred2 h-5 w-5" />
              </div>
            )}

            {/* Create Button  */}
            <div className="relative inline-block">
              <button
                className="bg-dashboardButtonsBg rounded-md px-3"
                onClick={onCreateClick}
              >
                <div className="flex flex-row text-sm font-medium p-2 text-dashboardButtons ">
                  Create <MdOutlineKeyboardArrowRight className="w-8 h-5" />
                </div>
              </button>
            </div>

            {/* Import Button  */}
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
            </div>

            {/* View Staff Button  */}
            <div>
              <button
                className="flex flex-row rounded-md py-[0.4rem] px-3 bg-black text-white font-medium text-sm"
                onClick={onViewStaffClick}
              >
                View staff
              </button>
            </div>

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
        {/* The active bar color change */}
        <div className="w-full h-[0.10rem] bg-gray-300 my-2">
          <div
            className={`h-[0.10rem] bg-dashboardButtons transition-all duration-300`}
            style={activeBarStyle}
          ></div>
        </div>
      </div>

      <div className="min-h-[35rem]">
        <RecruiterDashboardTable
          learnersData={learnersData}
          checkedItems={checkedItems}
          handleCheckboxChange={handleCheckboxChange}
          isEditing={isEditing}
          setLearnersData={setLearnersData}
        />
      </div>

      {/* Learner Create and Successful Modal  */}
      <div>
        <AddAuditLearnerModal
          show={learnerCreateModalState}
          onClose={closeLearnerCreateModal}
          // onCreateClick={onLearnerCreateClick}
        />

        <LearnerCreated
          show={learnerSuccessModal}
          onClose={closeLearnerSuccessModal}
        />
      </div>

      {/* Learner Import Modal  */}
      <div>
        <LearnerImportModal
          show={learnerImportModalState}
          onClose={closeLearnerImportModal}
          onCreateClick={onLearnerImportClick}
        />

        <LearnerImportSuccessModal
          show={learnerImportSuccessModal}
          onClose={closeLearnerImportSuccessModal}
        />
      </div>

      {/* Recruiter Staff Modal  */}
      <RecruiterStaffModal show={showRecruiterStaffModal} onClose={closeRecruiterStaffModal}/>
    </div>
  );
}
