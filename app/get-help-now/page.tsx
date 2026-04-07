import type { Metadata } from "next";

import { renderLivePage } from "@/components/variants/render";

export const metadata: Metadata = {
  title: "Get help now",
  description: "Immediate, calm support for common remote-learning problems at Jumeirah College.",
};

export default function GetHelpNowPage() {
  return renderLivePage("/get-help-now");
}
