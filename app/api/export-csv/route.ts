import { NextResponse } from "next/server";
import { generateOrdersCsv } from "@/lib/orders-db";

export async function GET() {
  try {
    const csvContent = generateOrdersCsv();
    const filename = `layora-orders-${new Date().toISOString().slice(0, 10)}.csv`;

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to generate CSV" },
      { status: 500 }
    );
  }
}
