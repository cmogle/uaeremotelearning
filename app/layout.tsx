import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "UAE Remote Learning",
  description: "A shared Next.js site for Jumeirah College and generic distance-learning resources.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
