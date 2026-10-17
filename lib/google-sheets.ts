import { getSheetWebhookUrl } from "./orders-db";
import { OrderRecord, ContactLead, StoreMetrics } from "./orders-db";

export interface SheetSyncPayload {
  type: "order" | "contact_lead" | "status_update" | "batch_sync";
  timestamp: string;
  order?: OrderRecord;
  lead?: ContactLead;
  metrics?: StoreMetrics;
  orders?: OrderRecord[];
}

export async function syncToGoogleSheet(payload: SheetSyncPayload): Promise<{ success: boolean; message?: string }> {
  const webhookUrl = getSheetWebhookUrl();
  if (!webhookUrl) {
    return {
      success: false,
      message: "No Google Sheet Webhook URL configured. Orders are safely saved in local database.",
    };
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(payload),
      redirect: "follow",
      signal: AbortSignal.timeout(12000),
    });

    const responseText = await response.text();

    // Check if Google returned a sign-in / permission redirect page
    if (
      responseText.includes("accounts.google.com") ||
      responseText.includes("ServiceLogin") ||
      responseText.includes("Sign in") ||
      response.status === 401 ||
      response.status === 403
    ) {
      return {
        success: false,
        message:
          "Google permission error: In your Google Apps Script, click 'Deploy' → 'Manage deployments' (edit ✏️) → set 'Who has access' to 'Anyone' (so the website can write to it without Google login), then click Deploy.",
      };
    }

    let resData: any = {};
    try {
      resData = JSON.parse(responseText);
    } catch {
      // If response text was not JSON but request succeeded
      if (response.ok) {
        return {
          success: true,
          message: "Data sent to Google Sheet successfully",
        };
      }
    }

    if (!response.ok) {
      return {
        success: false,
        message: resData.message || `Google Sheets returned HTTP status ${response.status}`,
      };
    }

    return {
      success: true,
      message: resData.message || "Successfully synced to Google Sheet",
    };
  } catch (err: any) {
    console.error("Google Sheets sync error:", err);
    return {
      success: false,
      message: err.message || "Failed to reach Google Sheet Webhook",
    };
  }
}

