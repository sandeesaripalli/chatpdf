import { ClerkProvider } from "@clerk/nextjs";
import "./global.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "@/components/Providers";
import { Toaster } from "react-hot-toast";
import "simplebar-react/dist/simplebar.min.css";
import Metrics from "./metrics";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ChatPdf",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <Providers>
        <html lang="en">
          <body className={inter.className}>
            {children}
            <Metrics />
          </body>
          <Toaster />
        </html>
      </Providers>
    </ClerkProvider>
  );
}
