import { Modal } from "flowbite-react";
import { IoClose } from "react-icons/io5";
import { PlainButton } from "../../components/dashboard/Button";
import { useState } from "react";
import Image from "next/image";

export default function CreateRole({
  show,
  onClose,
  onClick,
  formData,
  setFormData,
}) {
  const [inputedPermission, setInputedPermission] = useState("");

  const addPermissions = (permission) => (e) => {
    e.preventDefault();
    setInputedPermission(permission);
    setFormData((prevData) => ({
      ...prevData,
      permission,
    }));
  };

  const clearPermission = () => {
    setInputedPermission("");
    setFormData((prevData) => ({
      ...prevData,
      permission: "",
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <Modal show={show} onClose={onClose} className="modal" size={"md"}>
        <div className="flex flex-col p-4">
          <div className="flex flex-row justify-between items-center">
            <h2 className="font-medium text-lg text-tblack3">Role Form</h2>
            <IoClose
              className="text-tgrey3 cursor-pointer"
              width={14}
              height={14}
              onClick={onClose}
            />
          </div>
          <hr className="my-4" />
          <form>
            {/* Role name input */}
            <div className="mb-4">
              <label
                className="block text-tgrey3 text-sm font-normal mb-2"
                htmlFor="roleName"
              >
                Role Name
              </label>
              <input
                id="roleName"
                name="roleName"
                type="text"
                className="border-1 rounded-lg border-tgrey2 px-3 py-1 text-h2 text-black font-normal focus:border-gold1 focus:outline-none focus:ring-gold1 w-full"
                value={formData.roleName || ""}
                onChange={handleChange}
              />
            </div>

            {/* Permissions */}
            <div className="mb-4">
              <div>
                <label
                  className="block text-tgrey3 text-sm font-normal mb-2"
                  htmlFor="permission"
                >
                  Permission (You can only select one permission)
                </label>
                <div className="relative">
                  <input
                    id="permission"
                    type="text"
                    className="border-1 rounded-lg border-tgrey2 px-3 py-1 text-h2 text-tgrey3 font-normal focus:border-gold1 focus:outline-none focus:ring-gold1 w-full"
                    value={inputedPermission}
                    readOnly
                  />
                  {inputedPermission && (
                    <button
                      type="button"
                      className="absolute right-[10rem] top-2"
                      onClick={clearPermission}
                    >
                      <IoClose className="text-tgrey3" width={14} height={14} />
                    </button>
                  )}
                </div>
              </div>
              {/* Options */}
              <div className="my-4 flex flex-row flex-wrap space-x-4">
                <div className="flex-none text-sm relative">
                  <PlainButton
                    text={"Add student"}
                    onClick={addPermissions("Add student")}
                  />
                </div>
                <div className="flex-none text-sm">
                  <PlainButton
                    text={"Add staff"}
                    onClick={addPermissions("Add staff")}
                  />
                </div>
                <div className="flex-none text-sm">
                  <PlainButton
                    text={"Send Invite"}
                    onClick={addPermissions("Send Invite")}
                  />
                </div>
                <div className="flex-none mt-4 text-sm">
                  <PlainButton
                    text={"Approve/reject application"}
                    onClick={addPermissions("Approve/reject application")}
                  />
                </div>
                <div className="flex-none mt-4 text-sm">
                  <PlainButton
                    text={"Send Application"}
                    onClick={addPermissions("Send Application")}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <button
                type="button"
                className="bg-dashboardButtons hover:bg-tgrey1 text-white w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={onClick}
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

export function RoleCreated({ show, onClose }) {
  return (
    <div>
      <Modal show={show} onClose={onClose} className="modal p-10" size={"md"}>
        <div className="flex flex-row justify-end p-4">
          <IoClose
            className="text-tgrey3 cursor-pointer"
            width={14}
            height={14}
            onClick={onClose}
          />
        </div>
        <div className="flex flex-col text-center items-center py-20 font-inter">
          <Image
            src={"/role_success.png"}
            width={79}
            height={79}
            alt="Success"
            className="pb-4"
          />
          <h3 className="text-2xl font-bold">Role Created</h3>
          <p className="font-normal text-lg">You can view them now</p>
        </div>
      </Modal>
    </div>
  );
}
