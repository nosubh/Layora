export function formatPrice(amount: number, currency = "PKR"): string {
  const formatted = new Intl.NumberFormat("en-US").format(amount);
  return `${currency} ${formatted}`;
}
