import Link from "next/link";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import ProductGrid from "@/components/ProductGrid";
import CustomerReviews from "@/components/CustomerReviews";
import { getProductsByCategory, getProductsBySubcategory } from "@/lib/products";
import { buildGeneralContactUrl } from "@/lib/whatsapp";
import Image from "next/image";

export default function HomePage() {
  const allDresses = getProductsByCategory("dresses");
  const featuredAccessories = getProductsByCategory("accessories").filter((p) => p.featured);
  const allAccessories = getProductsByCategory("accessories");
  const jellySoapProducts = getProductsBySubcategory("skincare", "jelly-soaps");

  return (
    <>
      <Hero />

      {/* Skincare & Customized Jelly Soaps Spotlight */}
      <section className="border-b border-line bg-cream py-16 lg:py-24">
        <div className="container-layora">
          <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4 lg:mb-10">
            <div>
              <p className="eyebrow mb-2 text-rose-dark">Skincare • Handcrafted</p>
              <h2 className="font-display text-3xl italic sm:text-4xl lg:text-5xl text-ink">
                Customized Jelly Soaps
              </h2>
              <p className="mt-2 text-sm text-ink/70 max-w-lg">
                Bouncy, squishy, and deeply hydrating organic jelly soaps infused with soothing aloe vera and personalized custom initial carvings.
              </p>
            </div>
            <Link
              href="/skincare"
              className="inline-flex items-center gap-2 self-start md:self-auto border-b border-ink/40 pb-0.5 text-[12px] uppercase tracking-wide text-ink/70 transition-colors hover:border-rose-dark hover:text-rose-dark"
            >
              Shop All Skincare ({jellySoapProducts.length}) →
            </Link>
          </div>

          <ProductGrid products={jellySoapProducts.slice(0, 8)} />
        </div>
      </section>

      {/* Accessories & Pop Art Mobile Cases Spotlight */}
      <section className="border-b border-line bg-sand/30 py-16 lg:py-24">
        <div className="container-layora">
          <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4 lg:mb-10">
            <div>
              <p className="eyebrow mb-2 text-rose-dark">New Arrival Collection</p>
              <h2 className="font-display text-3xl italic sm:text-4xl lg:text-5xl text-ink">
                Accessories &amp; Statement Cases
              </h2>
              <p className="mt-2 text-sm text-ink/70 max-w-lg">
                Statement phone covers blending iconic pop art, vibrant anime aesthetics, and military-grade shockproof drop protection.
              </p>
            </div>
            <Link
              href="/accessories"
              className="inline-flex items-center gap-2 self-start md:self-auto border-b border-ink/40 pb-0.5 text-[12px] uppercase tracking-wide text-ink/70 transition-colors hover:border-rose-dark hover:text-rose-dark"
            >
              Shop All Accessories ({allAccessories.length}) →
            </Link>
          </div>

          <ProductGrid products={featuredAccessories.slice(0, 8)} />
        </div>
      </section>

      {/* Ethnic Dresses Collection */}
      <section id="featured" className="container-layora py-16 lg:py-24">
        <SectionHeading
          eyebrow="Curated For You"
          title="Ethnic Festive Ensembles"
          href="/dresses"
          linkLabel={`View All Dresses (${allDresses.length})`}
        />
        <ProductGrid products={allDresses} />
      </section>

      {/* Craftsmanship & Brand Story */}
      <section className="border-t border-line bg-cream py-16 lg:py-24">
        <div className="container-layora grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-sand shadow-sm">
            <Image
              src="/products/ethnic/midnight-bloom/1.jpeg"
              alt="LAYORA Artistry"
              fill
              className="object-cover object-top"
              sizes="(min-width: 1024px) 45vw, 90vw"
            />
          </div>
          <div>
            <p className="eyebrow mb-4 text-rose-dark">Artisanal Heritage</p>
            <h2 className="font-display text-3xl italic sm:text-4xl text-ink">
              Quiet luxury woven into every thread.
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ink/75">
              LAYORA celebrates timeless South Asian elegance through modern,
              considered silhouettes. Every outfit is crafted from premium fabrics
              with intricate hand embroideries, delicate laces, and custom cuts
              made for your most memorable moments.
            </p>
            <div className="mt-8 flex gap-4">
              <Link href="/dresses" className="btn-primary">
                View Collection
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews & Testimonials Section (3 Dresses & 2 Mobile Cases) */}
      <CustomerReviews />

      {/* Direct WhatsApp Ordering */}
      <section className="border-t border-line bg-ink py-16 text-cream lg:py-20">
        <div className="container-layora flex flex-col items-center gap-5 text-center">
          <p className="eyebrow text-rose-light">Direct Assistance</p>
          <h2 className="font-display text-3xl italic sm:text-4xl">
            Custom Sizing or Order Inquiries?
          </h2>
          <p className="max-w-md text-sm text-cream/70">
            Message us directly on WhatsApp for size advice, fabric details, or
            customized orders.
          </p>
          <div className="mt-3 flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full max-w-md">
            <a
              href={buildGeneralContactUrl("pk")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp w-full sm:w-auto text-xs sm:text-sm"
            >
              🇵🇰 Pakistan WhatsApp
            </a>
            <a
              href={buildGeneralContactUrl("intl")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp w-full sm:w-auto text-xs sm:text-sm bg-emerald-700 hover:bg-emerald-800"
            >
              🌍 International WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

