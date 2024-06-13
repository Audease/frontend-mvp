import Navbar from "../../components/dashboard/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="font-switzer bg-white flex">
    <div className="bg-white border-b-2">
        <Navbar />
      </div>
      <div className="bg-white m-10">{children}</div>
  </div>;
}
