import { ClerkProvider } from "@clerk/nextjs";
import "./global.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "@/components/Providers";
import { Toaster } from "react-hot-toast";
import "simplebar-react/dist/simplebar.min.css";
import Script from "next/script";

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
            <Script id="clarity-script" strategy="afterInteractive">
              {`
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID}");`}
            </Script>
          </body>
          <Toaster />
        </html>
      </Providers>
    </ClerkProvider>
  );
}
