import { inter } from "./ui/fonts";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { ReduxProvider } from "../redux/provider";
// import ActivityTracker from "./components/ActivityTracker";
import ResetPasswordModal from "./components/ResetDefaultPassword";
import { Toaster } from "@/components/ui/sonner";
import SessionMonitor from "./components/SessionMonitor";

export const metadata = {
  title: "Audease",
  description: "Audease App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-bgDefault`}>
        <NextTopLoader color="#FAA32C" />

        <ReduxProvider>
          <ResetPasswordModal />
          {/* <ActivityTracker /> */}
          <SessionMonitor>{children}</SessionMonitor>
          <Toaster position="bottom-right" theme="light" richColors />
        </ReduxProvider>
      </body>
    </html>
  );
}
