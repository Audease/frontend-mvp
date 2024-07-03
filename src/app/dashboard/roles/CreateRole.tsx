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

  //   Tag Input field "@Johnsonwils", "Anderson123@gmail.com"
  const [tags, setTags] = useState([]);

  const removeTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const addPermissions = (permission) => (e) => {
    e.preventDefault();
    setTags([permission]);
    setInputedPermission(permission);
    setFormData((prevData) => ({
      ...prevData,
      permission,
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
              <label
                className="block text-tgrey3 text-sm font-normal mb-2"
                htmlFor="permission"
              >
                Permission (You can only select one permission)
              </label>
              {/* Tag Input Field  */}
              <div className="flex flex-wrap items-center border p-2 border-1 rounded-lg border-tgrey2 py-1 text-h2 h-9">
                {tags.map((tag, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-gray-200 rounded px-2"
                  >
                    <span className="text-gray-700 mr-2">{tag}</span>
                    <button
                      className="text-gray-500 hover:text-gray-700"
                      onClick={() => removeTag(index)}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
              {/* Options */}
              <div className="my-4 flex flex-row flex-wrap justify-left">
                <div className="text-sm">
                  <PlainButton
                    text={"Add student"}
                    onClick={addPermissions("Add student")}
                  />
                </div>
                <div className="text-sm ml-3">
                  <PlainButton
                    text={"Add staff"}
                    onClick={addPermissions("Add staff")}
                  />
                </div>
                <div className="text-sm ml-3">
                  <PlainButton
                    text={"Send Invite"}
                    onClick={addPermissions("Send Invite")}
                  />
                </div>
                <div className="mt-4 text-sm">
                  <PlainButton
                    text={"Approve/reject application"}
                    onClick={addPermissions("Approve/reject application")}
                  />
                </div>
                <div className="mt-4 text-sm ml-3">
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
