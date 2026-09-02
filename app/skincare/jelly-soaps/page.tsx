import type { Metadata } from "next";
import Link from "next/link";
import CategoryHeader from "@/components/CategoryHeader";
import ProductGrid from "@/components/ProductGrid";
import { getProductsBySubcategory } from "@/lib/products";
import { getSubcategory } from "@/lib/categories";
import { buildGeneralContactUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Customized Jelly Soaps",
  description:
    "Handcrafted, organic, bouncy jelly soaps with custom initial engraving and delicious natural scents at LAYORA.",
};

export default function JellySoapsPage() {
  const subcategory = getSubcategory("skincare", "jelly-soaps");
  const products = getProductsBySubcategory("skincare", "jelly-soaps");

  return (
    <div>
      <CategoryHeader
        eyebrow="Skincare Subcategory"
        title={subcategory?.name || "Customized Jelly Soaps"}
        description={
          subcategory?.description ||
          "Handcrafted, hydrating, and customized jelly soaps made with gentle botanical ingredients and personalized scents."
        }
      />
      <div className="container-layora py-10 sm:py-16">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-line/60 pb-5">
          <div>
            <p className="eyebrow text-rose-dark mb-1">Small Batch &amp; Personalized</p>
            <h2 className="font-display text-2xl sm:text-3xl italic text-ink">
              All 15 Handcrafted Jelly Soaps
            </h2>
          </div>
          <a
            href={buildGeneralContactUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp text-xs py-2.5 px-4"
          >
            Custom Order on WhatsApp 💬
          </a>
        </div>
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
