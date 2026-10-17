"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  SITE_NAME,
  JAZZCASH_NUMBER,
  JAZZCASH_DISPLAY,
  JAZZCASH_TITLE,
  INSTAGRAM_URL,
} from "@/lib/config";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
  options?: Array<{ label: string; query: string }>;
  links?: Array<{ label: string; url: string; external?: boolean }>;
}

interface FaqItem {
  id: string;
  category: string;
  question: string;
  keywords: string[];
  answer: string;
  options?: Array<{ label: string; query: string }>;
  links?: Array<{ label: string; url: string; external?: boolean }>;
}

const FAQ_DATABASE: FaqItem[] = [
  {
    id: "how_to_order",
    category: "Ordering",
    question: "How do I place an order?",
    keywords: [
      "how to order",
      "order",
      "place order",
      "buy",
      "purchase",
      "checkout",
      "process",
      "order kaise",
      "order krna",
      "order kaisay",
      "khareedna",
      "mangwana",
      "tariqa",
    ],
    answer:
      "Placing an order at LAYORA is seamless!\n\n1. Browse our collections and click on your favorite item.\n2. Select your desired size and color, then tap '⚡ BUY NOW' (or 'Add to Cart').\n3. Enter your delivery details and choose Online Payment by JazzCash (" +
      JAZZCASH_NUMBER +
      ") or Cash on Delivery (COD).\n4. Your order is instantly confirmed and logged into our automated billing & inventory sheet!",
    options: [
      { label: "💳 Payment Methods", query: "What payment methods do you accept?" },
      { label: "🚚 Delivery Times", query: "How long does delivery take?" },
    ],
    links: [
      { label: "⚡ Go to Checkout", url: "/checkout" },
      { label: "View Collections", url: "/dresses" },
    ],
  },
  {
    id: "delivery_time",
    category: "Shipping",
    question: "How long does delivery take & shipping costs?",
    keywords: [
      "delivery",
      "shipping",
      "deliver",
      "dispatch",
      "courier",
      "how long",
      "timeline",
      "charges",
      "cost",
      "free shipping",
      "track",
      "kitne din",
      "kab tak",
      "delivery charges",
      "shipping charges",
      "kitna time",
      "pohanche ga",
    ],
    answer:
      "Here are our delivery timelines:\n\n• **Standard Domestic (Pakistan)**: 1-week delivery time to your doorstep.\n• **Shipping Rates**: FREE standard shipping on orders above Rs. 5,000 across Pakistan (Rs. 250 standard flat rate for smaller orders).\n• **International Orders**: Delivered in 7–10 business days worldwide via DHL/FedEx.\n• **Tracking**: You'll receive courier tracking details via SMS once dispatched.",
    options: [
      { label: "🌍 International Shipping", query: "Do you ship internationally?" },
      { label: "📦 Track My Order", query: "How do I track my order?" },
    ],
  },
  {
    id: "payment_methods",
    category: "Payment",
    question: "What payment methods are accepted?",
    keywords: [
      "payment",
      "pay",
      "bank",
      "ibft",
      "transfer",
      "cash",
      "cod",
      "credit card",
      "card",
      "jazzcash",
      "easypaisa",
      "paise",
      "cash on delivery",
      "advance",
      "payment kaise",
    ],
    answer:
      "We offer two official and secure payment methods for all orders:\n\n1. 📱 **Online Payment by JazzCash**: Send payment directly to our official JazzCash account **" +
      JAZZCASH_NUMBER +
      "** (Account Title: **" +
      JAZZCASH_TITLE +
      "** / Raast: **" +
      JAZZCASH_DISPLAY +
      "**). Enter your 10-12 digit Transaction ID (TID) at checkout to confirm.\n\n2. 💵 **Cash on Delivery (COD)**: Available nationwide across Pakistan. Pay cash to the courier rider upon delivery at your doorstep.\n\n*(Note: Debit/Credit cards are disabled; please use JazzCash or Cash on Delivery).*",
    options: [
      { label: "⚡ Go to Checkout", query: "How do I place an order?" },
      { label: "🚚 Delivery Times", query: "How long does delivery take & shipping costs?" },
    ],
    links: [
      { label: "⚡ Proceed to Checkout", url: "/checkout" },
      { label: "View Collections", url: "/dresses" },
    ],
  },
  {
    id: "size_guide",
    category: "Sizing",
    question: "How do I choose the right size?",
    keywords: [
      "size",
      "sizing",
      "measurement",
      "fit",
      "small",
      "medium",
      "large",
      "xl",
      "chart",
      "custom",
      "tailor",
      "stitching",
      "length",
      "naap",
      "size chart",
      "size guide",
      "khula",
      "tang",
    ],
    answer:
      "Every dress page features our exact **Size Chart** with Chest, Waist, Hip, and Shirt Length measurements in inches.\n\n✨ **Complimentary Custom Sizing**: If standard Small, Medium, Large, or XL doesn't fit your exact requirements, our master tailors can customize lengths and silhouettes! Simply add your desired measurements in the 'Special Notes' field at checkout.",
    options: [
      { label: "👗 Explore Dresses", query: "What collections do you offer?" },
      { label: "🔄 Return/Exchange if size doesn't fit", query: "What is your return and exchange policy?" },
    ],
    links: [{ label: "Browse Ethnic Dresses", url: "/dresses" }],
  },
  {
    id: "returns_exchanges",
    category: "Returns",
    question: "What is your return and exchange policy?",
    keywords: [
      "return",
      "exchange",
      "refund",
      "replace",
      "damaged",
      "defect",
      "policy",
      "guarantee",
      "wapas",
      "tabdeel",
      "change karwana",
    ],
    answer:
      "We want you to love your LAYORA pieces!\n\n• **Exchange Window**: We offer a hassle-free exchange within **7 days of delivery** for sizing adjustments or any manufacturing defects.\n• **Condition**: Outfits and accessories must be unworn, in original luxury packaging with tags intact.\n• **How to Initiate**: Reach out to our customer care with your Order ID and photo of the item, and we'll arrange the exchange swiftly.",
    options: [
      { label: "📞 Contact Support", query: "Speak with human support" },
      { label: "🚚 Shipping Times", query: "How long does delivery take?" },
    ],
  },
  {
    id: "collections_products",
    category: "Collections",
    question: "What collections does LAYORA offer?",
    keywords: [
      "collections",
      "products",
      "items",
      "catalog",
      "dresses",
      "jewelry",
      "cases",
      "soaps",
      "skincare",
      "what do you sell",
      "kya bechte",
      "suit",
      "kapray",
      "mobile cover",
    ],
    answer:
      "LAYORA is a luxury boutique catering to the modern woman:\n\n• **Ethnic Pret & Dresses**: Handcrafted festive ensembles, organza dupattas, and artisanal embroidery.\n• **Designer Phone Cases**: Protective, glossy, and aesthetic covers for iPhone & Samsung.\n• **Fine Jewelry & Accessories**: Anti-tarnish gold-plated bracelets, rings, and earrings.\n• **Skincare & Botanical Soaps**: Moisturizing jelly soaps and botanical self-care essentials.",
    options: [
      { label: "👗 Ethnic Dresses", query: "Tell me about ethnic dresses" },
      { label: "📱 Phone Cases", query: "Tell me about phone cases" },
    ],
    links: [
      { label: "Shop Dresses", url: "/dresses" },
      { label: "Shop Accessories", url: "/accessories" },
      { label: "Shop Skincare", url: "/skincare" },
    ],
  },
  {
    id: "care_instructions",
    category: "Care",
    question: "How should I care for my outfits and jewelry?",
    keywords: [
      "care",
      "wash",
      "washing",
      "iron",
      "dry clean",
      "clean",
      "fabric",
      "tarnish",
      "maintenance",
      "dhona",
      "safai",
      "istri",
    ],
    answer:
      "To preserve the heirloom quality of your LAYORA pieces:\n\n• **Embroidered Pret**: Dry clean only. Never wring or bleach. Use low steam iron on reverse.\n• **Anti-Tarnish Jewelry**: Avoid contact with perfumes, chlorine, and lotions. Store in the velvet pouch provided.\n• **Phone Cases**: Wipe gently with a soft damp microfiber cloth.",
    options: [
      { label: "👗 View Outfits", query: "What collections do you offer?" },
      { label: "💬 Ask a Care Question", query: "Speak with human support" },
    ],
  },
  {
    id: "international_orders",
    category: "Shipping",
    question: "Do you ship internationally?",
    keywords: [
      "international",
      "worldwide",
      "dubai",
      "uae",
      "usa",
      "uk",
      "canada",
      "europe",
      "overseas",
      "global",
      "bahar",
      "foreign shipping",
    ],
    answer:
      "Yes! We proudly ship worldwide including the USA, UK, UAE, Canada, Australia, and Europe.\n\n• **Delivery Time**: 7 to 10 business days via tracked international couriers (DHL / FedEx).\n• **Direct Support**: Contact us via Instagram @layora.store for international shipping quotes.",
    options: [
      { label: "💳 Payment Methods", query: "What payment methods are accepted?" },
      { label: "🛍️ How to Order", query: "How do I place an order?" },
    ],
  },
  {
    id: "track_order",
    category: "Shipping",
    question: "How do I track my order?",
    keywords: [
      "track",
      "tracking",
      "status",
      "where is my order",
      "parcel",
      "courier",
      "consignment",
      "kahan hai",
      "order kahan pohancha",
      "tracking number",
    ],
    answer:
      "Once your package leaves our atelier, you will receive an automatic SMS message with your tracking link.\n\nYou can also check your order status anytime using your Order ID.",
    options: [
      { label: "💳 Payment Methods", query: "What payment methods are accepted?" },
      { label: "🚚 Delivery Times", query: "How long does delivery take?" },
    ],
  },
  {
    id: "contact_human",
    category: "Support",
    question: "Speak with human support or stylist",
    keywords: [
      "human",
      "agent",
      "stylist",
      "call",
      "speak",
      "talk",
      "representative",
      "whatsapp",
      "phone",
      "contact",
      "person",
      "baat karni",
      "rabta",
      "kisi se baat",
      "admin",
      "number",
    ],
    answer:
      "Our customer assistance team is ready to help you!\n\n• 📱 **JazzCash Payment Account**: " +
      JAZZCASH_DISPLAY +
      " (Account Title: " +
      JAZZCASH_TITLE +
      ")\n• 💵 **Cash on Delivery (COD)**: Available nationwide across Pakistan\n• 📸 **Instagram**: @layora.store\n• 🛍️ **Instant Online Checkout**: Place your order directly through our website.",
    links: [
      { label: "⚡ Proceed to Checkout", url: "/checkout" },
      { label: "Instagram @layora.store", url: INSTAGRAM_URL, external: true },
    ],
  },
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTeaser, setShowTeaser] = useState(false);
  const [unreadBadge, setUnreadBadge] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial-welcome",
      sender: "bot",
      text: "Hello & welcome to LAYORA ✨\n\nI'm your personal shopping concierge. How may I assist you today? Feel free to ask any question or tap a popular topic below:",
      timestamp: "Just now",
      options: [
        { label: "🚚 Delivery & Shipping", query: "How long does delivery take & shipping costs?" },
        { label: "💳 Payment Methods (JazzCash & COD)", query: "What payment methods are accepted?" },
        { label: "👗 Size Guide & Custom Fit", query: "How do I choose the right size?" },
        { label: "🔄 Return & Exchange", query: "What is your return and exchange policy?" },
        { label: "🛍️ Collections & Products", query: "What collections does LAYORA offer?" },
        { label: "📞 Customer Support & Payments", query: "Speak with human support or stylist" },
      ],
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll chat to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setUnreadBadge(false);
      setShowTeaser(false);
    }
  }, [isOpen, messages, isTyping]);

  // Show friendly teaser bubble 2 seconds after page load if closed
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowTeaser(true);
      }
    }, 2200);
    return () => clearTimeout(timer);
  }, [isOpen]);

  const findAnswer = (queryText: string): { answer: string; options?: Message["options"]; links?: Message["links"] } => {
    const normalized = queryText.toLowerCase().trim();

    // 1. Direct match with question or answer title
    const directMatch = FAQ_DATABASE.find(
      (item) => item.question.toLowerCase() === normalized || item.id === normalized
    );
    if (directMatch) {
      return {
        answer: directMatch.answer,
        options: directMatch.options,
        links: directMatch.links,
      };
    }

    // 2. Keyword score matching
    let bestMatch: FaqItem | null = null;
    let highestScore = 0;

    for (const item of FAQ_DATABASE) {
      let score = 0;
      for (const kw of item.keywords) {
        if (normalized.includes(kw.toLowerCase())) {
          score += kw.length; // weight longer specific phrases more
        }
      }
      if (score > highestScore) {
        highestScore = score;
        bestMatch = item;
      }
    }

    if (bestMatch && highestScore > 0) {
      return {
        answer: bestMatch.answer,
        options: bestMatch.options,
        links: bestMatch.links,
      };
    }

    // 3. Conversational greetings
    if (/^(hi|hello|hey|salam|assalam|aoa|kese ho|kaise ho|kya hal|good\s(morning|afternoon|evening))/i.test(normalized)) {
      return {
        answer:
          "Welcome to LAYORA! I'm here to answer any questions about our dresses, fine jewelry, phone cases, sizing, shipping, or returns. How can I help you today?",
        options: [
          { label: "🚚 Delivery Times", query: "How long does delivery take & shipping costs?" },
          { label: "👗 Size Guide", query: "How do I choose the right size?" },
          { label: "💳 Payment Methods", query: "What payment methods are accepted?" },
        ],
      };
    }

    // 4. Fallback with helpful options
    return {
      answer:
        "Thank you for asking! For quick assistance with your orders and payments, you can checkout directly with JazzCash (" +
        JAZZCASH_NUMBER +
        ") or Cash on Delivery (COD), or reach us on Instagram @layora.store.",
      options: [
        { label: "🚚 Delivery & Shipping", query: "How long does delivery take & shipping costs?" },
        { label: "💳 Payment Methods", query: "What payment methods are accepted?" },
        { label: "👗 Size Guide", query: "How do I choose the right size?" },
      ],
      links: [
        { label: "⚡ Go to Checkout", url: "/checkout" },
        { label: "Visit Instagram @layora.store", url: INSTAGRAM_URL, external: true },
      ],
    };
  };

  const handleSendQuery = (text: string) => {
    if (!text.trim() || isTyping) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Realistic typing indicator delay (350ms)
    setTimeout(() => {
      const result = findAnswer(text);
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: result.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        options: result.options,
        links: result.links,
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 400);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: "initial-welcome-reset",
        sender: "bot",
        text: "Conversation refreshed. How may I assist you with your LAYORA shopping today?",
        timestamp: "Just now",
        options: [
          { label: "🚚 Delivery & Shipping", query: "How long does delivery take & shipping costs?" },
          { label: "💳 Payment Methods", query: "What payment methods are accepted?" },
          { label: "👗 Size Guide", query: "How do I choose the right size?" },
          { label: "🔄 Returns & Exchanges", query: "What is your return and exchange policy?" },
          { label: "💬 Human Stylist", query: "Speak with human support or stylist" },
        ],
      },
    ]);
  };

  return (
    <div className="fixed bottom-5 left-5 sm:bottom-7 sm:left-7 z-50 flex flex-col items-start font-body">
      {/* 1. Teaser Speech Bubble (appears once on load) */}
      {!isOpen && showTeaser && (
        <div className="mb-2.5 flex items-center gap-2 rounded-full border border-line bg-cream/95 backdrop-blur-md py-1.5 px-3.5 shadow-md animate-in fade-in slide-in-from-bottom-2 text-xs text-ink/90">
          <span className="flex h-2 w-2 rounded-full bg-rose-dark animate-pulse" />
          <span className="font-medium">Have questions? Ask Layora Concierge ✨</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTeaser(false);
            }}
            className="ml-1 text-ink/40 hover:text-ink text-sm leading-none"
            aria-label="Dismiss message"
          >
            ×
          </button>
        </div>
      )}

      {/* 2. Chatbot Window Modal */}
      {isOpen && (
        <div className="mb-3 flex flex-col w-[350px] sm:w-[390px] max-w-[calc(100vw-2rem)] h-[520px] max-h-[calc(100vh-7.5rem)] rounded-2xl border border-line bg-cream/95 backdrop-blur-md shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="relative flex items-center justify-between border-b border-line bg-gradient-to-r from-sand/90 via-cream to-sand/80 px-4 py-3.5 select-none">
            <div className="flex items-center gap-3">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-espresso text-cream shadow-inner border border-rose-dark/30">
                <span className="text-base">✨</span>
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 border-2 border-cream" />
              </div>
              <div>
                <h3 className="font-display text-base font-semibold italic text-ink tracking-wide flex items-center gap-1.5">
                  {SITE_NAME} Concierge
                </h3>
                <p className="text-[11px] text-ink/65 font-medium flex items-center gap-1">
                  Online • Instant Q&amp;A
                </p>
              </div>
            </div>

            {/* Header Action Buttons */}
            <div className="flex items-center gap-1">
              {/* Reset Chat */}
              <button
                onClick={handleResetChat}
                className="p-1.5 text-ink/50 hover:text-ink hover:bg-sand/60 rounded-full transition"
                title="Restart conversation"
                aria-label="Restart conversation"
              >
                <svg className="h-4 w-4 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>

              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-ink/50 hover:text-ink hover:bg-sand/60 rounded-full transition"
                title="Close chat"
                aria-label="Close chat"
              >
                <svg className="h-4 w-4 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Quick Category Chips Strip */}
          <div className="border-b border-line/60 bg-sand/30 px-3 py-2 overflow-x-auto no-scrollbar flex items-center gap-1.5">
            <span className="text-[10px] uppercase font-bold tracking-wider text-rose-dark shrink-0 mr-1">
              Quick:
            </span>
            <button
              onClick={() => handleSendQuery("How long does delivery take & shipping costs?")}
              className="shrink-0 rounded-full bg-cream hover:bg-sand border border-line px-2.5 py-1 text-[11px] font-medium text-ink/80 transition"
            >
              🚚 Delivery
            </button>
            <button
              onClick={() => handleSendQuery("What payment methods are accepted?")}
              className="shrink-0 rounded-full bg-cream hover:bg-sand border border-line px-2.5 py-1 text-[11px] font-medium text-ink/80 transition"
            >
              💳 Payments
            </button>
            <button
              onClick={() => handleSendQuery("How do I choose the right size?")}
              className="shrink-0 rounded-full bg-cream hover:bg-sand border border-line px-2.5 py-1 text-[11px] font-medium text-ink/80 transition"
            >
              👗 Size Guide
            </button>
            <button
              onClick={() => handleSendQuery("What is your return and exchange policy?")}
              className="shrink-0 rounded-full bg-cream hover:bg-sand border border-line px-2.5 py-1 text-[11px] font-medium text-ink/80 transition"
            >
              🔄 Returns
            </button>
            <button
              onClick={() => handleSendQuery("Speak with human support or stylist")}
              className="shrink-0 rounded-full bg-cream hover:bg-sand border border-line px-2.5 py-1 text-[11px] font-medium text-ink/80 transition"
            >
              💬 WhatsApp
            </button>
          </div>

          {/* Message List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs leading-relaxed">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
              >
                {/* Message Bubble */}
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 shadow-2xs whitespace-pre-line ${
                    msg.sender === "user"
                      ? "bg-espresso text-cream rounded-br-xs"
                      : "bg-white/80 border border-line text-ink rounded-bl-xs"
                  }`}
                >
                  {msg.text}

                  {/* Optional Action / Deep Links */}
                  {msg.links && msg.links.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-line/60 flex flex-col gap-1.5">
                      {msg.links.map((link, idx) =>
                        link.external ? (
                          <a
                            key={idx}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-between rounded-md bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 px-3 py-1.5 text-[11px] font-bold text-emerald-900 transition"
                          >
                            <span>💬 {link.label}</span>
                            <span>→</span>
                          </a>
                        ) : (
                          <Link
                            key={idx}
                            href={link.url}
                            onClick={() => setIsOpen(false)}
                            className="inline-flex items-center justify-between rounded-md bg-sand/60 hover:bg-sand border border-line px-3 py-1.5 text-[11px] font-bold text-ink transition"
                          >
                            <span>✨ {link.label}</span>
                            <span>→</span>
                          </Link>
                        )
                      )}
                    </div>
                  )}
                </div>

                {/* Interactive Option Chips below Bot Message */}
                {msg.sender === "bot" && msg.options && msg.options.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5 max-w-[95%]">
                    {msg.options.map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendQuery(opt.query)}
                        className="rounded-full bg-sand/70 hover:bg-sand hover:border-rose-dark/40 border border-line px-2.5 py-1 text-[11px] font-medium text-ink transition-all active:scale-95"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}

                {/* Timestamp */}
                <span className="text-[10px] text-ink/40 mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-1.5 bg-white/80 border border-line rounded-2xl rounded-bl-xs px-3.5 py-2.5 w-fit">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-dark animate-bounce [animation-delay:-0.3s]" />
                <span className="h-1.5 w-1.5 rounded-full bg-rose-dark animate-bounce [animation-delay:-0.15s]" />
                <span className="h-1.5 w-1.5 rounded-full bg-rose-dark animate-bounce" />
                <span className="text-[10px] text-ink/50 ml-1">Layora is typing...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendQuery(inputValue);
            }}
            className="border-t border-line bg-cream p-2.5 flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask a question (e.g., sizes, delivery)..."
              className="flex-1 bg-white border border-line rounded-full px-4 py-2 text-xs text-ink placeholder:text-ink/45 focus:outline-none focus:border-rose-dark transition"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-espresso text-cream hover:bg-rose-dark disabled:opacity-40 disabled:cursor-not-allowed transition-all shrink-0 shadow-2xs"
              aria-label="Send message"
            >
              <svg className="h-4 w-4 stroke-current fill-none -rotate-45 ml-0.5" viewBox="0 0 24 24" strokeWidth="2.2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>
        </div>
      )}

      {/* 3. Floating Trigger Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="group relative flex items-center gap-2.5 h-13 sm:h-14 rounded-full bg-gradient-to-r from-espresso via-[#30231D] to-espresso text-cream px-4 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 border border-rose-dark/40"
        aria-label="Open Layora Concierge Chatbot"
        title="Ask Layora Concierge"
      >
        {/* Animated Ripple Pulse Ring */}
        <span className="absolute -inset-1 rounded-full bg-rose-dark/25 animate-ping pointer-events-none opacity-60" />

        {/* Icon */}
        <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-rose-dark/30 text-white">
          {isOpen ? (
            <svg className="h-5 w-5 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          ) : (
            <span className="text-base">✨</span>
          )}

          {/* Unread dot */}
          {!isOpen && unreadBadge && (
            <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-rose-light border border-espresso animate-pulse" />
          )}
        </div>

        {/* Button Label */}
        <div className="flex flex-col items-start pr-1 text-left">
          <span className="font-display text-xs font-bold italic tracking-wide text-cream leading-tight">
            {isOpen ? "Close Concierge" : "Ask LAYORA"}
          </span>
          <span className="text-[10px] tracking-wider uppercase text-rose-light font-medium leading-tight">
            Help &amp; Q&amp;A
          </span>
        </div>
      </button>
    </div>
  );
}
