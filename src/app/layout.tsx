import { inter } from "./ui/fonts";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { ReduxProvider } from "../redux/provider";

export const metadata = {
  title: "Audease",
  description: "Audease App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-bgDefault`}>
        <NextTopLoader color="#FAA32C" />
        <ReduxProvider> {children} </ReduxProvider>
      </body>
    </html>
  );
}
