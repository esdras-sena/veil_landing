import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const title = "Veil — Private, compliant settlement for tokenized real-world assets";
const description =
  "Veil is the confidential, compliant settlement layer for tokenized real-world assets on Starknet. Hidden positions and balances, KYC + ERC-3643 compliance, issuer freeze & recovery, and authorized-auditor view keys.";

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL("https://veil-rwa.vercel.app"),
  icons: { icon: "/veil-logo.png" },
  openGraph: {
    title,
    description,
    type: "website",
    images: [{ url: "/veil-logo.png", width: 512, height: 512, alt: "Veil" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/veil-logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}