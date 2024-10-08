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
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🤖</text></svg>"
        />
      </head>
      <body className={`antialiased prose min-h-screen`}>
        <ToastProvider>{children}</ToastProvider>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
