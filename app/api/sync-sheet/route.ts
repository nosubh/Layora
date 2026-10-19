import { NextResponse } from "next/server";
import {
  getSheetWebhookUrl,
  getAdminEmail,
  saveSheetConfig,
  getOrders,
  calculateMetrics,
} from "@/lib/orders-db";
import { syncToGoogleSheet } from "@/lib/google-sheets";

export async function GET() {
  const webhookUrl = getSheetWebhookUrl();
  const adminEmail = getAdminEmail();
  return NextResponse.json({
    success: true,
    webhookUrl,
    adminEmail,
    isConfigured: Boolean(webhookUrl && webhookUrl.length > 10),
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { webhookUrl, adminEmail, action } = body;

    saveSheetConfig({
      ...(webhookUrl !== undefined ? { webhookUrl } : {}),
      ...(adminEmail !== undefined ? { adminEmail } : {}),
    });

    const activeUrl = webhookUrl !== undefined ? webhookUrl : getSheetWebhookUrl();
    const activeEmail = adminEmail !== undefined ? adminEmail : getAdminEmail();

    if (!activeUrl) {
      return NextResponse.json({
        success: false,
        message: "Please enter your Google Apps Script Web App URL first.",
      });
    }

    if (action === "test_email") {
      const syncResult = await syncToGoogleSheet({
        type: "order",
        timestamp: new Date().toISOString(),
        adminEmail: activeEmail,
        order: {
          id: "TEST-ALERT-" + Math.floor(1000 + Math.random() * 9000),
          createdAt: new Date().toISOString(),
          customerName: "Layora Test Alert",
          phone: "+92 339 0131877",
          email: activeEmail || "admin@layora.com",
          address: "Model Town, Block C",
          city: "Lahore",
          country: "Pakistan",
          items: [
            {
              productId: "test-dress",
              name: "Sample Test Dress (Verification Order)",
              price: 4500,
              quantity: 1,
              size: "M",
              color: "Peach",
            },
          ],
          subtotal: 4500,
          shippingFee: 0,
          totalAmount: 4500,
          currency: "PKR",
          paymentMethod: "jazzcash",
          paymentStatus: "paid",
          transactionId: "JC-VERIFY-12345",
          paymentScreenshot: "",
          notes: "This is a test notification to verify your email alerts are working properly.",
          status: "paid",
          source: "website_checkout",
        },
      });

      return NextResponse.json({
        success: syncResult.success,
        message: syncResult.success
          ? `✓ Test email & order notification sent to ${activeEmail || "Google Account Email"}!`
          : syncResult.message,
      });
    }

    const orders = getOrders();
    const metrics = calculateMetrics();

    const syncResult = await syncToGoogleSheet({
      type: "batch_sync",
      timestamp: new Date().toISOString(),
      orders,
      metrics,
      adminEmail: activeEmail,
    });

    return NextResponse.json({
      success: syncResult.success,
      message: syncResult.message,
      webhookUrl: activeUrl,
      adminEmail: activeEmail,
      syncedOrdersCount: orders.length,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to sync to Google Sheet" },
      { status: 500 }
    );
  }
}
