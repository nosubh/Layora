import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="container-layora grid grid-cols-1 items-center gap-10 py-14 lg:grid-cols-2 lg:gap-16 lg:py-24">
        <div className="order-2 lg:order-1">
          <p className="eyebrow mb-5">Fashion &amp; Accessories</p>
          <h1 className="font-display text-[2.6rem] italic leading-[1.05] sm:text-6xl lg:text-[4rem]">
            Elegance,
            <br />
            made effortless.
          </h1>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ink/70">
            Curated dresses and accessories for the modern woman. Timeless
            pieces, made to feel effortless.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/dresses" className="btn-primary">
              Dresses
            </Link>
            <Link href="/accessories" className="btn-outline">
              Accessories
            </Link>
            <Link href="/makeup" className="btn-outline">
              Makeup
            </Link>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-sand sm:aspect-[16/11] lg:aspect-[4/5]">
            <Image
              src="/products/hero-main.svg"
              alt="LAYORA — Fashion & Accessories"
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
