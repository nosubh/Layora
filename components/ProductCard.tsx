"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/format";

export default function ProductCard({ product }: { product: Product }) {
  const secondImage = product.images[1];
  const [hasHovered, setHasHovered] = useState(false);

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block"
      onMouseEnter={() => {
        if (!hasHovered && secondImage) setHasHovered(true);
      }}
      onTouchStart={() => {
        if (!hasHovered && secondImage) setHasHovered(true);
      }}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-sand">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(min-width: 1280px) 280px, (min-width: 1024px) 25vw, (min-width: 640px) 48vw, 92vw"
          className={`object-cover transition-opacity duration-500 ease-elegant ${
            secondImage && hasHovered ? "group-hover:opacity-0" : ""
          }`}
        />
        {secondImage && hasHovered && (
          <Image
            src={secondImage}
            alt=""
            fill
            sizes="(min-width: 1280px) 280px, (min-width: 1024px) 25vw, (min-width: 640px) 48vw, 92vw"
            className="absolute inset-0 object-cover opacity-0 transition-opacity duration-500 ease-elegant group-hover:opacity-100"
          />
        )}

        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="bg-rose-700 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-cream">
              Sale
            </span>
          )}
          {product.featured && !product.originalPrice && (
            <span className="bg-rose-dark px-2.5 py-1 text-[10px] uppercase tracking-wide text-cream">
              Featured
            </span>
          )}
          {!product.available && (
            <span className="bg-ink/60 px-2.5 py-1 text-[10px] uppercase tracking-wide text-cream">
              Sold Out
            </span>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-start justify-between gap-2">
        <div>
          <h3 className="text-sm text-ink group-hover:text-rose-dark transition-colors duration-200">
            {product.name}
          </h3>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-sm font-semibold text-rose-dark">
              {formatPrice(product.price, product.currency)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-ink/40 line-through">
                {formatPrice(product.originalPrice, product.currency)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
