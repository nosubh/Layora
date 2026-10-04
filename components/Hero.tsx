"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { getProductsByCategory } from "@/lib/products";
import { buildProductOrderUrl } from "@/lib/whatsapp";

export default function Hero() {
  const allDresses = getProductsByCategory("dresses");
  // Filter ONLY the new winter collection dresses from the new arrivals folder
  const winterDresses = allDresses.filter(
    (p) => p.subcategory === "new-arrivals" || p.isNew
  );

  // Fallback to all dresses if filter is empty
  const heroProducts = winterDresses.length > 0 ? winterDresses : allDresses;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const safeIndex =
    heroProducts.length > 0 ? currentIndex % heroProducts.length : 0;
  const currentProduct = heroProducts[safeIndex] || heroProducts[0];

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

  // Automatic slide rotation every 4s (pauses on hover)
  useEffect(() => {
    if (heroProducts.length <= 1 || isHovered) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroProducts.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [heroProducts.length, isHovered]);

  if (!currentProduct) return null;

  const discountAmount = currentProduct.originalPrice
    ? currentProduct.originalPrice - currentProduct.price
    : 0;

  const whatsappUrl = buildProductOrderUrl(
    {
      product: currentProduct,
      quantity: 1,
      size: currentProduct.sizes[0] || "M",
      color: currentProduct.colors[0] || null,
    },
    "pk"
  );

  return (
    <section
      className="relative overflow-hidden border-b border-line bg-cream"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="container-layora py-8 sm:py-12 lg:py-16">
        {/* Top Live Slide Counter Header */}
        <div className="mb-6 sm:mb-8 flex items-center justify-between border-b border-line/60 pb-3">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-rose-dark animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-rose-dark">
              LAYORA Collection • New Arrivals
            </span>
          </div>
          <div className="text-xs font-semibold text-ink/60 tracking-wider">
            <span className="text-rose-dark font-bold text-sm">
              {String(safeIndex + 1).padStart(2, "0")}
            </span>{" "}
            / {String(heroProducts.length).padStart(2, "0")} New Arrival Suits
          </div>
        </div>

        {/* Main Hero Grid */}
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Typography, Details & CTAs */}
          <div className="order-2 lg:order-1 lg:col-span-6 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="eyebrow text-rose-dark font-semibold tracking-widest">
                New Arrivals Collection
              </span>
              <span className="rounded-full bg-rose-100 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-rose-900">
                Special Offer
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-[3rem] italic leading-[1.12] text-ink transition-all duration-500 min-h-[3.5rem] sm:min-h-[4.5rem]">
              {currentProduct.name}
            </h1>

            <p className="mt-3 sm:mt-4 max-w-lg text-sm sm:text-base leading-relaxed text-ink/75 transition-all duration-500">
              {currentProduct.description}
            </p>

            {/* Price & Savings Highlight */}
            <div className="mt-4 flex items-center gap-3 flex-wrap">
              <span className="text-2xl sm:text-3xl font-bold text-rose-dark font-display italic">
                PKR {currentProduct.price.toLocaleString()}
              </span>
              {currentProduct.originalPrice && (
                <span className="text-sm sm:text-base text-ink/40 line-through font-semibold">
                  PKR {currentProduct.originalPrice.toLocaleString()}
                </span>
              )}
              {discountAmount > 0 && (
                <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800">
                  Save PKR {discountAmount.toLocaleString()}
                </span>
              )}
            </div>

            {/* CTAs */}
            <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3">
              <Link
                href={`/products/${currentProduct.slug}`}
                className="btn-primary shadow-sm hover:shadow-md text-xs sm:text-sm"
              >
                Shop This Suit →
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp text-xs sm:text-sm"
              >
                💬 Order on WhatsApp
              </a>
              <Link href="/dresses" className="btn-outline text-xs sm:text-sm">
                View All Dresses
              </Link>
            </div>

            {/* Slide Navigation Controls & Progress Dots */}
            <div className="mt-8 sm:mt-10 flex items-center gap-4">
              <button
                onClick={prevSlide}
                aria-label="Previous Dress"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-cream shadow-xs text-ink transition-all duration-200 hover:bg-ink hover:text-cream hover:border-ink active:scale-95"
              >
                ←
              </button>

              {/* Progress Dots */}
              <div className="flex items-center gap-1.5 overflow-x-auto max-w-[220px] sm:max-w-none no-scrollbar py-1">
                {heroProducts.map((prod, idx) => (
                  <button
                    key={prod.id}
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Go to dress ${idx + 1}`}
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
                aria-label="Next Dress"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-cream shadow-xs text-ink transition-all duration-200 hover:bg-ink hover:text-cream hover:border-ink active:scale-95"
              >
                →
              </button>
            </div>
          </div>

          {/* Right Column: Hero Image Slider with Touch Gestures & Thumbnail Bar */}
          <div className="order-1 lg:order-2 lg:col-span-6 relative">
            <div
              className="relative aspect-[4/5] sm:aspect-[16/11] lg:aspect-[4/5] w-full overflow-hidden rounded-sm bg-sand shadow-xl select-none"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
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
                  className="object-cover object-top transition-transform duration-700 ease-elegant group-hover:scale-105"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/15 pointer-events-none" />

                {/* Product Detail Floating Card */}
                <div className="absolute inset-x-4 bottom-4 rounded-sm bg-cream/95 backdrop-blur-md p-4 shadow-lg border border-line/60 transition-transform duration-300 group-hover:-translate-y-1">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[11px] uppercase tracking-wider text-rose-dark font-bold">
                        LAYORA Collection
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
                  aria-label="Previous dress"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-cream/80 backdrop-blur-md text-ink shadow-sm transition hover:bg-cream active:scale-95"
                >
                  ‹
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    nextSlide();
                  }}
                  aria-label="Next dress"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-cream/80 backdrop-blur-md text-ink shadow-sm transition hover:bg-cream active:scale-95"
                >
                  ›
                </button>
              </div>
            </div>

            {/* Thumbnail Navigation Strip for Winter Collection Dresses */}
            <div className="mt-4 flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-1">
              {heroProducts.map((prod, idx) => (
                <button
                  key={`thumb-${prod.id}`}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Select ${prod.name}`}
                  className={`relative h-16 w-14 sm:h-18 sm:w-16 shrink-0 overflow-hidden rounded border-2 transition-all duration-300 ${
                    idx === safeIndex
                      ? "border-rose-dark ring-2 ring-rose-dark/40 scale-105 shadow-sm"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={prod.images[0]}
                    alt={prod.name}
                    fill
                    sizes="70px"
                    className="object-cover object-top"
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
