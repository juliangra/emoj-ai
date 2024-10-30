import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import ToastProvider from "@/providers/ToastProvider";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "EmojAI - AI Emoji Recommender",
  description:
    "Utilise the power of ✨AI ✨ to recommend emojis for your text!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased prose min-h-screen`}>
        <ToastProvider>{children}</ToastProvider>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
