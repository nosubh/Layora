import type { Metadata } from "next";
import Link from "next/link";
import CategoryHeader from "@/components/CategoryHeader";
import { getSubcategory } from "@/lib/categories";
import { buildGeneralContactUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Serums & Oils — Coming Soon",
  description:
    "Luxury botanical facial serums, elixir oils, and radiant skin treatments launching soon at LAYORA.",
};

export default function SerumsOilsPage() {
  const subcategory = getSubcategory("skincare", "serums-oils");

  return (
    <div>
      <CategoryHeader
        eyebrow="Skincare Subcategory"
        title="Serums &amp; Oils"
        description="Nourishing botanical elixirs, radiance glow serums, and pure essential facial oils launching soon."
      />
      <div className="container-layora py-16 lg:py-24 text-center">
        <div className="mx-auto max-w-xl rounded-sm border border-line bg-sand/40 p-8 sm:p-12 shadow-sm">
          <span className="inline-block rounded-full bg-rose-dark px-4 py-1 text-xs font-semibold uppercase tracking-widest text-cream">
            Coming Soon
          </span>
          <h2 className="mt-5 font-display text-3xl italic text-ink sm:text-4xl">
            LAYORA Radiance Serums &amp; Oils
          </h2>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-ink/75">
            Our exclusive botanical facial serums and cold-pressed facial oils are in final formulation. Connect on WhatsApp for early VIP launch access and discounts.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={buildGeneralContactUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp w-full sm:w-auto"
            >
              Get VIP Notification
            </a>
            <Link href="/skincare/jelly-soaps" className="btn-outline w-full sm:w-auto">
              Shop Jelly Soaps
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
