import Link from "next/link";

export default function SectionHeading({
  eyebrow,
  title,
  href,
  linkLabel = "View All",
}: {
  eyebrow?: string;
  title: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="mb-8 flex items-end justify-between gap-4 lg:mb-10">
      <div>
        {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
        <h2 className="font-display text-3xl italic sm:text-4xl">{title}</h2>
      </div>
      {href && (
        <Link
          href={href}
          className="hidden shrink-0 border-b border-ink/40 pb-0.5 text-[12px] uppercase tracking-wide text-ink/70 transition-colors hover:border-rose-dark hover:text-rose-dark sm:inline-block"
        >
          {linkLabel}
        </Link>
      )}
    </div>
  );
}
