import { Category } from "./types";

export const categories: Category[] = [
  {
    name: "Ethnic Dresses",
    slug: "dresses",
    description:
      "Handcrafted ethnic luxury dresses, festive ensembles, and contemporary pret designed for timeless grace.",
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
