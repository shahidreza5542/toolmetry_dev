import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Toolmetry — 21 Developer Tools, Zero Dependencies",
    template: "%s | Toolmetry Docs",
  },
  description:
    "Toolmetry provides 21 essential developer tools — Base64, URL, Hash, JWT, UUID, AES Encrypt, Random, Color, QR code, Markdown, Timestamp, and more — in one zero-dependency npm package with full TypeScript support. Works in Node.js and the browser.",
  keywords: [
    "toolmetry",
    "developer tools",
    "base64",
    "hash",
    "JWT",
    "UUID",
    "AES encryption",
    "npm package",
    "TypeScript",
    "zero dependencies",
    "encoding",
    "security",
    "utility",
    "JavaScript",
    "Node.js",
    "browser",
    "QR code",
    "markdown",
    "timestamp",
  ],
  authors: [{ name: "ToolmetryAI", url: "https://toolmetryai.com" }],
  creator: "ToolmetryAI",
  publisher: "ToolmetryAI",
  metadataBase: new URL("https://toolmetry-dev.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://toolmetry-dev.vercel.app",
    siteName: "Toolmetry",
    title: "Toolmetry — 21 Developer Tools, Zero Dependencies",
    description:
      "21 essential developer tools in one zero-dependency npm package. Full TypeScript, Node.js + Browser support. Encode, hash, encrypt, generate, convert.",
    images: [
      {
        url: "/logos/android-chrome-192x192.png",
        width: 192,
        height: 192,
        alt: "Toolmetry",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Toolmetry — 21 Developer Tools, Zero Dependencies",
    description:
      "21 essential developer tools in one zero-dependency npm package with full TypeScript support.",
    images: ["/logos/android-chrome-192x192.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/logos/favicon-32x32.png",
    apple: "/logos/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
