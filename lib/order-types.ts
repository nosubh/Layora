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
