import type { Metadata } from "next";
import Link from "next/link";
import CategoryHeader from "@/components/CategoryHeader";
import { getCategory } from "@/lib/categories";

export const metadata: Metadata = {
  title: "Makeup — Coming Soon",
  description:
    "Curated luxury makeup, velvet lip tints, and high-performance beauty essentials launching soon at LAYORA.",
};

export default function MakeupPage() {
  const category = getCategory("makeup");

  return (
    <div>
      <CategoryHeader
        eyebrow="Beauty Edit"
        title="Luxury Makeup &amp; Essentials"
        description="Premium long-lasting formulas, silky textures, and flattering palettes crafted for effortless everyday beauty."
      />
      <div className="container-layora py-20 text-center">
        <div className="mx-auto max-w-lg rounded-sm border border-line bg-sand/40 p-10 shadow-sm">
          <span className="inline-block rounded-full bg-rose-900 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-cream">
            Coming Soon
          </span>
          <h2 className="mt-5 font-display text-3xl italic text-ink sm:text-4xl">
            LAYORA Beauty &amp; Makeup
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink/75">
            Our exclusive makeup range is launching shortly. Check back soon for shades preview and launch announcements.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/dresses" className="btn-primary w-full sm:w-auto">
              Explore Dresses
            </Link>
            <Link href="/cases" className="btn-outline w-full sm:w-auto">
              Explore Phone Cases
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
