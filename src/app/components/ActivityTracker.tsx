"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useRef, useCallback } from "react";
import { persistor } from "@/redux/store";

const whitelist = [
  "/",
  "/signIn",
  "/signup",
  "/forgotPassword",
  "/reset-password",
];

const INACTIVITY_TIMEOUT = 1000 * 60 * 10; // 10 minutes

export default function ActivityTracker() {
  const route = usePathname();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Create functions first that don't reference each other
  const restartAutoReset = useCallback(() => {
    // Only set lastActiveAt if we're not on a whitelisted route and modal is not showing
    if (whitelist.includes(route) || showModal) return;
    
    // Save current timestamp as last active time
    localStorage.setItem("lastActiveAt", Date.now().toString());

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // We'll set up the timeout in a separate function to avoid circular references
  }, [route, showModal]);

  // This function only handles setting up the event listeners
  const setupEventListeners = useCallback((activityHandler: () => void, visibilityHandler: () => void, focusHandler: () => void) => {
    window.addEventListener("mousemove", activityHandler);
    window.addEventListener("keydown", activityHandler);
    window.addEventListener("click", activityHandler);
    window.addEventListener("scroll", activityHandler);
    window.addEventListener("touchstart", activityHandler);
    document.addEventListener("visibilitychange", visibilityHandler);
    window.addEventListener("focus", focusHandler);
  }, []);

  // This function only handles removing event listeners
  const removeAllEventListeners = useCallback((activityHandler: () => void, visibilityHandler: () => void, focusHandler: () => void) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    window.removeEventListener("mousemove", activityHandler);
    window.removeEventListener("keydown", activityHandler);
    window.removeEventListener("click", activityHandler);
    window.removeEventListener("scroll", activityHandler);
    window.removeEventListener("touchstart", activityHandler);
    document.removeEventListener("visibilitychange", visibilityHandler);
    window.removeEventListener("focus", focusHandler);
  }, []);

  // Logout function 
  const logout = useCallback(async (activityHandler: () => void, visibilityHandler: () => void, focusHandler: () => void) => {
    try {
      // Add timeout for network issues after sleep
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const response = await fetch("/api/logout", { 
        method: "POST",
        signal: controller.signal
      });
      
      // Clean up Redux state
      await persistor.purge();
      
      clearTimeout(timeoutId);

      if (!response.ok) {
        console.error('Logout failed:', response.status);
      }
    } catch (error) {
      console.error('Logout request failed:', error);
    } finally {
      // Always clean up client-side and show modal regardless of server response
      localStorage.removeItem("lastActiveAt");
      localStorage.removeItem("pageHiddenAt");
      
      // Remove all event listeners to prevent any activity tracking while modal is shown
      removeAllEventListeners(activityHandler, visibilityHandler, focusHandler);
      
      setShowModal(true);
    }
  }, [removeAllEventListeners]);

  // The core effect that sets up activity tracking
  useEffect(() => {
    // Check if we're redirecting to login
    const isRedirectingToLogin = sessionStorage.getItem("redirectingToLogin") === "true";
    
    // Don't run on whitelisted routes or when modal is showing or during login redirect
    const preventReset = whitelist.includes(route);
    if (preventReset || showModal || isRedirectingToLogin) {
      // If we're on the sign-in page, clear the redirecting flag
      if (route === "/signIn") {
        sessionStorage.removeItem("redirectingToLogin");
      }
      return;
    }

    // Handlers that will be registered and need to be passed to removal functions
    const checkInactivity = () => {
      const lastActiveAt = localStorage.getItem("lastActiveAt");
      if (lastActiveAt) {
        const now = Date.now();
        const diff = now - parseInt(lastActiveAt, 10);

        if (diff > INACTIVITY_TIMEOUT) {
          handleLogout();
          return true; 
        }
      }
      return false; 
    };

    const handleUserActivity = () => {
      // Check if we're in a state where activity should be ignored
      if (showModal || sessionStorage.getItem("redirectingToLogin") === "true") return;
      
      restartAutoReset();
    };

    const handleVisibilityChange = () => {
      // Check if we're in a state where activity should be ignored
      if (showModal || sessionStorage.getItem("redirectingToLogin") === "true") return;
      
      if (document.hidden) {
        localStorage.setItem("pageHiddenAt", Date.now().toString());
      } else {
        const pageHiddenAt = localStorage.getItem("pageHiddenAt");
        if (pageHiddenAt) {
          const hiddenTime = Date.now() - parseInt(pageHiddenAt, 10);
          
          if (hiddenTime > 600000) { // 10 minutes
            handleLogout();
            return;
          }
        }
        
        if (!checkInactivity()) {
          restartAutoReset();
        }
      }
    };

    const handleWindowFocus = () => {
      // Check if we're in a state where activity should be ignored
      if (showModal || sessionStorage.getItem("redirectingToLogin") === "true") return;
      
      const pageHiddenAt = localStorage.getItem("pageHiddenAt");
      if (pageHiddenAt) {
        const hiddenTime = Date.now() - parseInt(pageHiddenAt, 10);
        
        if (hiddenTime > 600000) { // 10 minutes
          handleLogout();
          return;
        }
      }
      
      if (!checkInactivity()) {
        restartAutoReset();
      }
    };

    const handleLogout = () => {
      logout(handleUserActivity, handleVisibilityChange, handleWindowFocus);
    };

    // Set up the actual timeout with the handlers created in this scope
    const setupTimeout = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      timeoutRef.current = setTimeout(() => {
        handleLogout();
      }, INACTIVITY_TIMEOUT);
    };

    // Complete the restartAutoReset function
    const completeRestart = () => {
      restartAutoReset();
      setupTimeout();
    };

    // Check for inactivity first
    if (checkInactivity()) {
      return; // User already logged out
    }

    // Start the timer
    completeRestart();

    // Set up event listeners
    setupEventListeners(handleUserActivity, handleVisibilityChange, handleWindowFocus);

    // Cleanup function
    return () => {
      removeAllEventListeners(handleUserActivity, handleVisibilityChange, handleWindowFocus);
    };
  }, [route, showModal, restartAutoReset, setupEventListeners, removeAllEventListeners, logout]);

  const handleLogin = () => {
    // 1. Remove any localStorage keys first
    localStorage.removeItem("lastActiveAt");
    localStorage.removeItem("pageHiddenAt");
    
    // 2. Set a flag in sessionStorage to prevent activity tracking during navigation
    sessionStorage.setItem("redirectingToLogin", "true");
    
    // 3. Close the modal
    setShowModal(false);
    
    // 4. Navigate to login page with a tiny delay to ensure state is updated
    setTimeout(() => {
      router.push("/signIn");
    }, 0);
  };

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