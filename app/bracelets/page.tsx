import type { Metadata } from "next";
import CasesCatalogView from "@/components/CasesCatalogView";
import { getProductsByCategory } from "@/lib/products";

export const metadata: Metadata = {
  title: "Bracelets — Sale PKR 399 | LAYORA",
  description:
    "Shop LAYORA's handcrafted bracelet collection — beaded charms, layered chains, cuffs & bangles. All at a special sale price of PKR 399.",
};

export default function BraceletsPage() {
  const products = getProductsByCategory("accessories");

  return (
    <div className="container-layora py-10 sm:py-14 lg:py-20">
      <CasesCatalogView products={products} />
    </div>
  );
}
