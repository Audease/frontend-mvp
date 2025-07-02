"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  const logout = async () => {
    const response = await fetch("/api/logout", {
      method: "POST",
    });
    if (response.ok) {
      localStorage.removeItem("lastActiveAt");
      router.push("/signIn");
    } else {
      console.error("Failed to log out");
    }
    router.push("/signIn");
  };
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 text-center px-4">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <h2 className="text-2xl text-gray-600 mt-2">Page Not Found</h2>
      <p className="text-gray-500 mt-4 mb-6">
        Sorry, we couldn&apos;t find the page you&apos;re looking for.
      </p>
      <Button
        className="px-6 py-3 bg-dashboardButtons text-white rounded-lg shadow hover:bg-dashboardButtons/70 hover:text-black transition"
        onClick={logout}
      >
        Return Home
      </Button>
    </div>
  );
}
