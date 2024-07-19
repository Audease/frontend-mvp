import { MdLogout } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";

export default function UserDetailsDeactivation() {
  return (
    <div className="space-y-6 rounded border border-tgrey2 p-4 mb-8 font-inter w-3/4 shadow-sm">
      <div>
        <h3 className="font-semibold text-base pb-2">Deactivate Account</h3>
        <hr className="w-full" />
      </div>
      <div className="space-y-6">
        <div className="flex flex-row space-x-4">
          <div className="bg-tgrey7 w-10 h-10 rounded-full flex justify-center items-center">
            <MdLogout className="w-5 h-5 text-tgrey3" />
          </div>
          <div className="spcae-y-1">
            <h2 className="font-medium text-sm">Deactivate Account</h2>
            <p className="font-normal text-tgrey3 text-xs">
              You can active your account within 30days using your existing
              login credentials.
            </p>
          </div>
        </div>

        <div className="flex flex-row space-x-4">
          <div className="bg-tgrey7 w-10 h-10 rounded-full flex justify-center items-center">
            <RiDeleteBinLine className="w-5 h-5 text-tgrey3" />
          </div>
          <div className="spcae-y-1">
            <h2 className="font-medium text-sm">Delete Account Permantly</h2>
            <p className="font-normal text-tgrey3 text-xs">
              You can’t re-activate your account again, It will delete your
              account permanantly.
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        <label className="font-normal text-sm text-tgrey3">
          What is the reason ? (Optional)
        </label>
        <textarea
          className="border-tgrey2 rounded-md px-2 py-1 text-h2 text-tgrey1 font-normal w-full focus:border-tgrey2 focus:outline-none focus:ring focus:ring-gold1 text-wrap "
          placeholder="Write your reason..."
        />
      </div>
      <div>
        <h3 className="font-semibold text-sm pb-2">
          Account Deactive or Delete Terms
        </h3>
        <div className="flex flex-row space-x-2">
          <input
            type="checkbox"
            className="staff-checkbox h-4 w-4 text-tableText2 rounded-md focus:ring-tgrey2"
            // onChange={handleCheckboxChange}
          />
          <p className="font-normal text-xs text-tgrey3">
            I agree with your{" "}
            <span className="text-dashboardButtons">terms and conditions</span>{" "}
            to delete or deactivate my account
          </p>
        </div>
      </div>
      <div className="flex flex-row space-x-6">
        <button className="flex flex-row bg-black text-white text-sm font-semibold py-2 px-6 rounded-lg">
        Deactivate Account
        </button>
        <button className="flex flex-row bg-[#FBE4E1] text-[#F6361B] text-sm font-semibold py-2 px-6 rounded-lg">
        Delete Account
        </button>
      </div>
    </div>
  );
}
