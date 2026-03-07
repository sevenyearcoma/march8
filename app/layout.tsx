import type { Metadata } from "next";
import { Caveat, Comfortaa } from "next/font/google";
import "./globals.css";

const caveat = Caveat({
  subsets: ["cyrillic", "latin"],
  variable: "--font-heading",
  display: 'swap',
});

const comfortaa = Comfortaa({
  subsets: ["cyrillic", "latin"],
  variable: "--font-text",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Special Invitation",
  description: "A special invitation for March 8th",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning className={`${caveat.variable} ${comfortaa.variable}`}>
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
