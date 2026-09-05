import { Category } from "./types";

export const categories: Category[] = [
  {
    name: "Ethnic Dresses",
    slug: "dresses",
    description:
      "Handcrafted ethnic luxury dresses, festive ensembles, and contemporary pret designed for timeless grace.",
    subcategories: [],
  },
  {
    name: "Accessories",
    slug: "accessories",
    description:
      "Curated statement lifestyle accessories, designer pop-art mobile covers, fine jewelry, and everyday essentials.",
    subcategories: [
      {
        name: "Mobile Cases",
        slug: "cases",
        description: "Bold, quirky, and protective statement phone cases.",
      },
      {
        name: "Bracelets",
        slug: "bracelets",
        description: "Handcrafted charm and beaded bracelets on special PKR 399 sale.",
      },
      {
        name: "Jewelry",
        slug: "jewelry",
        description: "Handcrafted fine jewelry and contemporary artisanal pieces.",
      },
    ],
  },
  {
    name: "Skincare",
    slug: "skincare",
    description:
      "Clean botanical beauty rituals, artisanal customized jelly soaps, and restorative skincare formulations.",
    subcategories: [
      {
        name: "Customized Jelly Soaps",
        slug: "jelly-soaps",
        description:
          "Handcrafted, hydrating, and customized jelly soaps made with gentle botanical ingredients and personalized scents.",
      },
      {
        name: "Serums & Oils",
        slug: "serums-oils",
        description:
          "Nourishing botanical elixirs, radiance glow serums, and pure essential facial oils launching soon.",
        comingSoon: true,
      },
    ],
  },
];

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function getSubcategory(categorySlug: string, subSlug: string) {
  const category = getCategory(categorySlug);
  return category?.subcategories.find((s) => s.slug === subSlug);
}
