"use client";

import Button from "../components/button";
import { useState, useEffect, useRef } from "react";

export default function ForgotPasswordFormTwo() {
  const [countdown, setCountdown] = useState(30);
  const [inputData, setInputData] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  useEffect(() => {
    // Decrease countdown every second
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevCountdown - 1;
      });
    }, 1000);

    // Clean up the timer
    return () => clearInterval(timer);
  }, []);

  // Format the countdown time
  const formattedCountdown = `0:${countdown < 10 ? `0${countdown}` : countdown}`;

  const handleInputChange = (e, index) => {
    const value = e.target.value;
    if (/^\d$/.test(value)) { // Only allow single digit
      setInputData((prevInputData) => {
        const newInputData = [...prevInputData];
        newInputData[index] = value;
        return newInputData;
      });

      // Move to the next input field if the current field is not the last one
      if (index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && inputData[index] === "") {
      // Move to the previous input field if Backspace is pressed and the current field is empty
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  return (
    <div className="text-tblack bg-white rounded-md w-96">
      <form className="p-8">
        <div className="pb-4">
          <h3 className="font-semibold text-h3">Verify your email address</h3>
          <p className="font-normal text-h2">Enter OTP sent to your email</p>
        </div>
        <div className="flex flex-row justify-between">
          {inputData.map((value, index) => (
            <input
              key={index}
              type="text"
              className="border rounded-md w-8 h-8 p-2 text-h2 text-tgrey1 font-normal focus:border-tgrey2 focus:outline-none focus:ring focus:ring-tgrey1 text-center"
              value={value}
              onChange={(e) => handleInputChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              maxLength={1}
              ref={(el) => (inputRefs.current[index] = el)}
            />
          ))}
        </div>

        {/* Button */}
        <Button buttonText="Verify now" className="mt-6" />

        {/* Countdown timer */}
        <p className="font-bold text-red-700 flex justify-end pt-2">{formattedCountdown}</p>
      </form>
      <div className="font-inter pb-2 text-center">
        <p className="font-normal text-h2">
          Still not received OTP? <span className="text-link1">Resend</span>
        </p>
      </div>
    </div>
  );
}