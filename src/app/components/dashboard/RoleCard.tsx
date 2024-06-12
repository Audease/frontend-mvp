import { Avatar } from "flowbite-react";
import Image from "next/image";
import Button from "./Button";
import { SlArrowRight, SlArrowDown } from "react-icons/sl";

export default function RoleCard() {
  return (
    <div className="border-2 w-80 rounded-2xl p-4 space-y-2">
      <div className="flex flex-row justify-between">
        <div className="">
        <Avatar.Group>
          <Avatar img="/avatar.png" rounded stacked size="xs" />
          <Avatar img="/avatar.png" rounded stacked size="xs" />
          <Avatar img="/avatar.png" rounded stacked size="xs" />
          <Avatar.Counter total={5} href="#" />
        </Avatar.Group>
        </div>
        <div className="">
        <p className=" pb-2 text-tgrey3 text-xs">x</p>
        </div>
      </div>

      <div className=" font-inter">
        <h3 className="font-medium text-base"> Workflows </h3>
        <p className="font-normal text-tgrey3 text-sm">
          {" "}
          Build automations and schedule jobs to get things done with workflows
        </p>
      </div>
      <Button
        buttonText={"Get started"}
        className={""}
        arrowDirection={<SlArrowRight />}
      />
    </div>
  );
}
