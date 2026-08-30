# LAYORA — Fashion & Accessories

A premium, mobile-friendly online store built with Next.js, TypeScript and
Tailwind CSS. This guide assumes you have never coded before — follow the
steps in order.

---

## 1. How to change the logo

1. Get your logo as a **PNG file** (transparent background recommended).
2. Rename it exactly to `logo.png`.
3. Put it inside the folder: `public/brand/logo.png`
4. That's it — the site automatically detects the file and displays it
   instead of the text "LAYORA". No code changes needed.

To go back to the text logo, just delete `public/brand/logo.png`.

---

## 2. How to add a product

Open the file: `lib/products.ts`

1. Scroll to the section matching the category (Dresses / Jewelry /
   Mobile Cases / Makeup).
2. Copy an existing product object (the whole `{ ... }` block) and paste
   it right after, still inside the `products = [ ... ]` array.
3. Edit these fields:
   - `id` — must be unique, e.g. `"dress-007"`
   - `name` — the product name shown to customers
   - `slug` — the web address for the product, e.g. `"my-new-dress"`
     (lowercase, words separated by dashes, no spaces)
   - `category` — one of: `"dresses"`, `"accessories"`, `"makeup"`
   - `subcategory` — `"jewelry"`, `"mobile-cases"`, or `null` if this
     product is a dress or makeup item
   - `price`, `description`, `details`, `sizes`, `colors`
   - `images` — see section 4 below
4. Save the file. The product will appear automatically on its category
   page, the homepage (if `featured: true`), and get its own page at
   `/products/your-slug`.

---

## 3. How to remove a product

Open `lib/products.ts`, find the product's whole `{ ... }` object, and
delete it (including the comma after it). Save the file.

---

## 4. How to change a price

Open `lib/products.ts`, find the product, change the number after
`price:`. Prices are plain numbers with no commas, e.g. `price: 7500`.

---

## 5. How to change a product description

Open `lib/products.ts`, find the product, edit the text inside the
quotes after `description:`. You can also edit the bullet points inside
the `details: [ ... ]` list.

---

## 6. How to add product images

1. Prepare your photos (JPG or PNG). Square or portrait photos work best.
2. Put them inside the folder: `public/products/`
3. In `lib/products.ts`, find your product's `images` field and list the
   file names, for example:

   ```
   images: ["/products/my-photo-1.jpg", "/products/my-photo-2.jpg"]
   ```

   The first image is the main photo. The second one appears on hover on
   the product grid and both appear in the gallery on the product page.
   You can list as many as you like.

The site currently ships with placeholder illustrations so you can see
how everything looks before adding your own real photos.

---

## 7. How to create another category

1. Open `lib/categories.ts` and add a new entry to the `categories`
   array, for example:

   ```ts
   {
     name: "Bags",
     slug: "bags",
     description: "Everyday and occasion bags.",
     subcategories: [],
   },
   ```

2. Create a new folder `app/bags/` with a file `page.tsx` inside it.
   The easiest way is to copy `app/makeup/page.tsx`, paste it into
   `app/bags/page.tsx`, and change every `"makeup"` in that file to
   `"bags"`.
3. Add products in `lib/products.ts` with `category: "bags"`.

The navigation menu, footer, and homepage links update automatically
once the category exists in `lib/categories.ts`.

---

## 8. How to create another subcategory

1. Open `lib/categories.ts`, find the parent category (e.g.
   `accessories`), and add a new object to its `subcategories` array:

   ```ts
   {
     name: "Sunglasses",
     slug: "sunglasses",
     description: "Sun protection with a polished finish.",
   },
   ```

2. Create the folder `app/accessories/sunglasses/page.tsx`. Copy
   `app/accessories/jewelry/page.tsx` and replace every `"jewelry"` with
   `"sunglasses"`.
3. Add matching products in `lib/products.ts` with
   `subcategory: "sunglasses"`.

---

## 9. How to change the WhatsApp number

Open `lib/config.ts` and edit this line:

```ts
export const WHATSAPP_NUMBER = "923001234567";
```

Use your number in international format, digits only — no `+`, spaces,
or dashes. Every "Order on WhatsApp" and "Checkout via WhatsApp" button
on the whole site uses this one value.

---

## 10. How to change Instagram / contact information

Also in `lib/config.ts`:

```ts
export const INSTAGRAM_HANDLE = "layora.store";
export const INSTAGRAM_URL = "https://instagram.com/layora.store";
```

Edit these to your real handle and profile link. This updates the
footer automatically.

---

## 11. How to run the website locally

You need [Node.js](https://nodejs.org) installed (version 18 or newer).

1. Open a terminal inside the project folder.
2. Install dependencies (only needed once, or after changing
   `package.json`):

   ```
   npm install
   ```

3. Start the local development server:

   ```
   npm run dev
   ```

4. Open your browser at **http://localhost:3000**. The site reloads
   automatically whenever you save a file.

---

## 12. How to push changes to GitHub

1. Create a new, empty repository on [GitHub](https://github.com) (do
   **not** add a README there — this project already has one).
2. In your terminal, inside the project folder, run:

   ```
   git init
   git add .
   git commit -m "Initial LAYORA website"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
   git push -u origin main
   ```

3. For future changes, run:

   ```
   git add .
   git commit -m "Describe what you changed"
   git push
   ```

---

## 13. How to deploy / update the site on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with your GitHub
   account.
2. Click **Add New → Project**, then select your LAYORA repository.
3. Vercel automatically detects it's a Next.js project — leave all
   settings as default and click **Deploy**.
4. After a minute, Vercel gives you a live URL (e.g.
   `layora.vercel.app`).
5. **To update the live site later:** just push your changes to GitHub
   (step 12) — Vercel automatically rebuilds and redeploys within a
   couple of minutes. You don't need to do anything else on Vercel.

Optional: once deployed, update `SITE_URL` in `lib/config.ts` to your
real domain so WhatsApp order messages include correct product links.

---

## Project structure (for reference)

```
app/                  Pages (routes)
  page.tsx            Homepage
  dresses/            /dresses
  accessories/        /accessories, /accessories/jewelry, /accessories/mobile-cases
  makeup/             /makeup
  products/[slug]/    Individual product pages
  cart/               Shopping cart page
  not-found.tsx       Custom 404 page
components/           Reusable UI building blocks
lib/
  products.ts         ALL product data — edit this to manage your catalogue
  categories.ts       Category / subcategory structure
  config.ts           WhatsApp number, Instagram, site name
  cart-context.tsx     Shopping cart logic (localStorage)
  whatsapp.ts          Builds WhatsApp order messages
public/
  brand/logo.png      Your logo (optional — see section 1)
  products/           Product photos (see section 6)
```

No database, no payment gateway, and no login are required — this is a
fully static, WhatsApp-ordering storefront that deploys cleanly to
Vercel.
