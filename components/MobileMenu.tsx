"use client";

import { useState } from "react";
import Link from "next/link";
import { categories } from "@/lib/categories";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [accessoriesOpen, setAccessoriesOpen] = useState(false);

  function close() {
    setOpen(false);
    setAccessoriesOpen(false);
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
        <div className="fixed inset-0 top-[64px] z-40 overflow-y-auto bg-cream">
          <nav className="container-layora flex flex-col gap-1 py-8">
            {categories.map((cat) =>
              cat.subcategories.length > 0 ? (
                <div key={cat.slug} className="border-b border-line py-4">
                  <button
                    className="flex w-full items-center justify-between font-display text-2xl italic"
                    onClick={() => setAccessoriesOpen((v) => !v)}
                    aria-expanded={accessoriesOpen}
                  >
                    {cat.name}
                    <span
                      className={`text-lg transition-transform duration-300 ${
                        accessoriesOpen ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                  {accessoriesOpen && (
                    <div className="mt-4 flex flex-col gap-3 pl-2">
                      <Link
                        href={`/${cat.slug}`}
                        onClick={close}
                        className="text-sm uppercase tracking-wide text-ink/70"
                      >
                        All {cat.name}
                      </Link>
                      {cat.subcategories.map((sub) => (
                        <Link
                          key={sub.slug}
                          href={`/${cat.slug}/${sub.slug}`}
                          onClick={close}
                          className="text-sm uppercase tracking-wide text-ink/70"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={cat.slug}
                  href={`/${cat.slug}`}
                  onClick={close}
                  className="border-b border-line py-4 font-display text-2xl italic"
                >
                  {cat.name}
                </Link>
              )
            )}
            <Link
              href="/cart"
              onClick={close}
              className="py-4 text-sm uppercase tracking-widest2 text-rose-dark"
            >
              View Cart
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
