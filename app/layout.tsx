import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono, Noto_Serif_SC } from "next/font/google";
import localFont from "next/font/local";
import { BackgroundVideo } from "@/components/background-video";
import "@/styles/globals.css";

const roadRage = localFont({
  src: "../fonts/Road-Rage.otf",
  display: "swap",
  variable: "--font-logo",
  weight: "400",
});

const sansFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
  weight: "400",
});

const monoFont = Space_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
  weight: "400",
});

const notoSerif = Noto_Serif_SC({
  subsets: ["latin"],
  variable: "--font-noto-sc",
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.makcu.com",
  ),
};

export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning style={{ overflowX: "hidden" }}>
      <body
        className={`${sansFont.variable} ${notoSerif.variable} ${monoFont.variable} ${roadRage.variable} font-basic antialiased tracking-wide relative`}
        suppressHydrationWarning
        style={{ position: "relative", overflowX: "hidden" }}
      >
        <BackgroundVideo />
        <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
      </body>
    </html>
  );
}
