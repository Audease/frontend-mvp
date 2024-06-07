import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex flex-row space-x-32 mx-10 py-4">
      {/* Logo  */}
      <div className="">
        <Link href={"/"}>
          <Image
            src="/audease_logo.png"
            width={112}
            height={30}
            className=""
            alt="audease logo"
          ></Image>
        </Link>
      </div>
      {/* Others  */}
      <div className="flex flex-row space-x-8">
        {/* Links  */}
        <div className="font-inter font-medium flex flex-row text-h2 text-tgrey3 space-x-10 py-2">
          <Link href={"#"}>Apps/Roles</Link>
          <Link href={"#"}>Resources</Link>
          <Link href={"#"}>Messenger</Link>
          <Link href={"#"}>Learners</Link>
          <Link href={"#"}>Staff</Link>
          <Link href={"#"}>Workflows</Link>
        </div>
        {/* search field */}
        {/* Search bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 border-none rounded-lg w-72  focus:outline-none focus:border-blue-500 text-tgrey3 bg-tgrey4"
          />
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Image
              src="/search.svg"
              width={15}
              height={15}
              className=""
              alt="search icon"
            ></Image>
          </span>
        </div>
        {/* other options */}
        <div className="flex flex-row space-x-4 py-1">
          <div>
            <Image
              src="/createbutton.png"
              width={30}
              height={30}
              className=""
              alt="create button"
            ></Image>
          </div>
          <div>
            <Image
              src="/notification.png"
              width={32}
              height={32}
              className=""
              alt="create button"
            ></Image>
          </div>
          <div className="w-8 h-8 bg-profilebg rounded-full flex items-center justify-center p-2">
            <p className="text-tgrey3 text-h5 font-semibold">N</p>
          </div>
        </div>
      </div>
    </div>
  );
}
