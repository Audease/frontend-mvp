"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import Button from "../components/button";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordToggle, setPasswordToggle] = useState("password");
  const [error, setError] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);


  const handleEyeClick = () => {
    setPasswordToggle((prevState) =>
      prevState === "password" ? "text" : "password"
    );
  };


  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      username: email,
      password: password,
    };

    console.log("Submitting payload:", payload);
    try {
      const response = await axios.post(
        "/api/login/login",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Login successful:", response.data);
        router.push('/dashboard')
      } else {
        console.error("Login failed:", response.data);
        setError(response.data.message || "Login failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setError("Invalid email or password");
      setLoading(false)
    }
  };

  return (
    <div className="font-switzer bg-bgDefault p-6 h-full lg:h-screen lg:w-full lg:m-auto lg:items-center lg:flex lg:justify-center">
      <div className="flex flex-col items-center p-8 lg:flex lg:flex-row lg:space-x-12">
        <div className="lg:max-h-80 lg:max-w-80 lg:m-10">
          {/* Audease logo */}
          <div className="flex flex-row justify-center pt-4 md:py-8 lg:justify-start">
            <Link href="/">
              <Image
                src="/audease_logo.png"
                width={132}
                height={37}
                alt="Audease logo"
              />
            </Link>
          </div>

          {/* Welcome section */}
          <div className="flex flex-col items-center text-center p-2 md:max-w-72 lg:text-left lg:p-0">
            <h6 className="text-deepGrey text-h3 font-semibold py-2 lg:text-h1">
              Welcome back to Audease
            </h6>
            <p className="font-normal text-h4 text-tblack2 py-2 lg:text-h2">
              Welcome back! Access your account to manage your data effortlessly
              and stay organized.
            </p>
          </div>
        </div>
        <div className="">
          {/* Form */}
          <form
            className="text-tblack bg-white rounded-md mb-2 m-2 md:mx-10 p-4 md:max-w-72 lg:max-w-[22rem]"
            onSubmit={handleSubmit}
            autoComplete="on"
          >
            <div>
              <h1 className="text-base font-semibold">Sign in</h1>
              <p className="text-h5 font-normal pt-2">
                Don’t have an account?{" "}
                <Link href="/signup" className="font-semibold">
                  Sign Up
                </Link>
              </p>
            </div>
            <div className="my-4 text-h5 font-normal">
              <input
                type="text"
                name="username"
                className={`border-tgrey2 rounded-md p-2 text-h2 text-tgrey1 font-normal w-full focus:border-tgrey2 focus:outline-none focus:ring focus:ring-gold1 ${
                  email ? "bg-gray-100" : ""
                }`}
                placeholder="Username"
                onChange={handleEmailChange}
                required
                aria-label="Username"
              />

              <div className="relative mt-4 w-full">
                <input
                  type={passwordToggle}
                  name="password"
                  className={`border-tgrey2 rounded-md p-2 text-h2 text-tgrey1 font-normal w-full focus:border-tgrey2 focus:outline-none focus:ring focus:ring-gold1 ${
                    password ? "bg-gray-100" : ""
                  }`}
                  placeholder="Password"
                  onChange={handlePasswordChange}
                  required
                  aria-label="Password"
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2"
                  onClick={handleEyeClick}
                  aria-label="Toggle password visibility"
                >
                  <Image
                    src="/eye.png"
                    width={16}
                    height={16}
                    alt="Toggle visibility"
                  />
                </button>
              </div>
            </div>

            <div className="text-h5 text-link1 font-normal my-4">
              <Link href="/forgotPassword">Forgot password?</Link>
            </div>

            {/* Submit button */}
            <Button buttonText={loading ? "Signing In..." : "Sign In"} className="" />
            {error && <p className="text-red-500 mt-2">{error}</p>}

            {/* Separator */}
            {/* <div className="flex items-center py-4">
              <div className="border-t border-borderColor flex-grow"></div>
              <div className="mx-2 text-base text-tgrey1">or</div>
              <div className="border-t border-borderColor flex-grow"></div>
            </div> */}

            {/* Social links */}
            {/* <div className="flex flex-row justify-between md:justify-evenly md:space-x-8">
              <button
                type="button"
                className="border-2 rounded-md p-2 text-h5 font-semibold flex items-center justify-center md:px-6 lg:w-full"
                aria-label="Sign in with Google"
              >
                <Image
                  src="/google-logo.svg"
                  width={16}
                  height={16}
                  alt="Google logo"
                />
                <span className="pl-2">Google</span>
              </button>

              <button
                type="button"
                className="border-2 rounded-lg p-2 text-h5 font-semibold flex items-center md:px-6 lg:hidden"
                aria-label="Sign in with Facebook"
              >
                <Image
                  src="/fb-logo.svg"
                  width={16}
                  height={16}
                  alt="Facebook logo"
                />
                <span className="pl-2">Facebook</span>
              </button>
            </div> */}

            {/* Line break */}
            <div className="py-4">
              <hr className="text-borderColor h-2" />
            </div>

            {/* Footer copyright */}
            <div className="font-inter">
              <h6 className="font-normal text-tgrey1 text-h6">
                Protected by reCAPTCHA and subject to the Rhombus{" "}
                <Link href="/privacy" className="text-link1">
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link href="/terms" className="text-link1">
                  Terms of Service
                </Link>
                .
              </h6>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
