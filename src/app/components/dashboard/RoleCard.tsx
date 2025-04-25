// import { Avatar } from "flowbite-react";
// import Image from "next/image";
// import Button from "./Button";
// import { SlArrowRight, SlArrowDown } from "react-icons/sl";
// import { GitBranch } from "lucide-react";

export default function RoleCard({ title, description }) {
  // const onClick = () => {
  //     console.log("Button clicked")
  // }

  return (
    <div className="border-2 w-80 rounded-2xl p-4 space-y-2 ">
       <div className="bg-indigo-500/10 backdrop-blur rounded-lg p-4 ">
          <div className="flex items-center gap-1 mb-2">
            <h4 className="font-medium text-tgrey1">{title}</h4>
            <span className="px-2 py-0.5 text-xs bg-tgrey1/20 text-tgrey1 rounded-full">Coming soon</span>
          </div>
          <p className="text-gray-400 text-sm">{description}</p>
        </div>
      {/* <div className="flex flex-row justify-between">
        <div className="">
        <Avatar.Group>
          <Avatar img="/avatar.png" rounded />
          <Avatar img="/avatar.png" rounded   />
          <Avatar img="/avatar.png" rounded   />
          <Avatar.Counter total={5} href="#" />
        </Avatar.Group>
        </div>
        <div className="">
        <p className=" pb-2 text-tgrey3 text-xs">x</p>
        </div>
      </div> */}

      {/* <div className=" font-inter">
        <h3 className="font-medium text-h3 text-[#000000] py-2"> Workflows </h3>
        <p className="font-normal text-tgrey3 text-sm pb-2">
          Build automations and schedule jobs to get things done with workflows
        </p>
      </div> */}
      {/* <Button
        buttonText={"Get started"}
        className={""}
        arrowDirection={<SlArrowRight />}
        onClick={onClick}
      /> */}
    </div>
  );
}
