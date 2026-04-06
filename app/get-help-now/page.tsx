import type { Metadata } from "next";

import { BaselineShell, HelpPageContent } from "@/components/public/baseline-site";

export const metadata: Metadata = {
  title: "Get help now",
  description: "Immediate, calm support for common remote-learning problems at Jumeirah College.",
};

export default function GetHelpNowPage() {
  return (
    <BaselineShell>
      <HelpPageContent />
    </BaselineShell>
  );
}
