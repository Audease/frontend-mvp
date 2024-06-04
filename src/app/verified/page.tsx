'use client'

import WelcomeBack from "../components/WelcomeBack";
import Button from "../components/button";

export default function Verified() {
  return (
    <div className="font-switzer flex flex-col bg-bgDefault m-auto items-center justify-center md:space-x-16 md:px-4 lg:space-x-24 md:flex-row">
      <WelcomeBack />
      <div className="text-tblack bg-white rounded-md m-4 md:w-[100]">
        <form className="p-8 ">
          <div className="">
            <h3 className="font-semibold  text-h3">
            Your account has been verified
            </h3>
          </div>
          {/* Button  */}
          <Button buttonText={`Go to your dashboard`} className={`mt-10`} />
        </form>

        <div className="font-inter py-4 text-center">
          <p className="font-normal text-h2">
            Need help?{" "}
            <span className=" text-link1">{" "}Contact customer support</span>
          </p>
        </div>
      </div>
    </div>
  );
}
