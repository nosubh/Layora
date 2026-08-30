import Link from "next/link";
import Logo from "./Logo";
import CartIcon from "./CartIcon";
import MobileMenu from "./MobileMenu";

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
          <Link
            href="/dresses"
            className="text-[13px] uppercase tracking-wider text-ink/80 transition-colors duration-200 hover:text-rose-dark font-medium"
          >
            Ethnic Dresses
          </Link>
          <Link
            href="/#featured"
            className="text-[13px] uppercase tracking-wider text-ink/80 transition-colors duration-200 hover:text-rose-dark font-medium"
          >
            Featured Festive
          </Link>
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
