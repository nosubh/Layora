"use client";

import { useState } from "react";
import ProductGrid from "@/components/ProductGrid";
import { Product } from "@/lib/types";

export default function CasesCatalogView({ products }: { products: Product[] }) {
  const [filter, setFilter] = useState<"all" | "persian" | "pop-art">("all");

  const persianProducts = products.filter((p) => p.subcategory === "persian-heritage");
  const popArtProducts = products.filter((p) => p.subcategory !== "persian-heritage");

  const displayedProducts =
    filter === "persian"
      ? persianProducts
      : filter === "pop-art"
      ? popArtProducts
      : products;

  return (
    <div>
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 mb-10">
        <button
          onClick={() => setFilter("all")}
          className={`rounded-full px-5 py-2 text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-200 ${
            filter === "all"
              ? "bg-ink text-cream shadow-sm scale-105"
              : "bg-sand/70 text-ink/75 hover:text-ink hover:bg-sand"
          }`}
        >
          All Designs ({products.length})
        </button>

        <button
          onClick={() => setFilter("persian")}
          className={`rounded-full px-5 py-2 text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-200 flex items-center gap-2 ${
            filter === "persian"
              ? "bg-ink text-cream shadow-sm scale-105"
              : "bg-sand/70 text-ink/75 hover:text-ink hover:bg-sand"
          }`}
        >
          <span>Persian Heritage ({persianProducts.length})</span>
          <span className="rounded-full bg-rose-200 px-2 py-0.5 text-[9px] font-bold text-rose-900 uppercase">
            New
          </span>
        </button>

        <button
          onClick={() => setFilter("pop-art")}
          className={`rounded-full px-5 py-2 text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-200 ${
            filter === "pop-art"
              ? "bg-ink text-cream shadow-sm scale-105"
              : "bg-sand/70 text-ink/75 hover:text-ink hover:bg-sand"
          }`}
        >
          Pop Art &amp; Funky ({popArtProducts.length})
        </button>
      </div>

      {/* Product Grid */}
      <ProductGrid products={displayedProducts} />
    </div>
  );
}
