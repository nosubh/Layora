import type { Metadata } from "next";
import CategoryHeader from "@/components/CategoryHeader";
import CategoryTile from "@/components/CategoryTile";
import ProductGrid from "@/components/ProductGrid";
import SectionHeading from "@/components/SectionHeading";
import { getProductsByCategory } from "@/lib/products";
import { getCategory } from "@/lib/categories";

export const metadata: Metadata = {
  title: "Accessories",
  description:
    "Shop LAYORA accessories — fine jewelry and mobile cases designed to be worn and used every day.",
};

export default function AccessoriesPage() {
  const category = getCategory("accessories")!;
  const products = getProductsByCategory("accessories");

  return (
    <div>
      <CategoryHeader
        eyebrow="Category"
        title={category.name}
        description={category.description}
      />

      <div className="container-layora py-14 lg:py-20">
        <div className="mb-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mb-24">
          {category.subcategories.map((sub) => (
            <CategoryTile
              key={sub.slug}
              name={sub.name}
              href={`/accessories/${sub.slug}`}
              image={`/products/category-${sub.slug}.svg`}
            />
          ))}
        </div>

        <SectionHeading eyebrow="All Accessories" title="Every Piece" />
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
