import { Modal } from "flowbite-react";
import { IoClose } from "react-icons/io5";
import { PlainButton } from "../../components/dashboard/Button";


export default function CreateRole({ show, onClose, onClick }) {
    const addPermissions = (e) => {
        e.preventDefault()
    }

  return (
    <div>
      <Modal
        show={show}
        onClose={onClose}
        // contentLabel="Role Form"
        className="modal"
        size={"md"}
        // overlayClassName="overlay"
      >
        <div className="flex flex-col p-4">
          <div className="flex flex-row justify-between">
            <h2 className="font-medium text-lg text-tblack3">Role Form</h2>
            <IoClose
              className="text-tgrey3"
              width={14}
              height={14}
              onClick={onClose}
            />
          </div>
          <hr className="my-4" />
          <form>
            {/* Your form inputs here */}
            <div>
              {/* Role name input  */}
              <div className="mb-4">
                <label
                  className="block text-tgrey3 text-sm font-normal mb-2"
                  htmlFor="roleName"
                >
                  Role Name
                </label>
                <input
                  id="roleName"
                  type="text"
                  className="border-1 rounded-lg border-tgrey2 px-3 py-1 text-h2 text-black font-normal focus:border-gold1 focus:outline-none focus:ring-gold1 w-full"
                />
              </div>

              {/* Permissions  */}
              <div className="mb-4">
                <div>
                  <label
                    className="block text-tgrey3 text-sm font-normal mb-2"
                    htmlFor="roleName"
                  >
                    Permission (You can only select one permission)
                  </label>
                  <input
                    id="roleName"
                    type="text"
                    className="border-1 rounded-lg border-tgrey2 px-3 py-1 text-h2 text-black font-normal focus:border-gold1 focus:outline-none focus:ring-gold1 w-full"
                  />
                </div>
                {/* Options  */}
                <div className="my-4 flex flex-row flex-wrap space-x-4">
                  <div className="flex-none"><PlainButton text={"Add student"} onClick={addPermissions}/></div>
                  <div className="flex-none"><PlainButton text={"Add staff"}  onClick={addPermissions}/></div>
                  <div className="flex-none"><PlainButton text={"Send Invite"}  onClick={addPermissions}/></div>
                  <div className="flex-none mt-4"><PlainButton text={"Approve/reject application"}  onClick={addPermissions}/></div>
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
