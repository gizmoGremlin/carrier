import type { Metadata } from "next";
import { Bricolage_Grotesque, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { MetaPixel } from "@/components/MetaPixel";

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
  title: "Voice.ai Phone — The AI phone carrier for your business",
  description:
    "Keep your number and get a phone plan with an AI receptionist built in — every call screened, answered, summarized, and booked. Built for small businesses that can't afford to miss a lead.",
  keywords: [
    "AI phone carrier",
    "AI receptionist",
    "small business phone plan",
    "AI call answering",
    "virtual receptionist",
    "Voice.ai Phone",
  ],
  openGraph: {
    title: "Voice.ai Phone — The AI phone carrier for your business",
    description:
      "A phone plan with an AI receptionist built in — every business call screened, answered, summarized, and booked. Keep your number.",
    type: "website",
    siteName: "Voice.ai Phone",
  },
  twitter: {
    card: "summary_large_image",
    title: "Voice.ai Phone — The AI phone carrier for your business",
    description:
      "A phone plan with an AI receptionist built in — every business call answered, summarized, and booked.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} h-full`}>
      <body className="min-h-full antialiased">
        <MetaPixel />
        {children}
      </body>
    </html>
  );
}
