import { NextResponse } from "next/server";
import { recordLead, calculateMetrics } from "@/lib/orders-db";
import { syncToGoogleSheet } from "@/lib/google-sheets";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const {
      customerName = "Store Visitor",
      phone = "",
      channel = "whatsapp_pk",
      inquiry = "Customer initiated contact",
    } = body;

    const lead = recordLead({
      customerName,
      phone,
      channel,
      inquiry,
    });

    // Forward lead to Google Sheet
    syncToGoogleSheet({
      type: "contact_lead",
      timestamp: new Date().toISOString(),
      lead,
    }).catch((err) => console.error("Contact lead Google Sheet sync:", err));

    const metrics = calculateMetrics();

    return NextResponse.json({
      success: true,
      lead,
      metrics,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to record contact lead" },
      { status: 500 }
    );
  }
}
