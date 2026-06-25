// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Elite SEO & Tab Identifier Configuration
export const metadata: Metadata = {
  title: "Umar Ghafoor // Full-Stack & AI Automation Engineer",
  description: "Production-ready Next.js architectures, self-hosted n8n automation pipelines, and high-performance digital commerce systems engineered by Umar Ghafoor.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0b0c0e] text-neutral-100`}
      >
        {children}
      </body>
    </html>
  );
}