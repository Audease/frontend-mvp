import Form from "./form";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row h-screen justify-center items-center m-auto bg-bgDefault">
      <div>{children}</div>
      <div>
        <Form />
      </div>
    </div>
  );
}
