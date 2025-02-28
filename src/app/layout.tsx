import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { PrivyProvider } from "@/components/PrivyProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HackTracker",
  description: "Track and manage your hackathon projects",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen bg-[#0f172a]`}>
        <PrivyProvider>
          <div className="relative min-h-screen">
            {/* Background patterns */}
            <div className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px]" />
            <div className="fixed inset-0 bg-gradient-to-tr from-[#0f172a] via-[#0f172a] to-[#0f172a]/90" />

            {/* Accent gradients */}
            <div className="fixed left-0 top-0 -translate-y-1/2 w-1/3 h-[500px] rounded-full bg-blue-500/10 blur-[128px] opacity-30" />
            <div className="fixed right-0 top-1/3 translate-x-1/2 w-1/3 h-[500px] rounded-full bg-blue-500/10 blur-[128px] opacity-30" />

            {/* Content */}
            <div className="relative z-10">
              <Navbar />
              <main className="relative">{children}</main>
            </div>
          </div>
        </PrivyProvider>
      </body>
    </html>
  );
}
