
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-switzer bg-white max-w-[1440px]">
      <div className="bg-white">{children}</div>
      <div className="bg-white">
      </div>
    </div>
  );
}
