import Image from "next/image";
import Link from "next/link";

export default function WelcomeBack({boldText, smallText}) {
  return (
    <div className="flex flex-row justify-center items-center  h-screen">
      <div className="lg:max-h-80 lg:max-w-80 lg:m-10">
        {/* audease logo */}
        <div className="flex flex-row justify-center pt-4 md:py-8 lg:justify-start">
          <Link href="/">
            <Image
              src="/audease_logo.png"
              width={132}
              height={37}
              className=""
              alt="audease logo"
            ></Image>
          </Link>
        </div>

        {/* Welcome section  */}
        <div className="flex flex-col items-center text-center p-2 md:max-w-72 lg:text-left lg:p-0">
          <h6 className="text-deepGrey text-h3 font-semibold py-1 lg:text-h1">
            {boldText}
          </h6>
          <p className="font-normal text-h4 text-tblack2 py-2 lg:text-h2 ">
            {smallText}
          </p>
        </div>
      </div>
    </div>
  );
}
