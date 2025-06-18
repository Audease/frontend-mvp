"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

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
  let timeout = null;

  const restartAutoReset = () => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      const logout = async () => {
        await fetch("/api/logout", {
          method: "POST",
        });
        router.push("/signIn");
        // if (response.ok) {
        //   router.push("/signIn");
        // } else {
        //   console.error("Failed to log out");
        // }
      };
      logout();
    }, 1000 * 60 * 10); // 10 minutes
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

  return <div></div>;
}
