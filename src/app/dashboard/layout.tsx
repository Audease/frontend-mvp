import Navbar from "../components/dashboard/Navbar";
import NextTopLoader from "nextjs-toploader";
import { Suspense } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-switzer bg-white max-w-[1440px] flex flex-col justify-center m-auto">
      <div className="bg-white border-b-2">
        <NextTopLoader color="#FAA32C" />
        <Navbar />
      </div>
      <div className="bg-white m-10">
        <Suspense fallback={<p>Loading feed...</p>}>{children} </Suspense>
      </div>
    </div>
  );
}
