import type { Metadata } from "next";
import CategoryHeader from "@/components/CategoryHeader";
import CasesCatalogView from "@/components/CasesCatalogView";
import { getProductsByCategory } from "@/lib/products";
import { getCategory } from "@/lib/categories";

export const metadata: Metadata = {
  title: "Accessories & Designer Phone Cases",
  description:
    "Explore LAYORA's curated accessories collection — Persian Heritage covers, statement pop art phone cases, and artisanal everyday essentials.",
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
      <div className="container-layora py-10 sm:py-14 lg:py-20">
        <CasesCatalogView products={products} />
      </div>
    </div>
  );
}
