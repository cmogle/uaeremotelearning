import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: {
    default: "Jumeirah College Distance Learning Hub",
    template: "%s | Jumeirah College Distance Learning Hub",
  },
  description: "Calm, accessible remote-learning guidance for students at Jumeirah College.",
  applicationName: "Jumeirah College Distance Learning Hub",
  openGraph: {
    title: "Jumeirah College Distance Learning Hub",
    description: "Calm, accessible remote-learning guidance for students at Jumeirah College.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Jumeirah College Distance Learning Hub",
    description: "Calm, accessible remote-learning guidance for students at Jumeirah College.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
