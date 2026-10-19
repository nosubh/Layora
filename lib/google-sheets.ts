import { getSheetWebhookUrl, getAdminEmail } from "./orders-db";
import { OrderRecord, ContactLead, StoreMetrics } from "./orders-db";
export { GOOGLE_APPS_SCRIPT_TEMPLATE } from "./google-script-template";

export interface SheetSyncPayload {
  type: "order" | "contact_lead" | "status_update" | "batch_sync";
  timestamp: string;
  order?: OrderRecord;
  lead?: ContactLead;
  metrics?: StoreMetrics;
  orders?: OrderRecord[];
  adminEmail?: string;
}

export async function syncToGoogleSheet(payload: SheetSyncPayload): Promise<{ success: boolean; message?: string }> {
  const webhookUrl = getSheetWebhookUrl();
  if (!webhookUrl) {
    return {
      success: false,
      message: "No Google Sheet Webhook URL configured. Please paste your Web App URL in /admin.",
    };
  }

  const cleanPayload: any = {
    type: payload.type,
    timestamp: payload.timestamp,
    adminEmail: payload.adminEmail || getAdminEmail(),
  };

  // For individual order, keep the full paymentScreenshot so Google Apps Script can save it to Drive & attach to email
  if (payload.order) {
    cleanPayload.order = {
      ...payload.order,
      paymentScreenshot: payload.order.paymentScreenshot || "",
    };
  }

  // For batch sync of multiple orders, keep it lightweight to avoid payload size limit
  if (payload.orders) {
    cleanPayload.orders = payload.orders.map((o) => ({
      ...o,
      paymentScreenshot:
        o.paymentScreenshot && o.paymentScreenshot.length > 500
          ? "[Receipt Screenshot Saved in Admin Portal]"
          : o.paymentScreenshot || "",
    }));
  }

  if (payload.lead) {
    cleanPayload.lead = payload.lead;
  }

  if (payload.metrics) {
    cleanPayload.metrics = payload.metrics;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(cleanPayload),
      redirect: "follow",
      signal: AbortSignal.timeout(20000),
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
          "Google permission error: In your Google Apps Script, click 'Deploy' → 'Manage deployments' (edit ✏️) → set 'Who has access' to 'Anyone' (so the website can write without Google sign-in), then click Deploy.",
      };
    }

    let resData: any = {};
    try {
      resData = JSON.parse(responseText);
    } catch {
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
