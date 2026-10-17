"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/format";
import QuantitySelector from "./QuantitySelector";

export default function CartView() {
  const { items, updateQuantity, removeItem, subtotal, isLoaded } = useCart();

  if (!isLoaded) {
    return <div className="container-layora py-24" />;
  }

  if (items.length === 0) {
    return (
      <div className="container-layora py-24 text-center">
        <h1 className="font-display text-3xl italic">Your Cart is Empty</h1>
        <p className="mt-3 text-sm text-ink/60">
          Looks like you haven&apos;t added anything yet.
        </p>
        <Link href="/" className="btn-primary mt-8 inline-flex">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container-layora py-10 lg:py-16">
      <h1 className="font-display text-3xl italic sm:text-4xl">Your Cart</h1>

      <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="flex flex-col divide-y divide-line border-y border-line">
            {items.map((item) => (
              <div
                key={`${item.productId}-${item.size ?? ""}-${item.color ?? ""}`}
                className="flex gap-5 py-6"
              >
                <div className="relative h-28 w-24 shrink-0 bg-sand">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <Link
                        href={`/products/${item.slug}`}
                        className="font-display text-base italic hover:text-rose-dark"
                      >
                        {item.name}
                      </Link>
                      <button
                        onClick={() =>
                          removeItem(item.productId, item.size, item.color)
                        }
                        className="text-xs text-ink/40 hover:text-rose-dark"
                        aria-label="Remove item"
                      >
                        ✕
                      </button>
                    </div>

                    <p className="mt-1 text-xs text-ink/60">
                      {item.size && `Size: ${item.size}`}
                      {item.size && item.color && " | "}
                      {item.color && `Color: ${item.color}`}
                    </p>

                    <p className="mt-2 font-display text-sm text-rose-dark">
                      {formatPrice(item.price, item.currency)}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center border border-line">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.productId,
                            item.size,
                            item.color,
                            item.quantity - 1
                          )
                        }
                        className="flex h-7 w-7 items-center justify-center text-xs hover:bg-sand/60"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="flex h-7 w-8 items-center justify-center text-xs">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.productId,
                            item.size,
                            item.color,
                            item.quantity + 1
                          )
                        }
                        className="flex h-7 w-7 items-center justify-center text-xs hover:bg-sand/60"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <span className="text-xs font-semibold">
                      {formatPrice(item.price * item.quantity, item.currency)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/"
            className="mt-6 inline-block border-b border-ink/40 pb-0.5 text-[12px] uppercase tracking-wide text-ink/70 hover:border-rose-dark hover:text-rose-dark"
          >
            ← Continue Shopping
          </Link>
        </div>

        <div className="h-fit border border-line p-6 sm:p-8">
          <h2 className="font-display text-xl italic">Order Summary</h2>
          <div className="mt-5 space-y-2 border-t border-line/60 pt-4 text-xs text-ink/75">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-ink">{formatPrice(subtotal, items[0]?.currency ?? "PKR")}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Standard Delivery</span>
              <span>
                {subtotal >= 5000 ? (
                  <span className="text-emerald-700 font-bold uppercase text-[11px]">
                    FREE Delivery
                  </span>
                ) : (
                  formatPrice(250, items[0]?.currency ?? "PKR")
                )}
              </span>
            </div>
            {subtotal < 5000 && (
              <p className="text-[10px] text-rose-dark bg-rose/10 px-2 py-1 rounded">
                💡 Add {formatPrice(5000 - subtotal, "PKR")} more for FREE Delivery!
              </p>
            )}
            <div className="flex items-baseline justify-between border-t border-line/60 pt-3 text-sm font-bold text-ink">
              <span>Estimated Total</span>
              <span className="font-display text-xl text-rose-dark">
                {formatPrice(subtotal + (subtotal >= 5000 ? 0 : 250), items[0]?.currency ?? "PKR")}
              </span>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-2.5">
            {/* Sole Primary Action: Direct Website Checkout */}
            <Link
              href="/checkout"
              className="btn-primary w-full flex items-center justify-center gap-2 text-xs sm:text-sm py-4 font-bold tracking-wider uppercase shadow-md hover:shadow-lg transition-all"
            >
              <span>PROCEED TO CHECKOUT &amp; PAY →</span>
            </Link>

            <div className="mt-3 pt-3 border-t border-line/60 text-[11px] text-ink/65 space-y-1.5">
              <p className="flex items-center gap-1.5">
                <span className="text-emerald-700">✓</span>
                <span>Direct Bank Transfer (IBFT) &amp; Cash on Delivery</span>
              </p>
              <p className="flex items-center gap-1.5">
                <span className="text-emerald-700">✓</span>
                <span>Automatic Order &amp; Billing Sheet Confirmation</span>
              </p>
              <p className="flex items-center gap-1.5">
                <span className="text-emerald-700">✓</span>
                <span>1-Week Guaranteed Nationwide Delivery</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
