"use client";

import { useState } from "react";
import Link from "next/link";
import CategoryHeader from "@/components/CategoryHeader";
import ProductGrid from "@/components/ProductGrid";
import { getProductsByCategory, getProductsBySubcategory } from "@/lib/products";
import { getCategory } from "@/lib/categories";
import { buildGeneralContactUrl } from "@/lib/whatsapp";

export default function SkincarePage() {
  const category = getCategory("skincare");
  const jellySoapProducts = getProductsBySubcategory("skincare", "jelly-soaps");
  const allSkincareProducts = getProductsByCategory("skincare");

  const [activeTab, setActiveTab] = useState<"jelly-soaps" | "serums-oils">("jelly-soaps");

  return (
    <div>
      <CategoryHeader
        eyebrow="Clean Beauty &amp; Body Rituals"
        title="Skincare &amp; Customized Jelly Soaps"
        description="Handcrafted organic jelly soaps with customizable designs, soothing botanical extracts, and upcoming luxury facial serums."
      />

      <div className="container-layora py-10 sm:py-14">
        {/* Subcategories Switcher Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <button
            onClick={() => setActiveTab("jelly-soaps")}
            className={`rounded-full px-6 py-2.5 text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-200 ${
              activeTab === "jelly-soaps"
                ? "bg-ink text-cream shadow-sm scale-105"
                : "bg-sand/70 text-ink/75 hover:text-ink hover:bg-sand"
            }`}
          >
            Customized Jelly Soaps ({jellySoapProducts.length})
          </button>

          <button
            onClick={() => setActiveTab("serums-oils")}
            className={`group rounded-full px-6 py-2.5 text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-200 flex items-center gap-2 ${
              activeTab === "serums-oils"
                ? "bg-ink text-cream shadow-sm scale-105"
                : "bg-sand/70 text-ink/75 hover:text-ink hover:bg-sand"
            }`}
          >
            <span>Serums &amp; Oils</span>
            <span className="rounded-full bg-rose-200 px-2 py-0.5 text-[9px] font-bold text-rose-900 uppercase">
              Coming Soon
            </span>
          </button>
        </div>

        {/* Tab Content: Customized Jelly Soaps */}
        {activeTab === "jelly-soaps" && (
          <div>
            <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-line/60 pb-5">
              <div>
                <p className="eyebrow text-rose-dark mb-1">Handmade Small-Batch</p>
                <h2 className="font-display text-2xl sm:text-3xl italic text-ink">
                  Customized Jelly Soaps Collection
                </h2>
                <p className="text-sm text-ink/70 mt-1 max-w-xl">
                  Squishy, bouncy, and ultra-hydrating jelly soaps infused with aloe vera, organic botanicals, and customizable initial monogram carvings.
                </p>
              </div>
              <a
                href={buildGeneralContactUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp text-xs py-2.5 px-4 self-start sm:self-auto shrink-0"
              >
                Custom Order on WhatsApp 💬
              </a>
            </div>

            {/* Product Grid of all 15 Jelly Soaps */}
            <ProductGrid products={jellySoapProducts} />
          </div>
        )}

        {/* Tab Content: Serums & Oils (Coming Soon) */}
        {activeTab === "serums-oils" && (
          <div className="mx-auto max-w-2xl rounded-sm border border-line bg-sand/40 p-8 sm:p-14 text-center shadow-sm my-6">
            <span className="inline-block rounded-full bg-rose-dark px-4 py-1 text-xs font-semibold uppercase tracking-widest text-cream">
              Coming Soon
            </span>
            <h2 className="mt-5 font-display text-3xl italic text-ink sm:text-4xl">
              LAYORA Radiance Serums &amp; Elixir Oils
            </h2>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-ink/75">
              We are carefully formulating our signature line of clean, deeply nourishing facial serums and golden botanical oils designed for an effortless glass-skin dewy glow.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-y border-line/60 py-6 text-left">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-rose-dark">01. Glow</p>
                <p className="text-xs text-ink/70 mt-1">Hyaluronic &amp; Vitamin C radiance boost</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-rose-dark">02. Elixirs</p>
                <p className="text-xs text-ink/70 mt-1">Cold-pressed rosehip &amp; jojoba oils</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-rose-dark">03. Clean</p>
                <p className="text-xs text-ink/70 mt-1">100% Cruelty-free &amp; paraben free</p>
              </div>
            </div>

            <p className="mt-6 text-xs text-ink/60">
              Be the first to receive VIP launch notifications &amp; early bird discounts.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={buildGeneralContactUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp w-full sm:w-auto"
              >
                Notify Me on WhatsApp
              </a>
              <button
                onClick={() => setActiveTab("jelly-soaps")}
                className="btn-outline w-full sm:w-auto"
              >
                Explore Jelly Soaps
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
