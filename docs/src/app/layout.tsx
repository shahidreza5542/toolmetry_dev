import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/app/components/ThemeProvider";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Toolmetry — 18 Developer Tools, Zero Dependencies",
  description: "Comprehensive developer tools library for JavaScript and TypeScript. 18 essential modules including Base64, Hash, JWT, UUID, Encrypt, and more. Zero dependencies, full TypeScript, Node + Browser.",
  keywords: ["toolmetry", "developer tools", "base64", "hash", "JWT", "UUID", "npm package", "TypeScript", "JavaScript", "encrypt", "random", "password", "morse", "color converter"],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "Toolmetry — 18 Developer Tools, Zero Dependencies",
    description: "Comprehensive developer tools library for JavaScript and TypeScript. 18 essential modules, zero dependencies, full TypeScript support.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
