import { SlArrowLeft } from "react-icons/sl";
import { IoIosCheckmark } from "react-icons/io";

export default function AccessorApproval({ learner, onBack }) {
  return (
    <div className="space-y-4 min-h-[35rem]">
      {/* Back Button */}
      <div className="pt-1 ">
        <button
          className="flex flex-row space-x-2 text-tgrey3"
          type="button"
          onClick={onBack}
        >
          <div className="pt-2">
            <SlArrowLeft className="text-tgrey3 h-[0.6rem]" />
          </div>
          <p className="font-medium text-base">Back</p>
        </button>
      </div>

      <div className="border rounded-md w-full h-[28rem] p-6">
        {learner ? (
          <div className="flex flex-row justify-between">
            <div>
              <p className="text-xl font-medium">{learner.name}</p>
            </div>

            <div className="flex flex-row space-x-4">
              {/* Approve Button */}
              <button
                // onClick={onSaveChanges}
                className="flex flex-row bg-black text-white text-sm font-semibold py-0 px-3 rounded-lg"
              >
                <IoIosCheckmark className="w-10 h-10" />
                <p className="py-2">Approve</p>
              </button>
              {/* Reject Button */}
              <button
                // onClick={onSaveChanges}
                className="flex flex-row bg-white text-tred2 text-sm font-semibold py-0 px-3 rounded-lg border border-tred2"
              >
                <span className="p-2">x</span>
                <p className="py-2">Reject</p>
              </button>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
