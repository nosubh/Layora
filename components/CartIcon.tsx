"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";

export default function CartIcon({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const { totalItems, isLoaded } = useCart();
  const color = variant === "light" ? "text-cream" : "text-ink";

  return (
    <Link
      href="/cart"
      aria-label={`Cart, ${totalItems} item${totalItems === 1 ? "" : "s"}`}
      className={`relative inline-flex items-center justify-center ${color} transition-colors duration-300 hover:text-rose`}
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 7V6a6 6 0 0 1 12 0v1" />
        <path d="M4.5 7h15l-1 13.5a1.5 1.5 0 0 1-1.5 1.5H7a1.5 1.5 0 0 1-1.5-1.5L4.5 7Z" />
      </svg>
      {isLoaded && totalItems > 0 && (
        <span className="absolute -top-2 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-dark px-1 text-[10px] font-semibold text-cream">
          {totalItems}
        </span>
      )}
    </Link>
  );
}
