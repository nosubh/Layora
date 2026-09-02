"use client";

import { useState } from "react";
import Image from "next/image";

interface Review {
  id: string;
  category: "dresses" | "cases";
  customerName: string;
  city: string;
  productName: string;
  productImage: string;
  rating: number;
  date: string;
  reviewTitle: string;
  comment: string;
  verifiedBuyer: boolean;
}

const REVIEWS: Review[] = [
  // 3 Reviews on Dresses
  {
    id: "rev-dress-1",
    category: "dresses",
    customerName: "Ayesha Khan",
    city: "Lahore",
    productName: "Blush Vanilla Festive Suit",
    productImage: "/products/ethnic/blush-vanilla/1.jpeg",
    rating: 5,
    date: "Verified Purchase • 3 days ago",
    reviewTitle: "Breathtaking embroidery & perfect fitting!",
    comment:
      "The fabric quality and hand-worked neckline embroidery are absolutely breathtaking! The fitting was tailored to perfection and I received endless compliments at my family wedding. Pure luxury comfort.",
    verifiedBuyer: true,
  },
  {
    id: "rev-dress-2",
    category: "dresses",
    customerName: "Zainab Fatima",
    city: "Karachi",
    productName: "Crimson Fringe Statement Dress",
    productImage: "/products/ethnic/crimson-fringe/1.jpeg",
    rating: 5,
    date: "Verified Purchase • 1 week ago",
    reviewTitle: "Even more gorgeous in person!",
    comment:
      "Stunning deep crimson shade! The delicate fringe detailing and lace work look even richer in real life. Fast 3-day delivery and premium packaging. Definitely ordering again for festive celebrations!",
    verifiedBuyer: true,
  },
  {
    id: "rev-dress-3",
    category: "dresses",
    customerName: "Maham Tariq",
    city: "Islamabad",
    productName: "Midnight Bloom Velvet Pret",
    productImage: "/products/ethnic/midnight-bloom/1.jpeg",
    rating: 5,
    date: "Verified Purchase • 2 weeks ago",
    reviewTitle: "Pure elegance & artisanal craftsmanship",
    comment:
      "The stitch precision, subtle gold zari threadwork, and rich formal dupatta made me feel so graceful. Truly a high-end designer luxury experience with exceptional attention to detail.",
    verifiedBuyer: true,
  },

  // 2 Reviews on Mobile Covers
  {
    id: "rev-case-1",
    category: "cases",
    customerName: "Hamza Ali",
    city: "Karachi",
    productName: "BTS Dynamite Pop Art Case",
    productImage: "/products/cases/bts.jpeg",
    rating: 5,
    date: "Verified Purchase • 5 days ago",
    reviewTitle: "Ultra-vibrant print & solid drop protection!",
    comment:
      "The pop art colors are super crisp and vibrant! Accidentally dropped my phone on concrete and not a single scratch. The raised camera bezel and corner cushions give 100% peace of mind.",
    verifiedBuyer: true,
  },
  {
    id: "rev-case-2",
    category: "cases",
    customerName: "Sara Naveed",
    city: "Rawalpindi",
    productName: "Warrior Spirit Graphic Case",
    productImage: "/products/cases/warrior.jpeg",
    rating: 5,
    date: "Verified Purchase • 1 week ago",
    reviewTitle: "Super stylish, sleek & shockproof",
    comment:
      "Loved the funky aesthetics and tactile grip. MagSafe wireless charging works effortlessly through the cover, and the glossy finish has remained completely scratch-free.",
    verifiedBuyer: true,
  },
];

