import { Product } from "./types";

/**
 * PRODUCT DATA
 * ------------
 * This is the ONLY file you need to edit to manage your catalogue.
 *
 * TO ADD A PRODUCT:
 *   1. Copy one of the objects below (from the matching category).
 *   2. Give it a new unique "id" and "slug" (slug = the web address,
 *      lowercase, words separated by dashes, no spaces).
 *   3. Update name, price, description, details, sizes, colors.
 *   4. Put your image files in /public/products/ and list their
 *      file names in "images" (see README.md for details).
 *
 * TO REMOVE A PRODUCT: delete its whole object from the array below.
 *
 * TO CHANGE A PRICE / DESCRIPTION: edit the relevant field directly.
 *
 * "category" must be one of: "dresses" | "accessories" | "makeup"
 * "subcategory" must be one of: "jewelry" | "mobile-cases" | null
 *   (subcategory is only used for "accessories" products; leave it
 *   null for dresses and makeup)
 */
export const products: Product[] = [
  // ---------------------------------------------------------------- DRESSES
  {
    id: "dress-001",
    name: "Aurelia Slip Dress",
    slug: "aurelia-slip-dress",
    category: "dresses",
    subcategory: null,
    price: 8500,
    currency: "PKR",
    description:
      "A bias-cut slip dress in liquid satin that skims rather than clings. Cut on the true bias for movement, with adjustable straps and a low cowl back.",
    details: [
      "100% recycled satin",
      "Adjustable straps, cowl back",
      "Midi length, bias cut",
      "Hand wash cold",
    ],
    sizes: ["XS", "S", "M", "L"],
    colors: ["Champagne", "Black"],
    images: ["/products/aurelia-slip-dress-1.svg", "/products/aurelia-slip-dress-2.svg"],
    featured: true,
    available: true,
    stock: 12,
    isNew: true,
  },
  {
    id: "dress-002",
    name: "Noor Wrap Dress",
    slug: "noor-wrap-dress",
    category: "dresses",
    subcategory: null,
    price: 7200,
    currency: "PKR",
    description:
      "A wrap dress in soft crepe with a self-tie waist and a fluid midi skirt that moves with you from desk to dinner.",
    details: [
      "Soft crepe, fully lined",
      "Self-tie waist wrap closure",
      "Midi length, side slit",
      "Machine wash gentle",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Terracotta", "Ivory"],
    images: ["/products/noor-wrap-dress-1.svg", "/products/noor-wrap-dress-2.svg"],
    featured: true,
    available: true,
    stock: 9,
  },
  {
    id: "dress-003",
    name: "Celeste Midi Dress",
    slug: "celeste-midi-dress",
    category: "dresses",
    subcategory: null,
    price: 6800,
    currency: "PKR",
    description:
      "A structured midi in a fine cotton-blend twill with a square neckline and covered buttons down the front.",
    details: [
      "Cotton-blend twill",
      "Square neckline, front button placket",
      "Fitted waist, A-line skirt",
      "Machine wash cold",
    ],
    sizes: ["XS", "S", "M", "L"],
    colors: ["Sage", "Black"],
    images: ["/products/celeste-midi-dress-1.svg", "/products/celeste-midi-dress-2.svg"],
    featured: false,
    available: true,
    stock: 15,
  },
  {
    id: "dress-004",
    name: "Isabeau Evening Gown",
    slug: "isabeau-evening-gown",
    category: "dresses",
    subcategory: null,
    price: 15500,
    currency: "PKR",
    description:
      "A floor-length column gown in duchess satin with a fitted bodice and a subtle train — built for occasions that call for one great dress.",
    details: [
      "Duchess satin, boned bodice",
      "Concealed back zip",
      "Floor length with light train",
      "Dry clean only",
    ],
    sizes: ["XS", "S", "M", "L"],
    colors: ["Black", "Deep Emerald"],
    images: ["/products/isabeau-evening-gown-1.svg", "/products/isabeau-evening-gown-2.svg"],
    featured: true,
    available: true,
    stock: 5,
  },
  {
    id: "dress-005",
    name: "Marielle Day Dress",
    slug: "marielle-day-dress",
    category: "dresses",
    subcategory: null,
    price: 5400,
    currency: "PKR",
    description:
      "An easy, breathable shirt dress in lightweight linen-blend for warm days — belted waist, roll-up sleeves, roomy pockets.",
    details: [
      "Linen-blend, breathable",
      "Belted waist, roll-tab sleeves",
      "Side seam pockets",
      "Machine wash cold",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Stone", "White"],
    images: ["/products/marielle-day-dress-1.svg", "/products/marielle-day-dress-2.svg"],
    featured: false,
    available: true,
    stock: 20,
  },
  {
    id: "dress-006",
    name: "Verity Satin Dress",
    slug: "verity-satin-dress",
    category: "dresses",
    subcategory: null,
    price: 9200,
    currency: "PKR",
    description:
      "A cowl-neck satin dress with a fluid drape and a low open back, finished with a delicate self-tie at the nape.",
    details: [
      "Premium satin",
      "Cowl neckline, open back",
      "Midi length",
      "Hand wash cold",
    ],
    sizes: ["XS", "S", "M", "L"],
    colors: ["Blush", "Black"],
    images: ["/products/verity-satin-dress-1.svg", "/products/verity-satin-dress-2.svg"],
    featured: false,
    available: false,
    stock: 0,
  },

  // ------------------------------------------------------- ACCESSORIES: JEWELRY
  {
    id: "jewelry-001",
    name: "Signet Ring",
    slug: "signet-ring",
    category: "accessories",
    subcategory: "jewelry",
    price: 3200,
    currency: "PKR",
    description:
      "A weighted signet ring in 18k gold vermeil with a hand-polished flat face — a modern heirloom that only gets better with wear.",
    details: [
      "18k gold vermeil over sterling silver",
      "Tarnish-resistant, water safe",
      "Available in sizes 6–9",
    ],
    sizes: ["6", "7", "8", "9"],
    colors: ["Gold"],
    images: ["/products/signet-ring-1.svg", "/products/signet-ring-2.svg"],
    featured: true,
    available: true,
    stock: 25,
    isNew: true,
  },
  {
    id: "jewelry-002",
    name: "Vermeil Hoop Earrings",
    slug: "vermeil-hoop-earrings",
    category: "accessories",
    subcategory: "jewelry",
    price: 2600,
    currency: "PKR",
    description:
      "Lightweight everyday hoops in 18k gold vermeil, sized to layer or wear alone. Hinged closure for easy on-and-off.",
    details: [
      "18k gold vermeil",
      "25mm diameter, hinged closure",
      "Hypoallergenic posts",
    ],
    sizes: [],
    colors: ["Gold", "Silver"],
    images: ["/products/vermeil-hoop-earrings-1.svg", "/products/vermeil-hoop-earrings-2.svg"],
    featured: true,
    available: true,
    stock: 30,
  },
  {
    id: "jewelry-003",
    name: "Pearl Drop Necklace",
    slug: "pearl-drop-necklace",
    category: "accessories",
    subcategory: "jewelry",
    price: 4100,
    currency: "PKR",
    description:
      "A single freshwater pearl suspended from a fine cable chain — quietly luxurious, easy to wear every day.",
    details: [
      "Genuine freshwater pearl",
      "Sterling silver chain, gold vermeil option",
      "16\" chain with 2\" extender",
    ],
    sizes: [],
    colors: ["Gold", "Silver"],
    images: ["/products/pearl-drop-necklace-1.svg", "/products/pearl-drop-necklace-2.svg"],
    featured: false,
    available: true,
    stock: 18,
  },
  {
    id: "jewelry-004",
    name: "Bezel Chain Bracelet",
    slug: "bezel-chain-bracelet",
    category: "accessories",
    subcategory: "jewelry",
    price: 2900,
    currency: "PKR",
    description:
      "A dainty chain bracelet set with bezel-cut cubic zirconia stones at intervals — subtle sparkle for daily wear.",
    details: [
      "18k gold vermeil",
      "Cubic zirconia stones",
      "Adjustable 6\"–7.5\"",
    ],
    sizes: [],
    colors: ["Gold"],
    images: ["/products/bezel-chain-bracelet-1.svg", "/products/bezel-chain-bracelet-2.svg"],
    featured: false,
    available: true,
    stock: 22,
  },
  {
    id: "jewelry-005",
    name: "Baguette Stud Earrings",
    slug: "baguette-stud-earrings",
    category: "accessories",
    subcategory: "jewelry",
    price: 2300,
    currency: "PKR",
    description:
      "Petite baguette-cut stone studs set in gold vermeil — a refined everyday stud with a subtle geometric edge.",
    details: [
      "18k gold vermeil",
      "Baguette-cut cubic zirconia",
      "Butterfly backing",
    ],
    sizes: [],
    colors: ["Gold"],
    images: ["/products/baguette-stud-earrings-1.svg", "/products/baguette-stud-earrings-2.svg"],
    featured: false,
    available: true,
    stock: 27,
  },

  // ------------------------------------------------- ACCESSORIES: MOBILE CASES
  {
    id: "case-001",
    name: "Marble Silicone Case",
    slug: "marble-silicone-case",
    category: "accessories",
    subcategory: "mobile-cases",
    price: 1800,
    currency: "PKR",
    description:
      "A shock-absorbing silicone case finished with a soft marbled print and raised camera edges for everyday protection.",
    details: [
      "Soft-touch silicone shell",
      "Raised bezel around camera",
      "Wireless charging compatible",
    ],
    sizes: [],
    colors: ["Cream Marble", "Rose Marble"],
    images: ["/products/marble-silicone-case-1.svg", "/products/marble-silicone-case-2.svg"],
    featured: true,
    available: true,
    stock: 40,
  },
  {
    id: "case-002",
    name: "Quilted Leather Case",
    slug: "quilted-leather-case",
    category: "accessories",
    subcategory: "mobile-cases",
    price: 2400,
    currency: "PKR",
    description:
      "A structured case in quilted vegan leather with a card slot on the back — a quiet nod to classic handbag hardware.",
    details: [
      "Vegan leather, quilted finish",
      "Rear card slot",
      "Scratch-resistant lining",
    ],
    sizes: [],
    colors: ["Black", "Caramel"],
    images: ["/products/quilted-leather-case-1.svg", "/products/quilted-leather-case-2.svg"],
    featured: true,
    available: true,
    stock: 33,
    isNew: true,
  },
  {
    id: "case-003",
    name: "Woven Cord Case",
    slug: "woven-cord-case",
    category: "accessories",
    subcategory: "mobile-cases",
    price: 2100,
    currency: "PKR",
    description:
      "A textured woven-cord case with a matching detachable wrist strap — casual, tactile, and easy to grip.",
    details: [
      "Woven cord texture shell",
      "Detachable wrist strap included",
      "Precise cut-outs for ports",
    ],
    sizes: [],
    colors: ["Natural", "Black"],
    images: ["/products/woven-cord-case-1.svg", "/products/woven-cord-case-2.svg"],
    featured: false,
    available: true,
    stock: 26,
  },
  {
    id: "case-004",
    name: "Pearl Charm Case",
    slug: "pearl-charm-case",
    category: "accessories",
    subcategory: "mobile-cases",
    price: 2000,
    currency: "PKR",
    description:
      "A clear reinforced case with a detachable pearl charm strap — protective, playful, and easy to dress up or down.",
    details: [
      "Reinforced clear polycarbonate",
      "Detachable pearl charm strap",
      "Anti-yellowing coating",
    ],
    sizes: [],
    colors: ["Clear"],
    images: ["/products/pearl-charm-case-1.svg", "/products/pearl-charm-case-2.svg"],
    featured: false,
    available: true,
    stock: 19,
  },

  // ---------------------------------------------------------------- MAKEUP
  {
    id: "makeup-001",
    name: "Satin Lip Tint",
    slug: "satin-lip-tint",
    category: "makeup",
    subcategory: null,
    price: 1500,
    currency: "PKR",
    description:
      "A weightless, buildable lip tint with a natural satin finish — one swipe for a your-lips-but-better flush.",
    details: [
      "Buildable, lightweight formula",
      "Contains vitamin E",
      "6-hour wear",
    ],
    sizes: [],
    colors: ["Rosewood", "Terracotta", "Berry"],
    images: ["/products/satin-lip-tint-1.svg", "/products/satin-lip-tint-2.svg"],
    featured: true,
    available: true,
    stock: 50,
  },
  {
    id: "makeup-002",
    name: "Silk Setting Powder",
    slug: "silk-setting-powder",
    category: "makeup",
    subcategory: null,
    price: 2200,
    currency: "PKR",
    description:
      "A translucent, ultra-fine setting powder that blurs pores and locks in makeup without flattening natural skin texture.",
    details: [
      "Translucent, blurs pores",
      "Oil-absorbing finish",
      "Talc-free formula",
    ],
    sizes: [],
    colors: ["Translucent"],
    images: ["/products/silk-setting-powder-1.svg", "/products/silk-setting-powder-2.svg"],
    featured: true,
    available: true,
    stock: 35,
  },
  {
    id: "makeup-003",
    name: "Velvet Blush Duo",
    slug: "velvet-blush-duo",
    category: "makeup",
    subcategory: null,
    price: 1900,
    currency: "PKR",
    description:
      "A two-tone cream-to-powder blush palette designed to sculpt and flush the cheeks in one easy step.",
    details: [
      "Cream-to-powder formula",
      "Two complementary shades",
      "Blends with fingertips or brush",
    ],
    sizes: [],
    colors: ["Peach Duo", "Rose Duo"],
    images: ["/products/velvet-blush-duo-1.svg", "/products/velvet-blush-duo-2.svg"],
    featured: false,
    available: true,
    stock: 28,
  },
  {
    id: "makeup-004",
    name: "Line Definer Kajal",
    slug: "line-definer-kajal",
    category: "makeup",
    subcategory: null,
    price: 1200,
    currency: "PKR",
    description:
      "A soft, smudge-friendly kajal pencil that glides on without tugging and stays put through a full day.",
    details: [
      "Smudge-resistant, long-wear",
      "Built-in smudger tip",
      "Ophthalmologist tested",
    ],
    sizes: [],
    colors: ["Black", "Espresso"],
    images: ["/products/line-definer-kajal-1.svg", "/products/line-definer-kajal-2.svg"],
    featured: false,
    available: true,
    stock: 45,
  },
  {
    id: "makeup-005",
    name: "Radiance Highlighter Stick",
    slug: "radiance-highlighter-stick",
    category: "makeup",
    subcategory: null,
    price: 1700,
    currency: "PKR",
    description:
      "A creamy highlighter stick that melts into skin for a lit-from-within glow — no shimmer flecks, just soft light.",
    details: [
      "Creamy, blendable formula",
      "Fine-milled pearl pigments",
      "Travel-friendly stick format",
    ],
    sizes: [],
    colors: ["Champagne", "Rose Gold"],
    images: ["/products/radiance-highlighter-stick-1.svg", "/products/radiance-highlighter-stick-2.svg"],
    featured: true,
    available: true,
    stock: 31,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getProductsBySubcategory(
  category: string,
  subcategory: string
): Product[] {
  return products.filter(
    (p) => p.category === category && p.subcategory === subcategory
  );
}

export function getFeaturedProducts(limit?: number): Product[] {
  const featured = products.filter((p) => p.featured);
  return typeof limit === "number" ? featured.slice(0, limit) : featured;
}

export function getFeaturedBySubcategory(
  subcategory: string,
  limit = 4
): Product[] {
  return products
    .filter((p) => p.subcategory === subcategory)
    .slice(0, limit);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.subcategory
          ? p.subcategory === product.subcategory
          : p.category === product.category)
    )
    .slice(0, limit);
}
