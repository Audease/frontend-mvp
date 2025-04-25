import { FaPlus } from "react-icons/fa6";


export default function MessengerLeft() {
  return (
    <div className="space-y-6">
      <div className="flex flex-row justify-between">
        <div>
          <h3 className="font-medium text-lg">Messages</h3>
          <p className="text-normal tex-sm text-tgrey3">Direct team messages</p>
        </div>
        <div>
          <p
            // onClick={() => toggleVisibility(row.id)}
            // aria-expanded={editOptions[row.id] || false}
            aria-haspopup="true"
            className="cursor-default font-bold text-tgrey3"
          >
            ...
          </p>
        </div>
      </div>
      <div className="">
          <button
            // onClick={onSaveChanges}
            className="flex flex-row bg-dashboardButtonsBg text-dashboardButtons text-sm font-semibold py-2 px-5 rounded-lg w-full items-center justify-center"
          >
            <FaPlus className="w-4 h-4" />
            <p className="pl-2">Create conversation</p>
          </button>
        </div>
    </div>
  );
}
