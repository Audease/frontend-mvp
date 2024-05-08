import Form from "./form";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-bgDefault ">
      <div className="flex flex-row justify-center items-center h-screen max-w-[1400px] m-auto space-x-20 scale-[0.9]">
        <div className="w-[25rem]">{children}</div>
        <div className="w-[25rem]">
          <Form />
        </div>
      </div>
    </div>
  );
}
