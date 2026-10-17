import fs from "fs";
import path from "path";
import { GOOGLE_SHEET_WEBHOOK_URL } from "./config";

export type OrderStatus = "contacted" | "confirmed" | "paid" | "dispatched" | "cancelled";
export type PaymentStatus = "pending" | "paid" | "verified" | "cod";

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  size?: string | null;
  color?: string | null;
}

export interface OrderRecord {
  id: string; // e.g. "LAY-8492"
  createdAt: string; // ISO date
  customerName: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  province?: string;
  postalCode?: string;
  country: string;
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  totalAmount: number;
  currency: string;
  paymentMethod: "jazzcash" | "bank_transfer" | "cod";
  paymentStatus: PaymentStatus;
  transactionId?: string; // Bank Transfer TID or reference
  paymentScreenshot?: string; // Base64 or URL of payment receipt screenshot
  notes?: string;
  status: OrderStatus;
  source: "website_checkout" | "whatsapp_contact" | "chatbot_inquiry";
}

export interface ContactLead {
  id: string;
  createdAt: string;
  customerName: string;
  phone: string;
  channel: "chatbot" | "whatsapp_pk" | "whatsapp_intl" | "checkout_initiated";
  inquiry?: string;
  convertedToOrder?: boolean;
}

export interface StoreMetrics {
  totalContacted: number;
  totalConfirmed: number;
  totalPaid: number;
  totalRevenue: number;
  conversionRate: number; // percentage
  paidRate: number; // percentage
}

const DATA_DIR = path.join(process.cwd(), "data");
const ORDERS_FILE = path.join(DATA_DIR, "orders.json");
const LEADS_FILE = path.join(DATA_DIR, "contact_leads.json");
const CONFIG_FILE = path.join(DATA_DIR, "sheet_config.json");

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

// Initial Seed Data so the dashboard has realistic demo data immediately
const SEED_ORDERS: OrderRecord[] = [
  {
    id: "LAY-8401",
    createdAt: new Date(Date.now() - 36 * 3600 * 1000).toISOString(),
    customerName: "Ayesha Malik",
    phone: "+92 300 1234567",
    email: "ayesha.malik@example.com",
    address: "House 42, Street 8, DHA Phase 5",
    city: "Lahore",
    country: "Pakistan",
    items: [
      {
        productId: "brown-2piece-suit",
        name: "Brown Printed 2-Piece Suit",
        price: 4000,
        quantity: 1,
        size: "M",
        color: "Brown",
      },
    ],
    subtotal: 4000,
    shippingFee: 0,
    totalAmount: 4000,
    currency: "PKR",
    paymentMethod: "bank_transfer",
    paymentStatus: "verified",
    transactionId: "MEZN-948271049",
    status: "paid",
    source: "website_checkout",
    notes: "Please pack with extra care for gift.",
  },
  {
    id: "LAY-8402",
    createdAt: new Date(Date.now() - 20 * 3600 * 1000).toISOString(),
    customerName: "Zainab Fatima",
    phone: "+92 321 9876543",
    email: "zainab.f@example.com",
    address: "Apartment 4B, Clifton Block 4",
    city: "Karachi",
    country: "Pakistan",
    items: [
      {
        productId: "white-3piece-suit",
        name: "White 3-Piece Festive Ensemble",
        price: 5000,
        quantity: 1,
        size: "L",
        color: "Ivory White",
      },
      {
        productId: "bts-dynamite-pop-case",
        name: "BTS Dynamite Pop Art Case",
        price: 1900,
        quantity: 1,
      },
    ],
    subtotal: 6900,
    shippingFee: 0,
    totalAmount: 6900,
    currency: "PKR",
    paymentMethod: "cod",
    paymentStatus: "pending",
    status: "confirmed",
    source: "website_checkout",
  },
  {
    id: "LAY-8403",
    createdAt: new Date(Date.now() - 8 * 3600 * 1000).toISOString(),
    customerName: "Hira Tariq",
    phone: "+92 333 4567890",
    email: "hira.t@example.com",
    address: "Street 14, F-7/2",
    city: "Islamabad",
    country: "Pakistan",
    items: [
      {
        productId: "rose-blossom-jelly-soap",
        name: "Rose Blossom Glow Jelly Soap",
        price: 400,
        quantity: 3,
      },
      {
        productId: "signature-layora-jelly-soap-set",
        name: "Signature Botanical Jelly Soaps (Set of 6)",
        price: 1500,
        quantity: 1,
      },
    ],
    subtotal: 2700,
    shippingFee: 250,
    totalAmount: 2950,
    currency: "PKR",
    paymentMethod: "bank_transfer",
    paymentStatus: "paid",
    transactionId: "HBL-TRX-839211",
    status: "paid",
    source: "website_checkout",
  },
  {
    id: "LAY-8404",
    createdAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    customerName: "Sara Ahmed",
    phone: "+92 345 5551234",
    email: "sara.ahmed@example.com",
    address: "Model Town, Block C",
    city: "Lahore",
    country: "Pakistan",
    items: [
      {
        productId: "purple-2piece-suit",
        name: "Purple 2-Piece Printed Suit",
        price: 4000,
        quantity: 1,
        size: "S",
      },
    ],
    subtotal: 4000,
    shippingFee: 0,
    totalAmount: 4000,
    currency: "PKR",
    paymentMethod: "bank_transfer",
    paymentStatus: "pending",
    transactionId: "Faysal-Pending-092",
    status: "confirmed",
    source: "website_checkout",
  },
];

