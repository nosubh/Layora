"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/format";
import {
  JAZZCASH_NUMBER,
  JAZZCASH_DISPLAY,
  JAZZCASH_TITLE,
  SITE_NAME,
} from "@/lib/config";
import { OrderRecord } from "@/lib/order-types";

const POPULAR_CITIES = [
  "Lahore",
  "Karachi",
  "Islamabad",
  "Rawalpindi",
  "Faisalabad",
  "Multan",
  "Peshawar",
  "Sialkot",
  "Gujranwala",
  "Quetta",
  "Hyderabad",
  "Other",
];

export default function CheckoutView() {
  const { items, subtotal, clearCart, isLoaded } = useCart();

  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    email: "",
    address: "",
    city: "Lahore",
    customCity: "",
    notes: "",
  });

  const [paymentMethod, setPaymentMethod] = useState<"jazzcash" | "cod">("jazzcash");
  const [transactionId, setTransactionId] = useState("");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // JazzCash Payment Screenshot state
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const [screenshotName, setScreenshotName] = useState<string>("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmedOrder, setConfirmedOrder] = useState<OrderRecord | null>(null);

  const handleScreenshotUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrorMessage("Please select a valid image file (JPG, PNG, WEBP, etc.)");
      return;
    }

    setScreenshotName(file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new (window as any).Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 1200;
        const MAX_HEIGHT = 1200;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width = Math.round((width * MAX_HEIGHT) / height);
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
        setScreenshotPreview(dataUrl);
        setErrorMessage("");
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  if (!isLoaded) {
    return <div className="container-layora py-24 min-h-[50vh]" />;
  }

  // If cart is empty and no order has been confirmed yet
  if (items.length === 0 && !confirmedOrder) {
    return (
      <div className="container-layora py-24 text-center">
        <h1 className="font-display text-3xl italic">Your Cart is Empty</h1>
        <p className="mt-3 text-sm text-ink/60">
          Please add items to your cart before proceeding to checkout.
        </p>
        <Link href="/" className="btn-primary mt-8 inline-flex">
          Browse Collections
        </Link>
      </div>
    );
  }

  // Shipping calculation: Free above 5000 PKR, else 250 PKR
  const shippingFee = subtotal >= 5000 || subtotal === 0 ? 0 : 250;
  const totalAmount = subtotal + shippingFee;

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    const activeCity =
      formData.city === "Other" && formData.customCity.trim()
        ? formData.customCity.trim()
        : formData.city;

    if (!formData.customerName.trim() || !formData.phone.trim() || !formData.address.trim()) {
      setErrorMessage("Please fill in your name, contact phone number, and delivery address.");
      return;
    }

    if (paymentMethod === "jazzcash") {
      if (!transactionId.trim()) {
        setErrorMessage(
          "Please enter your JazzCash Transaction ID (TID) / Reference number after sending payment to +923390131877."
        );
        return;
      }
      if (!screenshotPreview) {
        setErrorMessage(
          "Payment screenshot is mandatory! Please upload your JazzCash payment screenshot / receipt image before placing your order."
        );
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const payload = {
        customerName: formData.customerName.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        address: formData.address.trim(),
        city: activeCity,
        country: "Pakistan",
        items: items.map((i) => ({
          productId: i.productId,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
          size: i.size,
          color: i.color,
        })),
        subtotal,
        shippingFee,
        totalAmount,
        currency: items[0]?.currency ?? "PKR",
        paymentMethod,
        paymentStatus: paymentMethod === "jazzcash" ? "paid" : "pending",
        transactionId: paymentMethod === "jazzcash" ? transactionId.trim() : "",
        paymentScreenshot: paymentMethod === "jazzcash" ? screenshotPreview : "",
        notes: formData.notes.trim(),
        source: "website_checkout",
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to confirm order. Please try again.");
      }

      setConfirmedOrder(data.order);
      clearCart();
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // SUCCESS CONFIRMATION SCREEN
  if (confirmedOrder) {
    const isPaid = confirmedOrder.status === "paid" || confirmedOrder.paymentStatus === "paid";

    return (
      <div className="container-layora py-12 sm:py-16 max-w-3xl">
        <div className="rounded-2xl border border-line bg-cream/95 backdrop-blur-md p-6 sm:p-10 shadow-xl text-center">
          {/* Success Check Badge */}
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 shadow-sm border border-emerald-300">
            <svg className="h-8 w-8 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <p className="eyebrow mt-4">Order Received &amp; Confirmed</p>
          <h1 className="font-display text-3xl sm:text-4xl italic text-ink mt-1">
            Thank You, {confirmedOrder.customerName}!
          </h1>
          <p className="mt-2 text-sm text-ink/75">
            Your order has been recorded and synced to our inventory &amp; billing system.
          </p>

          {/* Order Details Card */}
          <div className="mt-8 rounded-xl border border-line bg-white/70 p-5 sm:p-7 text-left space-y-4">
            <div className="flex flex-wrap items-center justify-between border-b border-line pb-4 gap-2">
              <div>
                <span className="text-xs text-ink/50 uppercase tracking-wider block">Order Reference</span>
                <span className="font-display text-2xl font-bold italic text-rose-dark">
                  #{confirmedOrder.id}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs text-ink/50 uppercase tracking-wider block">Payment Status</span>
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                    isPaid
                      ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                      : "bg-amber-100 text-amber-900 border border-amber-300"
                  }`}
                >
                  {isPaid ? "✓ Paid via JazzCash" : "Cash On Delivery (Pending)"}
                </span>
              </div>
            </div>

            {confirmedOrder.transactionId && (
              <div className="bg-sand/40 border border-line rounded-lg p-3 text-xs">
                <span className="font-semibold text-ink">JazzCash Reference / TID: </span>
                <code className="font-mono bg-cream px-2 py-0.5 rounded border border-line text-ink">
                  {confirmedOrder.transactionId}
                </code>
              </div>
            )}

            {confirmedOrder.paymentScreenshot && (
              <div className="bg-sand/40 border border-line rounded-lg p-3 text-xs space-y-1.5">
                <span className="font-semibold text-ink block">Uploaded JazzCash Receipt Screenshot:</span>
                <div className="relative h-28 w-28 rounded-md overflow-hidden border border-line bg-cream shadow-xs">
                  <img
                    src={confirmedOrder.paymentScreenshot}
                    alt="Payment Screenshot"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            )}

            {/* Delivery address */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <p className="text-ink/50 uppercase tracking-wider font-semibold">Delivery To</p>
                <p className="font-medium text-ink mt-1">{confirmedOrder.customerName}</p>
                <p className="text-ink/80">{confirmedOrder.address}</p>
                <p className="text-ink/80">{confirmedOrder.city}, Pakistan</p>
                <p className="text-ink/80">Phone: {confirmedOrder.phone}</p>
              </div>
              <div>
                <p className="text-ink/50 uppercase tracking-wider font-semibold">Timeline &amp; Dispatch</p>
                <p className="font-medium text-emerald-800 mt-1">1-Week Standard Delivery</p>
                <p className="text-ink/70">
                  Tracking SMS updates will be sent to your phone.
                </p>
              </div>
            </div>

            {/* Items summary */}
            <div className="border-t border-line pt-3">
              <p className="text-xs text-ink/50 uppercase tracking-wider font-semibold mb-2">
                Order Items ({confirmedOrder.items.length})
              </p>
              <div className="space-y-2">
                {confirmedOrder.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-xs">
                    <span className="text-ink">
                      {item.name} × {item.quantity} {item.size ? `(${item.size})` : ""}
                    </span>
                    <span className="font-semibold text-ink">
                      {formatPrice(item.price * item.quantity, confirmedOrder.currency)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-line/60 mt-3 pt-3 flex justify-between text-sm font-bold">
                <span>Total Amount</span>
                <span className="text-rose-dark font-display text-lg">
                  {formatPrice(confirmedOrder.totalAmount, confirmedOrder.currency)}
                </span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => window.print()}
              className="btn-primary w-full sm:w-auto inline-flex items-center justify-center gap-2"
            >
              <span>🖨️ Print / Save Receipt</span>
            </button>
            <Link
              href="/"
              className="btn-outline w-full sm:w-auto inline-flex items-center justify-center"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-layora py-10 lg:py-16">
      <div className="mb-8">
        <p className="eyebrow">Layora Boutique</p>
        <h1 className="font-display text-3xl sm:text-4xl italic text-ink mt-1">
          Secure Checkout &amp; Payment
        </h1>
        <p className="text-xs sm:text-sm text-ink/65 mt-1">
          Complete your delivery details and choose your preferred payment method below.
        </p>
      </div>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        {/* Left Column: Delivery & Payment Details (8 cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* STEP 1: Delivery Information */}
          <div className="rounded-xl border border-line bg-cream/80 p-6 sm:p-8 shadow-xs">
            <h2 className="font-display text-xl italic text-ink flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-espresso text-cream text-xs font-sans not-italic">
                1
              </span>
              Delivery Details
            </h2>

            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wide text-ink/70 font-semibold mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ayesha Khan"
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  className="w-full rounded-md border border-line bg-white px-3.5 py-2.5 text-xs sm:text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:border-rose-dark transition"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wide text-ink/70 font-semibold mb-1.5">
                    WhatsApp / Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0300 1234567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full rounded-md border border-line bg-white px-3.5 py-2.5 text-xs sm:text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:border-rose-dark transition"
                  />
                  <span className="text-[10px] text-ink/50 mt-1 block">
                    Used for order dispatch &amp; courier tracking
                  </span>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wide text-ink/70 font-semibold mb-1.5">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="ayesha@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-md border border-line bg-white px-3.5 py-2.5 text-xs sm:text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:border-rose-dark transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wide text-ink/70 font-semibold mb-1.5">
                  Complete Street Address *
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="House/Apartment #, Street name, Sector/Block, Area"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full rounded-md border border-line bg-white px-3.5 py-2.5 text-xs sm:text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:border-rose-dark transition"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wide text-ink/70 font-semibold mb-1.5">
                    City *
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full rounded-md border border-line bg-white px-3.5 py-2.5 text-xs sm:text-sm text-ink focus:outline-none focus:border-rose-dark transition"
                  >
                    {POPULAR_CITIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                {formData.city === "Other" && (
                  <div>
                    <label className="block text-xs uppercase tracking-wide text-ink/70 font-semibold mb-1.5">
                      Specify City *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your city name"
                      value={formData.customCity}
                      onChange={(e) => setFormData({ ...formData, customCity: e.target.value })}
                      className="w-full rounded-md border border-line bg-white px-3.5 py-2.5 text-xs sm:text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:border-rose-dark transition"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wide text-ink/70 font-semibold mb-1.5">
                  Special Notes / Tailoring instructions
                </label>
                <input
                  type="text"
                  placeholder="e.g. Please leave package with guard / call before delivery"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full rounded-md border border-line bg-white px-3.5 py-2.5 text-xs sm:text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:border-rose-dark transition"
                />
              </div>
            </div>
          </div>

          {/* STEP 2: Payment Method */}
          <div className="rounded-xl border border-line bg-cream/80 p-6 sm:p-8 shadow-xs">
            <h2 className="font-display text-xl italic text-ink flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-espresso text-cream text-xs font-sans not-italic">
                2
              </span>
              Payment Method
            </h2>

            <div className="mt-5 space-y-3">
              {/* Option 1: Online Payment by JazzCash */}
              <label
                className={`flex flex-col rounded-lg border p-4 cursor-pointer transition-all ${
                  paymentMethod === "jazzcash"
                    ? "border-rose-dark bg-sand/50 shadow-xs"
                    : "border-line bg-white/70 hover:bg-sand/30"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment_method"
                      value="jazzcash"
                      checked={paymentMethod === "jazzcash"}
                      onChange={() => setPaymentMethod("jazzcash")}
                      className="accent-rose-dark"
                    />
                    <div>
                      <p className="font-bold text-xs sm:text-sm text-ink flex items-center gap-2">
                        <span className="inline-block rounded bg-red-700 text-white text-[10px] font-bold px-1.5 py-0.5 uppercase tracking-wide">
                          JazzCash
                        </span>
                        <span>Online Payment by JazzCash / Raast</span>
                      </p>
                      <p className="text-[11px] text-ink/65 mt-0.5">
                        Send to 03390131877 via JazzCash app, EasyPaisa, or any banking app via Raast
                      </p>
                    </div>
                  </div>
                  <span className="rounded bg-rose-dark/15 text-rose-dark text-[10px] font-bold px-2 py-0.5 uppercase">
                    Recommended
                  </span>
                </div>

                {/* JazzCash Details Sub-card */}
                {paymentMethod === "jazzcash" && (
                  <div className="mt-4 pt-4 border-t border-line space-y-3 text-xs animate-in fade-in">
                    <p className="text-ink/80 text-[11px] font-medium leading-relaxed">
                      Please send{" "}
                      <span className="font-bold text-rose-dark text-xs">
                        {formatPrice(totalAmount, items[0]?.currency ?? "PKR")}
                      </span>{" "}
                      to our official JazzCash account below, then enter your Transaction ID (TID) to confirm:
                    </p>

                    <div className="rounded-md border border-line bg-cream p-3.5 space-y-2.5 font-mono text-xs text-ink">
                      <div className="flex items-center justify-between">
                        <span className="text-ink/60 font-sans">Payment Method:</span>
                        <span className="font-bold text-red-700 font-sans">JazzCash Mobile Account / Raast</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-ink/60 font-sans">Account Title:</span>
                        <span className="font-bold">{JAZZCASH_TITLE}</span>
                      </div>
                      <div className="flex items-center justify-between border-t border-line/60 pt-2">
                        <span className="text-ink/60 font-sans font-semibold">JazzCash Number:</span>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-rose-dark">{JAZZCASH_NUMBER}</span>
                          <button
                            type="button"
                            onClick={() => handleCopy(JAZZCASH_NUMBER, "jc_num")}
                            className="text-[10px] bg-sand px-2 py-0.5 rounded border border-line hover:bg-sand/80 font-sans font-semibold"
                          >
                            {copiedField === "jc_num" ? "✓ Copied" : "Copy"}
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between border-t border-line/60 pt-2">
                        <span className="text-ink/60 font-sans">International / Raast Format:</span>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-ink">{JAZZCASH_DISPLAY}</span>
                          <button
                            type="button"
                            onClick={() => handleCopy("+923390131877", "jc_intl")}
                            className="text-[10px] bg-sand px-2 py-0.5 rounded border border-line hover:bg-sand/80 font-sans font-semibold"
                          >
                            {copiedField === "jc_intl" ? "✓ Copied" : "Copy"}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="pt-1">
                      <label className="block text-xs uppercase tracking-wide text-ink/80 font-bold mb-1">
                        JazzCash Transaction ID (TID) / Reference Number *
                      </label>
                      <input
                        type="text"
                        required={paymentMethod === "jazzcash"}
                        placeholder="e.g. 10928374092"
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value)}
                        className="w-full rounded-md border border-line bg-white px-3.5 py-2.5 text-xs sm:text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:border-rose-dark transition"
                      />
                      <span className="text-[10px] text-ink/60 mt-1 block">
                        Enter the 10-12 digit TID received in your JazzCash confirmation SMS or transaction slip.
                      </span>
                    </div>

                    {/* Mandatory Payment Screenshot Upload */}
                    <div className="pt-3 border-t border-line/60">
                      <label className="block text-xs uppercase tracking-wide text-ink/80 font-bold mb-1.5 flex items-center justify-between">
                        <span>Payment Screenshot / Receipt Image *</span>
                        <span className="text-[10px] text-rose-dark font-bold uppercase tracking-wider bg-rose/10 px-1.5 py-0.5 rounded">
                          Required
                        </span>
                      </label>

                      {!screenshotPreview ? (
                        <label className="flex flex-col items-center justify-center border-2 border-dashed border-rose-dark/40 hover:border-rose-dark bg-white/80 hover:bg-white rounded-lg p-5 cursor-pointer transition text-center group shadow-2xs">
                          <input
                            type="file"
                            accept="image/*"
                            required={paymentMethod === "jazzcash"}
                            onChange={handleScreenshotUpload}
                            className="hidden"
                          />
                          <div className="h-10 w-10 rounded-full bg-rose/15 text-rose-dark flex items-center justify-center mb-2 group-hover:scale-110 transition text-lg">
                            📸
                          </div>
                          <span className="text-xs font-bold text-ink group-hover:text-rose-dark">
                            Click or tap to upload payment screenshot
                          </span>
                          <span className="text-[10px] text-ink/50 mt-1">
                            PNG, JPG, WEBP receipt image (Max 10MB)
                          </span>
                        </label>
                      ) : (
                        <div className="rounded-lg border border-emerald-300 bg-emerald-50/50 p-3 flex items-center justify-between gap-3 shadow-2xs">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="relative h-14 w-14 shrink-0 rounded overflow-hidden border border-emerald-300 bg-white">
                              <img
                                src={screenshotPreview}
                                alt="Payment Proof"
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5">
                                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                                  ✓ Screenshot Uploaded
                                </span>
                              </div>
                              <p className="text-xs font-semibold text-ink truncate mt-1">
                                {screenshotName || "Payment_Receipt.jpg"}
                              </p>
                              <p className="text-[10px] text-ink/60">Ready to verify payment</p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setScreenshotPreview(null);
                              setScreenshotName("");
                            }}
                            className="shrink-0 text-[11px] text-red-700 hover:text-red-900 font-semibold px-2.5 py-1 bg-white rounded border border-red-200 hover:bg-red-50 transition"
                          >
                            Remove / Change
                          </button>
                        </div>
                      )}
                      <span className="text-[10px] text-ink/60 mt-1 block">
                        Upload the screenshot of your JazzCash transaction confirmation screen or SMS receipt.
                      </span>
                    </div>
                  </div>
                )}
              </label>

              {/* Option 2: Cash on Delivery (COD) */}
              <label
                className={`flex flex-col rounded-lg border p-4 cursor-pointer transition-all ${
                  paymentMethod === "cod"
                    ? "border-rose-dark bg-sand/50 shadow-xs"
                    : "border-line bg-white/70 hover:bg-sand/30"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment_method"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      className="accent-rose-dark"
                    />
                    <div>
                      <p className="font-bold text-xs sm:text-sm text-ink">
                        💵 Cash on Delivery (COD)
                      </p>
                      <p className="text-[11px] text-ink/65 mt-0.5">
                        Pay in cash to courier rider upon parcel delivery at your doorstep
                      </p>
                    </div>
                  </div>
                  <span className="rounded bg-sand text-ink/75 text-[10px] font-semibold px-2 py-0.5 uppercase">
                    Nationwide
                  </span>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary (5 cols) */}
        <div className="lg:col-span-5">
          <div className="sticky top-28 rounded-xl border border-line bg-cream/95 backdrop-blur-md p-6 sm:p-7 shadow-sm">
            <h2 className="font-display text-xl italic text-ink border-b border-line pb-3">
              Order Summary
            </h2>

            {/* Item list */}
            <div className="divide-y divide-line/60 max-h-72 overflow-y-auto my-4 pr-1">
              {items.map((item) => (
                <div
                  key={`${item.productId}-${item.size ?? ""}-${item.color ?? ""}`}
                  className="flex items-center gap-3.5 py-3"
                >
                  <div className="relative h-14 w-12 shrink-0 bg-sand rounded overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-display text-xs italic text-ink truncate font-medium">
                      {item.name}
                    </p>
                    <p className="text-[11px] text-ink/60 mt-0.5">
                      Qty: {item.quantity} {item.size ? `• Size: ${item.size}` : ""}
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-ink">
                    {formatPrice(item.price * item.quantity, item.currency)}
                  </span>
                </div>
              ))}
            </div>

            {/* Price Calculations */}
            <div className="border-t border-line pt-4 space-y-2.5 text-xs text-ink/80">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal, items[0]?.currency ?? "PKR")}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Standard Delivery</span>
                <span>
                  {shippingFee === 0 ? (
                    <span className="text-emerald-700 font-bold uppercase text-[11px]">
                      FREE Delivery
                    </span>
                  ) : (
                    formatPrice(shippingFee, items[0]?.currency ?? "PKR")
                  )}
                </span>
              </div>
              {subtotal < 5000 && (
                <p className="text-[10px] text-rose-dark bg-rose/10 px-2 py-1 rounded">
                  💡 Tip: Add {formatPrice(5000 - subtotal, "PKR")} more to get FREE shipping!
                </p>
              )}
            </div>

            {/* Total */}
            <div className="border-t border-line mt-4 pt-4 flex items-baseline justify-between">
              <span className="font-display text-base italic text-ink font-bold">Total Amount</span>
              <span className="font-display text-2xl font-bold italic text-rose-dark">
                {formatPrice(totalAmount, items[0]?.currency ?? "PKR")}
              </span>
            </div>

            {errorMessage && (
              <div className="mt-4 rounded-md border border-red-300 bg-red-50 p-3 text-xs text-red-700 animate-in fade-in">
                ⚠️ {errorMessage}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full mt-6 py-3.5 text-xs sm:text-sm tracking-wider uppercase font-bold disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transition-all"
            >
              {isSubmitting ? "Processing Order..." : "Confirm Order & Pay →"}
            </button>

            <p className="mt-3 text-[11px] text-center text-ink/50">
              🔒 100% Secure Checkout • Cash on Delivery &amp; JazzCash Supported
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
