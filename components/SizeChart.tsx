"use client";

import { useState } from "react";

interface SizeChartProps {
  selectedSize?: string | null;
  onSelectSize?: (size: string) => void;
}

export default function SizeChart({ selectedSize, onSelectSize }: SizeChartProps) {
  const [unit, setUnit] = useState<"in" | "cm">("in");

  const sizeData = [
    {
      size: "Small (S)",
      code: "S",
      chest: unit === "in" ? "38\"" : "96.5 cm",
      waist: unit === "in" ? "34\"" : "86.4 cm",
      hips: unit === "in" ? "40\"" : "101.6 cm",
      shoulder: unit === "in" ? "14.5\"" : "36.8 cm",
      length: unit === "in" ? "39\"" : "99 cm",
      trouser: unit === "in" ? "37\"" : "94 cm",
    },
    {
      size: "Medium (M)",
      code: "M",
      chest: unit === "in" ? "41\"" : "104.1 cm",
      waist: unit === "in" ? "37\"" : "94 cm",
      hips: unit === "in" ? "44\"" : "111.8 cm",
      shoulder: unit === "in" ? "15.5\"" : "39.4 cm",
      length: unit === "in" ? "40\"" : "101.6 cm",
      trouser: unit === "in" ? "38\"" : "96.5 cm",
    },
    {
      size: "Large (L)",
      code: "L",
      chest: unit === "in" ? "45\"" : "114.3 cm",
      waist: unit === "in" ? "41\"" : "104.1 cm",
      hips: unit === "in" ? "48\"" : "121.9 cm",
      shoulder: unit === "in" ? "16.5\"" : "41.9 cm",
      length: unit === "in" ? "41\"" : "104.1 cm",
      trouser: unit === "in" ? "39\"" : "99 cm",
    },
    {
      size: "X-Large (XL)",
      code: "XL",
      chest: unit === "in" ? "49\"" : "124.5 cm",
      waist: unit === "in" ? "45\"" : "114.3 cm",
      hips: unit === "in" ? "52\"" : "132 cm",
      shoulder: unit === "in" ? "17.5\"" : "44.5 cm",
      length: unit === "in" ? "42\"" : "106.7 cm",
      trouser: unit === "in" ? "40\"" : "101.6 cm",
    },
  ];

  return (
    <div className="mt-8 rounded-sm border border-line bg-sand/30 p-5 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-3.5">
        <div>
          <span className="eyebrow text-rose-dark">Fit Guide</span>
          <h3 className="font-display text-lg font-medium italic text-ink">
            Size Chart &amp; Measurements
          </h3>
        </div>
        <div className="flex rounded border border-ink/20 bg-cream p-0.5 text-xs">
          <button
            type="button"
            onClick={() => setUnit("in")}
            className={`rounded px-2.5 py-1 font-medium transition ${
              unit === "in"
                ? "bg-ink text-cream"
                : "text-ink/60 hover:text-ink"
            }`}
          >
            Inches
          </button>
          <button
            type="button"
            onClick={() => setUnit("cm")}
            className={`rounded px-2.5 py-1 font-medium transition ${
              unit === "cm"
                ? "bg-ink text-cream"
                : "text-ink/60 hover:text-ink"
            }`}
          >
            CM
          </button>
        </div>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left text-xs text-ink/80">
          <thead>
            <tr className="border-b border-line text-[11px] uppercase tracking-wider text-ink/50">
              <th className="py-2.5 pr-3 font-semibold">Size</th>
              <th className="px-2.5 py-2.5 font-semibold">Chest / Bust</th>
              <th className="px-2.5 py-2.5 font-semibold">Waist</th>
              <th className="px-2.5 py-2.5 font-semibold">Hips</th>
              <th className="px-2.5 py-2.5 font-semibold">Shoulder</th>
              <th className="px-2.5 py-2.5 font-semibold">Shirt Length</th>
              <th className="pl-2.5 py-2.5 font-semibold">Trouser</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line/60">
            {sizeData.map((item) => {
              const isSelected = selectedSize === item.code;
              return (
                <tr
                  key={item.code}
                  onClick={() => onSelectSize && onSelectSize(item.code)}
                  className={`transition-colors cursor-pointer hover:bg-rose-50/70 ${
                    isSelected ? "bg-rose-100/70 font-semibold text-rose-dark" : ""
                  }`}
                >
                  <td className="py-2.5 pr-3 font-medium text-ink">
                    <span className="inline-flex items-center gap-1.5">
                      {isSelected && (
                        <span className="h-1.5 w-1.5 rounded-full bg-rose-dark" />
                      )}
                      {item.size}
                    </span>
                  </td>
                  <td className="px-2.5 py-2.5">{item.chest}</td>
                  <td className="px-2.5 py-2.5">{item.waist}</td>
                  <td className="px-2.5 py-2.5">{item.hips}</td>
                  <td className="px-2.5 py-2.5">{item.shoulder}</td>
                  <td className="px-2.5 py-2.5">{item.length}</td>
                  <td className="pl-2.5 py-2.5">{item.trouser}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="mt-3.5 text-[11px] text-ink/60">
        💡 <em>Tip: All measurements are ready-garment sizes. For customized tailoring advice or specific alterations, message us on WhatsApp.</em>
      </p>
    </div>
  );
}
