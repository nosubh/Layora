"use client";

import { useState } from "react";
import Image from "next/image";

interface Review {
  id: string;
  category: "dresses" | "cases" | "skincare";
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
  // 1. Ethnic Festive Dress
  {
    id: "rev-dress-1",
    category: "dresses",
    customerName: "Hira Mansoor",
    city: "Lahore",
    productName: "Blush Vanilla Festive Suit",
    productImage: "/products/ethnic/blush-vanilla/1.jpeg",
    rating: 5,
    date: "Verified Order • 3 days ago",
    reviewTitle: "Beautiful dress & great quality!",
    comment:
      "The fabric is very soft and the embroidery looks amazing in person. Received my parcel in 3 days.",
    verifiedBuyer: true,
  },
  // 2. Ethnic Festive Dress
  {
    id: "rev-dress-2",
    category: "dresses",
    customerName: "Sana Tariq",
    city: "Karachi",
    productName: "Coral Breeze Embroidered Ensemble",
    productImage: "/products/ethnic/coral-breeze/1.jpeg",
    rating: 5,
    date: "Verified Order • 5 days ago",
    reviewTitle: "Perfect fitting & fast delivery",
    comment:
      "Ordered on WhatsApp and it arrived quickly. The color and stitching are 10/10.",
    verifiedBuyer: true,
  },
  // 3. Persian Heritage Phone Case
  {
    id: "rev-case-1",
    category: "cases",
    customerName: "Ahmad Raza",
    city: "Lahore",
    productName: "Isfahan Royal Medallion Case",
    productImage: "/products/cases/persian/persian-01.jpeg",
    rating: 5,
    date: "Verified Order • 3 days ago",
    reviewTitle: "Super classy case!",
    comment:
      "The Persian rug print looks so unique and premium. Protects my phone really well.",
    verifiedBuyer: true,
  },
  // 4. Pop Art Phone Case
  {
    id: "rev-case-2",
    category: "cases",
    customerName: "Zubair Shah",
    city: "Islamabad",
    productName: "The Roar Royal Tiger Case",
    productImage: "/products/cases/the-roar.jpeg",
    rating: 5,
    date: "Verified Order • 6 days ago",
    reviewTitle: "Vibrant colors & solid grip",
    comment:
      "Print quality is top notch and does not fade. Button clicks are very smooth.",
    verifiedBuyer: true,
  },
  // 5. Handcrafted Jelly Soap
  {
    id: "rev-soap-1",
    category: "skincare",
    customerName: "Noor ul Ain",
    city: "Karachi",
    productName: "Rose Blossom Glow Jelly Soap",
    productImage: "/products/skincare/jelly-soaps/1.jpeg",
    rating: 5,
    date: "Verified Order • 4 days ago",
    reviewTitle: "Smells lovely and very hydrating",
    comment:
      "The bouncy jelly texture is so fun to use and leaves skin super soft.",
    verifiedBuyer: true,
  },
  // 6. Handcrafted Jelly Soap
  {
    id: "rev-soap-2",
    category: "skincare",
    customerName: "Anum Javed",
    city: "Multan",
    productName: "Lavender Breeze Relaxing Jelly Soap",
    productImage: "/products/skincare/jelly-soaps/3.jpeg",
    rating: 5,
    date: "Verified Order • 1 week ago",
    reviewTitle: "Loved the custom monogram!",
    comment:
      "Ordered customized soap sets as gifts for my cousins. Everyone loved the aroma!",
    verifiedBuyer: true,
  },
];

export default function CustomerReviews() {
  const [filter, setFilter] = useState<"all" | "dresses" | "cases" | "skincare">("all");

  const visibleReviews =
    filter === "all" ? REVIEWS : REVIEWS.filter((r) => r.category === filter);

  return (
    <section className="border-t border-line bg-sand/30 py-16 sm:py-20 lg:py-24">
      <div className="container-layora">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 border-b border-line/60 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="eyebrow text-rose-dark font-semibold">Real Customer Voices</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-bold text-amber-900">
                ★ 5.0 Rated (100% Satisfied)
              </span>
            </div>
            <h2 className="font-display text-3xl italic sm:text-4xl lg:text-5xl text-ink">
              Loved by Our Community
            </h2>
            <p className="mt-2 text-sm text-ink/75 max-w-lg">
              Read authentic feedback from verified clients who trust LAYORA for artisanal ethnic wear, designer phone cases, and handcrafted skincare.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto bg-cream p-1.5 rounded-full border border-line shadow-2xs">
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
              Dresses (2)
            </button>
            <button
              onClick={() => setFilter("cases")}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                filter === "cases"
                  ? "bg-ink text-cream shadow-xs"
                  : "text-ink/70 hover:text-ink"
              }`}
            >
              Cases (2)
            </button>
            <button
              onClick={() => setFilter("skincare")}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                filter === "skincare"
                  ? "bg-ink text-cream shadow-xs"
                  : "text-ink/70 hover:text-ink"
              }`}
            >
              Soaps (2)
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
                      ✓ Verified Order
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
            <p className="text-xs text-ink/65 uppercase tracking-wider mt-1">Authentic Craftsmanship</p>
          </div>
          <div className="p-3">
            <p className="font-display text-2xl sm:text-3xl italic font-bold text-ink">5.0 ★</p>
            <p className="text-xs text-ink/65 uppercase tracking-wider mt-1">Customer Rating</p>
          </div>
          <div className="p-3">
            <p className="font-display text-2xl sm:text-3xl italic font-bold text-ink">3-5 Days</p>
            <p className="text-xs text-ink/65 uppercase tracking-wider mt-1">Delivery Nationwide</p>
          </div>
          <div className="p-3">
            <p className="font-display text-2xl sm:text-3xl italic font-bold text-ink">24/7</p>
            <p className="text-xs text-ink/65 uppercase tracking-wider mt-1">WhatsApp Concierge</p>
          </div>
        </div>
      </div>
    </section>
  );
}

