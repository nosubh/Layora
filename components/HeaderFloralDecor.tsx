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
      {/* REAL BOTANICAL FLOWERS — LEFT SIDE (Giant Peonies & Roses) */}
      {/* ============================================================ */}
      <div className="absolute -left-12 sm:-left-8 md:-left-4 lg:left-0 -top-10 sm:-top-8 md:-top-6 -bottom-10 w-[300px] sm:w-[380px] md:w-[460px] lg:w-[540px] xl:w-[600px] flex items-center animate-flower-left origin-left">
        <div className="relative w-full h-[140%] -my-auto mix-blend-multiply opacity-95 filter contrast-105">
          <Image
            src="/brand/flowers_left.jpg"
            alt=""
            fill
            sizes="(min-width: 1280px) 450px, (min-width: 1024px) 380px, (min-width: 640px) 280px, 200px"
            className="object-contain object-left scale-110 sm:scale-120"
            style={{
              maskImage:
                "radial-gradient(ellipse 95% 95% at 20% 50%, black 65%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 95% 95% at 20% 50%, black 65%, transparent 100%)",
            }}
          />
        </div>
      </div>

      {/* ============================================================ */}
      {/* REAL BOTANICAL FLOWERS — RIGHT SIDE (Hibiscus & Orchids) */}
      {/* ============================================================ */}
      <div className="absolute -right-12 sm:-right-8 md:-right-4 lg:left-auto lg:right-0 -top-10 sm:-top-8 md:-top-6 -bottom-10 w-[300px] sm:w-[380px] md:w-[460px] lg:w-[540px] xl:w-[600px] flex items-center justify-end animate-flower-right origin-right">
        <div className="relative w-full h-[140%] -my-auto mix-blend-multiply opacity-95 filter contrast-105">
          <Image
            src="/brand/flowers_right.jpg"
            alt=""
            fill
            sizes="(min-width: 1280px) 450px, (min-width: 1024px) 380px, (min-width: 640px) 280px, 200px"
            className="object-contain object-right scale-110 sm:scale-120"
            style={{
              maskImage:
                "radial-gradient(ellipse 95% 95% at 80% 50%, black 65%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 95% 95% at 80% 50%, black 65%, transparent 100%)",
            }}
          />
        </div>
      </div>

      {/* Soft warm center highlight to ensure logo area has pristine clarity */}
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-full max-w-2xl bg-radial-gradient from-[#FBF7F2] via-[#FBF7F2]/80 to-transparent pointer-events-none" />
    </div>
  );
}
