import Image from "next/image";
import { IoCloudUploadOutline } from "react-icons/io5";
import { IoIosCheckmark } from "react-icons/io";

export default function UserDetailsDefault({ formData, onInputChange, onSaveChanges }) {
  const { learnerName, learnerUserName, email, phoneNumber } = formData;

  return (
    <div>
      <div className="space-y-4 rounded border-2 border-e-0 p-4 mb-8">
        <div>
          <h3 className="font-semibold text-base pb-2">Personal Details</h3>
          <hr className="w-1/2" />
        </div>

        <div className="flex flex-row">
          <div>
            <Image
              src={"/Profile_Image_Default.png"}
              alt="userImage"
              width={70}
              height={70}
            />
          </div>
          <div>
            <h2 className="mx-4 my-4 px-4 font-medium text-sm text-dashboardButtons bg-dashboardButtonsBg py-1 rounded flex flex-row space-x-2">
              <IoCloudUploadOutline className="w-5 h-5" /> Upload Profile Image
            </h2>
          </div>
        </div>

        <div>
          <div className="flex flex-row space-x-6">
            <div className="flex flex-col space-y-2">
              <label htmlFor="learnerName" className="font-normal text-sm text-tgrey3">
                Name
              </label>
              <input
                type="text"
                name="learnerName"
                value={learnerName}
                onChange={onInputChange}
                className="rounded-lg py-1 border-[1px] border-gray-400 w-60 focus:ring focus:ring-dashboardButtons focus:border-none"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="learnerUserName" className="font-normal text-sm text-tgrey3">
                Username
              </label>
              <div>
                <input
                  type="text"
                  name="learnerUserName"
                  value={learnerUserName}
                  onChange={onInputChange}
                  className="rounded-lg py-1 border-[1px] border-gray-400 w-52 border-e-0 rounded-e-none focus:ring focus:ring-dashboardButtons focus:border-none"
                />
                <input
                  type="text"
                  placeholder=".learner"
                  className="rounded-lg py-1 border-[1px] border-gray-400 w-24 border-s-0 rounded-s-none bg-tgrey4 focus:ring focus:ring-dashboardButtons focus:border-none"
                  value={".learner"}
                  readOnly
                />
              </div>
            </div>
          </div>
          <div className="my-4">
            <h2 className="font-medium text-tgrey3 text-xs bg-tgrey4 p-2 rounded-lg w-[35.5rem]">
              Note: You can change username every 24 days. Check the username before proceeding.
            </h2>
          </div>
          <div>
            <button onClick={onSaveChanges} className="flex flex-row bg-black text-white text-sm font-semibold py-0 px-5 rounded-lg">
              <IoIosCheckmark className="w-10 h-10" />
              <p className="py-2">Save changes</p>
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4 rounded border-2 border-e-0 p-4">
        <div>
          <h3 className="font-semibold text-base pb-2">Email and Phone Details</h3>
          <hr className="w-1/2" />
        </div>

        <div>
          <label htmlFor="email" className="font-normal text-sm text-tgrey3">
            Email Address
          </label>
          <div className="flex flex-row space-x-2">
            <input
              type="email"
              name="email"
              value={email}
              onChange={onInputChange}
              className="rounded-md py-1 border-[1px] border-gray-400 w-60 focus:ring focus:ring-dashboardButtons focus:border-none"
            />
            <button className="flex flex-row bg-black text-white text-sm font-semibold py-2 px-6 rounded-lg">
              Update
            </button>
          </div>
          <div className="mt-2">
            <h2 className="font-medium text-tgrey3 text-xs bg-tgrey4 p-2 rounded-lg w-[22rem]">
              Note: You’ll get a confirmation email within 30 minutes.
            </h2>
          </div>
        </div>

        <div>
          <label htmlFor="phoneNumber" className="font-normal text-sm text-tgrey3">
            Phone Number
          </label>
          <div className="flex flex-row space-x-2">
            <input
              type="text"
              name="phoneNumber"
              value={phoneNumber}
              onChange={onInputChange}
              className="rounded-md py-1 border-[1px] border-gray-400 w-60 focus:ring focus:ring-dashboardButtons focus:border-none"
            />
            <button className="flex flex-row bg-black text-white text-sm font-semibold py-2 px-6 rounded-lg">
              Update
            </button>
          </div>
          <div className="mt-2">
            <h2 className="font-medium text-tgrey3 text-xs bg-tgrey4 p-2 rounded-lg w-[22rem]">
              Note: You’ll get a confirmation OTP within 30 minutes.
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
