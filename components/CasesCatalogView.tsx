"use client";

import { useState } from "react";
import ProductGrid from "@/components/ProductGrid";
import { Product } from "@/lib/types";

export default function CasesCatalogView({ products }: { products: Product[] }) {
  const [filter, setFilter] = useState<"persian" | "pop-art" | "bracelets">("persian");

  const persianProducts = products.filter((p) => p.subcategory === "persian-heritage");
  const popArtProducts = products.filter(
    (p) => p.subcategory !== "persian-heritage" && p.subcategory !== "bracelets"
  );
  const braceletProducts = products.filter((p) => p.subcategory === "bracelets");

  const displayedProducts =
    filter === "persian"
      ? persianProducts
      : filter === "pop-art"
      ? popArtProducts
      : braceletProducts;

  return (
    <div>
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 mb-10">

        <button
          onClick={() => setFilter("persian")}
          className={`rounded-full px-5 py-2 text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-200 flex items-center gap-2 ${
            filter === "persian"
              ? "bg-ink text-cream shadow-sm scale-105"
              : "bg-sand/70 text-ink/75 hover:text-ink hover:bg-sand"
          }`}
        >
          <span>Persian Heritage ({persianProducts.length})</span>
          <span className="rounded-full bg-yellow-300 px-2 py-0.5 text-[9px] font-bold text-yellow-900 uppercase">
            Sale 1900
          </span>
        </button>

        <button
          onClick={() => setFilter("pop-art")}
          className={`rounded-full px-5 py-2 text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-200 flex items-center gap-2 ${
            filter === "pop-art"
              ? "bg-ink text-cream shadow-sm scale-105"
              : "bg-sand/70 text-ink/75 hover:text-ink hover:bg-sand"
          }`}
        >
          <span>Pop Art &amp; Funky ({popArtProducts.length})</span>
          <span className="rounded-full bg-yellow-300 px-2 py-0.5 text-[9px] font-bold text-yellow-900 uppercase">
            Sale 1900
          </span>
        </button>

        {braceletProducts.length > 0 && (
          <button
            onClick={() => setFilter("bracelets")}
            className={`rounded-full px-5 py-2 text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-200 flex items-center gap-2 ${
              filter === "bracelets"
                ? "bg-rose-dark text-cream shadow-sm scale-105"
                : "bg-rose-100 text-rose-900 hover:bg-rose-200"
            }`}
          >
            <span>✨ Bracelets ({braceletProducts.length})</span>
            <span className="rounded-full bg-yellow-300 px-2 py-0.5 text-[9px] font-bold text-yellow-900 uppercase">
              Sale 399
            </span>
          </button>
        )}
      </div>

      {/* Sale notice banners */}
      {filter === "bracelets" && (
        <div className="mb-8 rounded-2xl bg-rose-50 border border-rose-200 px-6 py-4 text-center">
          <p className="text-sm sm:text-base font-semibold text-rose-800">
            🎉 Special Sale — All Bracelets at{" "}
            <span className="text-rose-dark font-bold text-lg">PKR 399</span>
            {" "}·{" "}
            <span className="line-through text-ink/50 text-sm">PKR 500</span>
          </p>
        </div>
      )}

      {filter === "persian" && (
        <div className="mb-8 rounded-2xl bg-amber-50 border border-amber-200 px-6 py-4 text-center">
          <p className="text-sm sm:text-base font-semibold text-amber-900">
            🎉 Special Sale — All Persian Heritage Covers at{" "}
            <span className="text-amber-800 font-bold text-lg">PKR 1,900</span>
            {" "}·{" "}
            <span className="line-through text-ink/50 text-sm">PKR 2,200</span>
          </p>
        </div>
      )}

      {filter === "pop-art" && (
        <div className="mb-8 rounded-2xl bg-amber-50 border border-amber-200 px-6 py-4 text-center">
          <p className="text-sm sm:text-base font-semibold text-amber-900">
            🎉 Special Sale — All Pop Art &amp; Funky Covers at{" "}
            <span className="text-amber-800 font-bold text-lg">PKR 1,900</span>
            {" "}·{" "}
            <span className="line-through text-ink/50 text-sm">PKR 2,200</span>
          </p>
        </div>
      )}

      {/* Product Grid */}
      <ProductGrid products={displayedProducts} />
    </div>
  );
}
