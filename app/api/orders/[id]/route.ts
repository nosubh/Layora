import { NextResponse } from "next/server";
import { updateOrder, calculateMetrics } from "@/lib/orders-db";
import { syncToGoogleSheet } from "@/lib/google-sheets";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await req.json();

    const { status, paymentStatus, transactionId, notes } = body;

    const updated = updateOrder(id, {
      status,
      paymentStatus,
      transactionId,
      notes,
    });

    if (!updated) {
      return NextResponse.json(
        { success: false, message: `Order with ID ${id} not found.` },
        { status: 404 }
      );
    }

    // Sync status change to Google Sheets
    syncToGoogleSheet({
      type: "order",
      timestamp: new Date().toISOString(),
      order: updated,
    }).catch((err) => console.error("Google Sheet update sync error:", err));

    const metrics = calculateMetrics();

    return NextResponse.json({
      success: true,
      message: `Order ${id} updated successfully`,
      order: updated,
      metrics,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update order" },
      { status: 500 }
    );
  }
}
