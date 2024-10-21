import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { LuSettings2 } from "react-icons/lu";

export default function CreateButton({ label, onClick }) {
  return (
    <div className=" inline-block">
      <button className="bg-dashboardButtonsBg rounded-md px-3" onClick={onClick}>
        <div className="flex flex-row text-sm font-medium p-2 text-dashboardButtons " >
          {label} <MdOutlineKeyboardArrowDown className="w-8 h-5" />
        </div>
      </button>
    </div>
  );
}
