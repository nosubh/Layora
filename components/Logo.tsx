import Link from "next/link";
import Image from "next/image";
import fs from "fs";
import path from "path";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/config";

/**
 * LOGO
 * ----
 * To use your own logo image: put a file named "logo.png" inside
 * /public/brand/  — that's it, this component will detect it and use it.
 * Until then, it falls back to the elegant text logo below.
 */
function hasCustomLogo(): boolean {
  try {
    const logoPath = path.join(process.cwd(), "public", "brand", "logo.png");
    return fs.existsSync(logoPath);
  } catch {
    return false;
  }
}

export default function Logo({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const useImage = hasCustomLogo();
  const textColor = variant === "light" ? "text-cream" : "text-ink";
  const subColor = variant === "light" ? "text-cream/70" : "text-ink/60";

  return (
    <Link href="/" className="flex flex-col items-center leading-none group">
      {useImage ? (
        <Image
          src="/brand/logo.png"
          alt={SITE_NAME}
          width={140}
          height={48}
          className="h-9 w-auto object-contain"
          priority
        />
      ) : (
        <span
          className={`font-display text-2xl sm:text-[26px] tracking-[0.18em] ${textColor} transition-colors duration-300`}
        >
          {SITE_NAME}
        </span>
      )}
      <span
        className={`mt-1 text-[9px] sm:text-[10px] tracking-widest2 uppercase ${subColor}`}
      >
        {SITE_TAGLINE}
      </span>
    </Link>
  );
}
