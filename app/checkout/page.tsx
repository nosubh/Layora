import type { Metadata } from "next";
import CheckoutView from "@/components/CheckoutView";
import { SITE_NAME } from "@/lib/config";

export const metadata: Metadata = {
  title: `Secure Checkout & Online Payment — ${SITE_NAME}`,
  description: "Confirm your order with Bank Transfer (IBFT) or Cash on Delivery with instant tracking.",
};

export default function CheckoutPage() {
  return <CheckoutView />;
}
