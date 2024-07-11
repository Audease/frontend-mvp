import Image from "next/image";

export default function Notifications() {
  const notifications = [
    {
      id: 1,
      icon: "",
      taskDone: "Team Task Completed",
      time:"",
      taskDoneText:"",
      spanText:""
    },
    {
      icon: "",
      taskDone: "",
      time:"",
      taskDoneText:"",
      spanText:""
    }
  ] 

  return (
    <div className="absolute top-14 bg-white shadow-lg rounded-lg p-4 font-medium w-48 right-[3rem] space-y-4">
      {/* My profile  */}
      <div className="">
        <h3 className="text-base font-medium pb-2">Notifications</h3>
        <hr />
        <div>
          {notifications.map((notificationItem) => (
           <div key=''>
            <div className="bg-dashboardButtonsBg"> {notificationItem.icon} </div>
            <div><h3>{notificationItem.taskDone}</h3></div>
            <div>
              <li>Now</li>
            </div>
           </div>
          ))}
        </div>
      </div>
    </div>
  );
}
