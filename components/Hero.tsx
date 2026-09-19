"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { getProductsByCategory } from "@/lib/products";

export default function Hero() {
  const skincareProducts = getProductsByCategory("skincare");
  const [currentIndex, setCurrentIndex] = useState(0);

  const safeIndex =
    skincareProducts.length > 0 ? currentIndex % skincareProducts.length : 0;
  const currentProduct = skincareProducts[safeIndex] || skincareProducts[0];

  const nextSlide = useCallback(() => {
    if (skincareProducts.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % skincareProducts.length);
  }, [skincareProducts.length]);

  const prevSlide = useCallback(() => {
    if (skincareProducts.length === 0) return;
    setCurrentIndex(
      (prev) => (prev - 1 + skincareProducts.length) % skincareProducts.length
    );
  }, [skincareProducts.length]);

  // Automatic slide rotation every 3.8s
  useEffect(() => {
    if (skincareProducts.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % skincareProducts.length);
    }, 3800);

    return () => clearInterval(timer);
  }, [skincareProducts.length]);

  if (!currentProduct) return null;

  return (
    <section className="relative overflow-hidden border-b border-line bg-cream">
      <div className="container-layora py-10 sm:py-14 lg:py-20">
        {/* Top Live Slide Counter */}
        <div className="mb-6 sm:mb-8 flex items-center justify-between border-b border-line/60 pb-3">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-rose-dark animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-ink/75">
              LAYORA Skincare Spotlight
            </span>
          </div>
          <div className="text-xs font-semibold text-ink/60 tracking-wider">
            <span className="text-ink font-bold text-sm">
              {String(safeIndex + 1).padStart(2, "0")}
            </span>{" "}
            / {String(skincareProducts.length).padStart(2, "0")} Skincare Rituals
          </div>
        </div>

        {/* Main Hero Grid */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Typography, Description & CTAs */}
          <div className="order-2 lg:order-1 lg:col-span-6 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="eyebrow text-rose-dark font-semibold tracking-widest">
                Korean Beauty &amp; Clean Rituals
              </span>
              <span className="rounded-full bg-rose-100 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-rose-900">
                Authentic Essentials
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl lg:text-[3.2rem] italic leading-[1.12] text-ink transition-all duration-500 min-h-[4rem] sm:min-h-[5.5rem]">
              {currentProduct.name}
            </h1>

            <p className="mt-4 sm:mt-5 max-w-lg text-sm sm:text-base leading-relaxed text-ink/75 transition-all duration-500">
              {currentProduct.description}
            </p>

            {/* Price Highlight */}
            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-2xl sm:text-3xl font-bold text-rose-dark font-display italic">
                PKR {currentProduct.price.toLocaleString()}
              </span>
              {currentProduct.originalPrice && (
                <span className="text-sm sm:text-base text-ink/40 line-through">
                  PKR {currentProduct.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* CTAs */}
            <div className="mt-7 sm:mt-9 flex flex-wrap items-center gap-3.5">
              <Link
                href={`/products/${currentProduct.slug}`}
                className="btn-primary shadow-sm hover:shadow-md"
              >
                Shop This Item →
              </Link>
              <Link href="/skincare" className="btn-outline">
                Explore Skincare Collection
              </Link>
            </div>

            {/* Slide Navigation Controls & Dots */}
            <div className="mt-8 sm:mt-12 flex items-center gap-4">
              <button
                onClick={prevSlide}
                aria-label="Previous Product"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-cream shadow-xs text-ink transition-all duration-200 hover:bg-ink hover:text-cream hover:border-ink active:scale-95"
              >
                ←
              </button>

              {/* Progress Dots */}
              <div className="flex items-center gap-1.5 overflow-x-auto max-w-[220px] sm:max-w-none no-scrollbar py-1">
                {skincareProducts.map((prod, idx) => (
                  <button
                    key={prod.id}
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Go to product ${idx + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 shrink-0 ${
                      idx === safeIndex
                        ? "w-7 bg-rose-dark"
                        : "w-2 bg-ink/20 hover:bg-ink/40"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                aria-label="Next Product"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-cream shadow-xs text-ink transition-all duration-200 hover:bg-ink hover:text-cream hover:border-ink active:scale-95"
              >
                →
              </button>
            </div>
          </div>

          {/* Right Column: Hero Image Slider (Only Skincare Products) */}
          <div className="order-1 lg:order-2 lg:col-span-6 relative">
            <div className="relative aspect-[4/5] sm:aspect-[16/11] lg:aspect-[4/5] w-full overflow-hidden rounded-sm bg-sand shadow-xl">
              <Link
                href={`/products/${currentProduct.slug}`}
                className="group block relative w-full h-full"
              >
                <Image
                  key={currentProduct.images[0]}
                  src={currentProduct.images[0]}
                  alt={currentProduct.name}
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 90vw"
                  className="object-cover object-center transition-transform duration-700 ease-elegant group-hover:scale-105"
                />

                {/* Subtle vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/15 pointer-events-none" />

                {/* Clean Top Tag */}
                <div className="absolute left-4 top-4">
                  <span className="rounded-sm bg-ink/85 backdrop-blur-md px-3.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-cream shadow-xs">
                    Skincare Essential
                  </span>
                </div>

                {/* Clean Bottom Product Details Card */}
                <div className="absolute inset-x-4 bottom-4 rounded-sm bg-cream/95 backdrop-blur-md p-4 shadow-lg border border-line/60 transition-transform duration-300 group-hover:-translate-y-1">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[11px] uppercase tracking-wider text-rose-dark font-bold">
                        LAYORA Beauty Rituals
                      </p>
                      <h2 className="font-display text-base sm:text-lg italic font-bold text-ink line-clamp-1">
                        {currentProduct.name}
                      </h2>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm sm:text-base font-bold text-rose-dark">
                        PKR {currentProduct.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>

              {/* In-Image Slider Arrows */}
              <div className="absolute right-3 top-3 flex items-center gap-1.5 z-10">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    prevSlide();
                  }}
                  aria-label="Previous product"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-cream/80 backdrop-blur-md text-ink shadow-sm transition hover:bg-cream active:scale-95"
                >
                  ‹
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    nextSlide();
                  }}
                  aria-label="Next product"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-cream/80 backdrop-blur-md text-ink shadow-sm transition hover:bg-cream active:scale-95"
                >
                  ›
                </button>
              </div>
            </div>

            {/* Thumbnail Navigation Strip for Skincare Products */}
            <div className="mt-4 flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-1">
              {skincareProducts.map((prod, idx) => (
                <button
                  key={`thumb-${prod.id}`}
                  onClick={() => setCurrentIndex(idx)}
                  className={`relative h-14 w-12 sm:h-16 sm:w-14 shrink-0 overflow-hidden rounded border-2 transition-all duration-300 ${
                    idx === safeIndex
                      ? "border-rose-dark ring-2 ring-rose-dark/30 scale-105"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={prod.images[0]}
                    alt={prod.name}
                    fill
                    sizes="60px"
                    className="object-cover object-center"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
