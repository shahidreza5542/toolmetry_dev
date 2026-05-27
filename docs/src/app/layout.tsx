import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Toolmetry Developer Web",
  description: "Comprehensive developer tools library — Base64, URL encoding, hashing, JWT, UUID, AES-256 encryption, and more. npm i toolmetry",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme') || 'dark';
                document.documentElement.setAttribute('data-theme', theme);
              } catch {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen" style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
        {children}
      </body>
    </html>
  );
}
