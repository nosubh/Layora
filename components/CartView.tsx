"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/format";
import { buildCartOrderUrl } from "@/lib/whatsapp";
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

  const whatsappUrl = buildCartOrderUrl(items);

  return (
    <div className="container-layora py-10 lg:py-16">
      <h1 className="font-display text-3xl italic sm:text-4xl">Your Cart</h1>

      <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="flex flex-col divide-y divide-line border-y border-line">
            {items.map((item) => (
              <div
                key={`${item.productId}-${item.size}-${item.color}`}
                className="flex gap-4 py-6 sm:gap-6"
              >
                <Link
                  href={`/products/${item.slug}`}
                  className="relative h-28 w-24 shrink-0 overflow-hidden bg-sand sm:h-32 sm:w-28"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="150px"
                    className="object-cover"
                  />
                </Link>

                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link
                        href={`/products/${item.slug}`}
                        className="text-sm hover:text-rose-dark sm:text-base"
                      >
                        {item.name}
                      </Link>
                      <p className="mt-1 text-xs text-ink/50">
                        {item.color && <span>Color: {item.color} </span>}
                        {item.size && <span>Size: {item.size}</span>}
                      </p>
                      <p className="mt-1 text-sm text-ink/70">
                        {formatPrice(item.price, item.currency)}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.productId, item.size, item.color)}
                      aria-label={`Remove ${item.name}`}
                      className="text-xs uppercase tracking-wide text-ink/40 hover:text-rose-dark"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <QuantitySelector
                      quantity={item.quantity}
                      onChange={(q) =>
                        updateQuantity(item.productId, item.size, item.color, q)
                      }
                    />
                    <p className="text-sm text-ink/80">
                      {formatPrice(item.price * item.quantity, item.currency)}
                    </p>
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
          <div className="mt-5 flex items-center justify-between text-sm">
            <span className="text-ink/60">Subtotal</span>
            <span>{formatPrice(subtotal, items[0]?.currency ?? "PKR")}</span>
          </div>
          <p className="mt-2 text-xs text-ink/45">
            Delivery charges are confirmed with you directly on WhatsApp.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp mt-6 w-full"
          >
            Checkout via WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
