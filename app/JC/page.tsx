import type { Metadata } from "next";

import { renderLivePage } from "@/components/variants/render";

export const metadata: Metadata = {
  title: "Student Distance Learning Hub",
  description: "Calm, clear remote-learning guidance for students at Jumeirah College.",
};

export default function HomePage() {
  return renderLivePage("/");
}
