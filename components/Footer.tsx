import Link from "next/link";
import { SITE_NAME, SITE_TAGLINE, INSTAGRAM_URL, INSTAGRAM_HANDLE } from "@/lib/config";
import { buildGeneralContactUrl } from "@/lib/whatsapp";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-sand">
      <div className="container-layora grid grid-cols-1 gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:py-20">
        <div>
          <span className="font-display text-2xl tracking-[0.18em]">{SITE_NAME}</span>
          <p className="mt-2 text-[10px] uppercase tracking-widest2 text-ink/60">
            {SITE_TAGLINE}
          </p>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink/70">
            Handcrafted ethnic luxury dresses, festive pret, and artisanal
            silhouettes made to feel effortless.
          </p>
        </div>

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
              <Link href="/#featured" className="hover:text-rose-dark">
                Featured Festive
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="eyebrow mb-5">Customer Care</h3>
          <ul className="flex flex-col gap-3 text-sm text-ink/75">
            <li>
              <a
                href={buildGeneralContactUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-rose-dark"
              >
                Size &amp; Custom Sizing
              </a>
            </li>
            <li>
              <a
                href={buildGeneralContactUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-rose-dark"
              >
                Order via WhatsApp
              </a>
            </li>
            <li>
              <Link href="/cart" className="hover:text-rose-dark">
                Shopping Cart
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="eyebrow mb-5">Connect</h3>
          <ul className="flex flex-col gap-3 text-sm text-ink/75">
            <li>
              <a
                href={buildGeneralContactUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-rose-dark font-medium text-emerald-800"
              >
                Chat on WhatsApp
              </a>
            </li>
            <li>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-rose-dark"
              >
                @{INSTAGRAM_HANDLE}
              </a>
            </li>
          </ul>
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
