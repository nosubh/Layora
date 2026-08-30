import Link from "next/link";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import ProductGrid from "@/components/ProductGrid";
import { products, getFeaturedProducts } from "@/lib/products";
import { buildGeneralContactUrl } from "@/lib/whatsapp";
import Image from "next/image";

export default function HomePage() {
  const featuredDresses = getFeaturedProducts();
  const allDresses = products;

  return (
    <>
      <Hero />

      {/* Featured Collection Section */}
      <section id="featured" className="container-layora py-16 lg:py-24">
        <SectionHeading
          eyebrow="Curated For You"
          title="Featured Festive Pieces"
          href="/dresses"
        />
        <ProductGrid products={featuredDresses} />
      </section>

      {/* Complete Ethnic Capsule */}
      <section className="border-t border-line bg-sand/40 py-16 lg:py-24">
        <div className="container-layora">
          <SectionHeading
            eyebrow="The Full Capsule"
            title="All 15 Ethnic Ensembles"
            href="/dresses"
          />
          <ProductGrid products={allDresses} />
        </div>
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
          <a
            href={buildGeneralContactUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp mt-2"
          >
            Chat with us on WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}

