import Image from "next/image";

export default function MessengerRight () {
    return (
        <div className="space-y-6 rounded border border-tgrey2 p-4 mb-8 font-inter shadow-sm min-h-[28rem] ">
            <hr className="mt-10 "/>

            <div className="flex flex-col items-center justify-center space-y-4">
                <Image src={"/chat_empty_Illustration.png"} width={200} height={200} alt="Chat empty" className="mt-14"/>
                <p className="font-medium text-base">No messages was found</p>
            </div>
        </div>
    )
}