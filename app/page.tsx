import { redirect } from "next/navigation";

import { getDefaultSiteKey } from "@/lib/default-site";

export default function HomePage() {
  redirect(`/${getDefaultSiteKey()}`);
}
