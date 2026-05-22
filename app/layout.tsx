import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "./providers";
import { AppNavigation } from "./components/AppNavigation.client";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CheFu Store",
  description: "The official CheFu platform for discovering and downloading trusted desktop applications across all major operating systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex">
        <Providers>
          <AppNavigation />
          <div className="flex-1 overflow-y-auto bg-background text-foreground">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
