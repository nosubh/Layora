import {
  WHATSAPP_NUMBER_PK,
  WHATSAPP_NUMBER_INTL,
  WHATSAPP_DISPLAY_PK,
  WHATSAPP_DISPLAY_INTL,
  SITE_URL,
} from "./config";
import { CartItem, Product } from "./types";
import { formatPrice } from "./format";

export type WhatsAppTarget = "pk" | "intl";

/**
 * Builds a wa.me link with a pre-filled order message.
 * Supports Pakistani local customers and International customers.
 */
export function buildWhatsAppUrl(message: string, target: WhatsAppTarget = "pk"): string {
  const number = target === "intl" ? WHATSAPP_NUMBER_INTL : WHATSAPP_NUMBER_PK;
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${encoded}`;
}

export function buildProductOrderMessage(params: {
  product: Product;
  quantity: number;
  size: string | null;
  color: string | null;
  isInternational?: boolean;
}): string {
  const { product, quantity, size, color, isInternational } = params;
  const lines = [
    isInternational
      ? `Hello LAYORA! I am an international customer and would like to order:`
      : `Hello LAYORA! I'd like to order:`,
    ``,
    `• ${product.name}`,
    `  Quantity: ${quantity}`,
  ];
  if (size) lines.push(`  Size: ${size}`);
  if (color) lines.push(`  Color: ${color}`);
  lines.push(`  Price: ${formatPrice(product.price, product.currency)} each`);
  lines.push(``);
  lines.push(`Total: ${formatPrice(product.price * quantity, product.currency)}`);
  lines.push(``);
  lines.push(`Product link: ${SITE_URL}/products/${product.slug}`);
  if (isInternational) {
    lines.push(``);
    lines.push(`Please confirm international shipping rates and delivery timeline.`);
  }

  return lines.join("\n");
}

export function buildProductOrderUrl(
  params: {
    product: Product;
    quantity: number;
    size: string | null;
    color: string | null;
  },
  target: WhatsAppTarget = "pk"
): string {
  const isInternational = target === "intl";
  return buildWhatsAppUrl(
    buildProductOrderMessage({ ...params, isInternational }),
    target
  );
}

export function buildCartOrderMessage(
  items: CartItem[],
  isInternational = false
): string {
  const lines = [
    isInternational
      ? `Hello LAYORA! I am placing an International order for the following:`
      : `Hello LAYORA! I'd like to order the following:`,
    ``,
  ];

  let total = 0;
  items.forEach((item, index) => {
    const lineTotal = item.price * item.quantity;
    total += lineTotal;
    lines.push(`${index + 1}. ${item.name}`);
    lines.push(`   Quantity: ${item.quantity}`);
    if (item.size) lines.push(`   Size: ${item.size}`);
    if (item.color) lines.push(`   Color: ${item.color}`);
    lines.push(`   Subtotal: ${formatPrice(lineTotal, item.currency)}`);
    lines.push(`   Link: ${SITE_URL}/products/${item.slug}`);
    lines.push(``);
  });

  const currency = items[0]?.currency ?? "PKR";
  lines.push(`Order total: ${formatPrice(total, currency)}`);
  if (isInternational) {
    lines.push(``);
    lines.push(`Please provide international shipping details and delivery options.`);
  }

  return lines.join("\n");
}

export function buildCartOrderUrl(
  items: CartItem[],
  target: WhatsAppTarget = "pk"
): string {
  const isInternational = target === "intl";
  return buildWhatsAppUrl(buildCartOrderMessage(items, isInternational), target);
}

export function buildGeneralContactUrl(target: WhatsAppTarget = "pk"): string {
  const isInternational = target === "intl";
  return buildWhatsAppUrl(
    isInternational
      ? `Hello LAYORA! I am an international customer and have an inquiry about your collection.`
      : `Hello LAYORA! I have a question about your collection.`,
    target
  );
}
