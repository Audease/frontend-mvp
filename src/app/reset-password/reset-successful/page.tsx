'use client'

import Button from "../../components/button";
import Link from "next/link";


export default function ResetSuccessful() {

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="text-tblack bg-white rounded-md w-60 md:w-96">
        <div className="p-4 md:p-8" >
          <div className="pb-4">
            <h3 className="font-semibold text-h3 text-center">Password Reset Successful</h3>
          </div>
         
          {/* Button */}
          <Link href={"/signIn"}>
          <Button buttonText="Click here to Login" className="mt-6" />
          </Link>
          
        </div>
        <div className="font-inter pb-2 text-center">
          <p className="font-normal text-h2"></p>
        </div>
      </div>
    </div>
  );
}
