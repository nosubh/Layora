import type { Metadata } from "next";
import CategoryHeader from "@/components/CategoryHeader";
import ProductGrid from "@/components/ProductGrid";
import { getProductsBySubcategory } from "@/lib/products";
import { getSubcategory } from "@/lib/categories";

export const metadata: Metadata = {
  title: "Jewelry",
  description:
    "Shop LAYORA jewelry — rings, hoops, necklaces and bracelets in gold vermeil and sterling silver.",
};

export default function JewelryPage() {
  const sub = getSubcategory("accessories", "jewelry")!;
  const products = getProductsBySubcategory("accessories", "jewelry");

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
