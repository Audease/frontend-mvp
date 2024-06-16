'use client'

import { useState, useEffect } from "react";
import WelcomeBack from "../components/WelcomeBack";
import Button from "../components/button";
import PasswordStrengthMeter from "../password-meter/PasswordStrengthMeter";

export default function ResetPassword ({error}) {
    const [oldPassword, setOldPassword] = useState ("");
    const [newPassword, setNewPassword] = useState ("");
    const [isError, setError] = useState(null);
    const [isStrength, setStrength] = useState(null);

    const handleOldPasswordChange = (e :any) => {
        setOldPassword(e.target.value);
    }

    const handleNewPasswordChange = (e :any) => {
        setNewPassword(e.target.value);
    }

    const dataHandler = (childData) => {
        setStrength(childData);
      };

    useEffect(() => {
        if (oldPassword) {
          setError("Your Password is great. Nice work!");
          let capsCount = (oldPassword.match(/[A-Z]/g) || []).length;
          let smallCount = (oldPassword.match(/[a-z]/g) || []).length;
          let numberCount = (oldPassword.match(/[0-9]/g) || []).length;
          let symbolCount = (oldPassword.match(/\W/g) || []).length;
    
          if (oldPassword.length < 4) {
            setError(
              "Password must be a minimum of 4 characters and include one UPPERCASE letter, one lowercase letter, one number, and one special character: @$! % * ? &"
            );
          } else if (capsCount < 1) {
            setError("Must contain one UPPERCASE letter");
          } else if (smallCount < 1) {
            setError("Must contain one lowercase letter");
          } else if (numberCount < 1) {
            setError("Must contain one number");
          } else if (symbolCount < 1) {
            setError("Must contain one special character: @$! % * ? &");
          }
        }
      }, [oldPassword]);

    const validateNewPassword = (e :any) => {
        e.preventDefault()

        if (isStrength < 4) { 
            setError("Password strength is not sufficient.");
            return;
          }


        if (oldPassword !== newPassword) {
            setError("Passwords do not match.");
            return;
          }

        setError(null);
        console.log("New password set")
    }

    return (
        <div className="flex flex-row space-x-24 mx-auto justify-center items-center">
            <div className="">
                <WelcomeBack boldText={"Enter your new password"} smallText={""}/>
            </div>
            <div className="text-tblack bg-white rounded-md w-96">
      <div className="p-8">
        <div className="pb-4">
          <h3 className="font-semibold  text-h3">Reset your password</h3>
          <p className="font-normal text-h2">
            Enter your new password
          </p>
        </div>
        <form action="submit" onSubmit={validateNewPassword}  className="space-y-4">
          <input
            type="text"
            name="oldPassword"
            className={`border-tgrey2 rounded-md p-2 text-h2 text-tgrey1 font-normal w-full focus:border-tgrey2 focus:outline-none focus:ring focus:ring-gold1 ${
              oldPassword ? "bg-gray-100" : ""
            }`}
            placeholder="Enter new password"
            value={oldPassword}
            onChange={handleOldPasswordChange}
            required
          />

            <input
            type="text"
            name="oldPassword"
            className={`border-tgrey2 rounded-md p-2 text-h2 text-tgrey1 font-normal w-full focus:border-tgrey2 focus:outline-none focus:ring focus:ring-gold1 ${
              newPassword ? "bg-gray-100" : ""
            }`}
            placeholder="Confirm new password"
            value={newPassword}
            onChange={handleNewPasswordChange}
            required
          />

            <PasswordStrengthMeter
                password={oldPassword}
                actions={dataHandler}
                errorMessage={isError}
              />

          {/* Button  */}
          <Button buttonText={"Set New Password"} className={`my-6`} />
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      </div>
    </div>
        </div>
    )
}