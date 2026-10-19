"use client";

import { useState } from "react";
import Image from "next/image";

interface Review {
  id: string;
  category: "watches" | "bracelets";
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
  {
    id: "rev-1",
    category: "watches",
    customerName: "Ayesha Khan",
    city: "Lahore",
    productName: "Luxury Clover Bracelet Watch",
    productImage:
      "/products/Bracelets/Clover watches/WhatsApp Image 2026-10-20 at 3.04.03 AM.jpeg",
    rating: 5,
    date: "Verified Order • 2 days ago",
    reviewTitle: "Very beautiful watch",
    comment:
      "Received my watch today. It looks so pretty and shining. Same as shown in picture!",
    verifiedBuyer: true,
  },
  {
    id: "rev-2",
    category: "bracelets",
    customerName: "Fatima Noor",
    city: "Karachi",
    productName: "Flower Hand Chain Bracelet",
    productImage:
      "/products/Bracelets/flower hand chain/WhatsApp Image 2026-10-20 at 2.40.10 AM.jpeg",
    rating: 5,
    date: "Verified Order • 3 days ago",
    reviewTitle: "Loved the hand chain",
    comment:
      "Quality is so good for 540 PKR. Looks very delicate and cute on hand.",
    verifiedBuyer: true,
  },
  {
    id: "rev-3",
    category: "bracelets",
    customerName: "Maryam Ali",
    city: "Islamabad",
    productName: "Tulip Charm Bracelet - Rose Pink",
    productImage:
      "/products/Bracelets/WhatsApp Image 2026-09-05 at 22.31.28 (1).jpeg",
    rating: 5,
    date: "Verified Order • 4 days ago",
    reviewTitle: "Super cute bracelet",
    comment:
      "Very neat packing and fast delivery in 3 days. Loved the beads quality.",
    verifiedBuyer: true,
  },
  {
    id: "rev-4",
    category: "watches",
    customerName: "Zainab Tariq",
    city: "Rawalpindi",
    productName: "Luxury Clover Watch - Ruby Gold",
    productImage:
      "/products/Bracelets/Clover watches/WhatsApp Image 2026-10-20 at 3.04.04 AM.jpeg",
    rating: 5,
    date: "Verified Order • 5 days ago",
    reviewTitle: "Great quality & service",
    comment:
      "Watch is 10/10 quality. Affordable price and quick service. Will order again!",
    verifiedBuyer: true,
  },
];

export default function CustomerReviews() {
  const [filter, setFilter] = useState<"all" | "watches" | "bracelets">("all");

  const visibleReviews =
    filter === "all" ? REVIEWS : REVIEWS.filter((r) => r.category === filter);

  return (
    <section id="reviews" className="border-t border-line bg-sand/20 py-14 sm:py-18 lg:py-20 scroll-mt-10">
      <div className="container-layora">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 border-b border-line/60 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="eyebrow text-rose-dark font-semibold">
                Real Customer Reviews
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-bold text-amber-900">
                ★ 5.0 Rated (Verified Orders)
              </span>
            </div>
            <h2 className="font-display text-3xl italic sm:text-4xl lg:text-5xl text-ink">
              Loved by Our Customers
            </h2>
            <p className="mt-2 text-sm text-ink/75 max-w-lg">
              Recent honest feedback from customers across Pakistan who ordered from LAYORA.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto bg-cream p-1.5 rounded-full border border-line shadow-2xs">
            <button
              onClick={() => setFilter("all")}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                filter === "all"
                  ? "bg-rose-dark text-cream shadow-xs"
                  : "text-ink/70 hover:text-ink"
              }`}
            >
              All Reviews ({REVIEWS.length})
            </button>
            <button
              onClick={() => setFilter("watches")}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                filter === "watches"
                  ? "bg-rose-dark text-cream shadow-xs"
                  : "text-ink/70 hover:text-ink"
              }`}
            >
              Clover Watches (2)
            </button>
            <button
              onClick={() => setFilter("bracelets")}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                filter === "bracelets"
                  ? "bg-rose-dark text-cream shadow-xs"
                  : "text-ink/70 hover:text-ink"
              }`}
            >
              Bracelets &amp; Chains (2)
            </button>
          </div>
        </div>

        {/* 4 Reviews Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {visibleReviews.map((review) => (
            <div
              key={review.id}
              className="group flex flex-col justify-between rounded-xl border border-line bg-cream p-5 sm:p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div>
                {/* 5 Stars Rating & Verified Tag */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-0.5 text-amber-500 text-sm tracking-wider">
                    {"★".repeat(review.rating)}
                  </div>
                  {review.verifiedBuyer && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-bold text-emerald-800 border border-emerald-200">
                      ✓ Verified Buyer
                    </span>
                  )}
                </div>

                {/* Review Headline & Short Comment */}
                <h3 className="font-display text-base sm:text-lg italic font-bold text-ink leading-snug mb-2">
                  &ldquo;{review.reviewTitle}&rdquo;
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed text-ink/80 mb-5">
                  {review.comment}
                </p>
              </div>

              {/* Product Info & Customer Details Footer */}
              <div className="border-t border-line/60 pt-3.5 mt-auto">
                <div className="flex items-center gap-2.5">
                  <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg border border-line bg-sand">
                    <Image
                      src={review.productImage}
                      alt={review.productName}
                      fill
                      className="object-cover object-center"
                      sizes="44px"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-ink truncate">
                      {review.customerName}
                    </p>
                    <p className="text-[10px] text-ink/50 truncate">
                      {review.city} • {review.date}
                    </p>
                    <p className="text-[10px] text-rose-dark font-semibold truncate mt-0.5">
                      {review.productName}
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
            <p className="text-xs text-ink/65 uppercase tracking-wider mt-1">Genuine Quality</p>
          </div>
          <div className="p-3">
            <p className="font-display text-2xl sm:text-3xl italic font-bold text-ink">5.0 ★</p>
            <p className="text-xs text-ink/65 uppercase tracking-wider mt-1">Customer Rating</p>
          </div>
          <div className="p-3">
            <p className="font-display text-2xl sm:text-3xl italic font-bold text-ink">2-4 Days</p>
            <p className="text-xs text-ink/65 uppercase tracking-wider mt-1">Fast Delivery</p>
          </div>
          <div className="p-3">
            <p className="font-display text-2xl sm:text-3xl italic font-bold text-ink">JazzCash</p>
            <p className="text-xs text-ink/65 uppercase tracking-wider mt-1">&amp; COD Available</p>
          </div>
        </div>
      </div>
    </section>
  );
}
