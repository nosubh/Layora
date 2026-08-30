import type { Metadata } from "next";
import CategoryHeader from "@/components/CategoryHeader";
import ProductGrid from "@/components/ProductGrid";
import { getProductsByCategory } from "@/lib/products";
import { getCategory } from "@/lib/categories";

export const metadata: Metadata = {
  title: "Dresses",
  description:
    "Shop LAYORA's edit of dresses — evening gowns, wrap dresses, midi and slip styles in premium fabrics.",
};

export default function DressesPage() {
  const category = getCategory("dresses")!;
  const products = getProductsByCategory("dresses");

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
