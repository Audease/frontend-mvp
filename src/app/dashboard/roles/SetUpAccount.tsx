import { SlArrowLeft } from "react-icons/sl";
import { Progress } from "flowbite-react";
import { useState, useEffect } from "react";
import "../../../assets/style.css"
import Image from "next/image";
import clsx from 'clsx';

export default function SetUpAccount( { onClick } ) {
  const [progress, setProgress] = useState(20);
  const [staffStatus, setStaffStatus] = useState("Completed");
  const [roleStatus, setRoleStatus] = useState("Pending");
  const [workflowStatus, setWorkflowStatus] = useState("Pending");
  const [learnerStatus, setLearnerStatus] = useState("Pending");
  const gradientStop = `${progress}%`;

   const progressBarStyle = {
     width: gradientStop,
     background: `linear-gradient(to right, #FDF5E9, #F9A22B)`
   };

  return (
    <div className="flex flex-col space-y-4 w-[60rem] font-inter">
      {/* Back Button  */}
      <div>
        <button className="flex flex-row space-x-2 text-tgrey3" type="button" onClick={onClick}>
          <div className="pt-2">
            <SlArrowLeft className="text-tgrey3 h-[0.6rem]" />
          </div>
          <p className="font-medium text-base"> Back </p>
        </button>
      </div>
      {/* Main Content  */}
      <div className="border-2 rounded-lg p-4 space-y-4">
        <div className="flex flex-col space-y-2">
            <h3 className="text-base font-medium">Finish up your account</h3>
            <p className="font-normal text-sm text-tgrey3">Complete this steps to setup your account fully</p>
            <div className="w-full bg-gray-200 rounded-full">
              <div className="custom-progress-bar" style={progressBarStyle}></div>
            </div>
        </div>
        <hr />
        {/* Section  */}
        <div className="space-y-4">
          {/* Add Staff  */}
        <div className="flex flex-row justify-between">
          {/* sign and text */}
          <div className="flex flex-row">
            <div className="py-1">
             <Image src={"/addStaff.png"} alt="" width={30} height={10} className="text-red-500"/>
            </div>
            <div className="pl-4">
              <h3 className="font-medium text-sm text-black">Add Staff</h3>
              <p className="font-normal text-xs text-tgrey1">Create at least one <span className="text-dashboardButtons">Staff</span></p>
            </div>
          </div>
          {/* Status */}
          <div>
            <p className={clsx('rounded-full font-medium text-xs px-2 py-1',
              {
                'bg-bgrey1 text-white': staffStatus === 'Pending',
                'bg-completedBg text-black': staffStatus === 'Completed',
              },
              )}>{staffStatus}</p>
          </div>
        </div>

        {/* Create a role  */}
        <div className="flex flex-row justify-between">
          {/* sign and text */}
          <div className="flex flex-row">
            <div className="py-1">
             <Image src={"/addRole.png"} alt="" width={32} height={10} className="text-red-500"/>
            </div>
            <div className="pl-4">
              <h3 className="font-medium text-sm text-black">Create a Role</h3>
              <p className="font-normal text-xs text-tgrey1">Create at least one <span className="text-dashboardButtons">Role</span></p>
            </div>
          </div>
          {/* Status */}
          <div>
            <p className={clsx('rounded-full font-medium text-xs px-2 py-1',
              {
                'bg-bgrey1 text-white': roleStatus === 'Pending',
                'bg-completedBg text-black': roleStatus === 'Completed',
              },
              )}>{roleStatus}</p>
          </div>
        </div>

        {/* Create a workflow  */}
        <div className="flex flex-row justify-between">
          {/* sign and text */}
          <div className="flex flex-row">
            <div className="py-1">
             <Image src={"/addWorflow.png"} alt="" width={32} height={10} className="text-red-500"/>
            </div>
            <div className="pl-4">
              <h3 className="font-medium text-sm text-black">Create a Workflow</h3>
              <p className="font-normal text-xs text-tgrey1">Create at <span className="text-dashboardButtons">Workflow </span> on the administrative process</p>
            </div>
          </div>
          {/* Status */}
          <div>
            <p className={clsx('rounded-full font-medium text-xs px-2 py-1',
              {
                'bg-bgrey1 text-white': workflowStatus === 'Pending',
                'bg-completedBg text-black': workflowStatus === 'Completed',
              },
              )}>{workflowStatus}</p>
          </div>
        </div>

        {/* Add a learner  */}
        <div className="flex flex-row justify-between">
          {/* sign and text */}
          <div className="flex flex-row">
            <div className="py-1">
             <Image src={"/addLearner.png"} alt="" width={32} height={10} className="text-red-500"/>
            </div>
            <div className="pl-4">
              <h3 className="font-medium text-sm text-black">Add a Learner</h3>
              <p className="font-normal text-xs text-tgrey1">Add at least one <span className="text-dashboardButtons">Learner </span></p>
            </div>
          </div>
          {/* Status */}
          <div>
            <p className={clsx('rounded-full font-medium text-xs px-2 py-1',
              {
                'bg-bgrey1 text-white': learnerStatus === 'Pending',
                'bg-completedBg text-black': learnerStatus === 'Completed',
              },
              )}>{learnerStatus}</p>
          </div>
        </div>

        {/* Create a Form  */}
        <div className="flex flex-row justify-between">
          {/* sign and text */}
          <div className="flex flex-row">
            <div className="py-1">
             <Image src={"/addForm.png"} alt="" width={32} height={10} className="text-red-500"/>
            </div>
            <div className="pl-4">
              <h3 className="font-medium text-sm text-black">Create a Form</h3>
              <p className="font-normal text-xs text-tgrey1">Create an application <span className="text-dashboardButtons">Form </span> for your learners</p>
            </div>
          </div>
          {/* Status */}
          <div>
            <p className={clsx('rounded-full font-medium text-xs px-2 py-1',
              {
                'bg-bgrey1 text-white': learnerStatus === 'Pending',
                'bg-completedBg text-black': learnerStatus === 'Completed',
              },
              )}>{learnerStatus}</p>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
