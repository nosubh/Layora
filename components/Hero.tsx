"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { getProductsByCategory } from "@/lib/products";

export default function Hero() {
  // Filter ONLY products from the Bracelets folder (subcategory: bracelets)
  const heroProducts = useMemo(() => {
    return getProductsByCategory("accessories").filter(
      (p) =>
        p.subcategory === "bracelets" &&
        p.images.some((img) =>
          img.toLowerCase().includes("/products/bracelets")
        )
    );
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const thumbnailScrollRef = useRef<HTMLDivElement | null>(null);

  const safeIndex =
    heroProducts.length > 0 ? currentIndex % heroProducts.length : 0;
  const currentProduct = heroProducts[safeIndex] || heroProducts[0];
  const nextProduct =
    heroProducts.length > 0
      ? heroProducts[(safeIndex + 1) % heroProducts.length]
      : null;

  const nextSlide = useCallback(() => {
    if (heroProducts.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % heroProducts.length);
  }, [heroProducts.length]);

  const prevSlide = useCallback(() => {
    if (heroProducts.length === 0) return;
    setCurrentIndex(
      (prev) => (prev - 1 + heroProducts.length) % heroProducts.length
    );
  }, [heroProducts.length]);

  // Touch Swipe Handlers for mobile responsiveness
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 40;

    if (distance > minSwipeDistance) {
      nextSlide(); // Swiped Left -> Next
    } else if (distance < -minSwipeDistance) {
      prevSlide(); // Swiped Right -> Prev
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Keep active thumbnail scrolled into view horizontally WITHOUT scrolling the page window
  useEffect(() => {
    const container = thumbnailScrollRef.current;
    if (!container) return;
    const activeBtn = container.children[safeIndex] as HTMLElement;
    if (activeBtn) {
      const scrollLeft =
        activeBtn.offsetLeft -
        container.offsetWidth / 2 +
        activeBtn.offsetWidth / 2;
      container.scrollTo({
        left: Math.max(0, scrollLeft),
        behavior: "smooth",
      });
    }
  }, [safeIndex]);

  // Automatic slide rotation every 4.5s (pauses on hover)
  useEffect(() => {
    if (heroProducts.length <= 1 || isHovered) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroProducts.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [heroProducts.length, isHovered]);

  if (!currentProduct) return null;

  const discountAmount = currentProduct.originalPrice
    ? currentProduct.originalPrice - currentProduct.price
    : 0;

  return (
    <section
      className="relative overflow-hidden border-b border-line bg-gradient-to-b from-sand/20 via-cream to-cream"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="container-layora py-8 sm:py-12 lg:py-14">
        {/* Top Header Badge & Live Counter */}
        <div className="mb-6 sm:mb-8 flex items-center justify-between border-b border-line/60 pb-3">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-rose-dark animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-rose-dark">
              ✨ Handcrafted Bracelets &amp; Luxury Watches • Special Sale
            </span>
          </div>
          <div className="text-xs font-semibold text-ink/60 tracking-wider">
            <span className="text-rose-dark font-bold text-sm">
              {String(safeIndex + 1).padStart(2, "0")}
            </span>{" "}
            / {String(heroProducts.length).padStart(2, "0")} Designs
          </div>
        </div>

        {/* Main Hero Grid */}
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Typography, Details, Prices & CTAs */}
          <div className="order-2 lg:order-1 lg:col-span-6 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="eyebrow text-rose-dark font-semibold tracking-widest">
                {currentProduct.isNew ? "✨ New Arrival" : "💎 Best Seller"}
              </span>
              <span className="rounded-full bg-rose-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-rose-900">
                Special Offer
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-[2.85rem] italic leading-[1.15] text-ink transition-all duration-300 min-h-[3.2rem] sm:min-h-[4.2rem]">
              {currentProduct.name}
            </h1>

            <p className="mt-3 sm:mt-4 max-w-lg text-sm sm:text-base leading-relaxed text-ink/75 transition-all duration-300 line-clamp-3">
              {currentProduct.description}
            </p>

            {/* Price & Savings Highlight - PROMINENT DISPLAY */}
            <div className="mt-5 rounded-2xl bg-cream border border-rose-200/80 p-4 sm:p-5 shadow-xs max-w-lg">
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-3xl sm:text-4xl font-extrabold text-rose-dark font-display tracking-tight">
                  PKR {currentProduct.price.toLocaleString()}
                </span>
                {currentProduct.originalPrice && (
                  <span className="text-base sm:text-lg text-ink/40 line-through font-semibold">
                    PKR {currentProduct.originalPrice.toLocaleString()}
                  </span>
                )}
                {discountAmount > 0 && (
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 shrink-0">
                    Save PKR {discountAmount.toLocaleString()}
                  </span>
                )}
              </div>

              {/* Color / Variant Options Preview */}
              {currentProduct.colors && currentProduct.colors.length > 0 && (
                <div className="mt-3 pt-3 border-t border-line/60 flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold uppercase tracking-wider text-ink/70">
                    Colors ({currentProduct.colors.length}):
                  </span>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {currentProduct.colors.slice(0, 4).map((c) => (
                      <span
                        key={c}
                        className="rounded-full bg-sand/40 border border-line px-2 py-0.5 text-[10px] sm:text-[11px] font-medium text-ink/90"
                      >
                        {c}
                      </span>
                    ))}
                    {currentProduct.colors.length > 4 && (
                      <span className="rounded-full bg-rose-50 border border-rose-200 px-2 py-0.5 text-[10px] sm:text-[11px] font-bold text-rose-dark">
                        +{currentProduct.colors.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* CTAs */}
            <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3">
              <Link
                href={`/products/${currentProduct.slug}`}
                className="btn-primary shadow-sm hover:shadow-md text-xs sm:text-sm font-bold bg-rose-dark hover:bg-rose-dark/95 text-cream px-6 py-3.5"
              >
                ⚡ Buy Now • PKR {currentProduct.price.toLocaleString()} →
              </Link>
              <Link
                href="/bracelets"
                className="btn-outline text-xs sm:text-sm px-5 py-3.5 font-semibold"
              >
                💎 View All Bracelets ({heroProducts.length})
              </Link>
              <Link
                href="/checkout"
                className="text-xs uppercase tracking-wider font-bold text-rose-dark hover:underline py-2 px-1"
              >
                Fast Checkout →
              </Link>
            </div>

            {/* Slide Navigation Controls & Progress Dots */}
            <div className="mt-8 flex items-center gap-4">
              <button
                onClick={prevSlide}
                aria-label="Previous Bracelet"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-cream shadow-xs text-ink transition-all duration-200 hover:bg-ink hover:text-cream hover:border-ink active:scale-95"
              >
                ←
              </button>

              {/* Progress Dots */}
              <div className="flex items-center gap-1.5 overflow-x-auto max-w-[240px] sm:max-w-none no-scrollbar py-1">
                {heroProducts.map((prod, idx) => (
                  <button
                    key={prod.id}
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`h-2.5 rounded-full transition-all duration-300 shrink-0 ${
                      idx === safeIndex
                        ? "w-8 bg-rose-dark"
                        : "w-2.5 bg-ink/20 hover:bg-ink/40"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                aria-label="Next Bracelet"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-cream shadow-xs text-ink transition-all duration-200 hover:bg-ink hover:text-cream hover:border-ink active:scale-95"
              >
                →
              </button>
            </div>
          </div>

          {/* Right Column: Hero Image Showcase with Touch Gestures & Price-Tagged Thumbnails */}
          <div className="order-1 lg:order-2 lg:col-span-6 relative">
            <div
              className="relative aspect-square sm:aspect-[4/3] lg:aspect-square w-full overflow-hidden rounded-2xl bg-cream shadow-xl border border-line/70 select-none group"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <Link
                href={`/products/${currentProduct.slug}`}
                className="block relative w-full h-full"
              >
                <Image
                  key={currentProduct.images[0]}
                  src={currentProduct.images[0]}
                  alt={currentProduct.name}
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 95vw"
                  className="object-cover object-center transition-transform duration-700 ease-elegant group-hover:scale-105"
                />

                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 pointer-events-none" />

                {/* Top Left Floating Category Tag */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                  <span className="rounded-full bg-cream/90 backdrop-blur-md px-3 py-1 text-xs font-bold uppercase tracking-wider text-rose-dark shadow-sm border border-line/40">
                    ✨ Bracelets &amp; Watches
                  </span>
                </div>

                {/* Product Detail Floating Card at Bottom */}
                <div className="absolute inset-x-4 bottom-4 rounded-xl bg-cream/95 backdrop-blur-md p-4 shadow-lg border border-line/60 transition-transform duration-300 group-hover:-translate-y-1">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[11px] uppercase tracking-wider text-rose-dark font-bold">
                        LAYORA Jewelry Collection
                      </p>
                      <h2 className="font-display text-base sm:text-lg italic font-bold text-ink line-clamp-1">
                        {currentProduct.name}
                      </h2>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-base sm:text-xl font-extrabold text-rose-dark">
                        PKR {currentProduct.price.toLocaleString()}
                      </p>
                      {currentProduct.originalPrice && (
                        <p className="text-[11px] text-ink/40 line-through">
                          PKR {currentProduct.originalPrice.toLocaleString()}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </Link>

              {/* In-Image Slider Navigation Arrows */}
              <div className="absolute right-4 top-4 flex items-center gap-1.5 z-10">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    prevSlide();
                  }}
                  aria-label="Previous bracelet"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-cream/90 backdrop-blur-md text-ink shadow-md transition hover:bg-cream hover:scale-105 active:scale-95 text-lg font-bold"
                >
                  ‹
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    nextSlide();
                  }}
                  aria-label="Next bracelet"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-cream/90 backdrop-blur-md text-ink shadow-md transition hover:bg-cream hover:scale-105 active:scale-95 text-lg font-bold"
                >
                  ›
                </button>
              </div>

              {/* Preload next slide image invisibly for instantaneous transition */}
              {nextProduct && (
                <div className="hidden" aria-hidden="true">
                  <Image
                    src={nextProduct.images[0]}
                    alt="Preload next slide"
                    width={10}
                    height={10}
                    priority
                  />
                </div>
              )}
            </div>

            {/* Thumbnail Navigation Strip with Image + Price Tag */}
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2 px-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-ink/60">
                  Select Item ({heroProducts.length} Available)
                </span>
                <span className="text-[11px] font-semibold text-rose-dark">
                  Click to view
                </span>
              </div>
              <div
                ref={thumbnailScrollRef}
                className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-2 pt-1 px-1 scroll-smooth"
              >
                {heroProducts.map((prod, idx) => (
                  <button
                    key={`thumb-${prod.id}`}
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Select ${prod.name}`}
                    className={`relative flex flex-col items-center shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-200 bg-cream p-1 ${
                      idx === safeIndex
                        ? "border-rose-dark ring-2 ring-rose-dark/40 scale-105 shadow-md"
                        : "border-transparent opacity-65 hover:opacity-100 hover:border-line"
                    }`}
                  >
                    <div className="relative h-14 w-14 sm:h-16 sm:w-16 overflow-hidden rounded-lg">
                      <Image
                        src={prod.images[0]}
                        alt={prod.name}
                        fill
                        sizes="70px"
                        className="object-cover object-center"
                      />
                    </div>
                    {/* Compact Price Tag under each thumbnail */}
                    <span className="mt-1 text-[10px] sm:text-[11px] font-bold text-rose-dark">
                      Rs. {prod.price}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
