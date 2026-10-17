"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/lib/cart-context";
import QuantitySelector from "./QuantitySelector";
import ProductGallery from "./ProductGallery";
import ProductGrid from "./ProductGrid";
import SizeChart from "./SizeChart";

export default function ProductDetail({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) {
  const router = useRouter();
  const { addItem } = useCart();
  const [size, setSize] = useState<string | null>(product.sizes[0] ?? null);
  const [color, setColor] = useState<string | null>(product.colors[0] ?? null);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

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

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16 items-start">
        <div>
          <ProductGallery images={product.images} name={product.name} />
          {product.category === "dresses" && (
            <SizeChart selectedSize={size} onSelectSize={setSize} />
          )}
        </div>

        <div className="lg:max-w-md">
          {!product.available && (
            <p className="eyebrow mb-3">
              Sold Out
            </p>
          )}
          <h1 className="font-display text-3xl italic sm:text-4xl">{product.name}</h1>
          <div className="mt-3 flex flex-wrap items-baseline gap-3">
            <span className="text-2xl font-bold text-rose-dark">
              {formatPrice(product.price, product.currency)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <>
                <span className="text-base text-ink/40 line-through">
                  {formatPrice(product.originalPrice, product.currency)}
                </span>
                <span className="rounded bg-rose-100 px-2 py-0.5 text-[11px] font-semibold text-rose-900 uppercase tracking-wider">
                  Sale Price
                </span>
              </>
            )}
          </div>

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
            <div className="mt-6">
              <p className="mb-2.5 text-xs uppercase tracking-wide text-ink/60">
                Color{color ? `: ${color}` : ""}
              </p>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    type="button"
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
              <div className="flex items-center justify-between mb-2.5">
                <label className="text-xs uppercase tracking-wide text-ink/60">
                  Select {product.category === "dresses" ? "Size" : "Option"}{size ? `: ${size}` : ""}
                </label>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    className={`border px-4 py-2 text-xs uppercase tracking-wide transition-colors ${
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

          <div className="mt-7 flex flex-col gap-3">
            {/* Primary Action: Direct Buy Now with Instant Checkout */}
            <button
              onClick={() => {
                if (!product.available) return;
                addItem({
                  productId: product.id,
                  slug: product.slug,
                  name: product.name,
                  price: product.price,
                  image: product.images[0] ?? "",
                  size,
                  color,
                  quantity,
                  currency: product.currency,
                });
                router.push("/checkout");
              }}
              disabled={!product.available}
              className="btn-primary w-full py-4 text-xs sm:text-sm font-bold tracking-widest uppercase shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-40 transition-all flex items-center justify-center gap-2"
            >
              <span>⚡ BUY NOW</span>
            </button>

            {/* Secondary Action: Add to Cart */}
            <button
              onClick={handleAddToCart}
              disabled={!product.available}
              className="btn-outline w-full py-3.5 text-xs sm:text-sm font-semibold tracking-wider uppercase hover:border-ink hover:bg-sand/40 disabled:cursor-not-allowed disabled:opacity-40 transition-all flex items-center justify-center gap-2"
            >
              <span>{justAdded ? "Added to Cart ✓" : "Add to Cart"}</span>
            </button>

            {/* Trust & Guarantee Badges */}
            <div className="mt-3 pt-4 border-t border-line/70 grid grid-cols-2 gap-2 text-[11px] text-ink/70">
              <div className="flex items-center gap-1.5">
                <span className="text-emerald-700">🔒</span>
                <span>Secure Online Checkout</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-rose-dark">🚚</span>
                <span>1-Week Standard Delivery</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-rose-dark">🔄</span>
                <span>7-Day Exchange Window</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-emerald-700">✓</span>
                <span>Direct Bank IBFT &amp; COD</span>
              </div>
            </div>
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
