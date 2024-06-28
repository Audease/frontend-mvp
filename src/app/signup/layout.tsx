import FormStep from "../components/FormStep";


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-bgDefault">
      <div className="flex flex-col lg:flex-row justify-center items-center max-w-[1400px] m-auto lg:space-x-[7rem] space-y-10 scale-[0.9] ">
        <div className="w-[20rem] md:w-[22rem] lg:w-[27rem]">{children}</div>
        <div className="w-[20rem] md:w-[25rem] lg:w-[25rem] mx-8">
          <FormStep />
        </div>
      </div>
    </div>
  );
}
