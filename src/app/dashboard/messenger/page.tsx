import MessengerLeft from "./messengerLeft";
import MessengerRight from "./messengerRight";

export default function Messenger (){
    return (
        <div className="font-inter">
            <div className="space-y-3">
                <h3 className="font-medium text-2xl">Messenger</h3>
                <hr />
            </div>
            <div className="min-h-[30rem] flex flex-row space-x-8 my-4 w-full">
                <div className="w-1/3">
                <MessengerLeft />
                </div>
                <div className="w-full">
                <MessengerRight />
                </div>
            </div>
        </div>
    )
}