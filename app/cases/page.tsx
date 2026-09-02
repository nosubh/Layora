import type { Metadata } from "next";
import CategoryHeader from "@/components/CategoryHeader";
import ProductGrid from "@/components/ProductGrid";
import { getProductsByCategory } from "@/lib/products";
import { getCategory } from "@/lib/categories";

export const metadata: Metadata = {
  title: "Mobile Cases",
  description:
    "Explore LAYORA's signature Pop Art & Funky Phone Cases. Premium shockproof protection with vibrant, durable artwork for iPhone and Samsung Galaxy.",
};

export default function CasesPage() {
  const products = getProductsByCategory("accessories");

  return (
    <div>
      <CategoryHeader
        eyebrow="Designer Phone Cases"
        title="Mobile Cases &amp; Accessories"
        description="Expressive, protective, and designer phone cases engineered with shockproof protection and vibrant high-definition pop art prints."
      />
      <div className="container-layora py-14 lg:py-20">
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
