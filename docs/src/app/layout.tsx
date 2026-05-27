import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Toolmetry Developer Web — npm i toolmetry",
  description: "Official documentation for toolmetry npm package. Base64, URL encoding, hashing, JWT, UUID, AES-256 encryption, random generation, and 18+ utilities.",
  keywords: ["toolmetry", "npm", "developer tools", "base64", "hash", "jwt", "uuid", "aes-256", "encryption"],
  openGraph: {
    title: "Toolmetry Developer Web",
    description: "Comprehensive developer tools library for JavaScript & TypeScript",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function(){try{var t=localStorage.getItem('theme')||'light';document.documentElement.setAttribute('data-theme',t)}catch{}})()`}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
