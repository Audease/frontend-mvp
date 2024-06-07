'use client'

import WelcomeBack from "../components/WelcomeBack";
import Button from "../components/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function VerifyEmail() {
  const [userEmail, setUserEmail] = useState("nyekachi@audease.co.uk")
  const router = useRouter();

  const toVerified = (e) => {
    // Programmatically navigate to verifyEmail
    e.preventDefault()
    router.push("/verified");
  }

  return (
    <div className="font-switzer flex bg-bgDefault m-auto items-center justify-center space-x-24">
      <WelcomeBack boldText={"Welcome to Audease"} smallText={"Audease streamlines your college’s admissions and auditing processes, ensuring a secure and efficient management system for all your student data needs."}/>

      <div className="text-tblack bg-white rounded-md w-96">
        <form className="p-8" onSubmit={toVerified}>
          <div className="pb-4">
            <h3 className="font-semibold  text-h3">
              Verify your email address
            </h3>
            <p className="font-normal text-h2">
              To start using Audesae, confirm your email addresses with the
              email we sent to:
            </p>
          </div>
          {/* User email  */}
          <p className="font-bold text-h2">{userEmail}</p>
          {/* Button  */}
          <Button buttonText={`Resend email`} className={`mt-10`} />
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
