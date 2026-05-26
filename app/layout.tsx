import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BackIn5 — 24/7 Enquiry Handling For Busy Trades Firms",
  description:
    "BackIn5 catches every missed call, replies in seconds, qualifies the enquiry and books it into your diary. Less hassle. Fewer missed jobs. More organised enquiries.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
