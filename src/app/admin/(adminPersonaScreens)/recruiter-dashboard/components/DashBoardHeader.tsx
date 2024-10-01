import { LuPencil } from "react-icons/lu";
import PersonaBackButton from "../../components/PersonaBackButton";


export default function DashboardHeader({ roleName }) {
  return (
    <div className="flex flex-row space-x-3">
      <PersonaBackButton />
      <div>
        <h3 className="font-medium text-2xl pl-3">{roleName} Dashboard</h3>
      </div>
      <div className="py-1">
        <LuPencil className="text-dashboardButtons w-10 h-5 " />
      </div>
    </div>
  );
}
