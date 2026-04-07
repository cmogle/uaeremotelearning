import type { Metadata } from "next";

import { renderLivePage } from "@/components/variants/render";

export const metadata: Metadata = {
  title: "Wellbeing and support",
  description: "Wellbeing contacts, reset steps, and support routes for students learning remotely.",
};

export default function WellbeingSupportPage() {
  return renderLivePage("/wellbeing-support");
}
