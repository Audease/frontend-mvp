"use client";

import { Avatar } from "flowbite-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function WorkflowCard({ card, index }) {
  const { id, roleName, rolePermission, profilePics } = card;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      key={id}
      style={style}
      className="p-4 border rounded-lg w-full h-[13rem] box-shadow"
    >
      <div className="flex flex-row justify-between pb-3">
        <h3 className="flex items-center text-black font-bold text-base pt-2">
          <span className="flex justify-center items-center rounded-full w-7 h-7 bg-gold1 text-white mr-3" >{index}</span>
          {roleName}
        </h3>
        <p className="text-[#5A5B80] text-2xl">...</p>
      </div>
      <div className="">
        <p className="text-tgrey3 text-[15px] font-medium py-4">
          {rolePermission}
        </p>
      </div>
      <div>
        <Avatar.Group>
          <Avatar img={profilePics} rounded stacked />
          <Avatar img={profilePics} rounded stacked />
          <Avatar img={profilePics} rounded stacked />
          <Avatar img={profilePics} rounded stacked />
          <Avatar img={profilePics} rounded stacked />
        </Avatar.Group>
      </div>
      <p></p>
    </div>
  );
}
