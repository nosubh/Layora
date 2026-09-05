import Link from "next/link";
import Logo from "./Logo";
import CartIcon from "./CartIcon";
import MobileMenu from "./MobileMenu";
import HeaderFloralDecor from "./HeaderFloralDecor";

export default function Header() {
  return (
    <header className="relative border-b border-line bg-[#FAF5F0] transition-all shadow-xs">
      {/* ============================================================ */}
      {/* 1. TOP TIER: REAL BOTANICAL FLOWERS & BIG BOLD LOGO */}
      {/* ============================================================ */}
      <div className="relative overflow-hidden">
        {/* Real Giant Botanical Floral Art (Left & Right) */}
        <HeaderFloralDecor />

        <div className="container-layora relative z-10 flex items-center justify-between py-6 sm:py-8 lg:py-10 gap-4">
          {/* Mobile: Hamburger Menu on Left */}
          <div className="flex flex-1 items-center lg:hidden">
            <div className="rounded-full bg-cream/85 backdrop-blur-md p-1.5 shadow-2xs">
              <MobileMenu />
            </div>
          </div>

          {/* Desktop Left Spacer for perfect symmetrical balance */}
          <div className="hidden flex-1 lg:block" />

          {/* Center: BIG BOLD LUXURY LOGO + STYLE & ACCESSORIES */}
          <div className="flex justify-center flex-shrink-0 px-2 sm:px-4 relative">
            <Logo size="huge" showTagline={true} />
          </div>

          {/* Right: Cart Icon */}
          <div className="flex flex-1 items-center justify-end">
            <div className="rounded-full bg-cream/85 backdrop-blur-md px-3 py-1.5 shadow-2xs">
              <CartIcon />
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. BOTTOM TIER: DEDICATED CATEGORIES BAR (BELOW FLOWERS) */}
      {/* ============================================================ */}
      <div className="border-t border-line/70 bg-cream/95 backdrop-blur-md shadow-2xs">
        <div className="container-layora">
          {/* Desktop & Tablet Categories Navigation */}
          <nav className="flex items-center justify-center gap-6 sm:gap-10 md:gap-14 py-3 sm:py-3.5 overflow-x-auto no-scrollbar">
            <Link
              href="/"
              className="shrink-0 text-xs sm:text-[13px] uppercase tracking-widest text-ink/90 font-bold transition-all duration-200 hover:text-rose-dark hover:scale-105"
            >
              Home
            </Link>

            <span className="text-line hidden sm:inline">•</span>

            <Link
              href="/dresses"
              className="shrink-0 text-xs sm:text-[13px] uppercase tracking-widest text-ink/90 font-bold transition-all duration-200 hover:text-rose-dark hover:scale-105"
            >
              Ethnic Dresses
            </Link>

            <span className="text-line hidden sm:inline">•</span>

            <Link
              href="/accessories"
              className="shrink-0 text-xs sm:text-[13px] uppercase tracking-widest text-ink/90 font-bold transition-all duration-200 hover:text-rose-dark hover:scale-105"
            >
              Accessories
            </Link>

            <span className="text-line hidden sm:inline">•</span>

            <Link
              href="/skincare"
              className="shrink-0 text-xs sm:text-[13px] uppercase tracking-widest text-ink/90 font-bold transition-all duration-200 hover:text-rose-dark hover:scale-105"
            >
              Skincare
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
