import { Sparkles } from "lucide-react";
import { Type2Button } from "../../../../components/dashboard/Button";
import RoleCard from "../../../../components/dashboard/RoleCard";
import CreateRole from "./components/CreateRole/CreateRole";
import CreateWorkflow from "./components/CreateWorkflow/CreateWorkflow";

export default function Rightside({
  onStaffClick,
  onLearnerClick,
  onResourcesClick,
  onFormClick,
}) {
  return (
    <div>
      <div className="font-inter">
        <div>
          <h3 className="font-medium text-base text-[#000000]">Get started</h3>
          <p className="font-normal text-tgrey3 text-sm">
            You can find all settings here.
          </p>
        </div>
        {/* Buttons  */}
        <div>
          <div className="flex flex-row space-x-4 my-2">
            <CreateRole />
            <CreateWorkflow />
          </div>
          <div className="flex flex-row space-x-4 my-2">
            <Type2Button
              leftIcon={"/staffIcon.png"}
              buttonText={"Staff"}
              onClick={onStaffClick}
            />
            <Type2Button
              leftIcon={"/learnerIcon.png"}
              buttonText={"Learner"}
              onClick={onLearnerClick}
            />
          </div>
          <div className="flex flex-row space-x-4 my-2">
            <Type2Button
              leftIcon={"/resourcesIcon.png"}
              buttonText={"Resources"}
              onClick={onResourcesClick}
            />
            <Type2Button
              leftIcon={"/formIcon.png"}
              buttonText={"Form"}
              onClick={onFormClick}
              disabled={true}
            />
          </div>
        </div>
        {/* Cards Section */}
        <div className="mt-20">
          {/* Header */}
          <div className="font-inter ">
            {/* <h3 className="font-medium text-base">What&apos;s coming!</h3>
            <p className="font-normal text-tgrey3 text-sm">
              New features on the horizon
            </p> */}
            <div className="p-2 bg-indigo-500/10 rounded-full flex flex-row space-x-3 px-4">
              <Sparkles className="h-6 w-6 text-tgrey1" />
              <h3 className="font-medium text-base">What&apos;s coming!</h3>
            </div>
            <div>
              {/* <h3 className="text-lg font-semibold text-white">New Features</h3> */}
              <p className="text-sm text-gray-400 p-2">New features coming to your workspace</p>
            </div>
          </div>
          {/* cards */}
          <div className="my-2 space-y-4">
            <RoleCard title={"Workflows"} description={"Monitor and track activities across different personas with advanced workflow management."}/>
            <RoleCard title={"In-Platform Messaging"} description={"Real-time chat sessions between team members for instant collaboration."}/>
          </div>
        </div>
      </div>
    </div>
  );
}
