import type { Metadata } from "next";
import CategoryHeader from "@/components/CategoryHeader";
import ProductGrid from "@/components/ProductGrid";
import { getProductsByCategory } from "@/lib/products";
import { getCategory } from "@/lib/categories";

export const metadata: Metadata = {
  title: "Makeup",
  description:
    "Shop LAYORA's makeup essentials — lip tints, setting powder, blush, kajal and highlighter in wearable shades.",
};

export default function MakeupPage() {
  const category = getCategory("makeup")!;
  const products = getProductsByCategory("makeup");

  return (
    <div>
      <CategoryHeader
        eyebrow="Category"
        title={category.name}
        description={category.description}
      />
      <div className="container-layora py-14 lg:py-20">
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
