import {
  WHATSAPP_NUMBER_PK,
  WHATSAPP_NUMBER_INTL,
  SITE_URL,
} from "./config";
import { CartItem, Product } from "./types";
import { formatPrice } from "./format";

export type WhatsAppTarget = "pk" | "intl";

/**
 * Builds a direct WhatsApp link with a pre-filled greeting and order message.
 * Supports Pakistani local customers and International customers.
 * Uses official api.whatsapp.com/send for immediate native app / web chat opening.
 */
export function buildWhatsAppUrl(message: string, target: WhatsAppTarget = "pk"): string {
  const rawNumber = target === "intl" ? WHATSAPP_NUMBER_INTL : WHATSAPP_NUMBER_PK;
  const cleanNumber = rawNumber.replace(/[^0-9]/g, "");
  const encoded = encodeURIComponent(message);
  return `https://api.whatsapp.com/send?phone=${cleanNumber}&text=${encoded}`;
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
      ? `Hello LAYORA! Hope you are doing well. I am an international customer and would like to order:`
      : `Hello LAYORA! Hope you are doing well. I would like to order this item:`,
    ``,
    `• Product: ${product.name}`,
    `• Quantity: ${quantity}`,
  ];
  if (size) lines.push(`• Size/Option: ${size}`);
  if (color) lines.push(`• Color: ${color}`);
  lines.push(`• Price: ${formatPrice(product.price, product.currency)}`);
  lines.push(`• Total: ${formatPrice(product.price * quantity, product.currency)}`);
  lines.push(``);
  lines.push(`Product link: ${SITE_URL}/products/${product.slug}`);
  if (isInternational) {
    lines.push(``);
    lines.push(`Please confirm international shipping rates and delivery time.`);
  } else {
    lines.push(``);
    lines.push(`Please confirm availability and delivery details.`);
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
      ? `Hello LAYORA! Hope you are doing well. I am placing an International order for the following items:`
      : `Hello LAYORA! Hope you are doing well. I would like to place an order for the following items:`,
    ``,
  ];

  let total = 0;
  items.forEach((item, index) => {
    const lineTotal = item.price * item.quantity;
    total += lineTotal;
    lines.push(`${index + 1}. ${item.name}`);
    lines.push(`   Quantity: ${item.quantity}`);
    if (item.size) lines.push(`   Size/Option: ${item.size}`);
    if (item.color) lines.push(`   Color: ${item.color}`);
    lines.push(`   Subtotal: ${formatPrice(lineTotal, item.currency)}`);
    lines.push(`   Link: ${SITE_URL}/products/${item.slug}`);
    lines.push(``);
  });

  const currency = items[0]?.currency ?? "PKR";
  lines.push(`Order Total: ${formatPrice(total, currency)}`);
  if (isInternational) {
    lines.push(``);
    lines.push(`Please provide international shipping details and delivery options.`);
  } else {
    lines.push(``);
    lines.push(`Please confirm delivery details and payment methods.`);
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
      ? `Hello LAYORA! Hope you are doing well. I am an international customer and have an inquiry about your collection.`
      : `Hello LAYORA! Hope you are doing well. I have a question about your collection and would like some assistance.`,
    target
  );
}
