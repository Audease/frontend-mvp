import { LuPencil } from "react-icons/lu";
import PersonaBackButton from "../../components/PersonaBackButton";
import { useState } from "react";


export default function AccessorDashboardHeader() {
  const [AccessorName, setAccessorName] = useState("Accessor");
  return (
    <div className="flex flex-row space-x-3">
          {/* Back Button */}
          <PersonaBackButton />
          {/* Dashboard Title  */}
          <div>
            <h3 className="font-medium text-2xl pl-3">
              {AccessorName} Dashboard
            </h3>
          </div>
          <div>
            {/* Pencil  */}
            <div className="py-1">
              <LuPencil className="text-dashboardButtons w-10 h-5 " />
            </div>
          </div>
        </div>
  );
}
