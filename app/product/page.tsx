import { ProductHub } from "@/components/product/product-hub";
import { getAllSiteKeys } from "@/lib/site-content";

export default function ProductPage() {
  return <ProductHub siteKeys={getAllSiteKeys()} />;
}
