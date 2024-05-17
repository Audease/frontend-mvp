import FormStep from "../components/FormStep";
import Form1, { Form2, Form3 } from "../signup/forms";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-bgDefault">
      <div className="flex flex-row justify-center items-center h-screen max-w-[1400px] m-auto space-x-[7rem] scale-[0.9]">
        <div className="w-[27rem]">{children}</div>
        <div className="w-[25rem]">
          <FormStep />
          {/* <Form2 handleSubmit={''} /> */}
        </div>
      </div>
    </div>
  );
}
