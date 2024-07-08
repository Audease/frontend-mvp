"use client";

import { Avatar } from "flowbite-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function WorkflowCard({ card }) {
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
      className="p-4 m-4 border rounded-lg w-[14rem] h-[13rem] box-shadow"
    >
      <div className="flex flex-row justify-between pb-3">
        <h3 className="text-black font-bold text-base pt-2">{roleName}</h3>
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
