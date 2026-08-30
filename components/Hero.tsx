import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-cream">
      <div className="container-layora grid grid-cols-1 items-center gap-10 py-14 lg:grid-cols-2 lg:gap-16 lg:py-24">
        <div className="order-2 lg:order-1">
          <p className="eyebrow mb-5 text-rose-dark font-medium tracking-widest">
            New Ethnic Collection 2026
          </p>
          <h1 className="font-display text-[2.6rem] italic leading-[1.08] sm:text-6xl lg:text-[3.8rem]">
            Timeless grace,
            <br />
            crafted with soul.
          </h1>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ink/75">
            Discover our curated capsule of handcrafted ethnic ensembles, luxury
            festive pret, and embroidered silhouettes built for celebrations that
            matter.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/dresses" className="btn-primary">
              Shop All Dresses
            </Link>
            <Link href="#featured" className="btn-outline">
              Featured Pieces
            </Link>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-sand shadow-lg sm:aspect-[16/11] lg:aspect-[4/5]">
            <Image
              src="/products/ethnic/blush-vanilla/1.jpeg"
              alt="LAYORA — Luxury Ethnic Dresses"
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="object-cover object-top transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

