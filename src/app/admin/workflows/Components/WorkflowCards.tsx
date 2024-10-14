"use client";

import { useEffect, useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import CardGrid from "./CardGrid";
import { fetchRoles } from "../../utils/fetchRoles";
import LoadingSpinner from "../../../components/dashboard/Spinner";

export default function WorkflowCards() {
  const [availableRoles, setAvailableRoles] = useState([]);
  const [cardData, setCardData] = useState([]); 
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const roleData = async () => {
      setLoading(true);
      const allRoles = await fetchRoles();
      if (allRoles) {
        setAvailableRoles(allRoles);
        // console.log(allRoles)
        
        
        const formattedData = allRoles.map((role, index) => ({
          id: role.id || index, 
          roleName: role.role || "Unknown Role", 
          rolePermission: role.permissions || "No permissions available", 
          profilePics: role.profilePics || "/avatar.png", 
        }));

        setCardData(formattedData); 
      }
      setLoading(false);
    };

    roleData();
  }, []);

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (over && active.id !== over.id) {
      setCardData((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
    // console.log({ cardData });
  };

  return (
    <div className="grid grid-cols-1 grid-rows-1">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto gap-8 col-start-1 col-end-2 row-start-1 row-end-2">
        {loading ? (
          <p><LoadingSpinner /></p>
        ) : (
          <DndContext onDragEnd={handleDragEnd}>
            <SortableContext items={cardData}>
              <CardGrid cardData={cardData} />
            </SortableContext>
          </DndContext>
        )}
      </div>
    </div>
  );
}
