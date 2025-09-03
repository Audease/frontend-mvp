"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("https://www.audease.co.uk/")
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-bgDefault font-switzer h-screen w-full flex flex-row justify-center items-center m-auto space-x-10">
      <div>Redirecting...</div>
    </div>
  );
}