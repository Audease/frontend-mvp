"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const whitelist = [
  "/",
  "/signIn",
  "/signup",
  "/forgotPassword",
  "/reset-password",
];

export default function ActivityTracker() {
  const route = usePathname();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  let timeout = null;

  const handleLogin = () => {
    setShowModal(false);
    router.push("/signIn");
  };

  const restartAutoReset = () => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      const logout = async () => {
        await fetch("/api/logout", {
          method: "POST",
        });
        // router.push("/signIn");
        setShowModal(true);
        // if (response.ok) {
        //   router.push("/signIn");
        // } else {
        //   console.error("Failed to log out");
        // }
      };
      logout();
    }, 1000 * 60 * 1); // 10 minutes
  };

  const onMouseMove = () => {
    restartAutoReset();
  };

  useEffect(() => {
    let preventReset = false;
    for (const path of whitelist) {
      if (path === route) {
        preventReset = true;
      }
    }

    if (preventReset) {
      return;
    }

    // initiate timeout
    restartAutoReset();

    // listen for mouse events
    window.addEventListener("mousemove", onMouseMove);

    // cleanup
    return () => {
      if (timeout) {
        clearTimeout(timeout);
        window.removeEventListener("mousemove", onMouseMove);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route]);

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-semibold mb-4">Session Expired</h2>
            <p className="mb-6">
              Your session has expired due to inactivity. Please log in again to continue.
            </p>
            <div className="flex justify-end">
              <button
                onClick={handleLogin}
                className="px-4 py-2 bg-dashboardButtons text-white rounded hover:bg-gold1 transition-colors"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );;
}
