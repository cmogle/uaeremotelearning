import type { Metadata } from "next";

import { ContentDirectorGuide } from "@/components/director/content-director-guide";

export const metadata: Metadata = {
  title: "Content Director Guide",
  description: "A browser-based guide for the non-technical content director workflow.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ContentDirectorPage() {
  return <ContentDirectorGuide />;
}
