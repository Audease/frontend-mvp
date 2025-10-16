"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logOut } from "@/redux/features/login/auth-slice";
import { persistor } from "@/redux/store";

/**
 * Hook to monitor session validity and automatically logout on refresh token failure
 * @param checkInterval - How often to check session validity (in milliseconds), default 5 minutes
 */
export const useSessionMonitor = (checkInterval: number = 5 * 60 * 1000) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleSessionExpired = async () => {
    try {
      // Clear persisted state
      await persistor.purge();
      localStorage.removeItem("persist:root");
      localStorage.removeItem("lastActiveAt");
      localStorage.removeItem("pageHiddenAt");

      // Dispatch logout action
      dispatch(logOut());

      // Redirect to login
      router.push("/signIn");
    } catch (error) {
      console.error("Error during automatic logout:", error);
    }
  };

  const checkSession = async () => {
    try {
      const response = await fetch("/api/auth/check-session", {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok || !data.valid) {
        console.warn("Session invalid:", data.reason);
        await handleSessionExpired();
      }
    } catch (error) {
      console.error("Error checking session:", error);
    }
  };

  useEffect(() => {
    // Initial check
    checkSession();

    // Set up periodic checks
    intervalRef.current = setInterval(checkSession, checkInterval);

    // Also check when window becomes visible again
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        checkSession();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Cleanup
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [checkInterval]);
};
