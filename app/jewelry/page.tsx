import type { Metadata } from "next";
import Link from "next/link";
import CategoryHeader from "@/components/CategoryHeader";
import { getCategory } from "@/lib/categories";
import { buildGeneralContactUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Jewelry — Coming Soon",
  description:
    "Handcrafted luxury fine jewelry, bridal sets, and artisanal statement pieces launching soon at LAYORA.",
};

export default function JewelryPage() {
  const category = getCategory("jewelry");

  return (
    <div>
      <CategoryHeader
        eyebrow="Exclusive Collection"
        title="Fine Jewelry &amp; Artisanal Pieces"
        description="We are curating an exquisite selection of handcrafted bridal jewelry, kundan sets, and minimalist gold-plated pieces made for unforgettable moments."
      />
      <div className="container-layora py-20 text-center">
        <div className="mx-auto max-w-lg rounded-sm border border-line bg-sand/40 p-10 shadow-sm">
          <span className="inline-block rounded-full bg-rose-900 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-cream">
            Coming Soon
          </span>
          <h2 className="mt-5 font-display text-3xl italic text-ink sm:text-4xl">
            LAYORA Jewelry Capsule
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink/75">
            Our luxury jewelry line is currently in production. Be the first to know when the new collection drops or place pre-orders directly via WhatsApp.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={buildGeneralContactUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp w-full sm:w-auto"
            >
              Get Notified on WhatsApp
            </a>
            <Link href="/dresses" className="btn-outline w-full sm:w-auto">
              Explore Dresses
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
