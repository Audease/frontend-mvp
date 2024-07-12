import Image from "next/image";
import { MdKeyboardArrowRight } from "react-icons/md";

export default function Notifications() {
  const notifications = [
    {
      icon: "",
      taskDone: "Team Task Completed",
      time: "Now",
      taskDoneText: "Johnson approve a ",
      spanText: "Student",
    },
    {
      taskDone: "Staff Created",
      time: "2h",
      taskDoneText: "Johnson created a new",
      spanText: "Staff",
    },
    {
      taskDone: "Learner request accept",
      time: "1d",
      taskDoneText: "James accept the",
      spanText: "Learners",
    },
    {
      taskDone: "Your monthly report",
      time: "1w",
      taskDoneText: "Johnson complete ",
      spanText: "Development",
    },
  ];

  const getIconLink = (spanText) => {
    switch (spanText) {
      case "Staff":
        return "/staffCreatedNotification.png";
      case "Student":
        return "/teamNotificationCheck.png";
      case "Learners":
        return "/staffGoldIcon.png";
      case "Development":
        return "/monthlyReportNotification.png";
      default:
        return "/defaultIcon.png";
    }
  };

  return (
    <div className="absolute top-14 bg-white shadow-lg rounded-lg p-4 font-medium w-80 right-[3rem] space-y-4 font-inter">
      <div className="">
        <h3 className="text-base font-semibold pb-2">Notifications</h3>
        <hr />
        <div className="space-y-4 my-4">
          {notifications.map((notificationItem) => (
            <div key="" className="flex flex-row space-x-4">
              <div className="bg-dashboardButtonsBg w-10 h-10 rounded-full flex justify-center items-center">
                <Image
                  src={getIconLink(notificationItem.spanText)}
                  alt={`${notificationItem.spanText} icon`}
                  width={16}
                  height={16}
                />
              </div>
              <div className="flex flex-col">
                <div className="flex flex-row space-x-4">
                  <div>
                    <h3 className="font-semibold text-sm">
                      {notificationItem.taskDone}
                    </h3>
                  </div>
                  <div>
                    <li className="font-normal text-xs text-tgrey3">
                      {notificationItem.time}
                    </li>
                  </div>
                </div>
                <div className="font-normal text-sm text-tgrey3">
                  <h2>
                    {notificationItem.taskDoneText}{" "}
                    <span className="text-dashboardButtons">
                      {notificationItem.spanText} ...
                    </span>
                  </h2>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mx-4 ">
          {/* button  */}
          <button className="bg-tgrey4 w-full rounded-2xl py-2 text-tgrey3 font-semibold text-sm flex flex-row justify-center">
            See all
            <span>
              <MdKeyboardArrowRight className="w-5 h-5" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
