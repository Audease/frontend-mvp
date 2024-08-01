import { Modal } from "flowbite-react";
import { IoClose } from "react-icons/io5";
import { Avatar } from "flowbite-react";
import { useState } from "react";

export default function AccessorStaffModal({ show, onClose }) {
  const initialStaffList = [
    {
      id: 1,
      staffName: "Johnson Williamson",
      staffEmail: "johnson.dencollege.recruite",
      imgUrl: "/avatar.png",
    },
    {
      id: 2,
      staffName: "Emily Smith",
      staffEmail: "emily.dencollege.recruite",
      imgUrl: "/avatar.png",
    },
    {
      id: 3,
      staffName: "Emily Smith",
      staffEmail: "emily.dencollege.recruite",
      imgUrl: "/avatar.png",
    },
    {
      id: 4,
      staffName: "Emily Smith",
      staffEmail: "emily.dencollege.recruite",
      imgUrl: "/avatar.png",
    },
    {
      id: 5,
      staffName: "Emily Smith",
      staffEmail: "emily.dencollege.recruite",
      imgUrl: "/avatar.png",
    },
    {
      id: 6,
      staffName: "Emily Smith",
      staffEmail: "emily.dencollege.recruite",
      imgUrl: "/avatar.png",
    },
    {
      id: 7,
      staffName: "Emily Smith",
      staffEmail: "emily.dencollege.recruite",
      imgUrl: "/avatar.png",
    },
    {
      id: 8,
      staffName: "Emily Smith",
      staffEmail: "emily.dencollege.recruite",
      imgUrl: "/avatar.png",
    },
    {
      id: 9,
      staffName: "Emily Smith",
      staffEmail: "emily.dencollege.recruite",
      imgUrl: "/avatar.png",
    },
    {
      id: 10,
      staffName: "Emily Smith",
      staffEmail: "emily.dencollege.recruite",
      imgUrl: "/avatar.png",
    },
  ];

  const [staffList, setStaffList] = useState(initialStaffList);

  const handleRemove = (id) => {
    setStaffList(staffList.filter(staff => staff.id !== id));
  };

  return (
    <div>
      <Modal show={show} onClose={onClose} className="modal p-2" size={"xl"}>
        <div className="flex flex-row justify-between items-center p-4">
          <div className="flex flex-col">
            <h2 className="font-medium text-lg text-tblack3">Staff</h2>
            <p className="font-normal text-sm text-tgrey3">
              Staff under the accessor role
            </p>
          </div>
          <IoClose
            className="text-tgrey3 cursor-pointer"
            width={14}
            height={14}
            onClick={onClose}
          />
        </div>

        {/* Search Bar */}
        <div className="flex flex-col space-y-2 px-4">
          <label htmlFor="" className="font-normal text-sm text-tgrey3">
            Search
          </label>
          <input
            type="text"
            placeholder="Enter staff name"
            className="border-1 border-tgrey2 rounded py-1 focus:ring-gold1 focus:border-none focus:ring"
          />
        </div>

        {/* Line Break */}
        <hr className="my-2 mx-4" />

        {/* Search Results */}
        <div className="flex flex-col px-4 space-y-4 h-80 overflow-y-auto">
          {staffList.map((staff) => (
            <div key={staff.id} className="flex flex-row justify-between space-x-2 items-center">
              <div className="flex flex-row space-x-2">
                <div>
                  <Avatar
                    img={staff.imgUrl}
                    alt={`Image of ${staff.staffName}`}
                    rounded
                  />
                </div>
                <div className="flex flex-col">
                  <h4 className="font-medium text-sm">{staff.staffName}</h4>
                  <p className="font-normal text-xs text-tgrey3">
                    {staff.staffEmail}
                  </p>
                </div>
              </div>
              {/* Remove Button */}
              <div>
                <button
                  onClick={() => handleRemove(staff.id)}
                  className="py-1 px-2 text-dashboardButtons bg-dashboardButtonsBg rounded-md text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
}
