import type { Metadata } from "next";
import CategoryHeader from "@/components/CategoryHeader";
import ProductGrid from "@/components/ProductGrid";
import { getProductsBySubcategory } from "@/lib/products";
import { getSubcategory } from "@/lib/categories";

export const metadata: Metadata = {
  title: "Mobile Cases",
  description:
    "Shop LAYORA mobile cases — marble silicone, quilted leather, woven cord and pearl charm styles.",
};

export default function MobileCasesPage() {
  const sub = getSubcategory("accessories", "mobile-cases")!;
  const products = getProductsBySubcategory("accessories", "mobile-cases");

  return (
    <div>
      <CategoryHeader
        eyebrow="Accessories"
        title={sub.name}
        description={sub.description}
      />
      <div className="container-layora py-14 lg:py-20">
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
