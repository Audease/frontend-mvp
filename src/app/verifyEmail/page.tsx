'use client'

import WelcomeBack from "../components/WelcomeBack";
import Button from "../components/button";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function VerifyEmail() {
  const [userEmail, setUserEmail] = useState("")
  const router = useRouter();

  useEffect(() => {
    const registeredEmail = (localStorage.getItem("userEmail"));
    console.log(registeredEmail)
    if (registeredEmail && registeredEmail) {
      setUserEmail(registeredEmail);
    }
  }, []);

  const toVerified = (e) => {
    // Programmatically navigate to verifyEmail
    e.preventDefault()
    router.push("/signIn");
  }

  return (
    <div className="font-switzer flex bg-bgDefault m-auto items-center justify-center space-x-24">
      <WelcomeBack boldText={"Welcome to Audease"} smallText={"Audease streamlines your college’s administrative and auditing processes, ensuring a secure and efficient management system for all your  data needs."}/>

      <div className="text-tblack bg-white rounded-md w-96">
        <form className="p-8" onSubmit={toVerified}>
          <div className="pb-2 space-y-2">
            <h3 className="font-semibold  text-h3">
              Verify your email address
            </h3>
            <p className="font-normal text-h2">
              To verify your email, login credentials has been sent to:
            </p>
             {/* User email  */}
          <p className="font-bold text-h2">{userEmail}</p>
          
          </div>
         
          {/* Button  */}
          <Button buttonText={`Click to Login`} className={`mt-4`} />
        </form>

        <div className="font-inter py-2 text-center">
          <p className="font-normal text-h2">
            Need help?{" "}
            <span className=" text-link1">{" "}Contact customer support</span>
          </p>
        </div>
      </div>
    </div>
  );
}
