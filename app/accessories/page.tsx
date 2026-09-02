import type { Metadata } from "next";
import CategoryHeader from "@/components/CategoryHeader";
import ProductGrid from "@/components/ProductGrid";
import { getProductsByCategory } from "@/lib/products";
import { getCategory } from "@/lib/categories";

export const metadata: Metadata = {
  title: "Accessories",
  description:
    "Explore LAYORA's curated accessories collection — statement pop art phone cases, protective mobile covers, and artisanal everyday essentials.",
};

export default function AccessoriesPage() {
  const category = getCategory("accessories");
  const products = getProductsByCategory("accessories");

  return (
    <div>
      <CategoryHeader
        eyebrow="Curated Lifestyle"
        title={category?.name || "Accessories"}
        description={
          category?.description ||
          "Curated statement lifestyle accessories, designer pop-art mobile covers, fine jewelry, and everyday essentials."
        }
      />
      <div className="container-layora py-14 lg:py-20">
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
