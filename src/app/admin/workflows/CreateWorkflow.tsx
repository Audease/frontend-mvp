import { Modal } from "flowbite-react";
import { IoClose } from "react-icons/io5";
import { PlainButton } from "../../components/dashboard/Button";
import { useState } from "react";
import Image from "next/image";

export default function CreateWorkflow({
  show,
  onClose,
  onClick,
  formData,
  setFormData,
}) {
  const [inputedRole, setInputedRole] = useState("");


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Tag Input field
  const [tags, setTags] = useState([]);

  const removeTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const addTag = (role) => (e) => {
    e.preventDefault();
    if (!tags.includes(role)) {
      setTags([...tags, role]);
    }
  };

  return (
    <div>
      <Modal show={show} onClose={onClose} className="modal" size={"md"}>
        <div className="flex flex-col p-4">
          <div className="flex flex-row justify-between items-center">
            <h2 className="font-medium text-lg text-tblack3">
              Create Workflow
            </h2>
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
                Task Name
              </label>
              <input
                id="taskName"
                name="taskName"
                type="text"
                className="border-1 rounded-lg border-tgrey2 px-3 py-1 text-h2 text-black font-normal focus:border-gold1 focus:outline-none focus:ring-gold1 w-full"
                value={formData.taskName || ""}
                onChange={handleChange}
              />
            </div>

            {/* Roles */}
            {/* Tag Input Field  */}
            <div>
              <h3 className="text-tgrey3 text-sm font-normal mb-2">Role</h3>
            </div>
            <div className="flex flex-wrap items-center border p-2 border-1 rounded-lg border-tgrey2 py-1 text-h2 h-16 gap-2">
              {tags.map((tag, index) => (
                <div
                  key={index}
                  className="flex items-center bg-gray-200 rounded px-2"
                >
                  <span className="text-gray-700 mr-2">{tag}</span>
                  <button
                    className="text-gray-500 hover:text-gray-700"
                    onClick={(e) => {
                      e.preventDefault();
                      removeTag(index);
                    }}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
            {/* Role options  */}
            <div className="flex flex-col flex-wrap mt-3 space-y-3">
              <div className="flex flex-row space-x-2">
                <PlainButton text={"Lazer"} onClick={addTag("Lazer")} />
                <PlainButton text={"Accessor"} onClick={addTag("Accessor")} />
                <PlainButton text={"BKSD"} onClick={addTag("BKSD")} />
                <PlainButton text={"Recruiter"} onClick={addTag("Recruiter")} />
              </div>
              <div className="flex flex-row space-x-2">
                <PlainButton text={"Induction"} onClick={addTag("Induction")} />
              </div>
            </div>
            {/* Create Button  */}
            <div className="flex items-center justify-between mt-12">
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

export function WorkflowCreated({ show, onClose }) {
  return (
    <div>
      <Modal show={show} onClose={onClose} className="modal p-10" size={"sm"}>
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
          <h3 className="text-2xl font-bold">Workflow Created</h3>
          <p className="font-normal text-lg">You can view them now</p>
        </div>
      </Modal>
    </div>
  );
}
