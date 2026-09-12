import type { Metadata } from "next";
import { Manrope, Unbounded } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: site.meta.title,
  description: site.meta.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={site.meta.lang} className="bg-ink">
      <head>
        <link rel="preload" as="image" href="/sequence/frame-000.webp" />
      </head>
      <body
        className={`${manrope.variable} ${unbounded.variable} font-sans bg-ink text-paper antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
