import Link from "next/link";
import Logo from "./Logo";
import CartIcon from "./CartIcon";
import MobileMenu from "./MobileMenu";
import { categories } from "@/lib/categories";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-cream/95 backdrop-blur">
      <div className="container-layora flex h-16 items-center justify-between lg:h-20">
        {/* Mobile: hamburger on the left */}
        <div className="flex flex-1 items-center lg:hidden">
          <MobileMenu />
        </div>

        {/* Desktop: nav links on the left */}
        <nav className="hidden flex-1 items-center gap-9 lg:flex">
          {categories.map((cat) =>
            cat.subcategories.length > 0 ? (
              <div key={cat.slug} className="group relative">
                <Link
                  href={`/${cat.slug}`}
                  className="text-[13px] uppercase tracking-wide text-ink/80 transition-colors duration-200 hover:text-rose-dark"
                >
                  {cat.name}
                </Link>
                <div className="invisible absolute left-0 top-full z-10 w-56 translate-y-1 border border-line bg-cream opacity-0 shadow-[0_18px_40px_-20px_rgba(36,30,26,0.35)] transition-all duration-200 ease-elegant group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  <Link
                    href={`/${cat.slug}`}
                    className="block border-b border-line px-5 py-3 text-[12px] uppercase tracking-wide text-ink/70 hover:bg-sand hover:text-rose-dark"
                  >
                    All {cat.name}
                  </Link>
                  {cat.subcategories.map((sub) => (
                    <Link
                      key={sub.slug}
                      href={`/${cat.slug}/${sub.slug}`}
                      className="block px-5 py-3 text-[12px] uppercase tracking-wide text-ink/70 hover:bg-sand hover:text-rose-dark"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={cat.slug}
                href={`/${cat.slug}`}
                className="text-[13px] uppercase tracking-wide text-ink/80 transition-colors duration-200 hover:text-rose-dark"
              >
                {cat.name}
              </Link>
            )
          )}
        </nav>

        {/* Center: logo */}
        <div className="flex flex-1 justify-center lg:flex-none">
          <Logo />
        </div>

        {/* Right: cart */}
        <div className="flex flex-1 items-center justify-end">
          <CartIcon />
        </div>
      </div>
    </header>
  );
}
