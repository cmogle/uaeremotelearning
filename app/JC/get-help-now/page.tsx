import type { Metadata } from "next";

import { renderLivePage } from "@/components/variants/render";

export const metadata: Metadata = {
  title: "Get help now",
  description: "Immediate, calm support for common remote-learning problems at Jumeirah College.",
};

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function GetHelpNowPage({ searchParams }: Props) {
  const params = await searchParams;
  return renderLivePage("/get-help-now", params);
}
