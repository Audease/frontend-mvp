"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useRef, useCallback } from "react";

const whitelist = [
  "/",
  "/signIn",
  "/signup",
  "/forgotPassword",
  "/reset-password",
];

const INACTIVITY_TIMEOUT = 1000 * 60 * 1; // 10 minutes

export default function ActivityTracker() {
  const route = usePathname();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleLogin = () => {
    setShowModal(false);
    router.push("/signIn");
  };

  const logout = useCallback(async () => {
    await fetch("/api/logout", { method: "POST" });
    localStorage.removeItem("lastActiveAt");
    setShowModal(true);
  }, []);

  const checkInactivity = useCallback(() => {
    const lastActiveAt = localStorage.getItem("lastActiveAt");
    if (lastActiveAt) {
      const now = Date.now();
      const diff = now - parseInt(lastActiveAt, 1);

      if (diff > INACTIVITY_TIMEOUT) {
        logout();
        return true; // User was inactive
      }
    }
    return false; // User is still active
  }, [logout]);

  const restartAutoReset = useCallback(() => {
    // Save current timestamp as last active time
    localStorage.setItem("lastActiveAt", Date.now().toString());

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      logout();
    }, INACTIVITY_TIMEOUT);
  }, [logout]);

  const onUserActivity = useCallback(() => {
    restartAutoReset();
  }, [restartAutoReset]);

  // Handle visibility change (tab focus, window focus, system wake)
  const handleVisibilityChange = useCallback(() => {
    if (!document.hidden) {
      // Page became visible - check if user was inactive while away
      if (!checkInactivity()) {
        // User is still active, restart the timer
        restartAutoReset();
      }
    }
  }, [checkInactivity, restartAutoReset]);

  // Handle window focus (additional layer for system wake detection)
  const handleWindowFocus = useCallback(() => {
    if (!checkInactivity()) {
      restartAutoReset();
    }
  }, [checkInactivity, restartAutoReset]);

  useEffect(() => {
    let preventReset = whitelist.includes(route);

    if (preventReset) return;

    // Initial inactivity check
    if (checkInactivity()) {
      return; // User was already logged out
    }

    // Start/reset the inactivity timer
    restartAutoReset();

    // Listen for user activity
    window.addEventListener("mousemove", onUserActivity);
    window.addEventListener("keydown", onUserActivity);
    window.addEventListener("click", onUserActivity);
    window.addEventListener("scroll", onUserActivity);
    window.addEventListener("touchstart", onUserActivity);

    // Listen for visibility/focus changes (handles sleep/wake)
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleWindowFocus);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      window.removeEventListener("mousemove", onUserActivity);
      window.removeEventListener("keydown", onUserActivity);
      window.removeEventListener("click", onUserActivity);
      window.removeEventListener("scroll", onUserActivity);
      window.removeEventListener("touchstart", onUserActivity);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleWindowFocus);
    };
  }, [route, checkInactivity, restartAutoReset, onUserActivity, handleVisibilityChange, handleWindowFocus]);

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