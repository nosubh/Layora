"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { formatPrice } from "@/lib/format";
import { OrderRecord, StoreMetrics } from "@/lib/order-types";
import { GOOGLE_APPS_SCRIPT_TEMPLATE } from "@/lib/google-script-template";

export default function AdminDashboard() {
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [metrics, setMetrics] = useState<StoreMetrics>({
    totalContacted: 0,
    totalConfirmed: 0,
    totalPaid: 0,
    totalRevenue: 0,
    conversionRate: 0,
    paidRate: 0,
  });
  const [filter, setFilter] = useState<"all" | "confirmed" | "paid" | "dispatched">("all");
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Google Sheet Webhook state
  const [webhookUrl, setWebhookUrl] = useState("");
  const [isConfigured, setIsConfigured] = useState(false);
  const [syncStatus, setSyncStatus] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [showScriptModal, setShowScriptModal] = useState(false);
  const [copiedScript, setCopiedScript] = useState(false);

  // Admin Protection Gatekeeper state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminPin, setAdminPin] = useState("");
  const [authError, setAuthError] = useState("");
  const [viewingScreenshot, setViewingScreenshot] = useState<{ id: string; name: string; url: string; tid?: string } | null>(null);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const [ordersRes, sheetRes] = await Promise.all([
        fetch("/api/orders"),
        fetch("/api/sync-sheet"),
      ]);

      const ordersData = await ordersRes.json();
      if (ordersData.success) {
        setOrders(ordersData.orders || []);
        if (ordersData.metrics) {
          setMetrics(ordersData.metrics);
        }
      }

      const sheetData = await sheetRes.json();
      if (sheetData.success) {
        setWebhookUrl(sheetData.webhookUrl || "");
        setIsConfigured(sheetData.isConfigured || false);
      }
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const isAuthed =
      typeof window !== "undefined" &&
      sessionStorage.getItem("layora_admin_authed") === "true";
    if (isAuthed) {
      setIsAuthenticated(true);
      fetchDashboardData();
    } else {
      setIsLoading(false);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    const validPins = ["layora2026", "admin786", "layora123", "layora"];
    if (validPins.includes(adminPin.trim().toLowerCase())) {
      sessionStorage.setItem("layora_admin_authed", "true");
      setIsAuthenticated(true);
      fetchDashboardData();
    } else {
      setAuthError("Invalid Administrator PIN. Access denied.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("layora_admin_authed");
    setIsAuthenticated(false);
    setAdminPin("");
  };

  const handleUpdateStatus = async (
    orderId: string,
    status: OrderRecord["status"],
    paymentStatus?: OrderRecord["paymentStatus"]
  ) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status,
          ...(paymentStatus ? { paymentStatus } : {}),
        }),
      });
      const data = await res.json();
      if (data.success) {
        setOrders((prev) => prev.map((o) => (o.id === orderId ? data.order : o)));
        if (data.metrics) setMetrics(data.metrics);
      }
    } catch (err) {
      console.error("Status update error:", err);
    }
  };

  const handleSaveAndSyncSheet = async () => {
    setIsSyncing(true);
    setSyncStatus(null);
    try {
      const res = await fetch("/api/sync-sheet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          webhookUrl,
          action: "batch_sync",
        }),
      });
      const data = await res.json();
      if (data.success) {
        setIsConfigured(true);
        setSyncStatus(`✓ Successfully synced ${data.syncedOrdersCount} orders to Google Sheets!`);
      } else {
        setSyncStatus(`⚠️ ${data.message}`);
      }
    } catch (err: any) {
      setSyncStatus(`⚠️ Sync failed: ${err.message}`);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleCopyScript = () => {
    navigator.clipboard.writeText(GOOGLE_APPS_SCRIPT_TEMPLATE);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2500);
  };

  const filteredOrders = orders.filter((o) => {
    const matchesFilter =
      filter === "all" ? true : filter === "paid" ? o.status === "paid" || o.paymentStatus === "paid" : o.status === filter;

    const matchesSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.phone.toLowerCase().includes(search.toLowerCase()) ||
      o.city.toLowerCase().includes(search.toLowerCase()) ||
      Boolean(o.transactionId && o.transactionId.toLowerCase().includes(search.toLowerCase()));

    return matchesFilter && matchesSearch;
  });

  // If not authenticated, display luxury secure lock screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center py-16 px-4 bg-cream/40 font-body">
        <div className="w-full max-w-md rounded-2xl border border-line bg-cream/95 backdrop-blur-md p-8 sm:p-10 shadow-xl text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sand text-rose-dark shadow-xs border border-line mb-4">
            <span className="text-2xl">🔒</span>
          </div>

          <p className="eyebrow text-rose-dark">Restricted Area</p>
          <h1 className="font-display text-2xl sm:text-3xl italic text-ink mt-1">
            Store Admin Portal
          </h1>
          <p className="text-xs text-ink/65 mt-2 leading-relaxed">
            This administration dashboard contains confidential orders, customer data, and billing records.
          </p>

          <form onSubmit={handleLogin} className="mt-6 space-y-4 text-left">
            <div>
              <label className="block text-xs uppercase tracking-wide text-ink/75 font-semibold mb-1.5">
                Administrator PIN / Password *
              </label>
              <input
                type="password"
                required
                autoFocus
                placeholder="Enter admin PIN"
                value={adminPin}
                onChange={(e) => setAdminPin(e.target.value)}
                className="w-full rounded-md border border-line bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:border-rose-dark transition shadow-2xs font-mono"
              />
            </div>

            {authError && (
              <div className="rounded-md border border-red-200 bg-red-50 p-2.5 text-xs text-red-700 font-medium">
                ⚠️ {authError}
              </div>
            )}

            <button
              type="submit"
              className="btn-primary w-full py-3 text-xs uppercase tracking-wider font-bold shadow-md hover:shadow-lg transition-all"
            >
              Unlock Dashboard →
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-line/60">
            <Link
              href="/"
              className="text-xs text-ink/60 hover:text-rose-dark font-medium transition"
            >
              ← Back to Storefront
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-layora py-10 lg:py-14 font-body">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-line gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="eyebrow">Store Management &amp; Analytics</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl italic text-ink mt-1">
            Order Confirmation &amp; Payment System
          </h1>
          <p className="text-xs sm:text-sm text-ink/65 mt-1">
            Monitor real-time customer contacts, confirmed website orders, verified payments, and Google Sheet sync.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <a
            href="/api/export-csv"
            download
            className="rounded-md border border-line bg-cream hover:bg-sand px-3.5 py-2 text-xs font-semibold text-ink flex items-center gap-2 shadow-2xs transition"
          >
            <span>📊 Download CSV (Google Sheets)</span>
          </a>

          <button
            onClick={() => setShowScriptModal(true)}
            className="rounded-md border border-line bg-cream hover:bg-sand px-3.5 py-2 text-xs font-semibold text-ink flex items-center gap-1.5 shadow-2xs transition"
          >
            <span>⚙️ Sheet Script Setup</span>
          </button>

          <button
            onClick={fetchDashboardData}
            disabled={isLoading}
            className="btn-primary py-2 px-4 text-xs font-bold shadow-2xs flex items-center gap-1.5"
          >
            <span>{isLoading ? "Refreshing..." : "↺ Refresh"}</span>
          </button>

          <button
            onClick={handleLogout}
            className="rounded-md border border-line bg-rose/10 hover:bg-rose/20 text-rose-dark px-3.5 py-2 text-xs font-bold flex items-center gap-1.5 shadow-2xs transition"
            title="Log out and lock admin portal"
          >
            <span>🔒 Lock</span>
          </button>
        </div>
      </div>

      {/* 4 Conversion Funnel Cards (Direct answer to user's question) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        {/* Metric 1: Total Contacted */}
        <div className="rounded-xl border border-line bg-cream/90 p-5 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-wider text-ink/60 font-semibold">
              1. Customers Contacted
            </span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-blue-800 text-sm">
              📞
            </span>
          </div>
          <p className="font-display text-3xl sm:text-4xl italic text-ink font-bold mt-2">
            {metrics.totalContacted}
          </p>
          <p className="text-[11px] text-ink/65 mt-1">
            Leads via WhatsApp, Chatbot &amp; Checkout
          </p>
          <div className="mt-3 h-1.5 w-full bg-line rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 rounded-full w-full" />
          </div>
        </div>

        {/* Metric 2: Total Confirmed */}
        <div className="rounded-xl border border-line bg-cream/90 p-5 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-wider text-ink/60 font-semibold">
              2. Orders Confirmed
            </span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-100 text-amber-900 text-sm">
              📋
            </span>
          </div>
          <p className="font-display text-3xl sm:text-4xl italic text-ink font-bold mt-2">
            {metrics.totalConfirmed}
          </p>
          <p className="text-[11px] text-emerald-800 font-semibold mt-1">
            {metrics.conversionRate}% conversion from contacts
          </p>
          <div className="mt-3 h-1.5 w-full bg-line rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-600 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(metrics.conversionRate, 100)}%` }}
            />
          </div>
        </div>

        {/* Metric 3: Total Paid */}
        <div className="rounded-xl border border-line bg-cream/90 p-5 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-wider text-ink/60 font-semibold">
              3. Orders Paid
            </span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 text-sm">
              💳
            </span>
          </div>
          <p className="font-display text-3xl sm:text-4xl italic text-emerald-800 font-bold mt-2">
            {metrics.totalPaid}
          </p>
          <p className="text-[11px] text-ink/65 mt-1">
            {metrics.paidRate}% of confirmed orders paid
          </p>
          <div className="mt-3 h-1.5 w-full bg-line rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-600 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(metrics.paidRate, 100)}%` }}
            />
          </div>
        </div>

        {/* Metric 4: Total Revenue */}
        <div className="rounded-xl border border-line bg-cream/90 p-5 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-wider text-ink/60 font-semibold">
              4. Total Verified Revenue
            </span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-rose/20 text-rose-dark text-sm">
              💰
            </span>
          </div>
          <p className="font-display text-2xl sm:text-3xl italic text-rose-dark font-bold mt-2 truncate">
            {formatPrice(metrics.totalRevenue, "PKR")}
          </p>
          <p className="text-[11px] text-ink/65 mt-1">
            Bank transfers &amp; verified payments
          </p>
          <div className="mt-3 h-1.5 w-full bg-line rounded-full overflow-hidden">
            <div className="h-full bg-rose-dark rounded-full w-full" />
          </div>
        </div>
      </div>

      {/* Google Sheets Sync Integration Box */}
      <div className="mt-8 rounded-xl border border-line bg-white/80 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  isConfigured ? "bg-emerald-500" : "bg-amber-400"
                }`}
              />
              <h2 className="font-display text-lg italic text-ink font-bold">
                Google Sheets Real-Time Sync
              </h2>
              <span
                className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                  isConfigured
                    ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                    : "bg-amber-100 text-amber-900 border border-amber-300"
                }`}
              >
                {isConfigured ? "Live Webhook Active" : "Local Database Mode"}
              </span>
            </div>
            <p className="text-xs text-ink/70 mt-1">
              Every website order and customer contact can sync straight into your Google Sheet automatically.
            </p>
          </div>

          <button
            onClick={() => setShowScriptModal(true)}
            className="text-xs text-rose-dark font-bold hover:underline shrink-0"
          >
            How to set up Google Sheet (1 Min Guide) →
          </button>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row items-center gap-2.5">
          <input
            type="url"
            placeholder="Paste your Google Apps Script Web App URL here (e.g. https://script.google.com/macros/s/.../exec)"
            value={webhookUrl}
            onChange={(e) => setWebhookUrl(e.target.value)}
            className="flex-1 w-full rounded-md border border-line bg-white px-3.5 py-2 text-xs text-ink placeholder:text-ink/40 focus:outline-none focus:border-rose-dark"
          />
          <button
            onClick={handleSaveAndSyncSheet}
            disabled={isSyncing}
            className="w-full sm:w-auto btn-primary py-2 px-5 text-xs font-bold shrink-0 disabled:opacity-50"
          >
            {isSyncing ? "Syncing..." : "Sync All to Google Sheet 🚀"}
          </button>
        </div>

        {syncStatus && (
          <p
            className={`mt-2.5 text-xs ${
              syncStatus.startsWith("✓") ? "text-emerald-700 font-semibold" : "text-amber-800"
            }`}
          >
            {syncStatus}
          </p>
        )}
      </div>

      {/* Orders Management Table */}
      <div className="mt-8 rounded-xl border border-line bg-cream/95 shadow-sm overflow-hidden">
        {/* Filters & Search Toolbar */}
        <div className="p-4 sm:p-5 border-b border-line flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-sand/30">
          {/* Tab Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setFilter("all")}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                filter === "all"
                  ? "bg-espresso text-cream"
                  : "bg-cream text-ink/70 hover:bg-sand border border-line"
              }`}
            >
              All Orders ({orders.length})
            </button>
            <button
              onClick={() => setFilter("paid")}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                filter === "paid"
                  ? "bg-emerald-800 text-white"
                  : "bg-cream text-ink/70 hover:bg-sand border border-line"
              }`}
            >
              Paid ({orders.filter((o) => o.status === "paid" || o.paymentStatus === "paid").length})
            </button>
            <button
              onClick={() => setFilter("confirmed")}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                filter === "confirmed"
                  ? "bg-amber-800 text-white"
                  : "bg-cream text-ink/70 hover:bg-sand border border-line"
              }`}
            >
              Pending Verification ({orders.filter((o) => o.status === "confirmed").length})
            </button>
            <button
              onClick={() => setFilter("dispatched")}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                filter === "dispatched"
                  ? "bg-blue-800 text-white"
                  : "bg-cream text-ink/70 hover:bg-sand border border-line"
              }`}
            >
              Dispatched ({orders.filter((o) => o.status === "dispatched").length})
            </button>
          </div>

          {/* Search Box */}
          <input
            type="text"
            placeholder="Search by Order ID, Name, Phone, or TID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-md border border-line bg-white px-3.5 py-1.5 text-xs text-ink placeholder:text-ink/40 w-full sm:w-64 focus:outline-none focus:border-rose-dark"
          />
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-line bg-sand/40 text-[10px] uppercase tracking-wider font-bold text-ink/65 select-none">
              <tr>
                <th className="py-3 px-4">Order ID &amp; Date</th>
                <th className="py-3 px-4">Customer Details</th>
                <th className="py-3 px-4">Purchased Items</th>
                <th className="py-3 px-4">Total &amp; Payment</th>
                <th className="py-3 px-4">Transaction ID (TID)</th>
                <th className="py-3 px-4">Order Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line/60 bg-white/60">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-ink/50 italic">
                    No orders matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((o) => {
                  const isPaid = o.status === "paid" || o.paymentStatus === "paid" || o.paymentStatus === "verified";

                  return (
                    <tr key={o.id} className="hover:bg-sand/20 transition-colors">
                      {/* Order ID & Date */}
                      <td className="py-3.5 px-4 font-mono">
                        <span className="font-bold text-rose-dark block">#{o.id}</span>
                        <span className="text-[10px] text-ink/50 font-sans block mt-0.5">
                          {new Date(o.createdAt).toLocaleDateString([], {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </td>

                      {/* Customer */}
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-ink block">{o.customerName}</span>
                        <span className="text-[11px] text-ink/75 block">{o.phone}</span>
                        <span className="text-[10px] text-ink/50 block truncate max-w-[180px]">
                          {o.city} • {o.address}
                        </span>
                      </td>

                      {/* Items */}
                      <td className="py-3.5 px-4 max-w-xs">
                        <div className="space-y-0.5">
                          {o.items.map((item, idx) => (
                            <div key={idx} className="text-[11px] text-ink/80 truncate">
                              • {item.name}{" "}
                              <span className="text-ink/50">
                                ×{item.quantity} {item.size ? `(${item.size})` : ""}
                              </span>
                            </div>
                          ))}
                        </div>
                      </td>

                      {/* Total & Payment Method */}
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-ink block">
                          {formatPrice(o.totalAmount, o.currency)}
                        </span>
                        <span className="text-[10px] uppercase font-semibold text-ink/60 block mt-0.5">
                          {o.paymentMethod === "jazzcash"
                            ? "📱 JazzCash"
                            : o.paymentMethod === "cod"
                            ? "💵 COD"
                            : o.paymentMethod === "bank_transfer"
                            ? "🏛️ Bank IBFT"
                            : "💳 Card"}
                        </span>
                      </td>

                      {/* Transaction ID & Screenshot */}
                      <td className="py-3.5 px-4 font-mono text-[11px]">
                        {o.transactionId ? (
                          <div className="flex flex-col items-start gap-1">
                            <span className="bg-sand/70 px-1.5 py-0.5 rounded border border-line text-ink font-semibold">
                              {o.transactionId}
                            </span>
                            {o.paymentScreenshot && (
                              <button
                                type="button"
                                onClick={() =>
                                  setViewingScreenshot({
                                    id: o.id,
                                    name: o.customerName,
                                    url: o.paymentScreenshot!,
                                    tid: o.transactionId,
                                  })
                                }
                                className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-dark hover:underline font-sans mt-0.5"
                              >
                                <span>📸 View Receipt</span>
                              </button>
                            )}
                          </div>
                        ) : (
                          <span className="text-ink/35 italic font-sans">N/A (COD)</span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            isPaid
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                              : o.status === "dispatched"
                              ? "bg-blue-100 text-blue-800 border border-blue-300"
                              : "bg-amber-100 text-amber-900 border border-amber-300"
                          }`}
                        >
                          {isPaid ? "✓ Paid" : o.status === "dispatched" ? "📦 Dispatched" : "⏳ Confirmed"}
                        </span>
                      </td>

                      {/* Quick Actions */}
                      <td className="py-3.5 px-4 text-right space-x-1.5 whitespace-nowrap">
                        {!isPaid && (
                          <button
                            onClick={() => handleUpdateStatus(o.id, "paid", "paid")}
                            className="bg-emerald-700 hover:bg-emerald-800 text-white px-2.5 py-1 rounded text-[11px] font-semibold transition"
                          >
                            Mark Paid
                          </button>
                        )}

                        {o.status !== "dispatched" && (
                          <button
                            onClick={() => handleUpdateStatus(o.id, "dispatched")}
                            className="bg-sand hover:bg-sand/80 text-ink border border-line px-2.5 py-1 rounded text-[11px] font-medium transition"
                          >
                            Dispatch
                          </button>
                        )}

                        <a
                          href={`tel:${o.phone}`}
                          className="bg-sand hover:bg-sand/80 text-ink border border-line px-2.5 py-1 rounded text-[11px] font-medium transition inline-flex items-center gap-1"
                        >
                          <span>📞 Call</span>
                        </a>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Script & Setup Guide Modal */}
      {showScriptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/60 backdrop-blur-xs">
          <div className="w-full max-w-2xl rounded-2xl border border-line bg-cream p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <div>
                <h3 className="font-display text-xl font-bold italic text-ink">
                  Google Sheet Webhook Setup Guide
                </h3>
                <p className="text-xs text-ink/65 mt-0.5">
                  Follow these 4 simple steps to connect your website to Google Sheets in 1 minute:
                </p>
              </div>
              <button
                onClick={() => setShowScriptModal(false)}
                className="text-ink/50 hover:text-ink text-lg p-1"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs leading-relaxed text-ink/85">
              <div className="rounded-lg bg-sand/40 border border-line p-3">
                <span className="font-bold text-ink">Step 1:</span> Open your Google Sheet in Google Drive.
              </div>
              <div className="rounded-lg bg-sand/40 border border-line p-3">
                <span className="font-bold text-ink">Step 2:</span> In top menu click:{" "}
                <span className="font-mono bg-cream px-1.5 py-0.5 rounded border border-line">
                  Extensions → Apps Script
                </span>
                .
              </div>
              <div className="rounded-lg bg-sand/40 border border-line p-3">
                <span className="font-bold text-ink">Step 3:</span> Delete any code in the editor, and click the
                button below to Copy &amp; Paste this complete automation script.
              </div>
              <div className="rounded-lg bg-sand/40 border border-line p-3">
                <span className="font-bold text-ink">Step 4:</span> Click{" "}
                <span className="font-bold text-ink">Deploy → New deployment</span> → Choose{" "}
                <span className="font-bold text-ink">Web app</span> → Set &apos;Who has access&apos; to{" "}
                <span className="font-bold text-rose-dark">&apos;Anyone&apos;</span>. Deploy, copy the Web App
                URL, and paste it into the URL field above!
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-ink text-xs">Ready-to-use Google Apps Script Code:</span>
                  <button
                    onClick={handleCopyScript}
                    className="btn-primary py-1 px-3 text-[11px] font-bold"
                  >
                    {copiedScript ? "✓ Copied to Clipboard!" : "📋 Copy Script"}
                  </button>
                </div>
                <pre className="h-56 overflow-y-auto rounded-lg bg-espresso text-cream/90 p-3.5 font-mono text-[11px] select-all leading-normal border border-line">
                  {GOOGLE_APPS_SCRIPT_TEMPLATE}
                </pre>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowScriptModal(false)}
                className="btn-primary py-2 px-6 text-xs font-bold"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Screenshot Viewer Modal */}
      {viewingScreenshot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/75 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-lg rounded-2xl border border-line bg-cream p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <div>
                <h3 className="font-display text-lg font-bold italic text-ink">
                  Payment Receipt • Order #{viewingScreenshot.id}
                </h3>
                <p className="text-xs text-ink/65">
                  Customer: <span className="font-semibold text-ink">{viewingScreenshot.name}</span>
                  {viewingScreenshot.tid && (
                    <span className="ml-2 font-mono text-[11px] bg-sand px-1.5 py-0.2 rounded">
                      TID: {viewingScreenshot.tid}
                    </span>
                  )}
                </p>
              </div>
              <button
                onClick={() => setViewingScreenshot(null)}
                className="text-ink/60 hover:text-ink text-xl font-light px-2"
              >
                ✕
              </button>
            </div>

            <div className="rounded-lg border border-line bg-black/5 overflow-hidden max-h-[60vh] flex items-center justify-center">
              <img
                src={viewingScreenshot.url}
                alt={`Receipt for Order ${viewingScreenshot.id}`}
                className="max-h-[58vh] w-auto object-contain rounded"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <a
                href={viewingScreenshot.url}
                download={`LAYORA_Receipt_${viewingScreenshot.id}.jpg`}
                className="rounded-md border border-line bg-white hover:bg-sand px-3.5 py-1.5 text-xs font-semibold text-ink inline-flex items-center gap-1.5 shadow-2xs"
              >
                <span>💾 Download Full Image</span>
              </a>
              <button
                onClick={() => setViewingScreenshot(null)}
                className="btn-primary py-1.5 px-5 text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
