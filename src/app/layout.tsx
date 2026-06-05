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
  title: "Voice AI - A Phone Plan with a Receptionist",
  description:
    "Get a mobile phone plan with an AI voice receptionist built in. Answer missed calls, screen spam, take messages, and follow up from your real number.",
  // Pre-launch: keep this out of search results.
  robots: { index: false, follow: false },
  keywords: [
    "AI phone carrier",
    "AI receptionist",
    "small business phone plan",
    "AI call answering",
    "virtual receptionist",
    "Voice.ai Phone",
  ],
  openGraph: {
    title: "Voice AI - A Phone Plan with a Receptionist",
    description:
      "Get a mobile phone plan with an AI voice receptionist built in. Answer missed calls, screen spam, take messages, and follow up from your real number.",
    type: "website",
    siteName: "Voice.ai Phone",
  },
  twitter: {
    card: "summary_large_image",
    title: "Voice AI - A Phone Plan with a Receptionist",
    description:
      "Get a mobile phone plan with an AI voice receptionist built in. Answer missed calls, screen spam, take messages, and follow up from your real number.",
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
