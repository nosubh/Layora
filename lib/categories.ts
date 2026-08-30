import { Category } from "./types";

/**
 * CATEGORY STRUCTURE
 * ------------------
 * The whole site (navigation, homepage tiles, category pages) is built
 * from this array. To add a new category later:
 *
 *   1. Add a new object to this array with a unique "slug".
 *   2. Add matching products in lib/products.ts with category: "your-slug".
 *   3. Create a folder app/your-slug/page.tsx (copy an existing category
 *      page and change the "slug" it filters by).
 *
 * To add a new subcategory (e.g. under Accessories):
 *
 *   1. Add it to that category's "subcategories" array below.
 *   2. Add products with subcategory: "your-sub-slug".
 *   3. Create app/accessories/your-sub-slug/page.tsx.
 */
export const categories: Category[] = [
  {
    name: "Dresses",
    slug: "dresses",
    description:
      "Timeless silhouettes cut from premium fabrics — for evenings, days, and everything worth dressing for.",
    subcategories: [],
  },
  {
    name: "Accessories",
    slug: "accessories",
    description:
      "The finishing pieces. Fine jewelry and considered mobile cases, made to be worn and used daily.",
    subcategories: [
      {
        name: "Jewelry",
        slug: "jewelry",
        description:
          "Delicate, wearable pieces in gold vermeil and sterling silver — designed to layer or wear alone.",
      },
      {
        name: "Mobile Cases",
        slug: "mobile-cases",
        description:
          "Protective cases with a quiet, elevated finish — marble, leather and woven textures.",
      },
    ],
  },
  {
    name: "Makeup",
    slug: "makeup",
    description:
      "Skin-first, low-maintenance makeup essentials in soft, wearable shades.",
    subcategories: [],
  },
];

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function getSubcategory(categorySlug: string, subSlug: string) {
  const category = getCategory(categorySlug);
  return category?.subcategories.find((s) => s.slug === subSlug);
}
