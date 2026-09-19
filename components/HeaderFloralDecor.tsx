import React from "react";
import Image from "next/image";

export default function HeaderFloralDecor() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden select-none z-0"
      aria-hidden="true"
    >
      {/* Subtle warm base background */}
      <div className="absolute inset-0 bg-[#FBF7F2]/90" />

      {/* ============================================================ */}
      {/* 1. REAL BOTANICAL FLOWERS — LEFT SIDE (Peonies, Orchids & Gold) */}
      {/* ============================================================ */}
      <div className="absolute -left-12 sm:-left-8 md:-left-4 lg:left-0 -top-12 sm:-top-10 md:-top-8 -bottom-12 w-[320px] sm:w-[420px] md:w-[520px] lg:w-[620px] xl:w-[680px] flex items-center animate-flower-left origin-left">
        <div className="relative w-full h-[150%] -my-auto mix-blend-multiply opacity-95 filter contrast-[1.03] saturate-[1.05]">
          <Image
            src="/brand/flowers_left.jpg"
            alt=""
            fill
            sizes="(min-width: 1280px) 500px, (min-width: 1024px) 420px, (min-width: 640px) 320px, 220px"
            className="object-contain object-left scale-110 sm:scale-125"
            style={{
              maskImage:
                "radial-gradient(ellipse 95% 95% at 20% 50%, black 70%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 95% 95% at 20% 50%, black 70%, transparent 100%)",
            }}
          />
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. REAL BOTANICAL FLOWERS — RIGHT SIDE (Dahlias, Roses & Cherry Blossoms) */}
      {/* ============================================================ */}
      <div className="absolute -right-12 sm:-right-8 md:-right-4 lg:left-auto lg:right-0 -top-12 sm:-top-10 md:-top-8 -bottom-12 w-[320px] sm:w-[420px] md:w-[520px] lg:w-[620px] xl:w-[680px] flex items-center justify-end animate-flower-right origin-right">
        <div className="relative w-full h-[150%] -my-auto mix-blend-multiply opacity-95 filter contrast-[1.03] saturate-[1.05]">
          <Image
            src="/brand/flowers_right.jpg"
            alt=""
            fill
            sizes="(min-width: 1280px) 500px, (min-width: 1024px) 420px, (min-width: 640px) 320px, 220px"
            className="object-contain object-right scale-110 sm:scale-125"
            style={{
              maskImage:
                "radial-gradient(ellipse 95% 95% at 80% 50%, black 70%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 95% 95% at 80% 50%, black 70%, transparent 100%)",
            }}
          />
        </div>
      </div>

      {/* Sparkle subtle accents for magical realistic feel */}
      <div className="absolute left-[15%] bottom-[30%] w-2 h-2 rounded-full bg-amber-300/60 blur-[1px] animate-sparkle" />
      <div className="absolute right-[18%] top-[20%] w-2.5 h-2.5 rounded-full bg-rose-300/60 blur-[1px] animate-sparkle" style={{ animationDelay: "2s" }} />

      {/* Soft warm center highlight to ensure logo area has pristine clarity */}
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-full max-w-2xl bg-radial-gradient from-[#FBF7F2] via-[#FBF7F2]/80 to-transparent pointer-events-none" />
    </div>
  );
}
