import Link from "next/link";
import Image from "next/image";
import {
  SITE_NAME,
  SITE_TAGLINE,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  WHATSAPP_DISPLAY_PK,
  WHATSAPP_DISPLAY_INTL,
} from "@/lib/config";
import { buildGeneralContactUrl } from "@/lib/whatsapp";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-sand/20">
      {/* Top Quick Highlights Strip */}
      <div className="border-b border-line bg-cream/80 py-6">
        <div className="container-layora grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="font-display text-lg italic text-ink">Handcrafted Pret</p>
            <p className="text-xs text-ink/65 mt-0.5">Artisanal stitching &amp; embroidery</p>
          </div>
          <div>
            <p className="font-display text-lg italic text-ink">Fast Delivery</p>
            <p className="text-xs text-ink/65 mt-0.5">1-Week standard delivery</p>
          </div>
          <div>
            <p className="font-display text-lg italic text-ink">Global Shipping</p>
            <p className="text-xs text-ink/65 mt-0.5">Pakistan &amp; Worldwide delivery</p>
          </div>
          <div>
            <p className="font-display text-lg italic text-ink">Direct WhatsApp</p>
            <p className="text-xs text-ink/65 mt-0.5">Pakistan &amp; International support</p>
          </div>
        </div>
      </div>

      <div className="container-layora grid grid-cols-1 gap-10 py-12 sm:py-16 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand Column with Original Round Logo */}
        <div className="flex flex-col gap-4">
          <Link href="/" className="inline-flex items-center gap-3.5 group">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-full overflow-hidden border-2 border-rose-dark/40 shadow-sm transition-transform duration-300 group-hover:scale-105 bg-sand">
              <Image
                src="/brand/logo.jpeg"
                alt="LAYORA Emblem"
                fill
                sizes="80px"
                className="object-cover"
              />
            </div>
            <div>
              <span className="font-display text-2xl sm:text-3xl font-bold tracking-[0.16em] text-ink block leading-none">
                {SITE_NAME}
              </span>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-rose-dark font-bold block mt-1">
                {SITE_TAGLINE}
              </span>
            </div>
          </Link>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink/70">
            Handcrafted ethnic luxury dresses, festive pret, designer phone cases, and artisanal
            silhouettes made to feel effortless.
          </p>
        </div>

        {/* Collections */}
        <div>
          <h3 className="eyebrow mb-5">Collections</h3>
          <ul className="flex flex-col gap-3 text-sm text-ink/75">
            <li>
              <Link href="/" className="hover:text-rose-dark">
                Home
              </Link>
            </li>
            <li>
              <Link href="/dresses" className="hover:text-rose-dark">
                Ethnic Dresses
              </Link>
            </li>
            <li>
              <Link href="/accessories" className="hover:text-rose-dark">
                Accessories &amp; Cases
              </Link>
            </li>
            <li>
              <Link href="/skincare" className="hover:text-rose-dark">
                Skincare &amp; Jelly Soaps
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h3 className="eyebrow mb-5">Customer Care</h3>
          <ul className="flex flex-col gap-3 text-sm text-ink/75">
            <li>
              <a
                href={buildGeneralContactUrl("pk")}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-rose-dark font-medium text-emerald-800"
              >
                🇵🇰 Pakistan: {WHATSAPP_DISPLAY_PK}
              </a>
            </li>
            <li>
              <a
                href={buildGeneralContactUrl("intl")}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-rose-dark font-medium text-emerald-800"
              >
                🌍 Intl / UAE: {WHATSAPP_DISPLAY_INTL}
              </a>
            </li>
            <li>
              <Link href="/cart" className="hover:text-rose-dark">
                Shopping Cart
              </Link>
            </li>
            <li>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-rose-dark"
              >
                Instagram @{INSTAGRAM_HANDLE}
              </a>
            </li>
          </ul>
        </div>

        {/* Dedicated WhatsApp Order & Shipping Policy Card */}
        <div>
          <h3 className="eyebrow mb-5">Ordering &amp; Shipping</h3>
          <div className="rounded-sm border border-line/80 bg-cream/70 p-4 text-xs space-y-3 text-ink/80 shadow-2xs">
            <div>
              <p className="text-[10px] uppercase tracking-wider font-semibold text-rose-dark">
                Order via WhatsApp
              </p>
              <div className="mt-1.5 space-y-1.5">
                <a
                  href={buildGeneralContactUrl("pk")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block font-semibold text-emerald-800 hover:underline"
                >
                  🇵🇰 {WHATSAPP_DISPLAY_PK} (Pakistan)
                </a>
                <a
                  href={buildGeneralContactUrl("intl")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block font-semibold text-emerald-800 hover:underline"
                >
                  🌍 {WHATSAPP_DISPLAY_INTL} (International)
                </a>
              </div>
            </div>
            <div className="border-t border-line/50 pt-2">
              <p className="text-[10px] uppercase tracking-wider font-semibold text-ink/60">
                Payment Mode
              </p>
              <p className="font-medium text-ink">Bank Transfer</p>
            </div>
            <div className="border-t border-line/50 pt-2">
              <p className="text-[10px] uppercase tracking-wider font-semibold text-ink/60">
                Delivery Timeline
              </p>
              <p className="font-medium text-ink">1 Week Delivery</p>
            </div>
            <div className="border-t border-line/50 pt-2">
              <p className="text-[10px] uppercase tracking-wider font-semibold text-ink/60">
                Worldwide Shipping
              </p>
              <p className="text-[11px] leading-relaxed text-ink/75">
                Delivery available across Pakistan and worldwide. International shipping charges apply.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-line py-6">
        <p className="container-layora text-center text-xs text-ink/50">
          © {year} {SITE_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