const SEED_LEADS: ContactLead[] = [
  {
    id: "LEAD-101",
    createdAt: new Date(Date.now() - 48 * 3600 * 1000).toISOString(),
    customerName: "Maryam Khan",
    phone: "+92 301 2233445",
    channel: "whatsapp_pk",
    inquiry: "Inquired about dress fabric & size chart",
    convertedToOrder: false,
  },
  {
    id: "LEAD-102",
    createdAt: new Date(Date.now() - 30 * 3600 * 1000).toISOString(),
    customerName: "Noor ul Ain",
    channel: "chatbot",
    phone: "+92 312 8899001",
    inquiry: "Asked about delivery time to Faisalabad",
    convertedToOrder: false,
  },
  {
    id: "LEAD-103",
    createdAt: new Date(Date.now() - 15 * 3600 * 1000).toISOString(),
    customerName: "Reema",
    channel: "whatsapp_intl",
    phone: "+971 50 1234567",
    inquiry: "Inquired about shipping charges to Dubai",
    convertedToOrder: false,
  },
  {
    id: "LEAD-104",
    createdAt: new Date(Date.now() - 5 * 3600 * 1000).toISOString(),
    customerName: "Fatima Zahra",
    channel: "chatbot",
    phone: "+92 334 7766554",
    inquiry: "Inquired about custom stitching",
    convertedToOrder: false,
  },
];

export function getOrders(): OrderRecord[] {
  ensureDataDir();
  if (!fs.existsSync(ORDERS_FILE)) {
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(SEED_ORDERS, null, 2), "utf8");
    return SEED_ORDERS;
  }
  try {
    const raw = fs.readFileSync(ORDERS_FILE, "utf8");
    return JSON.parse(raw);
  } catch {
    return SEED_ORDERS;
  }
}

export function saveOrders(orders: OrderRecord[]) {
  ensureDataDir();
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), "utf8");
}

export function getLeads(): ContactLead[] {
  ensureDataDir();
  if (!fs.existsSync(LEADS_FILE)) {
    fs.writeFileSync(LEADS_FILE, JSON.stringify(SEED_LEADS, null, 2), "utf8");
    return SEED_LEADS;
  }
  try {
    const raw = fs.readFileSync(LEADS_FILE, "utf8");
    return JSON.parse(raw);
  } catch {
    return SEED_LEADS;
  }
}

export function saveLeads(leads: ContactLead[]) {
  ensureDataDir();
  fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), "utf8");
}