export default function CustomerReviews() {
  const [filter, setFilter] = useState<"all" | "dresses" | "cases">("all");

  const visibleReviews =
    filter === "all" ? REVIEWS : REVIEWS.filter((r) => r.category === filter);

  return (
    <section className="border-t border-line bg-sand/35 py-16 sm:py-20 lg:py-24">
      <div className="container-layora">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 border-b border-line/60 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="eyebrow text-rose-dark font-semibold">Real Customer Voices</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-bold text-amber-900">
                ★ 5.0 Rated (100% Satisfied)
              </span>
            </div>
            <h2 className="font-display text-3xl italic sm:text-4xl lg:text-5xl text-ink">
              Loved by Our Customers
            </h2>
            <p className="mt-2 text-sm text-ink/75 max-w-lg">
              Read authentic feedback from verified clients across Pakistan who trust LAYORA for handcrafted ethnic wear and designer accessories.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 self-start md:self-auto bg-cream p-1.5 rounded-full border border-line shadow-2xs">
            <button
              onClick={() => setFilter("all")}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                filter === "all"
                  ? "bg-ink text-cream shadow-xs"
                  : "text-ink/70 hover:text-ink"
              }`}
            >
              All Reviews ({REVIEWS.length})
            </button>
            <button
              onClick={() => setFilter("dresses")}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                filter === "dresses"
                  ? "bg-ink text-cream shadow-xs"
                  : "text-ink/70 hover:text-ink"
              }`}
            >
              Dresses (3)
            </button>
            <button
              onClick={() => setFilter("cases")}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                filter === "cases"
                  ? "bg-ink text-cream shadow-xs"
                  : "text-ink/70 hover:text-ink"
              }`}
            >
              Mobile Covers (2)
            </button>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleReviews.map((review) => (
            <div
              key={review.id}
              className="group flex flex-col justify-between rounded-sm border border-line bg-cream p-6 sm:p-7 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div>
                {/* 5 Stars Rating & Verified Tag */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-1 text-amber-500 text-sm tracking-wider">
                    {"★".repeat(review.rating)}
                  </div>
                  {review.verifiedBuyer && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-800 border border-emerald-200">
                      ✓ Verified Buyer
                    </span>
                  )}
                </div>

                {/* Review Headline & Comment */}
                <h3 className="font-display text-lg italic font-bold text-ink leading-snug mb-2.5">
                  &ldquo;{review.reviewTitle}&rdquo;
                </h3>
                <p className="text-sm leading-relaxed text-ink/80 mb-6">
                  {review.comment}
                </p>
              </div>

              {/* Product Info & Customer Details Footer */}
              <div className="border-t border-line/60 pt-4 mt-auto">
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-10 shrink-0 overflow-hidden rounded border border-line bg-sand">
                    <Image
                      src={review.productImage}
                      alt={review.productName}
                      fill
                      className="object-cover object-top"
                      sizes="50px"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-ink truncate">
                      {review.customerName}
                      <span className="font-normal text-ink/50 ml-1.5">• {review.city}</span>
                    </p>
                    <p className="text-[11px] text-rose-dark font-medium truncate mt-0.5">
                      {review.productName}
                    </p>
                    <p className="text-[10px] text-ink/40 mt-0.5">
                      {review.date}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Trust Highlights */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-line/60 pt-8 text-center">
          <div className="p-3">
            <p className="font-display text-2xl sm:text-3xl italic font-bold text-ink">100%</p>
            <p className="text-xs text-ink/65 uppercase tracking-wider mt-1">Authentic Quality</p>
          </div>
          <div className="p-3">
            <p className="font-display text-2xl sm:text-3xl italic font-bold text-ink">5.0 ★</p>
            <p className="text-xs text-ink/65 uppercase tracking-wider mt-1">Average Rating</p>
          </div>
          <div className="p-3">
            <p className="font-display text-2xl sm:text-3xl italic font-bold text-ink">3-5 Days</p>
            <p className="text-xs text-ink/65 uppercase tracking-wider mt-1">Fast Delivery</p>
          </div>
          <div className="p-3">
            <p className="font-display text-2xl sm:text-3xl italic font-bold text-ink">24/7</p>
            <p className="text-xs text-ink/65 uppercase tracking-wider mt-1">WhatsApp Support</p>
          </div>
        </div>
      </div>
    </section>
  );
}
