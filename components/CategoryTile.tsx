import Link from "next/link";
import Image from "next/image";

export default function CategoryTile({
  name,
  href,
  image,
}: {
  name: string;
  href: string;
  image: string;
}) {
  return (
    <Link href={href} className="group relative block overflow-hidden">
      <div className="relative aspect-[3/4] bg-sand">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(min-width: 1024px) 24vw, 45vw"
          className="object-cover transition-transform duration-700 ease-elegant group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-ink/10 transition-colors duration-500 group-hover:bg-ink/25" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
        <span className="font-display text-xl italic text-cream sm:text-2xl">
          {name}
        </span>
        <span className="mt-1 block h-px w-8 bg-cream/70 transition-all duration-300 group-hover:w-14" />
      </div>
    </Link>
  );
}
