import type { Metadata } from "next";

import { BaselineShell, SchoolDayPageContent } from "@/components/public/baseline-site";

export const metadata: Metadata = {
  title: "School day",
  description: "What matters in the remote school day, how lessons work, and how to make it manageable.",
};

export default function SchoolDayPage() {
  return (
    <BaselineShell>
      <SchoolDayPageContent />
    </BaselineShell>
  );
}
