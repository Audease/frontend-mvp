import { Modal } from "flowbite-react";
import { IoClose } from "react-icons/io5";
import { Avatar } from "flowbite-react";
import { useDeleteStaff } from "../../utils/useDeleteStaff";
import LoadingSpinner from "../../../../components/dashboard/Spinner";
import SuccessToast, {
  FailureToast,
} from "../../../../components/NotificationToast";
import { usePersonaStaff } from "../../utils/usePersonaStaff";
import { useEffect, useState } from "react";

export default function InductionStaffModal({ show, onClose }) {
  const { staffList, error, loading: staffLoading, refetch } = usePersonaStaff("Induction");
  const { handleRemove, loading, succesToast, failureToast } = useDeleteStaff();
  const [retryCount, setRetryCount] = useState(0);

  // Add a retry mechanism for failed fetches
  useEffect(() => {
    if (error && retryCount < 3) {
      const timer = setTimeout(() => {
        setRetryCount(prev => prev + 1);
        refetch();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [error, retryCount, refetch]);

  return (
    <div>
      <Modal show={show} onClose={onClose} className="modal p-2" size={"xl"}>
        <div className="flex flex-row justify-between items-center p-4">
          <div className="flex flex-col">
            <h2 className="font-medium text-lg text-tblack3">Staff</h2>
            <p className="font-normal text-sm text-tgrey3">
              Staff under the Induction role
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
        {/* <div className="flex flex-col space-y-2 px-4">
          <label htmlFor="" className="font-normal text-sm text-tgrey3">
            Search
          </label>
          <input
            type="text"
            placeholder="Enter staff name"
            className="border-1 border-tgrey2 rounded py-1 focus:ring-gold1 focus:border-none focus:ring"
          />
        </div> */}

        {/* Line Break */}
        <hr className="my-2 mx-4" />

        {/* Search Results */}
        <div className="flex flex-col px-4 space-y-4 h-80 overflow-y-auto">
          {loading || staffLoading ? (
            <div className="flex justify-center items-center h-full">
              <LoadingSpinner />
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center h-full">
              <p className="text-red-500 mb-4">Failed to load staff list</p>
              <button 
                onClick={() => {
                  setRetryCount(0);
                  refetch();
                }}
                className="px-4 py-2 bg-dashboardButtons text-white rounded hover:bg-tgrey1"
              >
                Retry
              </button>
            </div>
          ) : !Array.isArray(staffList) || staffList.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <p className="text-gray-500">No staff members found</p>
            </div>
          ) : (
            <>
              <div className="fixed z-50 animate-bounce">
                {succesToast && (
                  <SuccessToast text={"Staff Successfully deleted"} />
                )}
                {failureToast && <FailureToast text={"Failed to delete staff"} />}
              </div>
              
              {staffList.map((staff) => (
                <div
                  key={staff.id}
                  className="flex flex-row justify-between space-x-2 items-center"
                >
                  <div className="flex flex-row space-x-2">
                    <div className="w-8 h-8 bg-profilebg rounded-full flex items-center justify-center p-2 cursor-pointer">
                      <p className="text-tgrey3 text-lg">
                        {staff.email.charAt(0).toUpperCase()}
                      </p>
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
            </>
          )}
        </div>
      </Modal>
    </div>
  );
}