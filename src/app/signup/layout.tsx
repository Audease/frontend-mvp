import FormStep from "../components/FormStep";


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-bgDefault">
      <div className="flex flex-row justify-center items-center max-w-[1400px] m-auto space-x-[7rem] scale-[0.9]">
        <div className="w-[27rem]">{children}</div>
        <div className="w-[25rem]">
          <FormStep />
        </div>
      </div>
    </div>
  );
}
