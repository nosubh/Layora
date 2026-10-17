import type { Metadata } from "next";
import AdminDashboard from "@/components/AdminDashboard";
import { SITE_NAME } from "@/lib/config";

export const metadata: Metadata = {
  title: `Store Management & Analytics — ${SITE_NAME}`,
  description: "Private management portal for order tracking, verified payments, and Google Sheets sync.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return <AdminDashboard />;
}
