import { Modal } from "flowbite-react";
import Image from "next/image";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { usePostLearners } from "./hooks/usePostLearners";

export default function AddLearnerModal({
  show,
  onClose,
  setLearnerSuccessModal,
}) {
  const { formData, handleChange, createLearner, error } = usePostLearners();

  const handleCreateClick = async () => {
    const success = await createLearner();
    if (success) {
      onClose();
      setLearnerSuccessModal(true);
    }
  };

  return (
    <div className="font-inter">
      <Modal {...{ show, onClose }} className="modal" size={"3xl"}>
        <div className="flex flex-col p-4">
          <div className="flex flex-row justify-between items-center">
            <h2 className="font-medium text-lg text-tblack3 ml-[18rem]">
              Create Learner
            </h2>
            <IoClose
              className="text-tgrey3 cursor-pointer"
              width={14}
              height={14}
              onClick={onClose}
            />
          </div>
          <hr className="my-4" />
          <form action="">
            <div className="grid grid-cols-2 gap-4">
              {/* Name  */}
              <div className="flex flex-col font-normal text-sm">
                <label htmlFor="" className="text-tgrey3 pb-2">
                  Name(First,Surname and Middle name)
                </label>
                <input
                  type="text"
                  value={formData.name}
                  name="name"
                  onChange={handleChange}
                  className="p-1 border border-tgrey2 rounded text-tableText2 text-sm font-normal focus:border-tgrey2 focus:outline-none focus:ring focus:ring-tgrey1 "
                  placeholder="Enter your name"
                  required
                />
              </div>
              {/* DOB  */}
              <div className="flex flex-col font-normal text-sm">
                <label htmlFor="" className="text-tgrey3 pb-2">
                  Date of Birth
                </label>
                <input
                  type="date"
                  onChange={handleChange}
                  value={formData.date_of_birth}
                  name="date_of_birth"
                  className="p-1 border border-tgrey2 rounded text-tableText2 text-sm font-normal focus:border-tgrey2 focus:outline-none focus:ring focus:ring-tgrey1 "
                  placeholder="Date of Birth"
                  required
                />
              </div>
              {/* Mobile Number */}
              <div className="flex flex-col font-normal text-sm">
                <label htmlFor="" className="text-tgrey3 pb-2">
                  Mobile number
                </label>
                <input
                  type="text"
                  value={formData.mobile_number}
                  name="mobile_number"
                  onChange={handleChange}
                  className="p-1 border border-tgrey2 rounded text-tableText2 text-sm font-normal focus:border-tgrey2 focus:outline-none focus:ring focus:ring-tgrey1 "
                  placeholder="Enter mobile number"
                  required
                />
              </div>
              {/* Email */}
              <div className="flex flex-col font-normal text-sm">
                <label htmlFor="" className="text-tgrey3 pb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  name="email"
                  onChange={handleChange}
                  className="p-1 border border-tgrey2 rounded text-tableText2 text-sm font-normal focus:border-tgrey2 focus:outline-none focus:ring focus:ring-tgrey1 "
                  placeholder="Enter Email"
                  required
                />
              </div>
              {/* NI Number  */}
              <div className="flex flex-col font-normal text-sm">
                <label htmlFor="" className="text-tgrey3 pb-2">
                  NI Number
                </label>
                <input
                  type="text"
                  value={formData.NI_number}
                  name="NI_number"
                  onChange={handleChange}
                  className="p-1 border border-tgrey2 rounded text-tableText2 text-sm font-normal focus:border-tgrey2 focus:outline-none focus:ring focus:ring-tgrey1 "
                  placeholder="Enter NI Number"
                  required
                />
              </div>
              {/* Passport Number  */}
              <div className="flex flex-col font-normal text-sm">
                <label htmlFor="" className="text-tgrey3 pb-2">
                  Passport Number
                </label>
                <input
                  type="text"
                  value={formData.passport_number}
                  name="passport_number"
                  onChange={handleChange}
                  className="p-1 border border-tgrey2 rounded text-tableText2 text-sm font-normal focus:border-tgrey2 focus:outline-none focus:ring focus:ring-tgrey1 "
                  placeholder="Enter Passport Number"
                  required
                />
              </div>
              {/* Home Address */}
              <div className="flex flex-col font-normal text-sm">
                <label htmlFor="" className="text-tgrey3 pb-2">
                  Home address
                </label>
                <input
                  type="text"
                  value={formData.home_address}
                  onChange={handleChange}
                  name="home_address"
                  className="p-1 border border-tgrey2 rounded text-tableText2 text-sm font-normal focus:border-tgrey2 focus:outline-none focus:ring focus:ring-tgrey1 "
                  placeholder="Enter Home address"
                  required
                />
              </div>
              {/* Funding, Level, Awarding  */}
              <div className="flex flex-row space-x-4   ">
                {/* Funding  */}
                <div className="flex flex-col font-normal text-sm">
                  <label htmlFor="" className="text-tgrey3 pb-2">
                    Funding
                  </label>
                  <input
                    type="text"
                    value={formData.funding}
                    name="funding"
                    onChange={handleChange}
                    className="p-1 border border-tgrey2 rounded text-tableText2 text-sm font-normal focus:border-tgrey2 focus:outline-none focus:ring focus:ring-tgrey1 w-20"
                    placeholder="Input"
                    required
                  />
                </div>
                {/* Level  */}
                <div className="flex flex-col font-normal text-sm">
                  <label htmlFor="" className="text-tgrey3 pb-2">
                    Level
                  </label>
                  <input
                    type="number"
                    value={formData.level}
                    name="level"
                    onChange={handleChange}
                    className="p-1 border border-tgrey2 rounded text-tableText2 text-sm font-normal focus:border-tgrey2 focus:outline-none focus:ring focus:ring-tgrey1 w-20"
                    placeholder="Input"
                    required
                  />
                </div>
                {/* Awarding  */}
                <div className="flex flex-col font-normal text-sm">
                  <label htmlFor="" className="text-tgrey3 pb-2">
                    Awarding
                  </label>
                  <input
                    type="text"
                    value={formData.awarding}
                    name="awarding"
                    onChange={handleChange}
                    className="p-1 border border-tgrey2 rounded text-tableText2 text-sm font-normal focus:border-tgrey2 focus:outline-none focus:ring focus:ring-tgrey1 w-36"
                    placeholder="Input"
                    required
                  />
                </div>
              </div>

              {/* Chose course  */}
              <div className="flex flex-col font-normal text-sm">
                <label htmlFor="" className="text-tgrey3 pb-2">
                  Chosen course
                </label>
                <select
                  name="chosen_course" // Added name attribute
                  value={formData.chosen_course}
                  onChange={handleChange}
                  className="p-1 border border-tgrey2 rounded text-tableText2 text-sm font-normal focus:border-tgrey2 focus:outline-none focus:ring focus:ring-tgrey1"
                >
                  <option value="Adult Care">Adult Care</option>
                  <option value="Youth Plus">Youth Plus</option>
                  <option value="Children Care">Children Care</option>
                </select>
              </div>
            </div>
            {error && (
            <p className="text-red-500 mt-2">
              {error.message || "An error occurred"}
            </p>
          )}
            <div className="flex items-center justify-center mt-4">
              <button
                type="button"
                className="bg-dashboardButtons hover:bg-tgrey1 text-white w-96 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleCreateClick}
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export function LearnerCreated({ show, onClose }) {
  return (
    <div>
      <Modal {...{ show, onClose }} className="modal p-10" size={"3xl"}>
        <div className="flex flex-col text-center items-center py-16 font-inter">
          <Image
            src={"/role_success.png"}
            width={79}
            height={79}
            alt="Success"
            className="pb-8"
          />
          <h3 className="text-2xl font-bold pb-4">Yippe!</h3>
          <p className="font-normal text-lg">You just created a learner</p>
        </div>

        <div className="flex items-center justify-center mb-6">
          <button
            type="button"
            className="bg-dashboardButtons hover:bg-tgrey1 text-white w-96 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={onClose}
          >
            Go to Dashboard
          </button>
        </div>
      </Modal>
    </div>
  );
}
