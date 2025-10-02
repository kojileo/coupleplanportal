import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const bodyFont = Noto_Sans_JP({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-sans",
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "CouplePlan Portal",
    template: "%s | CouplePlan",
  },
  description:
    "AI-powered couple experience platform for planning, collaborating and strengthening relationships.",
  metadataBase: new URL("https://coupleplan.example"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={`${bodyFont.variable} min-h-screen bg-neutral-50 text-neutral-900 antialiased`}>
        {children}
      </body>
    </html>
  );
}
