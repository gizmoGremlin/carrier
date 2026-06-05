import type { Metadata } from "next";
import { Bricolage_Grotesque, Hanken_Grotesk } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--ff-display",
  weight: ["600", "700", "800"],
  display: "swap",
});

const sans = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--ff-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://voice.ai"),
  title: "Voice.ai Phone — The carrier that answers for you",
  description:
    "Switch to a phone plan that screens, answers, and summarizes every call for you — for less than your carrier today.",
  keywords: [
    "AI carrier",
    "AI phone plan",
    "spam call blocker",
    "AI call screening",
    "virtual receptionist",
    "Voice.ai Phone",
  ],
  openGraph: {
    title: "Voice.ai Phone — The carrier that answers for you",
    description:
      "A phone plan that screens, answers, and summarizes every call. Less than you pay today.",
    type: "website",
    siteName: "Voice.ai Phone",
  },
  twitter: {
    card: "summary_large_image",
    title: "Voice.ai Phone — The carrier that answers for you",
    description:
      "A phone plan that screens, answers, and summarizes every call.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} h-full`}>
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
