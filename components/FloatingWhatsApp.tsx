"use client";

import { useState, useEffect, useRef } from "react";
import { WHATSAPP_DISPLAY_PK, WHATSAPP_DISPLAY_INTL } from "@/lib/config";
import { buildGeneralContactUrl } from "@/lib/whatsapp";

export default function FloatingWhatsApp() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const pkUrl = buildGeneralContactUrl("pk");
  const intlUrl = buildGeneralContactUrl("intl");

  // Close popup if clicked outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-50 flex flex-col items-end">
      {/* Concierge Popup Card */}
      {open && (
        <div className="mb-3 w-80 max-w-[calc(100vw-2.5rem)] rounded-lg border border-line bg-cream/95 backdrop-blur-md p-4 shadow-xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-3">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-line pb-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xs">
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </div>
              <div>
                <p className="font-display text-sm font-bold italic text-ink">LAYORA Concierge</p>
                <p className="text-[11px] text-emerald-700 font-medium flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Online • Instant Reply
                </p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-sm text-ink/50 hover:text-ink p-1 rounded transition"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          <p className="mt-3 text-xs text-ink/75 leading-relaxed">
            Need help with sizes, orders, or delivery? Select your region to chat directly:
          </p>

          {/* WhatsApp Direct Action Buttons */}
          <div className="mt-3 flex flex-col gap-2">
            {/* Pakistan WhatsApp */}
            <a
              href={pkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-md bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/30 px-3.5 py-2.5 text-xs font-semibold text-ink transition-all duration-200 group"
            >
              <div className="flex items-center gap-2">
                <span className="text-base">🇵🇰</span>
                <span className="font-bold text-ink">Pakistan Customer Care</span>
              </div>
              <span className="text-[11px] text-emerald-800 font-medium group-hover:translate-x-0.5 transition-transform">
                {WHATSAPP_DISPLAY_PK} →
              </span>
            </a>

            {/* International WhatsApp */}
            <a
              href={intlUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-md bg-sand hover:bg-sand/80 border border-line px-3.5 py-2.5 text-xs font-semibold text-ink transition-all duration-200 group"
            >
              <div className="flex items-center gap-2">
                <span className="text-base">🌍</span>
                <span className="font-bold text-ink">International / UAE</span>
              </div>
              <span className="text-[11px] text-rose-dark font-medium group-hover:translate-x-0.5 transition-transform">
                {WHATSAPP_DISPLAY_INTL} →
              </span>
            </a>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg hover:bg-[#20ba5a] hover:scale-105 active:scale-95 transition-all duration-300"
        aria-label="Open WhatsApp chat"
        title="Chat on WhatsApp"
      >
        {/* Animated Ripple Ring */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/30 animate-ping pointer-events-none opacity-75" />

        {/* WhatsApp Icon */}
        <svg
          className="relative h-7 w-7 fill-current drop-shadow-xs"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </button>
    </div>
  );
}
