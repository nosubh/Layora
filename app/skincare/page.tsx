"use client";

import { useState } from "react";
import CategoryHeader from "@/components/CategoryHeader";
import ProductGrid from "@/components/ProductGrid";
import { getProductsBySubcategory } from "@/lib/products";
import { getCategory } from "@/lib/categories";
import { buildGeneralContactUrl } from "@/lib/whatsapp";

type SkincareTab =
  | "medicube-sheet-masks"
  | "medicube-tube-masks"
  | "sadoer-masks"
  | "lip-care"
  | "serums"
  | "jelly-soaps";

export default function SkincarePage() {
  const category = getCategory("skincare");
  const medicubeSheetMaskProducts = getProductsBySubcategory("skincare", "medicube-sheet-masks");
  const medicubeTubeMaskProducts = getProductsBySubcategory("skincare", "medicube-tube-masks");
  const sadoerMaskProducts = getProductsBySubcategory("skincare", "sadoer-masks");
  const lipCareProducts = getProductsBySubcategory("skincare", "lip-care");
  const serumProducts = getProductsBySubcategory("skincare", "serums");
  const jellySoapProducts = getProductsBySubcategory("skincare", "jelly-soaps");

  const [activeTab, setActiveTab] = useState<SkincareTab>("medicube-sheet-masks");

  const getFilteredProducts = () => {
    switch (activeTab) {
      case "medicube-sheet-masks":
        return medicubeSheetMaskProducts;
      case "medicube-tube-masks":
        return medicubeTubeMaskProducts;
      case "sadoer-masks":
        return sadoerMaskProducts;
      case "lip-care":
        return lipCareProducts;
      case "serums":
        return serumProducts;
      case "jelly-soaps":
        return jellySoapProducts;
      default:
        return medicubeSheetMaskProducts;
    }
  };

  const displayedProducts = getFilteredProducts();

  return (
    <div>
      <CategoryHeader
        eyebrow="Clean Beauty &amp; Korean Skincare Rituals"
        title="Skincare &amp; Beauty Essentials"
        description={
          category?.description ||
          "Medicube collagen hydrogel & tube masks, Sadour sheet masks, Laneige lip sleeping masks, SHEGLAM lip oils, snail mucin serums, and handcrafted jelly soaps."
        }
      />

      <div className="container-layora py-10 sm:py-14">
        {/* Subcategories Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-12">
          <button
            onClick={() => setActiveTab("medicube-sheet-masks")}
            className={`rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-200 ${
              activeTab === "medicube-sheet-masks"
                ? "bg-ink text-cream shadow-sm scale-105"
                : "bg-sand/70 text-ink/75 hover:text-ink hover:bg-sand"
            }`}
          >
            Medicube Sheet Masks ({medicubeSheetMaskProducts.length})
          </button>

          <button
            onClick={() => setActiveTab("medicube-tube-masks")}
            className={`rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-200 ${
              activeTab === "medicube-tube-masks"
                ? "bg-ink text-cream shadow-sm scale-105"
                : "bg-sand/70 text-ink/75 hover:text-ink hover:bg-sand"
            }`}
          >
            Medicube Tube Masks ({medicubeTubeMaskProducts.length})
          </button>

          <button
            onClick={() => setActiveTab("sadoer-masks")}
            className={`rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-200 ${
              activeTab === "sadoer-masks"
                ? "bg-ink text-cream shadow-sm scale-105"
                : "bg-sand/70 text-ink/75 hover:text-ink hover:bg-sand"
            }`}
          >
            Sadour Sheet Masks ({sadoerMaskProducts.length})
          </button>

          <button
            onClick={() => setActiveTab("lip-care")}
            className={`rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-200 ${
              activeTab === "lip-care"
                ? "bg-ink text-cream shadow-sm scale-105"
                : "bg-sand/70 text-ink/75 hover:text-ink hover:bg-sand"
            }`}
          >
            Lip Masks &amp; Lip Oils ({lipCareProducts.length})
          </button>

          <button
            onClick={() => setActiveTab("serums")}
            className={`rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-200 ${
              activeTab === "serums"
                ? "bg-ink text-cream shadow-sm scale-105"
                : "bg-sand/70 text-ink/75 hover:text-ink hover:bg-sand"
            }`}
          >
            Serums &amp; Creams ({serumProducts.length})
          </button>

          <button
            onClick={() => setActiveTab("jelly-soaps")}
            className={`rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-200 ${
              activeTab === "jelly-soaps"
                ? "bg-ink text-cream shadow-sm scale-105"
                : "bg-sand/70 text-ink/75 hover:text-ink hover:bg-sand"
            }`}
          >
            Customized Jelly Soaps ({jellySoapProducts.length})
          </button>
        </div>

        {/* Section Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-line/60 pb-5">
          <div>
            <p className="eyebrow text-rose-dark mb-1">
              {activeTab === "medicube-sheet-masks"
                ? "Original Korean Hydrogel Collagen"
                : activeTab === "medicube-tube-masks"
                ? "Korean Peel-Off & Clay Treatment Tubes"
                : activeTab === "sadoer-masks"
                ? "Hydrating Botanical Essence"
                : activeTab === "lip-care"
                ? "Laneige Sleeping Mask & SHEGLAM Lip Oil"
                : activeTab === "serums"
                ? "Korean Snail Mucin Restorative Duo"
                : "Handcrafted Small-Batch"}
            </p>
            <h2 className="font-display text-2xl sm:text-3xl italic text-ink">
              {activeTab === "medicube-sheet-masks"
                ? "Medicube Deep Collagen Sheet Mask"
                : activeTab === "medicube-tube-masks"
                ? "Medicube Treatment Tube Masks Collection"
                : activeTab === "sadoer-masks"
                ? "Sadour Botanical Sheet Masks"
                : activeTab === "lip-care"
                ? "Lip Masks & SHEGLAM Lip Oils"
                : activeTab === "serums"
                ? "Serums & Moisture Barrier Creams"
                : "Customized Botanical Jelly Soaps"}
            </h2>
            <p className="text-sm text-ink/70 mt-1 max-w-2xl">
              {activeTab === "medicube-sheet-masks"
                ? "Original Medicube deep collagen hydrogel sheet mask (PKR 1,000 in offer / Original: PKR 1,200). Turns transparent as collagen absorbs into skin."
                : activeTab === "medicube-tube-masks"
                ? "Korean Medicube Collagen Jelly Peel-Off, Vitamin C Glow Peel, and Super Cica Calming Clay tube masks (PKR 2,900 each in offer / Original: PKR 3,500)."
                : activeTab === "sadoer-masks"
                ? "Sadour radiance hydrating botanical sheet masks (PKR 100 each in offer / Original: PKR 150)."
                : activeTab === "lip-care"
                ? "Laneige Lip Sleeping Mask (PKR 2,000 in offer / Original: PKR 2,500) & SHEGLAM Nourishing Lip Oil Set (PKR 1,480 / Original: PKR 1,600)."
                : activeTab === "serums"
                ? "Advanced Snail Mucin Serum & Moisture Barrier Cream Duo (PKR 3,000 in offer / Original: PKR 4,500) and Sadour Facial Glow Serum (PKR 517 / Original: PKR 600)."
                : activeTab === "jelly-soaps"
                ? "Squishy, bouncy, and ultra-hydrating jelly soaps (PKR 400 each / PKR 1,500 set of 6)."
                : "Authentic Medicube sheet & tube masks, Sadour sheet masks, Laneige lip sleeping masks, SHEGLAM lip oils, snail mucin serums, and jelly soaps."}
            </p>
          </div>
          <a
            href={buildGeneralContactUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp text-xs py-2.5 px-4 self-start sm:self-auto shrink-0"
          >
            Order on WhatsApp 💬
          </a>
        </div>

        {/* Product Grid */}
        <ProductGrid products={displayedProducts} />
      </div>
    </div>
  );
}
