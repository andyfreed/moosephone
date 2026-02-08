import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Moosephone | Pre-Configured Cloud Phones",
  description:
    "Moosephone delivers pre-configured Yealink cloud phones ready to plug in and go. Select your phones, configure your extensions, and we handle the rest.",
  keywords: ["cloud phone", "yealink", "voip", "business phone", "pre-configured"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        <Navbar />
        <main className="min-h-screen pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
