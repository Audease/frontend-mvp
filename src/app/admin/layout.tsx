import Navbar from "../components/dashboard/Navbar";
import NextTopLoader from "nextjs-toploader";


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-switzer bg-white max-w-[1440px] flex flex-col justify-center m-auto">
      <div className="bg-white border-b-2">
        <NextTopLoader color="#FAA32C" />
        <Navbar />
      </div>
      <div className="bg-white m-10">
        {children} 
      </div>
    </div>
  );
}
