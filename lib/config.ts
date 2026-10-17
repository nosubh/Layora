/**
 * SITE CONFIGURATION
 * ------------------
 * This is the ONE file that controls your contact details and store info.
 * Change the values below and the whole website updates automatically.
 */

// Pakistan Customer WhatsApp
export const WHATSAPP_NUMBER_PK = "923390131877";
export const WHATSAPP_DISPLAY_PK = "+92 339 0131877";

// International Customer WhatsApp
export const WHATSAPP_NUMBER_INTL = "971543041081";
export const WHATSAPP_DISPLAY_INTL = "+971 54 304 1081";

// Default WhatsApp number
export const WHATSAPP_NUMBER = WHATSAPP_NUMBER_PK;

// Your Instagram handle (without the @) and the full profile URL.
export const INSTAGRAM_HANDLE = "layora.store";
export const INSTAGRAM_URL = "https://instagram.com/layora.store";

// Used in page titles, meta descriptions and the footer.
export const SITE_NAME = "LAYORA";
export const SITE_TAGLINE = "Style & Accessories";
export const SITE_DESCRIPTION =
  "LAYORA is a curated fashion and accessories house — elegant dresses, fine jewelry, mobile cases and makeup for the modern woman.";

// Used to build absolute product links inside WhatsApp messages.
// Replace with your real domain once deployed (e.g. "https://layora.com").
export const SITE_URL = "https://layora.vercel.app";

// ==========================================
// PAYMENT DETAILS (Shown at Checkout)
// ==========================================
export const JAZZCASH_NUMBER = "03390131877";
export const JAZZCASH_DISPLAY = "+92 339 0131877";
export const JAZZCASH_TITLE = "LAYORA";

export const RAAST_ID = "03390131877";
export const BANK_NAME = "Meezan Bank";
export const BANK_ACCOUNT_TITLE = "LAYORA";
export const BANK_ACCOUNT_NUMBER = "01020304050607";
export const BANK_IBAN = "PK00MEZN0001020304050607";

// Google Sheets Webhook App URL (configured in .env or Store Admin settings)
export const GOOGLE_SHEET_WEBHOOK_URL =
  process.env.GOOGLE_SHEET_WEBHOOK_URL ||
  "https://script.google.com/macros/s/AKfycbzfLKlAy2Kq1GZHXAdkktRKGNGk_kV6LLeyuTjAF8KNZuPSPg2HuSHdZgGKWdFtTHoH/exec";

