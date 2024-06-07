
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-switzer flex bg-bgDefault m-auto items-center justify-center">
      <div>{children}</div>
    </div>
  );
}
