import { Modal } from "flowbite-react";
import Image from "next/image";
import { IoClose } from "react-icons/io5";


export default function AddLearnerModal({ show, onClose, onCreateClick }) {

  return (
    <div className="font-inter">
      <Modal show={show} onClose={onClose} className="modal" size={"3xl"}>
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
                  className="p-1 border border-tgrey2 rounded text-tableText2 text-sm font-normal focus:border-tgrey2 focus:outline-none focus:ring focus:ring-tgrey1 "
                  placeholder="Enter your name"
                />
              </div>
              {/* DOB  */}
              <div className="flex flex-col font-normal text-sm">
                <label htmlFor="" className="text-tgrey3 pb-2">
                  Date of Birth
                </label>
                <input
                  type="text"
                  className="p-1 border border-tgrey2 rounded text-tableText2 text-sm font-normal focus:border-tgrey2 focus:outline-none focus:ring focus:ring-tgrey1 "
                  placeholder="Date of Birth"
                />
              </div>
              {/* Mobile Number */}
              <div className="flex flex-col font-normal text-sm">
                <label htmlFor="" className="text-tgrey3 pb-2">
                  Mobile number
                </label>
                <input
                  type="text"
                  className="p-1 border border-tgrey2 rounded text-tableText2 text-sm font-normal focus:border-tgrey2 focus:outline-none focus:ring focus:ring-tgrey1 "
                  placeholder="Enter mobile number"
                />
              </div>
              {/* Email */}
              <div className="flex flex-col font-normal text-sm">
                <label htmlFor="" className="text-tgrey3 pb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="p-1 border border-tgrey2 rounded text-tableText2 text-sm font-normal focus:border-tgrey2 focus:outline-none focus:ring focus:ring-tgrey1 "
                  placeholder="Enter Email"
                />
              </div>
              {/* NI Number  */}
              <div className="flex flex-col font-normal text-sm">
                <label htmlFor="" className="text-tgrey3 pb-2">
                  NI Number
                </label>
                <input
                  type="text"
                  className="p-1 border border-tgrey2 rounded text-tableText2 text-sm font-normal focus:border-tgrey2 focus:outline-none focus:ring focus:ring-tgrey1 "
                  placeholder="Enter NI Number"
                />
              </div>
              {/* Passport Number  */}
              <div className="flex flex-col font-normal text-sm">
                <label htmlFor="" className="text-tgrey3 pb-2">
                  Passport Number
                </label>
                <input
                  type="text"
                  className="p-1 border border-tgrey2 rounded text-tableText2 text-sm font-normal focus:border-tgrey2 focus:outline-none focus:ring focus:ring-tgrey1 "
                  placeholder="Enter Passport Number"
                />
              </div>
              {/* Home Address */}
              <div className="flex flex-col font-normal text-sm">
                <label htmlFor="" className="text-tgrey3 pb-2">
                  Home address
                </label>
                <input
                  type="text"
                  className="p-1 border border-tgrey2 rounded text-tableText2 text-sm font-normal focus:border-tgrey2 focus:outline-none focus:ring focus:ring-tgrey1 "
                  placeholder="Enter Home address"
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
                    className="p-1 border border-tgrey2 rounded text-tableText2 text-sm font-normal focus:border-tgrey2 focus:outline-none focus:ring focus:ring-tgrey1 w-20"
                    placeholder="Input"
                  />
                </div>
                {/* Level  */}
                <div className="flex flex-col font-normal text-sm">
                  <label htmlFor="" className="text-tgrey3 pb-2">
                    Level
                  </label>
                  <input
                    type="text"
                    className="p-1 border border-tgrey2 rounded text-tableText2 text-sm font-normal focus:border-tgrey2 focus:outline-none focus:ring focus:ring-tgrey1 w-20"
                    placeholder="Input"
                  />
                </div>
                {/* Awarding  */}
                <div className="flex flex-col font-normal text-sm">
                  <label htmlFor="" className="text-tgrey3 pb-2">
                    Awarding
                  </label>
                  <input
                    type="text"
                    className="p-1 border border-tgrey2 rounded text-tableText2 text-sm font-normal focus:border-tgrey2 focus:outline-none focus:ring focus:ring-tgrey1 w-36"
                    placeholder="Input"
                  />
                </div>
              </div>

              {/* Chose course  */}
              <div className="flex flex-col font-normal text-sm">
                <label htmlFor="" className="text-tgrey3 pb-2">
                  Chosen course
                </label>
                <select className="p-1 border border-tgrey2 rounded text-tableText2 text-sm font-normal focus:border-tgrey2 focus:outline-none focus:ring focus:ring-tgrey1">
                  <option
                    className="text-tableText2 text-sm font-normal"
                    value="option1"
                  >
                    Adult Care
                  </option>
                  <option
                    className="text-tableText2 text-sm font-normal"
                    value="option2"
                  >
                    Youth Plus
                  </option>
                  <option
                    className="text-tableText2 text-sm font-normal"
                    value="option3"
                  >
                    Children Care
                  </option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-center mt-4">
              <button
                type="button"
                className="bg-dashboardButtons hover:bg-tgrey1 text-white w-96 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={onCreateClick}
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



export function LearnerCreated({ show, onClose,  }) {
    return (
      <div>
        <Modal show={show} onClose={onClose} className="modal p-10" size={"3xl"}>
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
