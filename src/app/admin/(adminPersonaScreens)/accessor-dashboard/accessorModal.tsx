import { Modal } from "flowbite-react";
import { IoClose } from "react-icons/io5";
import { Avatar } from "flowbite-react";
import { useEffect, useState } from "react";
import { GetPersonaStaff } from "../../action";


export default function AccessorStaffModal({ show, onClose }) {
  const [staffList, setStaffList] = useState([]);

  const getStaffList = async () => {
    let success = await GetPersonaStaff({
      personaPermission: "Approve/reject application",
    });
    setStaffList(success);
  };
  useEffect(() => {
    getStaffList();
  }, []);

  const handleRemove = (id) => {
    setStaffList(staffList.filter((staff) => staff.id !== id));
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
            <div
              key={staff.id}
              className="flex flex-row justify-between space-x-2 items-center"
            >
              <div className="flex flex-row space-x-2">
                <div>
                  <Avatar
                    img={staff.imgUrl}
                    alt={`Image of ${staff.staffName}`}
                    rounded
                  />
                </div>
                <div className="flex flex-col">
                  <h4 className="font-medium text-sm">{staff.email}</h4>
                  <p className="font-normal text-xs text-tgrey3">
                    {staff.username}
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
