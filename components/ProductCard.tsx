import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/format";

export default function ProductCard({ product }: { product: Product }) {
  const secondImage = product.images[1];

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-sand">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 24vw, (min-width: 640px) 45vw, 90vw"
          className={`object-cover transition-opacity duration-500 ease-elegant ${
            secondImage ? "group-hover:opacity-0" : ""
          }`}
        />
        {secondImage && (
          <Image
            src={secondImage}
            alt=""
            fill
            sizes="(min-width: 1024px) 24vw, (min-width: 640px) 45vw, 90vw"
            className="absolute inset-0 object-cover opacity-0 transition-opacity duration-500 ease-elegant group-hover:opacity-100"
          />
        )}

        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="bg-ink px-2.5 py-1 text-[10px] uppercase tracking-wide text-cream">
              New
            </span>
          )}
          {product.featured && !product.isNew && (
            <span className="bg-rose-dark px-2.5 py-1 text-[10px] uppercase tracking-wide text-cream">
              Featured
            </span>
          )}
          {!product.available && (
            <span className="bg-ink/60 px-2.5 py-1 text-[10px] uppercase tracking-wide text-cream">
              Sold Out
            </span>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-start justify-between gap-2">
        <div>
          <h3 className="text-sm text-ink group-hover:text-rose-dark transition-colors duration-200">
            {product.name}
          </h3>
          <p className="mt-1 text-sm text-ink/60">
            {formatPrice(product.price, product.currency)}
          </p>
        </div>
      </div>
    </Link>
  );
}
