"use client";

import InputField from "../components/inputFields";
import Button from "../components/button";
import React, { useState, useEffect } from "react";

export default function ForgotPasswordFormOne() {
  return (
    <div className="text-tblack bg-white rounded-md w-96">
      <form className="p-8">
        <div className="pb-4">
          <h3 className="font-semibold  text-h3">Forgot passowrd?</h3>
          <p className="font-normal text-h2">
            We’ll send new password link to email
          </p>
        </div>
        <InputField
          type={"email"}
          placeholder={"Email address"}
          className={"w-full"}
        />
        {/* Button  */}
        <Button buttonText={`Send password link`} className={`my-6`} />
      </form>
    </div>
  );
}

export function ForgotPasswordFormTwo() {
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    // Decrease countdown every second
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    // Clear interval when countdown reaches 0
    if (countdown === 0) {
      clearInterval(timer);
    }

    // Clean up the timer
    return () => clearInterval(timer);
  }, [countdown]);

  // Format the countdown time
  const formattedCountdown = `0:${
    countdown < 10 ? `0${countdown}` : countdown
  }`;

  return (
    <div className="text-tblack bg-white rounded-md w-96">
      <form className="p-8">
        <div className="pb-4">
          <h3 className="font-semibold  text-h3">Verify your email address</h3>
          <p className="font-normal text-h2">Enter OTP sent to your email</p>
        </div>
        <div className="flex flex-row justify-between">
          <input
            type="text"
            className="border rounded-md w-8 h-8 p-2 text-h2 text-tgrey1 font-normal focus:border-tgrey2 focus:outline-none focus:ring focus:ring-tgrey1"
            value={"1"}
          />
          <input
            type="text"
            className="border rounded-md w-8 h-8 p-2 text-h2 text-tgrey1 font-normal focus:border-tgrey2 focus:outline-none focus:ring focus:ring-tgrey1"
            value={"1"}
          />
          <input
            type="text"
            className="border rounded-md w-8 h-8 p-2 text-h2 text-tgrey1 font-normal focus:border-tgrey2 focus:outline-none focus:ring focus:ring-tgrey1"
            value={"1"}
          />
          <input
            type="text"
            className="border rounded-md w-8 h-8 p-2 text-h2 text-tgrey1 font-normal focus:border-tgrey2 focus:outline-none focus:ring focus:ring-tgrey1"
            value={"1"}
          />
          <input
            type="text"
            className="border rounded-md w-8 h-8 p-2 text-h2 text-tgrey1 font-normal focus:border-tgrey2 focus:outline-none focus:ring focus:ring-tgrey1"
            value={"1"}
          />
        </div>
        
        {/* Button  */}
        <Button buttonText={`Verify now`} className={`mt-6`} />

        {/* Countdown timer  */}
        <p className="font-bold text-red-700 flex justify-end pt-2">{formattedCountdown}</p>
      </form>
      <div className="font-inter pb-2 text-center">
        <p className="font-normal text-h2">
          Still not received OTP? <span className=" text-link1"> Resend</span>
        </p>
      </div>
    </div>
  );
}
