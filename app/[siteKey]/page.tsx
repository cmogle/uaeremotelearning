import { redirect } from "next/navigation";

export default async function SiteRoute({
  params,
}: {
  params: Promise<{ siteKey: string }>;
}) {
  await params;
  redirect("/");
}
