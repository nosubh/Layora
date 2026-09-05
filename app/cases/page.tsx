import type { Metadata } from "next";
import CategoryHeader from "@/components/CategoryHeader";
import CasesCatalogView from "@/components/CasesCatalogView";
import { getProductsByCategory } from "@/lib/products";

export const metadata: Metadata = {
  title: "Mobile Cases & Designer Covers",
  description:
    "Explore LAYORA's signature Pop Art, Funky & Persian Heritage Phone Cases. Premium shockproof protection with vibrant, durable artwork for iPhone and Samsung Galaxy.",
};

export default function CasesPage() {
  const products = getProductsByCategory("accessories");

  return (
    <div>
      <CategoryHeader
        eyebrow="Designer Phone Cases"
        title="Mobile Cases &amp; Accessories"
        description="Expressive, protective, and designer phone cases engineered with shockproof protection, Persian carpet heritage motifs, and vibrant pop art prints."
      />
      <div className="container-layora py-10 sm:py-14 lg:py-20">
        <CasesCatalogView products={products} />
      </div>
    </div>
  );
}
