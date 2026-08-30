"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { buildProductOrderUrl } from "@/lib/whatsapp";
import { useCart } from "@/lib/cart-context";
import QuantitySelector from "./QuantitySelector";
import ProductGallery from "./ProductGallery";
import ProductGrid from "./ProductGrid";

export default function ProductDetail({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) {
  const { addItem } = useCart();
  const [size, setSize] = useState<string | null>(product.sizes[0] ?? null);
  const [color, setColor] = useState<string | null>(product.colors[0] ?? null);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const whatsappUrl = useMemo(
    () => buildProductOrderUrl({ product, quantity, size, color }),
    [product, quantity, size, color]
  );

  function handleAddToCart() {
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      currency: product.currency,
      image: product.images[0],
      size,
      color,
      quantity,
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2200);
  }

  return (
    <div className="container-layora py-10 lg:py-16">
      {/* Breadcrumb */}
      <nav className="mb-8 flex flex-wrap items-center gap-1.5 text-xs uppercase tracking-wide text-ink/50">
        <Link href="/" className="hover:text-rose-dark">
          Home
        </Link>
        <span>/</span>
        <Link href={`/${product.category}`} className="capitalize hover:text-rose-dark">
          {product.category}
        </Link>
        {product.subcategory && (
          <>
            <span>/</span>
            <Link
              href={`/${product.category}/${product.subcategory}`}
              className="hover:text-rose-dark"
            >
              {product.subcategory.replace("-", " ")}
            </Link>
          </>
        )}
        <span>/</span>
        <span className="text-ink/70">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        <ProductGallery images={product.images} name={product.name} />

        <div className="lg:max-w-md">
          {(product.isNew || !product.available) && (
            <p className="eyebrow mb-3">
              {!product.available ? "Sold Out" : "New Arrival"}
            </p>
          )}
          <h1 className="font-display text-3xl italic sm:text-4xl">{product.name}</h1>
          <p className="mt-3 text-lg text-ink/80">
            {formatPrice(product.price, product.currency)}
          </p>

          <p className="mt-6 text-[15px] leading-relaxed text-ink/70">
            {product.description}
          </p>

          {product.details.length > 0 && (
            <ul className="mt-5 flex flex-col gap-1.5 border-t border-line pt-5 text-sm text-ink/60">
              {product.details.map((d) => (
                <li key={d} className="flex gap-2">
                  <span className="text-rose-dark">—</span>
                  {d}
                </li>
              ))}
            </ul>
          )}

          {product.colors.length > 0 && (
            <div className="mt-7">
              <p className="mb-2.5 text-xs uppercase tracking-wide text-ink/60">
                Color{color ? `: ${color}` : ""}
              </p>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={`border px-4 py-2 text-xs uppercase tracking-wide transition-colors ${
                      color === c
                        ? "border-ink bg-ink text-cream"
                        : "border-ink/25 text-ink/70 hover:border-ink"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.sizes.length > 0 && (
            <div className="mt-6">
              <p className="mb-2.5 text-xs uppercase tracking-wide text-ink/60">
                Size{size ? `: ${size}` : ""}
              </p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`h-10 min-w-10 border px-3 text-xs uppercase tracking-wide transition-colors ${
                      size === s
                        ? "border-ink bg-ink text-cream"
                        : "border-ink/25 text-ink/70 hover:border-ink"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-7 flex items-center gap-4">
            <p className="text-xs uppercase tracking-wide text-ink/60">Quantity</p>
            <QuantitySelector
              quantity={quantity}
              onChange={setQuantity}
              max={product.stock || 99}
            />
          </div>

          <p className="mt-4 text-xs text-ink/50">
            {product.available
              ? product.stock <= 5
                ? `Only ${product.stock} left in stock`
                : "In stock, ready to ship"
              : "Currently sold out"}
          </p>

          <div className="mt-7 flex flex-col gap-3">
            <button
              onClick={handleAddToCart}
              disabled={!product.available}
              className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-40"
            >
              {justAdded ? "Added to Cart ✓" : "Add to Cart"}
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-disabled={!product.available}
              className={`btn-whatsapp w-full ${
                !product.available ? "pointer-events-none opacity-40" : ""
              }`}
            >
              Order on WhatsApp
            </a>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-20 border-t border-line pt-14 lg:mt-28">
          <h2 className="mb-8 font-display text-2xl italic sm:text-3xl">
            You May Also Like
          </h2>
          <ProductGrid products={related} />
        </div>
      )}
    </div>
  );
}
