import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RealAI Mastery — AI for Real Estate Agents",
  description:
    "Master AI tools to generate more leads, write better listings, and close more deals. The #1 AI course for real estate professionals.",
  keywords: [
    "AI for real estate",
    "real estate AI course",
    "AI real estate agents",
    "ChatGPT real estate",
    "AI lead generation real estate",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
