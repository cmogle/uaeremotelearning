import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "UAE Remote Learning",
  description: "Calm, accessible remote-learning guidance for students and the adults supporting them.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
