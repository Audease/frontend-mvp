"use client";

import { useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { LuPencil } from "react-icons/lu";
import CardGrid from "./CardGrid";

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
      rolePermission: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      profilePics: "/avatar.png",
    },
    {
      id: 3,
      roleName: "BKSD",
      rolePermission: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
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
    <div className="grid grid-cols-1 grid-rows-1">
      <div className="grid grid-cols-3 gap-8 col-start-1 col-end-2 row-start-1 row-end-2">
        <DndContext onDragEnd={handleDragEnd}>
          <SortableContext items={cardData}>
            <CardGrid cardData={cardData} />
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}
