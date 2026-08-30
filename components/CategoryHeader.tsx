export default function CategoryHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="border-b border-line bg-sand/50 py-14 text-center lg:py-20">
      <div className="container-layora">
        <p className="eyebrow mb-3">{eyebrow}</p>
        <h1 className="font-display text-4xl italic sm:text-5xl">{title}</h1>
        <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-ink/65">
          {description}
        </p>
      </div>
    </div>
  );
}
