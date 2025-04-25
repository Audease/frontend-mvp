import LearnerNav from "./components/LearnerNav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-switzer bg-white max-w-[1440px] flex flex-col justify-center m-auto">
      <div className="bg-white">
        <LearnerNav />
      </div>
      <div className="bg-white">{children}</div>
    </div>
  );
}
