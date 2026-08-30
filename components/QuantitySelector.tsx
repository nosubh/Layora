"use client";

export default function QuantitySelector({
  quantity,
  onChange,
  min = 1,
  max = 99,
}: {
  quantity: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <div className="inline-flex items-center border border-ink/25">
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => onChange(Math.max(min, quantity - 1))}
        className="flex h-11 w-11 items-center justify-center text-lg text-ink/70 transition-colors hover:text-rose-dark disabled:opacity-30"
        disabled={quantity <= min}
      >
        −
      </button>
      <span className="w-10 text-center text-sm">{quantity}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(Math.min(max, quantity + 1))}
        className="flex h-11 w-11 items-center justify-center text-lg text-ink/70 transition-colors hover:text-rose-dark disabled:opacity-30"
        disabled={quantity >= max}
      >
        +
      </button>
    </div>
  );
}
