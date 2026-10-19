import type { Metadata } from "next";
import CasesCatalogView from "@/components/CasesCatalogView";
import { getProductsByCategory } from "@/lib/products";

export const metadata: Metadata = {
  title: "Bracelets & Watches | LAYORA",
  description:
    "Shop LAYORA's luxury clover bracelet watches, handcrafted floral crystal hand chains, and beaded charm bracelets.",
};

export default function BraceletsPage() {
  const products = getProductsByCategory("accessories");

  return (
    <div className="container-layora py-10 sm:py-14 lg:py-20">
      <CasesCatalogView products={products} initialFilter="bracelets" />
    </div>
  );
}
