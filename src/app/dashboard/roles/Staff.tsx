import { SlArrowLeft } from "react-icons/sl";
import { FaPlus } from "react-icons/fa";
import Image from "next/image";

export default function Staff({ onClick }) {
  return (
    <div className="flex flex-col space-y-4 w-[60rem] font-inter">
      {/* Back Button  */}
      <div>
        <button
          className="flex flex-row space-x-2 text-tgrey3"
          type="button"
          onClick={onClick}
        >
          <div className="pt-2">
            <SlArrowLeft className="text-tgrey3 h-[0.6rem]" />
          </div>
          <p className="font-medium text-base"> Back </p>
        </button>
      </div>
      {/* The bordered  */}
      <div>
        <div className="border-2 rounded-lg p-4 space-y-4">
          <div className="flex flex-col space-y-1">
            <h3 className="text-base font-medium">Add Staffs</h3>
            <p className="font-normal text-sm text-tgrey3">
              You can add multiple staffs at once using their work mail
            </p>
          </div>
          <hr />
          {/* Email INput Field  */}
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="font-normal text-sm text-tgrey3 pb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              className="border-2 rounded-lg border-tgrey2 px-3 py-1 text-h2 text-black font-normal focus:border-gold1 focus:outline-none focus:ring-gold1"
            />
          </div>

          {/* The buttons  */}
          <div className="flex flex-row justify-between">
            <button className="flex flex-row rounded-md py-2 px-3 bg-dashboardButtonsBg text-dashboardButtons font-medium text-sm">
              <span>
                <FaPlus className="text-dashboardButtons my-1 mr-2" />
              </span>{" "}
              Add
            </button>

            <button className="flex flex-row rounded-md py-2 px-3 bg-dashboardRolesBtn text-white font-medium text-sm">
              <span>
                <FaPlus className="text-white my-1 mr-2" />
              </span>{" "}
              Import
            </button>
          </div>

          <div className="flex flex-col justify-center items-center">
            <div>
              <Image
                src={"/email_illustration.png"}
                width={200}
                height={2000}
                alt="illustration"
              />
            </div>
            {/* To Invite email / empty */}
            <div className="pt-6 flex flex-col justify-center items-center font-inter">
              <h3 className="font-medium text-base text-[#050708]">No user added</h3>
              <p className="font-normal text-sm text-tgrey3">
                Add a user by clicking on the <span className="text-dashboardButtons">+ Add</span> button
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
