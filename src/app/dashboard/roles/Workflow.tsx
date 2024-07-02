import { SlArrowLeft } from "react-icons/sl";
import { FaPlus, FaCheck } from "react-icons/fa";
import { useState } from "react";
import Image from "next/image";
import CreateWorkflow, { WorkflowCreated } from "./CreateWorkflow";

export default function Workflow({ onClick }) {
  const [activeTab, setActiveTab] = useState("Workflow");
  const [workflow, setWorkflows] = useState([]);
  const onInviteClick = () => {};
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModal, setIsSuccessModal] = useState(false);

  const onCreateWorkflowClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const workFlowCreate = () => {
    setIsSuccessModal(true);
    setIsModalOpen(false);
  };

  const [roleFormData, setRoleFormData] = useState({
    roleName: "",
    permission: "",
  });

  const closeSuccessModal = () => {
    setIsSuccessModal(false);
    setRoleFormData({
      roleName: "",
      permission: "",
    });
  };

//   Tag Input field 
  const [tags, setTags] = useState(["@Johnsonwils", "Anderson123@gmail.com"]);

  const removeTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const addTag = (event) => {
    if (event.target.value !== "") {
      setTags([...tags, event.target.value]);
      event.target.value = "";
    }
  };

  return (
    <div className="flex flex-col space-y-4 w-[64rem] space-x-0 font-inter">
      {/* Back Button */}
      <div>
        <button
          className="flex flex-row space-x-2 text-tgrey3"
          type="button"
          onClick={onClick}
        >
          <div className="pt-2">
            <SlArrowLeft className="text-tgrey3 h-[0.6rem]" />
          </div>
          <p className="font-medium text-base">Back</p>
        </button>
      </div>
      {/* the board  */}
      <div className="flex flex-col space-y-4">
        {/* create worflows and buttons */}
        <div className="flex flex-row justify-between">
          {/* Heading  */}
          <div className="">
            <h3 className="font-medium text-lg">Create a Workflow</h3>
            <p className="font-normal text-sm text-tgrey3">
              Create and complete tasks using worklows
            </p>
          </div>
          {/* Invite and Create Workflows buttons  */}
          <div className="flex flex-row space-x-4">
            {/* Invite button  */}
            <div>
              <button
                className="flex flex-row rounded-md py-1 px-3 bg-dashboardButtonsBg text-dashboardButtons font-medium text-sm"
                onClick={onInviteClick}
              >
                <span>
                  <FaPlus className="text-dashboardButtons my-1 mr-2" />
                </span>{" "}
                Invite
              </button>
            </div>
            {/* Create Workflow button  */}
            <div>
              <button
                className="flex flex-row rounded-md py-1 px-3 bg-black text-white font-medium text-sm"
                onClick={onCreateWorkflowClick}
              >
                <span>
                  <FaPlus className="text-white my-1 mr-2" />
                </span>{" "}
                Create Workflow
              </button>
            </div>
          </div>
        </div>
        {/* Selection and active bar */}
        <div className="flex flex-col ">
          <div className="flex flex-row space-x-6  font-medium text-sm text-tgrey3 ">
            <h2
              className="cursor-pointer"
              onClick={() => setActiveTab("Workflow")}
            >
              Workflow
            </h2>
            <h2
              className="cursor-pointer"
              onClick={() => setActiveTab("Roles")}
            >
              Roles
            </h2>
          </div>
          {/* The active bar color change */}
          <div className="w-full h-[0.10rem] bg-gray-300 my-2">
            <div
              className={`h-[0.10rem] bg-dashboardButtons transition-all duration-300`}
              style={{
                width:
                  activeTab === "Workflow"
                    ? "calc(7% - 10px)"
                    : "calc(7% - 10px)",
                transform:
                  activeTab === "Workflow"
                    ? "translateX(0)"
                    : "translateX(calc(100% + 24px))",
              }}
            ></div>
          </div>
        </div>
        {/* Worflow content  */}
        <div className="">
          {workflow.length === 0 ? (
            <div className="flex flex-col justify-center items-center pt-20">
              <div>
                <Image
                  src={"/workflow_empty_illustration.png"}
                  width={400}
                  height={600}
                  alt="illustration"
                />
              </div>
              <div className="pt-6 flex flex-col justify-center items-center font-inter">
                <h3 className="font-medium text-base text-[#050708]">
                  No workflow created
                </h3>
                <p className="font-normal text-sm text-tgrey3">
                  {" "}
                  Create worflow using
                  <span className="text-dashboardButtons">
                    {" "}
                    +Create Worflow{" "}
                  </span>{" "}
                  button
                </p>
              </div>
            </div>
          ) : (
            <div>Workflows appears here</div>
          )}
        </div>
      </div>
      {/* Modals  */}
      <div>
        {/* The modal  */}
        <CreateWorkflow
          show={isModalOpen}
          onClose={closeModal}
          onClick={workFlowCreate}
          formData={roleFormData}
          setFormData={setRoleFormData}
        />
        <WorkflowCreated show={isSuccessModal} onClose={closeSuccessModal} />
      </div>
        
        {/* Tag Input Field  */}
      {/* <div className="flex flex-wrap items-center border rounded p-2">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="flex items-center bg-gray-200 rounded m-1 p-1"
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
        <input
          type="text"
          onKeyUp={(e) => (e.key === "Enter" ? addTag(e) : null)}
          placeholder="Add member"
          className="flex-grow p-1 border-none focus:outline-none"
        />
      </div> */}
    </div>
  );
}
