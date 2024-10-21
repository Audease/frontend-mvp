import { LuPencil } from "react-icons/lu";
import PersonaBackButton from "../../components/PersonaBackButton";

export default function BKSDDashboardHeader({ roleName }) {
  return (
    <div className="flex flex-row space-x-3">
      {/* Back Button */}
      <PersonaBackButton />
      {/* Dashboard Title  */}
      <div>
        <h3 className="font-medium text-2xl pl-3">{roleName} Dashboard</h3>
      </div>

      {/* Pencil  */}
      <div className="py-1 hidden xl:flex">
        <LuPencil className="text-dashboardButtons w-10 h-5 " />
      </div>
    </div>
  );
}
