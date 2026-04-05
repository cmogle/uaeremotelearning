import type { Metadata } from "next";

import { BaselineShell, WellbeingPageContent } from "@/components/public/baseline-site";

export const metadata: Metadata = {
  title: "Wellbeing & Support",
  description: "Wellbeing contacts, reset steps, and support routes for students learning remotely.",
};

export default function WellbeingSupportPage() {
  return (
    <BaselineShell>
      <WellbeingPageContent />
    </BaselineShell>
  );
}
