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
  let timeout: NodeJS.Timeout | null = null;

  const handleLogin = () => {
    setShowModal(false);
    router.push("/signIn");
  };

  const logout = async () => {
    await fetch("/api/logout", { method: "POST" });
    localStorage.removeItem("lastActiveAt");
    setShowModal(true);
  };

  const restartAutoReset = () => {
    // Save current timestamp as last active time
    localStorage.setItem("lastActiveAt", Date.now().toString());

    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      logout();
    }, 1000 * 60 *  10); // 10 minutes
  };

  const onUserActivity = () => {
    restartAutoReset();
  };

  useEffect(() => {
    let preventReset = whitelist.includes(route);

    if (preventReset) return;

    // Check if user has been inactive even before page load
    const lastActiveAt = localStorage.getItem("lastActiveAt");
    if (lastActiveAt) {
      const now = Date.now();
      const diff = now - parseInt(lastActiveAt, 10);

      if (diff > 1000 * 60 *  10) {
        // User was inactive for more than 10 minutes (even across browser close)
        logout();
        setShowModal(true);
        return;
      }
    }

    // Start/reset the inactivity timer
    restartAutoReset();

    // Listen for user activity
    window.addEventListener("mousemove", onUserActivity);
    window.addEventListener("keydown", onUserActivity);
    window.addEventListener("click", onUserActivity);

    return () => {
      if (timeout) clearTimeout(timeout);
      window.removeEventListener("mousemove", onUserActivity);
      window.removeEventListener("keydown", onUserActivity);
      window.removeEventListener("click", onUserActivity);
    };
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
  );
}
