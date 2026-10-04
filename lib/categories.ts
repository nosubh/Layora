import { Category } from "./types";

export const categories: Category[] = [
  {
    name: "Ethnic Dresses",
    slug: "dresses",
    description:
      "Handcrafted ethnic luxury dresses, festive ensembles, and contemporary pret designed for timeless grace.",
    subcategories: [
      {
        name: "New Arrivals",
        slug: "new-arrivals",
        description: "Latest collection of 2-piece and 3-piece festive dresses.",
      },
    ],
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
      "Clean botanical beauty rituals, Medicube collagen & tube masks, Sadour sheet masks, Laneige lip care, SHEGLAM lip oils, snail mucin serums, and artisanal jelly soaps.",
    subcategories: [
      {
        name: "Medicube Sheet Masks",
        slug: "medicube-sheet-masks",
        description:
          "Original Medicube deep collagen hydrogel treatment sheet mask.",
      },
      {
        name: "Medicube Tube Masks",
        slug: "medicube-tube-masks",
        description:
          "Medicube Korean peel-off, collagen jelly, and clay treatment tube masks.",
      },
      {
        name: "Sadour Sheet Masks",
        slug: "sadoer-masks",
        description:
          "Sadour radiance hydrating botanical sheet masks.",
      },
      {
        name: "Lip Care & Oils",
        slug: "lip-care",
        description:
          "Laneige Lip Sleeping Mask and SHEGLAM nourishing botanical lip oils.",
      },
      {
        name: "Serums & Creams",
        slug: "serums",
        description:
          "Korean snail mucin repair serums and essence creams.",
      },
      {
        name: "Customized Jelly Soaps",
        slug: "jelly-soaps",
        description:
          "Handcrafted, hydrating, and customized jelly soaps made with gentle botanical ingredients.",
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
