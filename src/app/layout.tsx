import type { Metadata } from "next";
import "./globals.css";
import ToastProvider from "@/providers/ToastProvider";

export const metadata: Metadata = {
  title: "EmojAI",
  description: "Utilise the power of AI to recommend emojis for your text!",
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
      </body>
    </html>
  );
}
