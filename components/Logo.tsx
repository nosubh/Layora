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
function getCustomLogoFilename(): string | null {
  try {
    const brandDir = path.join(process.cwd(), "public", "brand");
    const extensions = [".png", ".jpg", ".jpeg", ".svg"];
    for (const ext of extensions) {
      if (fs.existsSync(path.join(brandDir, `logo${ext}`))) {
        return `logo${ext}`;
      }
    }
  } catch {}
  return null;
}

export default function Logo({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const logoFilename = getCustomLogoFilename();
  const textColor = variant === "light" ? "text-cream" : "text-ink";
  const subColor = variant === "light" ? "text-cream/70" : "text-ink/60";

  return (
    <Link href="/" className="flex flex-col items-center leading-none group">
      {logoFilename ? (
        <Image
          src={`/brand/${logoFilename}`}
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
