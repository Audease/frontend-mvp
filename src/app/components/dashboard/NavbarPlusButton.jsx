import Image from "next/image";
import { MdKeyboardArrowRight } from "react-icons/md";

export default function NavbarPlusButton() {
  const createTask = [
    {
      id: 1,
      icon: "/roleGoldIcon.png",
      taskDone: "Create App/Role",
      taskDoneText: "Create new role now",
      link: "",
    },
    {
      icon: "/staffGoldIcon.png",
      taskDone: "Create Staff",
      taskDoneText: "Create a staff now",
      link: "",
    },
    {
      icon: "/learnerGoldIcon.png",
      taskDone: "Create Learner",
      taskDoneText: "Create a learner now",
      link: "",
    },
    {
      icon: "/workflowGoldIcon.png",
      taskDone: "Create Workflow",
      taskDoneText: "Create a process now",
      link: "",
    },
  ];

  return (
    <div className="absolute top-14 bg-white shadow-lg rounded-lg p-4 font-medium w-60 right-[6rem] space-y-4 font-inter">
      <div className="space-y-4">
        {createTask.map((taskToCreate) => (
          <div key="" className="flex flex-row space-x-4">
            <div className="bg-dashboardButtonsBg w-10 h-10 rounded-full flex justify-center items-center">
              {" "}
              {/* <{taskToCreate.icon} className="w-5 h-5" /> */}
              <Image 
                className="text-gold1"
                src={taskToCreate.icon}
                alt="Create"
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
    </div>
  );
}
