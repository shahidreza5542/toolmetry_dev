import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Toolmetry — 18 Developer Tools, Zero Dependencies",
  description: "18 essential developer tools in one zero-dependency package. Full TypeScript, Node + Browser support.",
  keywords: ["toolmetry", "developer tools", "base64", "hash", "JWT", "UUID", "npm package", "TypeScript"],
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