export function recordLead(leadData: Omit<ContactLead, "id" | "createdAt">): ContactLead {
  const leads = getLeads();
  const newLead: ContactLead = {
    ...leadData,
    id: `LEAD-${Date.now().toString().slice(-5)}`,
    createdAt: new Date().toISOString(),
  };
  leads.unshift(newLead);
  saveLeads(leads);
  return newLead;
}

export function createOrder(data: Omit<OrderRecord, "id" | "createdAt">): OrderRecord {
  const orders = getOrders();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const newOrder: OrderRecord = {
    ...data,
    id: `LAY-${randomSuffix}`,
    createdAt: new Date().toISOString(),
  };
  orders.unshift(newOrder);
  saveOrders(orders);
  return newOrder;
}

export function updateOrder(
  id: string,
  updates: Partial<Pick<OrderRecord, "status" | "paymentStatus" | "transactionId" | "notes">>
): OrderRecord | null {
  const orders = getOrders();
  const index = orders.findIndex((o) => o.id === id);
  if (index === -1) return null;

  orders[index] = {
    ...orders[index],
    ...updates,
  };
  saveOrders(orders);
  return orders[index];
}

export function getSheetWebhookUrl(): string {
  ensureDataDir();
  if (fs.existsSync(CONFIG_FILE)) {
    try {
      const parsed = JSON.parse(fs.readFileSync(CONFIG_FILE, "utf8"));
      if (parsed.webhookUrl) return parsed.webhookUrl;
    } catch {}
  }
  return GOOGLE_SHEET_WEBHOOK_URL || "";
}

export function saveSheetWebhookUrl(url: string) {
  ensureDataDir();
  fs.writeFileSync(CONFIG_FILE, JSON.stringify({ webhookUrl: url }, null, 2), "utf8");
}

export function calculateMetrics(): StoreMetrics {
  const orders = getOrders();
  const leads = getLeads();

  // Total Contacted = Leads + Orders (since every order also started as a contact)
  const totalContacted = leads.length + orders.length;

  // Total Confirmed = All placed orders
  const totalConfirmed = orders.filter((o) => o.status !== "cancelled").length;

  // Total Paid = Orders with status "paid" or paymentStatus "paid" / "verified"
  const paidOrders = orders.filter(
    (o) => o.status === "paid" || o.paymentStatus === "paid" || o.paymentStatus === "verified"
  );
  const totalPaid = paidOrders.length;

  // Revenue = sum of paid orders
  const totalRevenue = paidOrders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  const conversionRate = totalContacted > 0 ? Math.round((totalConfirmed / totalContacted) * 100) : 0;
  const paidRate = totalConfirmed > 0 ? Math.round((totalPaid / totalConfirmed) * 100) : 0;

  return {
    totalContacted,
    totalConfirmed,
    totalPaid,
    totalRevenue,
    conversionRate,
    paidRate,
  };
}

// Convert all orders to CSV format for Google Sheets / Excel
export function generateOrdersCsv(): string {
  const orders = getOrders();
  const headers = [
    "Order ID",
    "Date & Time",
    "Customer Name",
    "Phone / WhatsApp",
    "City",
    "Full Address",
    "Items Summary",
    "Total Amount (PKR)",
    "Payment Method",
    "Payment Status",
    "Transaction ID",
    "Order Status",
    "Customer Notes",
  ];

  const rows = orders.map((o) => {
    const itemsSummary = o.items
      .map((i) => `${i.name} (Qty: ${i.quantity}${i.size ? `, Size: ${i.size}` : ""})`)
      .join(" | ");

    return [
      `"${o.id}"`,
      `"${new Date(o.createdAt).toLocaleString()}"`,
      `"${o.customerName.replace(/"/g, '""')}"`,
      `"${o.phone}"`,
      `"${o.city}"`,
      `"${o.address.replace(/"/g, '""')}"`,
      `"${itemsSummary.replace(/"/g, '""')}"`,
      o.totalAmount,
      `"${o.paymentMethod}"`,
      `"${o.paymentStatus}"`,
      `"${o.transactionId || ""}"`,
      `"${o.status}"`,
      `"${(o.notes || "").replace(/"/g, '""')}"`,
    ].join(",");
  });

  return [headers.join(","), ...rows].join("\n");
}
