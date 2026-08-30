import { WHATSAPP_NUMBER, SITE_URL } from "./config";
import { CartItem, Product } from "./types";
import { formatPrice } from "./format";

/**
 * Builds a wa.me link with a pre-filled order message.
 * The WhatsApp number is read from lib/config.ts — change it there once
 * and every button on the site updates.
 */
function buildWhatsAppUrl(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

export function buildProductOrderMessage(params: {
  product: Product;
  quantity: number;
  size: string | null;
  color: string | null;
}): string {
  const { product, quantity, size, color } = params;
  const lines = [
    `Hello LAYORA! I'd like to order:`,
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

  return lines.join("\n");
}

export function buildProductOrderUrl(params: {
  product: Product;
  quantity: number;
  size: string | null;
  color: string | null;
}): string {
  return buildWhatsAppUrl(buildProductOrderMessage(params));
}

export function buildCartOrderMessage(items: CartItem[]): string {
  const lines = [`Hello LAYORA! I'd like to order the following:`, ``];

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

  return lines.join("\n");
}

export function buildCartOrderUrl(items: CartItem[]): string {
  return buildWhatsAppUrl(buildCartOrderMessage(items));
}

export function buildGeneralContactUrl(): string {
  return buildWhatsAppUrl(
    `Hello LAYORA! I have a question about your collection.`
  );
}
