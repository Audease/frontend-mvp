"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();

  return (
    <div className="bg-bgDefault font-switzer h-screen w-full flex flex-row justify-center items-center m-auto space-x-10">
      <Button className="bg-dashboardButtons" onClick={() => router.push("/signIn")}>Login</Button>
      <Button className="bg-dashboardButtons" onClick={() => router.push("/signup")}>Sign up</Button>
    </div>
  );
}