// Ready-to-use Google Apps Script code that the user can paste in their Google Sheet
export const GOOGLE_APPS_SCRIPT_TEMPLATE = `/**
 * ====================================================================
 * LAYORA E-COMMERCE GOOGLE SHEET AUTOMATION
 * ====================================================================
 * 
 * INSTRUCTIONS:
 * 1. Open your Google Sheet
 * 2. In the top menu, click: Extensions -> Apps Script
 * 3. Delete any default code and PASTE this ENTIRE script below
 * 4. Click 'Deploy' -> 'New deployment'
 * 5. Select type: 'Web app'
 * 6. Set Description: 'Layora Store Sync'
 * 7. Set 'Execute as': 'Me'
 * 8. Set 'Who has access': 'Anyone' (IMPORTANT: Must be 'Anyone')
 * 9. Click 'Deploy', authorize the permissions, and COPY the Web App URL!
 * 10. Paste the Web App URL in your website at http://localhost:3000/admin
 * ====================================================================
 */

function setupSheets() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  // 1. Orders & Payments Sheet
  var ordersSheet = ss.getSheetByName("Orders & Payments");
  if (!ordersSheet) {
    ordersSheet = ss.insertSheet("Orders & Payments");
  }

  var ordersHeaders = [
    "Order ID",
    "Date & Time",
    "Customer Name",
    "Phone / WhatsApp",
    "City",
    "Full Address",
    "Items Purchased",
    "Total (PKR)",
    "Payment Method",
    "Payment Status",
    "Transaction ID / Ref",
    "Order Status",
    "Customer Notes"
  ];

  if (ordersSheet.getLastRow() === 0) {
    ordersSheet.appendRow(ordersHeaders);
    ordersSheet.getRange(1, 1, 1, ordersHeaders.length)
      .setBackground("#241E1A")
      .setFontColor("#F6EFE9")
      .setFontWeight("bold");
    ordersSheet.setFrozenRows(1);
  }

  // 2. Leads (Contacted) Sheet
  var leadsSheet = ss.getSheetByName("Customer Contacts");
  if (!leadsSheet) {
    leadsSheet = ss.insertSheet("Customer Contacts");
  }

  var leadsHeaders = ["Lead ID", "Date & Time", "Customer Name", "Phone", "Channel", "Inquiry"];
  if (leadsSheet.getLastRow() === 0) {
    leadsSheet.appendRow(leadsHeaders);
    leadsSheet.getRange(1, 1, 1, leadsHeaders.length)
      .setBackground("#7C4E43")
      .setFontColor("#FFFFFF")
      .setFontWeight("bold");
    leadsSheet.setFrozenRows(1);
  }

  // 3. Metrics Summary Sheet
  var metricsSheet = ss.getSheetByName("Analytics Dashboard");
  if (!metricsSheet) {
    metricsSheet = ss.insertSheet("Analytics Dashboard");
  }

  if (metricsSheet.getLastRow() === 0) {
    metricsSheet.appendRow(["METRIC", "VALUE", "NOTES"]);
    metricsSheet.getRange(1, 1, 1, 3).setBackground("#3A2E28").setFontColor("#FFFFFF").setFontWeight("bold");
    metricsSheet.appendRow(["Total Customers Contacted", '=COUNTA(\\'Customer Contacts\\'!A2:A) + COUNTA(\\'Orders & Payments\\'!A2:A)', "All leads and checkout initiations"]);
    metricsSheet.appendRow(["Total Orders Confirmed", '=COUNTA(\\'Orders & Payments\\'!A2:A)', "All confirmed orders"]);
    metricsSheet.appendRow(["Total Orders Paid", '=COUNTIF(\\'Orders & Payments\\'!J2:J, "paid") + COUNTIF(\\'Orders & Payments\\'!J2:J, "verified")', "Orders with payment received"]);
    metricsSheet.appendRow(["Total Paid Revenue (PKR)", '=SUMIF(\\'Orders & Payments\\'!J2:J, "paid", \\'Orders & Payments\\'!H2:H) + SUMIF(\\'Orders & Payments\\'!J2:J, "verified", \\'Orders & Payments\\'!H2:H)', "Verified incoming payments"]);
    metricsSheet.appendRow(["Order Confirmation Rate", '=IF(B2>0, TEXT(B3/B2, "0.0%"), "0%")', "Percentage of contacts that ordered"]);
    metricsSheet.appendRow(["Payment Completion Rate", '=IF(B3>0, TEXT(B4/B3, "0.0%"), "0%")', "Percentage of orders paid"]);
    metricsSheet.setColumnWidth(1, 240);
    metricsSheet.setColumnWidth(2, 160);
    metricsSheet.setColumnWidth(3, 260);
  }
}

function doPost(e) {
  try {
    setupSheets();
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var data = JSON.parse(e.postData.contents);

    // Case 1: New Order or Payment
    if (data.type === "order" && data.order) {
      var o = data.order;
      var ordersSheet = ss.getSheetByName("Orders & Payments");

      var itemsStr = "";
      if (o.items && o.items.length) {
        itemsStr = o.items.map(function(item) {
          return item.name + " (" + item.quantity + (item.size ? ", Size " + item.size : "") + ")";
        }).join(" | ");
      }

      // Check if order already exists to update row, or append new row
      var existingRow = findOrderRow(ordersSheet, o.id);
      var rowData = [
        o.id,
        new Date(o.createdAt || new Date()).toLocaleString(),
        o.customerName || "",
        o.phone || "",
        o.city || "",
        o.address || "",
        itemsStr,
        o.totalAmount || 0,
        o.paymentMethod || "",
        o.paymentStatus || "pending",
        o.transactionId || "",
        o.status || "confirmed",
        o.notes || ""
      ];

      if (existingRow > 0) {
        ordersSheet.getRange(existingRow, 1, 1, rowData.length).setValues([rowData]);
      } else {
        ordersSheet.appendRow(rowData);
      }

      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        message: "Order logged to Google Sheet successfully",
        orderId: o.id
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // Case 2: Contact Lead
    if (data.type === "contact_lead" && data.lead) {
      var l = data.lead;
      var leadsSheet = ss.getSheetByName("Customer Contacts");
      leadsSheet.appendRow([
        l.id,
        new Date(l.createdAt || new Date()).toLocaleString(),
        l.customerName || "Website Visitor",
        l.phone || "",
        l.channel || "whatsapp",
        l.inquiry || "Store Contact"
      ]);

      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        message: "Contact lead recorded in Google Sheet"
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // Case 3: Batch Sync
    if (data.type === "batch_sync" && data.orders) {
      var sheet = ss.getSheetByName("Orders & Payments");
      data.orders.forEach(function(ord) {
        var existing = findOrderRow(sheet, ord.id);
        var itms = ord.items.map(function(i) { return i.name + " (" + i.quantity + ")"; }).join(" | ");
        var row = [
          ord.id,
          new Date(ord.createdAt).toLocaleString(),
          ord.customerName,
          ord.phone,
          ord.city,
          ord.address,
          itms,
          ord.totalAmount,
          ord.paymentMethod,
          ord.paymentStatus,
          ord.transactionId || "",
          ord.status,
          ord.notes || ""
        ];
        if (existing > 0) {
          sheet.getRange(existing, 1, 1, row.length).setValues([row]);
        } else {
          sheet.appendRow(row);
        }
      });

      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        message: "Batch sync completed for " + data.orders.length + " orders"
      })).setMimeType(ContentService.MimeType.JSON);
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Ping received"
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function findOrderRow(sheet, orderId) {
  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (data[i][0] == orderId) {
      return i + 1; // 1-indexed row number
    }
  }
  return -1;
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "active",
    message: "LAYORA Google Sheet Webhook is active and listening!"
  })).setMimeType(ContentService.MimeType.JSON);
}
`;
