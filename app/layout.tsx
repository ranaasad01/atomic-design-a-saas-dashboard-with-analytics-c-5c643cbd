import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pulse Analytics — Modern SaaS Dashboard",
  description:
    "Monitor your business performance with real-time KPIs, revenue charts, user growth metrics, and actionable insights — all in one beautiful dashboard.",
  keywords: ["SaaS", "analytics", "dashboard", "metrics", "revenue", "KPI"],
  authors: [{ name: "Pulse Analytics" }],
  openGraph: {
    title: "Pulse Analytics — Modern SaaS Dashboard",
    description: "Monitor your business performance with real-time KPIs and analytics.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} font-sans bg-[#0F0F1A] text-slate-100 antialiased min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}