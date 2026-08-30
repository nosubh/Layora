import Link from "next/link";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import ProductGrid from "@/components/ProductGrid";
import CategoryTile from "@/components/CategoryTile";
import {
  getFeaturedProducts,
  getProductsByCategory,
  getFeaturedBySubcategory,
} from "@/lib/products";
import { buildGeneralContactUrl } from "@/lib/whatsapp";

export default function HomePage() {
  const featuredDresses = getProductsByCategory("dresses")
    .filter((p) => p.featured)
    .slice(0, 4);
  const featuredJewelry = getFeaturedBySubcategory("jewelry", 4);
  const featuredCases = getFeaturedBySubcategory("mobile-cases", 4);
  const featuredMakeup = getFeaturedProducts()
    .filter((p) => p.category === "makeup")
    .slice(0, 4);

  return (
    <>
      <Hero />

      <section className="container-layora py-16 lg:py-24">
        <SectionHeading
          eyebrow="New This Season"
          title="Featured Dresses"
          href="/dresses"
        />
        <ProductGrid products={featuredDresses} />
      </section>

      <section className="border-t border-line bg-sand/60 py-16 lg:py-24">
        <div className="container-layora">
          <SectionHeading
            eyebrow="Fine Details"
            title="Featured Jewelry"
            href="/accessories/jewelry"
          />
          <ProductGrid products={featuredJewelry} />
        </div>
      </section>

      <section className="container-layora py-16 lg:py-24">
        <SectionHeading
          eyebrow="Everyday Carry"
          title="Featured Mobile Cases"
          href="/accessories/mobile-cases"
        />
        <ProductGrid products={featuredCases} />
      </section>

      <section className="border-t border-line bg-sand/60 py-16 lg:py-24">
        <div className="container-layora">
          <SectionHeading
            eyebrow="Skin First"
            title="Featured Makeup"
            href="/makeup"
          />
          <ProductGrid products={featuredMakeup} />
        </div>
      </section>

      <section className="container-layora py-16 lg:py-24">
        <SectionHeading eyebrow="Explore" title="Shop by Category" />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          <CategoryTile
            name="Dresses"
            href="/dresses"
            image="/products/category-dresses.svg"
          />
          <CategoryTile
            name="Jewelry"
            href="/accessories/jewelry"
            image="/products/category-jewelry.svg"
          />
          <CategoryTile
            name="Mobile Cases"
            href="/accessories/mobile-cases"
            image="/products/category-mobile-cases.svg"
          />
          <CategoryTile
            name="Makeup"
            href="/makeup"
            image="/products/category-makeup.svg"
          />
        </div>
      </section>

      <section className="border-t border-line py-16 lg:py-24">
        <div className="container-layora grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/3] bg-sand">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display text-4xl italic text-ink/20">
                LAYORA
              </span>
            </div>
          </div>
          <div>
            <p className="eyebrow mb-4">About Us</p>
            <h2 className="font-display text-3xl italic sm:text-4xl">
              A house built on quiet elegance.
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ink/70">
              LAYORA is a curated fashion and accessories label for women who
              prefer their style considered rather than loud. Every dress,
              jewelry piece and beauty essential is chosen for how it wears
              in real life — not just how it photographs. We keep our
              collection small and our quality high.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-ink py-16 text-cream lg:py-20">
        <div className="container-layora flex flex-col items-center gap-5 text-center">
          <p className="eyebrow text-rose-light">Say Hello</p>
          <h2 className="font-display text-3xl italic sm:text-4xl">
            Questions about an order?
          </h2>
          <p className="max-w-md text-sm text-cream/70">
            Message us directly on WhatsApp — we typically reply within a few
            hours.
          </p>
          <a
            href={buildGeneralContactUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp mt-2"
          >
            Chat on WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
