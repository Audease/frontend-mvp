'use client'

import { useState, useEffect, Suspense } from "react";
import WelcomeBack from "../components/WelcomeBack";
import Button from "../components/button";
import PasswordStrengthMeter from "../password-meter/PasswordStrengthMeter";
import Image from "next/image";
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import axios from "axios";

function ResetPasswordContent() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [error, setError] = useState(null);
    const [isStrength, setStrength] = useState(null);
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState("")
    const [passwordToggle, setPasswordToggle] = useState("password");
    const searchParams = useSearchParams();
    const router = useRouter();

    const handleOldPasswordChange = (e) => {
        setOldPassword(e.target.value);
    };

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    const dataHandler = (childData) => {
        setStrength(childData);
    };

    const eyeClick = () => {
        setPasswordToggle((prevState) => 
            prevState === "password" ? "text" : "password"
        );
    };

   
    useEffect(() => {
        const tokenUrl = searchParams.get('token');
        setToken(tokenUrl)
        console.log(token)
    

        if (tokenUrl) {
            const url = new URL(window.location.href);
            url.searchParams.delete('token');
            window.history.replaceState({}, document.title, url.toString());
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (oldPassword) {
            let capsCount = (oldPassword.match(/[A-Z]/g) || []).length;
            let smallCount = (oldPassword.match(/[a-z]/g) || []).length;
            let numberCount = (oldPassword.match(/[0-9]/g) || []).length;
            let symbolCount = (oldPassword.match(/\W/g) || []).length;

            if (symbolCount < 1) {
                setError("Must contain one special character: @$! % * ? &");
              } else if (capsCount < 1) {
                setError("Must contain one UPPERCASE letter");
              } else if (smallCount < 1) {
                setError("Must contain one lowercase letter");
              } else if (numberCount < 1) {
                setError("Must contain one number");
              } else if (oldPassword.length < 8) {
                setError("Must be minimum of 8 characters." );
              }  else {
                setError(null);
              }
        }
    }, [oldPassword]);

    const validateNewPassword = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (isStrength < 8) {
            setError("Password strength is not sufficient.");
            setLoading(false);
            return;
        }

        if (oldPassword !== newPassword) {
            setError("Passwords do not match.");
            setLoading(false);
            return;
        }

        const payload  = {
            token: token, 
            password: oldPassword
        }

        console.log(payload)

        if (!error && token) {
            try {
                const response = await axios.post('https://backend-mvp-dev-535547563935.europe-west4.run.app/v1/auth/reset-password', payload);
                console.log("New password set", response.data);
                router.push('/reset-password/reset-successful');

            } catch (err) {
                console.error("Error resetting password", err);
                setError("Failed to reset password. Please try again.");
            }
        } else {
            setError("");
        }

        setLoading(false);
    };

    return (
        <div className="flex flex-col lg:flex-row lg:space-x-24 mx-auto justify-center items-center">
            <div className="">
                <WelcomeBack boldText={"Enter your new password"} smallText={""} />
            </div>
            <div className="text-tblack bg-white m-8 rounded-md md:w-96">
                <div className="p-8">
                    <div className="pb-4">
                        <h3 className="font-semibold text-h3">Reset your password</h3>
                        <p className="font-normal text-h2">
                            Enter your new password
                        </p>
                    </div>
                    <form action="submit" onSubmit={validateNewPassword} className="space-y-4">
                        <div style={{ position: "relative", display: "inline-flex" }} className="mt-4 w-full">
                            <input
                                type={passwordToggle}
                                name="oldPassword"
                                className={`border-tgrey2 rounded-md p-2 text-h2 text-tgrey1 font-normal w-full focus:border-tgrey2 focus:outline-none focus:ring focus:ring-gold1 ${
                                    oldPassword ? "bg-gray-100" : ""
                                }`}
                                placeholder="Enter new password"
                                value={oldPassword}
                                onChange={handleOldPasswordChange}
                                required
                            />
                            <span
                                style={{
                                    position: "absolute",
                                    right: "15px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                }}
                            >
                                <Image
                                    src="/eye.png"
                                    width={12}
                                    height={12}
                                    className="hover:bg-gray-100 cursor-pointer"
                                    alt="toggle visibility"
                                    onClick={eyeClick}
                                />
                            </span>
                        </div>
                        
                        <div style={{ position: "relative", display: "inline-flex" }} className="mt-4 w-full">
                            <input
                                type={passwordToggle}
                                name="newPassword"
                                className={`border-tgrey2 rounded-md p-2 text-h2 text-tgrey1 font-normal w-full focus:border-tgrey2 focus:outline-none focus:ring focus:ring-gold1 ${
                                    newPassword ? "bg-gray-100" : ""
                                }`}
                                placeholder="Confirm new password"
                                value={newPassword}
                                onChange={handleNewPasswordChange}
                                required
                            />
                            <span
                                style={{
                                    position: "absolute",
                                    right: "15px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                }}
                            >
                                <Image
                                    src="/eye.png"
                                    width={12}
                                    height={12}
                                    className="hover:bg-gray-100 cursor-pointer"
                                    alt="toggle visibility"
                                    onClick={eyeClick}
                                />
                            </span>
                        </div>
                        
                        <PasswordStrengthMeter
                            password={oldPassword}
                            actions={dataHandler}
                            errorMessage={error}
                        />

                        <Button buttonText={loading ? "Resetting Password..." : "Set New Password"} className={`my-6`} />
                        {/* {error && <p className="text-red-500 mt-2">{error}</p>} */}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default function ResetPassword() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ResetPasswordContent />
        </Suspense>
    );
}
