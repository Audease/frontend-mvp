
import PasswordFormStep from "./PasswordFormStep";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-switzer flex bg-bgDefault m-auto items-center justify-center space-x-24">
      <div>{children}</div>
      <div>
        <PasswordFormStep />
      </div>
    </div>
  );
}
