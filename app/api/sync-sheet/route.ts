import { NextResponse } from "next/server";
import {
  getSheetWebhookUrl,
  saveSheetWebhookUrl,
  getOrders,
  calculateMetrics,
} from "@/lib/orders-db";
import { syncToGoogleSheet } from "@/lib/google-sheets";

export async function GET() {
  const webhookUrl = getSheetWebhookUrl();
  return NextResponse.json({
    success: true,
    webhookUrl,
    isConfigured: Boolean(webhookUrl && webhookUrl.length > 10),
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { webhookUrl, action } = body;

    if (webhookUrl !== undefined) {
      saveSheetWebhookUrl(webhookUrl);
    }

    const orders = getOrders();
    const metrics = calculateMetrics();

    // If action is "batch_sync" or "test"
    const activeUrl = webhookUrl || getSheetWebhookUrl();
    if (!activeUrl) {
      return NextResponse.json({
        success: false,
        message: "Please enter your Google Apps Script Web App URL first.",
      });
    }

    const syncResult = await syncToGoogleSheet({
      type: "batch_sync",
      timestamp: new Date().toISOString(),
      orders,
      metrics,
    });

    return NextResponse.json({
      success: syncResult.success,
      message: syncResult.message,
      webhookUrl: activeUrl,
      syncedOrdersCount: orders.length,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to sync to Google Sheet" },
      { status: 500 }
    );
  }
}
