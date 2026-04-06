import type { Metadata } from "next";

import { BaselineShell, HomePageContent } from "@/components/public/baseline-site";

export const metadata: Metadata = {
  title: "Student Distance Learning Hub",
  description: "Calm, clear remote-learning guidance for students at Jumeirah College.",
};

export default function HomePage() {
  return (
    <BaselineShell>
      <HomePageContent />
    </BaselineShell>
  );
}
