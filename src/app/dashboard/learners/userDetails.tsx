import { SlArrowLeft } from "react-icons/sl";

export default function UserDetails({ userId, onBackClick }) {
    return (
      <div>
        {/* Back Button */}
      <div>
        <button
          className="flex flex-row space-x-2 text-tgrey3"
          type="button"
          onClick={onBackClick}
        >
          <div className="pt-2">
            <SlArrowLeft className="text-tgrey3 h-[0.6rem]" />
          </div>
          <p className="font-medium text-base">Back</p>
        </button>
      </div>


        <h3>{userId.name}</h3>
        <p>{userId.username}</p>
        <p>{userId.email}</p>
        <p>{userId.loginTime}</p>
        <p>{userId.funding}</p>
        <p>{userId.payment}</p>
      </div>
    );
  }
  