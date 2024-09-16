'use client'

import Image from "next/image";
import { useCreateRole } from "../../dashboard/roles/hooks/useRoleCreate";
import CreateRole, {RoleCreated} from "../../dashboard/roles/components/Rightside/components/CreateRole/CreateRoleModal";


export default function NavbarPlusButton() {

  const {
    isModalOpen,
    isRoleSuccessModal,
    roleFormData,
    setRoleFormData,
    openModal,
    closeModal,
    closeRoleSuccessModal,
    roleCreate,
  } = useCreateRole();


  const handleCreateAppRole = () => {
    console.log("Create App/Role clicked");
    openModal();

  };

  const handleCreateStaff = () => {
    console.log("Create Staff clicked");

  };

  const handleCreateLearner = () => {
    console.log("Create Learner clicked");

  };

  const handleCreateWorkflow = () => {
    console.log("Create Workflow clicked");

  };

  const createTask = [
    {
      id: 1,
      icon: "/roleGoldIcon.png",
      taskDone: "Create App/Role",
      taskDoneText: "Create new role now",
      handler: handleCreateAppRole,
    },
    {
      icon: "/staffGoldIcon.png",
      taskDone: "Create Staff",
      taskDoneText: "Create a staff now",
      handler: handleCreateStaff,
    },
    {
      icon: "/learnerGoldIcon.png",
      taskDone: "Create Learner",
      taskDoneText: "Create a learner now",
      handler: handleCreateLearner,
    },
    {
      icon: "/workflowGoldIcon.png",
      taskDone: "Create Workflow",
      taskDoneText: "Create a process now",
      handler: handleCreateWorkflow,
    },
  ];

  return (
    <div className="absolute top-14 bg-white shadow-lg rounded-lg p-4 font-medium w-60 right-[6rem] space-y-4 font-inter">
      <div className="space-y-4">
        {createTask.map((taskToCreate) => (
          <div
            key={taskToCreate.taskDone}
            className="flex flex-row space-x-4 cursor-pointer hover:text-gold1"
            onClick={taskToCreate.handler}
          >
            <div className="bg-dashboardButtonsBg w-10 h-10 rounded-full flex justify-center items-center">
              <Image
                className="text-gold1"
                src={taskToCreate.icon}
                alt={taskToCreate.taskDone}
                width={16}
                height={16}
              />
            </div>
            <div className="flex flex-col">
              <h3 className="font-semibold text-sm">{taskToCreate.taskDone}</h3>
              <h2 className="font-normal text-sm text-tgrey3">
                {taskToCreate.taskDoneText}{" "}
              </h2>
            </div>
          </div>
        ))}
      </div>

       {/* Role Modal */}
       <CreateRole
        show={isModalOpen}
        onClose={closeModal}
        onClick={roleCreate}
        formData={roleFormData}
        setFormData={setRoleFormData}
      />

      {/* Role Success Modal */}
      <RoleCreated
        show={isRoleSuccessModal}
        onClose={closeRoleSuccessModal}
      />
    </div>
  );
}
