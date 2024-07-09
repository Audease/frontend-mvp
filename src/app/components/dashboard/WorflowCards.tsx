"use client";

import { useState } from "react";
import WorkflowCard from "./WorkflowCard";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { LuPencil } from "react-icons/lu";


export default function WorkflowCards() {
  // Data should come from the api
  const dummyData = [
    {
      id: 1,
      roleName: "Recruiter",
      rolePermission: "Lorem ipsum dolor sit amet consectetur adipisicing elit.", 
      profilePics: "/avatar.png",
    },
    {
      id: 2,
      roleName: "Induction",
      rolePermission:  "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      profilePics: "/avatar.png",
    },
    {
      id: 3,
      roleName: "BKSD",
      rolePermission:  "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      profilePics: "/avatar.png",
    },
    {
      id: 4,
      roleName: "Accessor",
      rolePermission: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      profilePics: "/avatar.png",
    },
    {
      id: 5,
      roleName: "Lazer",
      rolePermission: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      profilePics: "/avatar.png",
    },
  ];
  const [cardData, setCardData] = useState(dummyData);

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (over && active.id !== over.id) {
      setCardData((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
    console.log({ cardData });
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
    <div className="col-span-3 grid grid-cols-3 gap-x-2">
      <div className="w-[14rem] ml-4 flex flex-row font-bold space-x-2">
        <div><h3 className="text-2xl font-medium text-[#0D062D]">First Flow</h3></div>
        <div><LuPencil className="text-dashboardButtons w-12 h-7 "/></div>
        <div><p className="text-[#5A5B80] text-2xl">...</p></div>
      </div>
      <div className="w-[14rem] ml-4 flex flex-row font-bold space-x-2">
        <div><h3 className="text-2xl font-medium text-[#0D062D]">Second Flow</h3></div>
        <div><LuPencil className="text-dashboardButtons w-12 h-7 "/></div>
        <div><p className="text-[#5A5B80] text-2xl">...</p></div>
      </div>
      <div className="w-[14rem] ml-4 flex flex-row font-bold space-x-2">
        <div><h3 className="text-2xl font-medium text-[#0D062D]">Third Flow</h3></div>
        <div><LuPencil className="text-dashboardButtons w-12 h-7 "/></div>
        <div><p className="text-[#5A5B80] text-2xl">...</p></div>
      </div>
    </div>
    <DndContext onDragEnd={handleDragEnd}>
      <SortableContext items={cardData}>
        {cardData.map((card) => (
          <WorkflowCard key={card.id} card={card} />
        ))}
      </SortableContext>
    </DndContext>
  </div>
    </div>
  );
}
