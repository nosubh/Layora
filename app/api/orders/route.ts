import { NextResponse } from "next/server";
import { getOrders, createOrder, calculateMetrics, OrderRecord } from "@/lib/orders-db";
import { syncToGoogleSheet } from "@/lib/google-sheets";

export async function GET() {
  try {
    const orders = getOrders();
    const metrics = calculateMetrics();
    return NextResponse.json({
      success: true,
      orders,
      metrics,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to load orders" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      customerName,
      phone,
      email,
      address,
      city,
      province,
      postalCode,
      country = "Pakistan",
      items,
      subtotal,
      shippingFee = 0,
      totalAmount,
      currency = "PKR",
      paymentMethod = "jazzcash",
      paymentStatus = "pending",
      transactionId,
      paymentScreenshot,
      notes,
      source = "website_checkout",
    } = body;

    if (!customerName || !phone || !address || !city || !items || !items.length) {
      return NextResponse.json(
        { success: false, message: "Please fill all required customer delivery and item details." },
        { status: 400 }
      );
    }

    if (paymentMethod === "jazzcash" && !paymentScreenshot) {
      return NextResponse.json(
        { success: false, message: "Payment screenshot is mandatory for JazzCash payment." },
        { status: 400 }
      );
    }

    // Determine initial order status:
    // If bank/JazzCash TID provided, mark status as confirmed/paid
    const status = paymentStatus === "paid" || paymentStatus === "verified" ? "paid" : "confirmed";

    const newOrder = createOrder({
      customerName,
      phone,
      email,
      address,
      city,
      province,
      postalCode,
      country,
      items,
      subtotal: Number(subtotal),
      shippingFee: Number(shippingFee),
      totalAmount: Number(totalAmount),
      currency,
      paymentMethod,
      paymentStatus: transactionId ? "paid" : paymentStatus,
      transactionId: transactionId || "",
      paymentScreenshot: paymentScreenshot || "",
      notes: notes || "",
      status: transactionId ? "paid" : status,
      source,
    });

    // Asynchronously forward to Google Sheets Webhook (doesn't block customer)
    syncToGoogleSheet({
      type: "order",
      timestamp: new Date().toISOString(),
      order: newOrder,
    }).catch((err) => console.error("Background Google Sheet sync:", err));

    const updatedMetrics = calculateMetrics();

    return NextResponse.json({
      success: true,
      message: "Order placed successfully",
      order: newOrder,
      metrics: updatedMetrics,
    });
  } catch (error: any) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
