import Link from "next/link";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/config";

interface LogoProps {
  variant?: "dark" | "light";
  size?: "sm" | "md" | "lg" | "header" | "huge";
  showTagline?: boolean;
}

export default function Logo({
  variant = "dark",
  size = "huge",
  showTagline = true,
}: LogoProps) {
  const textColor = variant === "light" ? "text-cream" : "text-ink";
  const subColor = variant === "light" ? "text-cream/80" : "text-rose-dark";

  return (
    <Link
      href="/"
      className="flex flex-col items-center justify-center leading-none text-center group transition-transform duration-300 hover:scale-[1.03]"
      aria-label={`${SITE_NAME} Home`}
    >
      <span
        className={`font-display text-3xl sm:text-5xl md:text-6xl lg:text-[4.2rem] font-bold tracking-[0.24em] ${textColor} transition-colors duration-300 drop-shadow-xs select-none`}
      >
        {SITE_NAME}
      </span>
      {showTagline && (
        <span
          className={`mt-1.5 sm:mt-2.5 text-[10px] sm:text-[12px] lg:text-[13px] tracking-[0.36em] uppercase font-bold ${subColor} opacity-95 transition-opacity duration-300 group-hover:opacity-100 select-none`}
        >
          {SITE_TAGLINE}
        </span>
      )}
    </Link>
  );
}
