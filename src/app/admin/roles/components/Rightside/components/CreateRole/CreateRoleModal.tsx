"use client";

import { Modal } from "flowbite-react";
import { IoClose } from "react-icons/io5";
import { PlainButton } from "../../../../../../components/dashboard/Button";
import { useState } from "react";
import { useCreateRole } from "../../../../hooks/useRoleCreate";
import { rolesRevalidation } from "../../../../../../action";
import LoadingSpinner from "../../../../../../components/dashboard/Spinner";
import { fetchRoles } from "@/app/admin/utils/fetchRoles";

export default function CreateRoleModal({
  isRoleModalOpen,
  closeRoleModal,
  setSuccess,
}) {
  const [inputedPermission, setInputedPermission] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [roleCreationError, setRoleCreationError] = useState(false)

  const { roleFormData, setRoleFormData, roleCreate, errorMessage } = useCreateRole();

  const clearPermission = () => {
    setInputedPermission([]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoleFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const removeTag = (indexToRemove) => {
    const updatedTags = tags.filter((_, index) => index !== indexToRemove);
    setTags(updatedTags);
  
    setRoleFormData((prevData) => ({
      ...prevData,
      permission: updatedTags,
    }));
  
    if (indexToRemove === 0) {
      clearPermission();
    }
  };
  

  const addPermissions = (permission: string) => (e) => {
    e.preventDefault();
    if (!tags.includes(permission)) {
      setTags((prevData) => [...prevData, permission]);
      setRoleFormData((prevData) => ({
        ...prevData,
        permission: [...(prevData.permission || []), permission],
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const roleCreated = await roleCreate();
    setLoading(false);
    if (roleCreated) {
      rolesRevalidation();
      setSuccess(true);
    } else {
      setRoleCreationError(true)
      setTimeout(() => {
        setRoleCreationError(false)
      }, 10000)
    }
  };

  return (
    <div>
      <Modal
        show={isRoleModalOpen}
        onClose={closeRoleModal}
        className="modal"
        size={"md"}
      >
        <div className="flex flex-col p-4">
          <div className="flex flex-row justify-between items-center">
            <h2 className="font-medium text-lg text-tblack3">Create Role</h2>
            <IoClose
              className="text-tgrey3 cursor-pointer"
              width={14}
              height={14}
              onClick={() => {
                closeRoleModal();
                setRoleFormData({ roleName: "", permission: [] });
              }}
            />
          </div>
          <hr className="my-4" />
          <form onSubmit={handleSubmit}>
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
                value={roleFormData.roleName || ""}
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
              {/* Tag Input Field */}
              <div className="flex flex-wrap items-center border p-2 border-1 rounded-lg border-tgrey2 py-1 text-h2 min-h-16 gap-2">
                {tags.map((tag, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-gray-200 rounded px-2"
                  >
                    <span className="text-gray-700 mr-2">{tag}</span>
                    <button
                      type="button"
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
                    text={"Induction"}
                    onClick={addPermissions("Induction")}
                  />
                </div>

                <div className="text-sm mx-2">
                  <PlainButton
                    text={"Learning Platform"}
                    onClick={addPermissions("Learning Platform")}
                  />
                </div>

                <div className="mt-4 text-sm">
                  <PlainButton
                    text={"Approve/reject application"}
                    onClick={addPermissions("Approve/reject application")}
                  />
                </div>

                <div className="mt-4 text-sm ml-1">
                  <PlainButton
                    text={"Send Application"}
                    onClick={addPermissions("Send Application")}
                  />
                </div>

                <div className="mt-4 text-sm ml-1">
                  <PlainButton
                    text={"Certificate"}
                    onClick={addPermissions("Certificate")}
                  />
                </div>

                <div className="text-sm mt-4 ml-3">
                  <PlainButton
                    text={"Audit"}
                    onClick={addPermissions("Audit")}
                  />
                </div>
              </div>
            </div>
            {loading && <LoadingSpinner />}
            {roleCreationError && <div className="text-red-500">Failed to create role: {errorMessage}</div>}
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-dashboardButtons hover:bg-tgrey1 text-white w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
