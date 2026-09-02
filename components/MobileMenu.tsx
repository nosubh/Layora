"use client";

import { useState } from "react";
import Link from "next/link";
import { categories } from "@/lib/categories";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  function close() {
    setOpen(false);
  }

  return (
    <div className="lg:hidden">
      <button
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex h-9 w-9 flex-col items-center justify-center gap-[5px]"
      >
        <span
          className={`block h-px w-5 bg-ink transition-transform duration-300 ease-elegant ${
            open ? "translate-y-[6.5px] rotate-45" : ""
          }`}
        />
        <span
          className={`block h-px w-5 bg-ink transition-opacity duration-200 ${
            open ? "opacity-0" : "opacity-100"
          }`}
        />
        <span
          className={`block h-px w-5 bg-ink transition-transform duration-300 ease-elegant ${
            open ? "-translate-y-[6.5px] -rotate-45" : ""
          }`}
        />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-cream p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-line pb-4">
              <span className="font-display text-xl italic text-ink">Menu</span>
              <button
                onClick={close}
                className="text-2xl font-light text-ink/70 hover:text-ink px-2 py-1"
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>
            <nav className="flex flex-col gap-2 py-6">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/${cat.slug}`}
                  onClick={close}
                  className="border-b border-line/60 py-4 font-display text-2xl italic text-ink hover:text-rose-dark transition-colors flex items-center justify-between"
                >
                  <span>{cat.name}</span>
                  {cat.comingSoon && (
                    <span className="rounded-full bg-rose-100 px-2 py-0.5 text-xs font-sans not-italic font-semibold text-rose-800 uppercase tracking-wider">
                      Coming Soon
                    </span>
                  )}
                </Link>
              ))}
              <Link
                href="/cart"
                onClick={close}
                className="py-4 text-sm uppercase tracking-widest2 text-rose-dark font-medium"
              >
                Shopping Cart
              </Link>
            </nav>
          </div>
          <div className="pt-6 border-t border-line text-xs text-ink/50 text-center">
            LAYORA • Style &amp; Accessories
          </div>
        </div>
      )}
    </div>
  );
}
