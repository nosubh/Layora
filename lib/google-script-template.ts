// Ready-to-use Google Apps Script code customized for Layora E-Commerce
export const GOOGLE_APPS_SCRIPT_TEMPLATE = `/**
 * ====================================================================
 * LAYORA E-COMMERCE GOOGLE SHEET & INSTANT EMAIL AUTOMATION
 * ====================================================================
 * TARGET SPREADSHEET: https://docs.google.com/spreadsheets/d/1OUYFgJCfn4NnVveZARto1bBOTY29af2Nw62hhrqBJ6c/edit
 * SPREADSHEET ID: 1OUYFgJCfn4NnVveZARto1bBOTY29af2Nw62hhrqBJ6c
 *
 * --------------------------------------------------------------------
 * EASY 1-MINUTE SETUP GUIDE:
 * --------------------------------------------------------------------
 * 1. Open your Google Sheet:
 *    https://docs.google.com/spreadsheets/d/1OUYFgJCfn4NnVveZARto1bBOTY29af2Nw62hhrqBJ6c/edit
 *
 * 2. In top menu click:
 *    Extensions -> Apps Script  (توسیع -> ایپس سکرپٹ)
 *
 * 3. Delete ANY existing code inside 'Code.gs' and PASTE this ENTIRE script.
 *
 * 4. Click 'Save' (💾 icon).
 *
 * 5. Click 'Deploy' (top right blue button) -> 'New deployment'
 *
 * 6. Click the gear ⚙️ icon next to 'Select type' and choose 'Web app'
 *
 * 7. Fill in the fields:
 *    - Description: "Layora Store Orders & Payments"
 *    - Execute as: "Me" (your email)
 *    - Who has access: "Anyone"  <-- CRITICAL: Must select "Anyone"
 *
 * 8. Click 'Deploy'.
 *    - Click 'Authorize access', choose your Google account.
 *    - If you see "Google hasn't verified this app", click "Advanced" -> "Go to Layora Automation (unsafe)" -> "Allow".
 *
 * 9. COPY the 'Web app URL' (ends with /exec).
 *
 * 10. Open Layora Admin Portal at http://localhost:3000/admin
 *     Paste the Web App URL in the Google Sheet box and click "Sync All Orders to Sheet 🚀"!
 * ====================================================================
 */

// Target Google Spreadsheet ID
var TARGET_SPREADSHEET_ID = "1OUYFgJCfn4NnVveZARto1bBOTY29af2Nw62hhrqBJ6c";

function getSpreadsheet() {
  if (TARGET_SPREADSHEET_ID && TARGET_SPREADSHEET_ID.trim() !== "") {
    try {
      return SpreadsheetApp.openById(TARGET_SPREADSHEET_ID.trim());
    } catch (e) {
      Logger.log("openById failed, falling back to active sheet: " + e);
    }
  }
  return SpreadsheetApp.getActiveSpreadsheet();
}

function setupSheets() {
  var ss = getSpreadsheet();

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
    "Payment Receipt / Proof",
    "Customer Notes"
  ];

  if (ordersSheet.getLastRow() === 0) {
    ordersSheet.appendRow(ordersHeaders);
    ordersSheet.getRange(1, 1, 1, ordersHeaders.length)
      .setBackground("#241E1A")
      .setFontColor("#F6EFE9")
      .setFontWeight("bold");
    ordersSheet.setFrozenRows(1);
    ordersSheet.setColumnWidth(1, 120);  // Order ID
    ordersSheet.setColumnWidth(2, 160);  // Date & Time
    ordersSheet.setColumnWidth(3, 160);  // Customer Name
    ordersSheet.setColumnWidth(4, 140);  // Phone
    ordersSheet.setColumnWidth(5, 120);  // City
    ordersSheet.setColumnWidth(6, 220);  // Full Address
    ordersSheet.setColumnWidth(7, 260);  // Items Purchased
    ordersSheet.setColumnWidth(8, 120);  // Total Amount
    ordersSheet.setColumnWidth(9, 130);  // Payment Method
    ordersSheet.setColumnWidth(10, 130); // Payment Status
    ordersSheet.setColumnWidth(11, 180); // Transaction ID / Ref
    ordersSheet.setColumnWidth(12, 120); // Order Status
    ordersSheet.setColumnWidth(13, 240); // Receipt Proof
    ordersSheet.setColumnWidth(14, 200); // Notes
  }

  // 2. Leads (Customer Contacts) Sheet
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
    leadsSheet.setColumnWidth(1, 120);
    leadsSheet.setColumnWidth(2, 160);
    leadsSheet.setColumnWidth(3, 180);
    leadsSheet.setColumnWidth(4, 150);
    leadsSheet.setColumnWidth(5, 140);
    leadsSheet.setColumnWidth(6, 260);
  }

  // 3. Analytics Dashboard
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

// Save uploaded screenshot to Google Drive so it has a permanent clickable link
function saveScreenshotToDrive(o) {
  if (!o.paymentScreenshot || o.paymentScreenshot.indexOf("data:image") === -1) {
    return null;
  }
  try {
    var parts = o.paymentScreenshot.split(",");
    var meta = parts[0];
    var base64Data = parts[1];
    var contentType = "image/jpeg";
    if (meta.indexOf("image/png") !== -1) contentType = "image/png";
    if (meta.indexOf("image/webp") !== -1) contentType = "image/webp";

    var decoded = Utilities.base64Decode(base64Data);
    var ext = contentType === "image/png" ? ".png" : ".jpg";
    var blob = Utilities.newBlob(decoded, contentType, "Receipt-" + o.id + ext);

    var folders = DriveApp.getFoldersByName("Layora Order Receipts");
    var folder;
    if (folders.hasNext()) {
      folder = folders.next();
    } else {
      folder = DriveApp.createFolder("Layora Order Receipts");
    }

    var file = folder.createFile(blob);
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    return {
      url: file.getUrl(),
      blob: blob
    };
  } catch (err) {
    Logger.log("Drive save error: " + err);
    return null;
  }
}

function formatOrderRow(o, receiptInfo) {
  var itemsStr = "";
  if (o.items && o.items.length) {
    itemsStr = o.items.map(function(item) {
      return (item.name || "Item") + " (Qty: " + (item.quantity || 1) + (item.size ? ", Size: " + item.size : "") + (item.color ? ", " + item.color : "") + ")";
    }).join(" | ");
  }

  var receiptCell = "";
  if (receiptInfo && receiptInfo.url) {
    receiptCell = '=HYPERLINK("' + receiptInfo.url + '", "📸 View Customer Receipt Proof")';
  } else if (o.paymentScreenshot && o.paymentScreenshot.startsWith("http")) {
    receiptCell = '=HYPERLINK("' + o.paymentScreenshot + '", "📸 View Customer Receipt Proof")';
  } else if (o.paymentMethod === "jazzcash" || o.paymentMethod === "bank_transfer") {
    receiptCell = o.transactionId ? "TID: " + o.transactionId : "Pending Verification";
  } else {
    receiptCell = "Cash on Delivery";
  }

  return [
    o.id,
    new Date(o.createdAt || new Date()).toLocaleString(),
    o.customerName || "",
    o.phone || "",
    o.city || "",
    o.address || "",
    itemsStr,
    o.totalAmount || 0,
    (o.paymentMethod || "cod").toUpperCase(),
    (o.paymentStatus || "pending").toUpperCase(),
    o.transactionId || "",
    (o.status || "confirmed").toUpperCase(),
    receiptCell,
    o.notes || ""
  ];
}

function findOrderRow(sheet, orderId) {
  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (String(data[i][0]).trim() === String(orderId).trim()) {
      return i + 1;
    }
  }
  return -1;
}

// Send Instant Email Notification to Store Owner on Order Confirmation
function sendOrderEmailNotification(o, receiptInfo, adminEmail) {
  var recipient = adminEmail;
  if (!recipient || recipient.trim() === "") {
    try {
      recipient = Session.getActiveUser().getEmail();
    } catch (e) {}
  }

  if (!recipient || recipient.trim() === "") {
    Logger.log("No recipient email found for order notification.");
    return;
  }

  var subject = "🛍️ New Layora Order #" + o.id + " - " + (o.customerName || "Customer") + " (" + (o.totalAmount || 0) + " PKR)";

  var itemsHtml = "";
  if (o.items && o.items.length) {
    itemsHtml = '<table style="width:100%;border-collapse:collapse;margin:12px 0;">' +
      '<tr style="background:#F6EFE9;color:#241E1A;text-align:left;">' +
      '<th style="padding:8px;border:1px solid #E5D7CD;">Item</th>' +
      '<th style="padding:8px;border:1px solid #E5D7CD;">Qty</th>' +
      '<th style="padding:8px;border:1px solid #E5D7CD;">Details</th>' +
      '<th style="padding:8px;border:1px solid #E5D7CD;">Price</th>' +
      '</tr>';
    o.items.forEach(function(item) {
      var itemDetails = (item.size ? "Size: " + item.size : "") + (item.color ? (item.size ? ", " : "") + "Color: " + item.color : "");
      itemsHtml += '<tr>' +
        '<td style="padding:8px;border:1px solid #E5D7CD;font-weight:bold;">' + (item.name || "Item") + '</td>' +
        '<td style="padding:8px;border:1px solid #E5D7CD;">' + (item.quantity || 1) + '</td>' +
        '<td style="padding:8px;border:1px solid #E5D7CD;color:#555;">' + (itemDetails || "-") + '</td>' +
        '<td style="padding:8px;border:1px solid #E5D7CD;">' + (item.price || 0) + ' PKR</td>' +
        '</tr>';
    });
    itemsHtml += '</table>';
  }

  var paymentBadge = (o.paymentMethod || "cod").toUpperCase();
  var statusBadge = (o.paymentStatus || "pending").toUpperCase();
  var cleanPhone = (o.phone || "").replace(/[^0-9]/g, "");

  var receiptHtml = "";
  if (receiptInfo && receiptInfo.url) {
    receiptHtml = '<div style="margin:16px 0;padding:14px;background:#F9F4F0;border-left:4px solid #7C4E43;border-radius:4px;">' +
      '<p style="margin:0 0 8px 0;font-weight:bold;color:#241E1A;">📸 Customer Uploaded Payment Receipt Screenshot:</p>' +
      '<p style="margin:0 0 10px 0;"><a href="' + receiptInfo.url + '" target="_blank" style="display:inline-block;background:#7C4E43;color:#ffffff;padding:8px 16px;text-decoration:none;border-radius:4px;font-weight:bold;font-size:13px;">View Receipt in Google Drive ↗</a></p>' +
      '<p style="margin:0;font-size:12px;color:#666;">The screenshot file is also attached to this email.</p>' +
      '</div>';
  } else if (o.paymentMethod === "jazzcash" || o.paymentMethod === "bank_transfer") {
    receiptHtml = '<p style="color:#B45309;font-weight:bold;">⚠️ Manual payment TID: ' + (o.transactionId || "Pending Verification") + '</p>';
  } else {
    receiptHtml = '<p style="color:#047857;font-weight:bold;">💵 Cash on Delivery (COD) Order</p>';
  }

  var htmlBody = '<div style="font-family:Arial,sans-serif;max-width:620px;margin:auto;background:#ffffff;border:1px solid #E5D7CD;border-radius:8px;padding:24px;color:#241E1A;">' +
    '<div style="text-align:center;border-bottom:2px solid #7C4E43;padding-bottom:12px;margin-bottom:18px;">' +
    '<h1 style="margin:0;color:#241E1A;font-size:24px;letter-spacing:1px;">LAYORA</h1>' +
    '<p style="margin:4px 0 0 0;color:#7C4E43;font-size:13px;font-weight:bold;">✨ NEW WEBSITE ORDER NOTIFICATION ✨</p>' +
    '</div>' +

    '<p style="font-size:15px;margin:0 0 16px 0;">Great news! A new order <strong>#' + o.id + '</strong> has just been confirmed on your website.</p>' +

    '<div style="background:#FAF6F3;padding:14px;border-radius:6px;margin-bottom:18px;">' +
    '<h3 style="margin:0 0 10px 0;font-size:14px;color:#7C4E43;text-transform:uppercase;letter-spacing:0.5px;">Customer & Delivery Details</h3>' +
    '<p style="margin:4px 0;"><strong>Customer Name:</strong> ' + (o.customerName || "-") + '</p>' +
    '<p style="margin:4px 0;"><strong>Phone:</strong> <a href="tel:' + o.phone + '">' + (o.phone || "-") + '</a> ' +
    (cleanPhone ? '<a href="https://wa.me/' + cleanPhone + '" target="_blank" style="color:#047857;text-decoration:none;font-weight:bold;margin-left:8px;">[💬 Chat on WhatsApp]</a>' : '') + '</p>' +
    (o.email ? '<p style="margin:4px 0;"><strong>Email:</strong> ' + o.email + '</p>' : '') +
    '<p style="margin:4px 0;"><strong>City:</strong> ' + (o.city || "-") + '</p>' +
    '<p style="margin:4px 0;"><strong>Delivery Address:</strong> ' + (o.address || "-") + '</p>' +
    (o.notes ? '<p style="margin:4px 0;color:#555;"><strong>Notes:</strong> ' + o.notes + '</p>' : '') +
    '</div>' +

    '<h3 style="margin:0 0 6px 0;font-size:14px;color:#7C4E43;text-transform:uppercase;letter-spacing:0.5px;">Order Items</h3>' +
    itemsHtml +

    '<div style="margin:14px 0;padding:12px;background:#FAF6F3;border-radius:6px;">' +
    '<p style="margin:4px 0;"><strong>Payment Method:</strong> ' + paymentBadge + '</p>' +
    '<p style="margin:4px 0;"><strong>Payment Status:</strong> ' + statusBadge + '</p>' +
    (o.transactionId ? '<p style="margin:4px 0;font-family:monospace;"><strong>Transaction ID (TID):</strong> ' + o.transactionId + '</p>' : '') +
    '<p style="margin:6px 0 0 0;font-size:18px;font-weight:bold;color:#7C4E43;">Total Order Amount: ' + (o.totalAmount || 0) + ' PKR</p>' +
    '</div>' +

    receiptHtml +

    '<div style="text-align:center;margin-top:24px;padding-top:16px;border-top:1px solid #E5D7CD;">' +
    '<a href="https://docs.google.com/spreadsheets/d/1OUYFgJCfn4NnVveZARto1bBOTY29af2Nw62hhrqBJ6c/edit" target="_blank" style="display:inline-block;background:#241E1A;color:#ffffff;padding:10px 18px;text-decoration:none;border-radius:4px;font-weight:bold;font-size:12px;margin:4px;">📊 Open Google Spreadsheet</a>' +
    '<a href="http://localhost:3000/admin" target="_blank" style="display:inline-block;background:#7C4E43;color:#ffffff;padding:10px 18px;text-decoration:none;border-radius:4px;font-weight:bold;font-size:12px;margin:4px;">🔒 Open Store Admin Portal</a>' +
    '</div>' +
    '</div>';

  var emailOptions = {
    to: recipient,
    subject: subject,
    htmlBody: htmlBody
  };

  if (receiptInfo && receiptInfo.blob) {
    emailOptions.attachments = [receiptInfo.blob];
  }

  try {
    MailApp.sendEmail(emailOptions);
    Logger.log("Email notification sent successfully to: " + recipient);
  } catch (mailErr) {
    Logger.log("MailApp.sendEmail error: " + mailErr);
  }
}

function doPost(e) {
  try {
    setupSheets();
    var ss = getSpreadsheet();
    var data = JSON.parse(e.postData.contents);

    // Case 1: Single Order (New or Status Update)
    if (data.type === "order" && data.order) {
      var o = data.order;
      var ordersSheet = ss.getSheetByName("Orders & Payments");
      var existingRow = findOrderRow(ordersSheet, o.id);

      // Save screenshot to Drive if uploaded
      var receiptInfo = saveScreenshotToDrive(o);
      var rowData = formatOrderRow(o, receiptInfo);

      if (existingRow > 0) {
        ordersSheet.getRange(existingRow, 1, 1, rowData.length).setValues([rowData]);
      } else {
        ordersSheet.appendRow(rowData);
      }

      // Send email alert to store owner
      sendOrderEmailNotification(o, receiptInfo, data.adminEmail);

      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        message: "Order logged and email notification sent successfully",
        orderId: o.id,
        receiptUrl: receiptInfo ? receiptInfo.url : ""
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // Case 2: Contact Lead (WhatsApp / Chatbot)
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

    // Case 3: Batch Sync (Sync All existing orders)
    if (data.type === "batch_sync" && data.orders) {
      var sheet = ss.getSheetByName("Orders & Payments");
      data.orders.forEach(function(ord) {
        var existing = findOrderRow(sheet, ord.id);
        var row = formatOrderRow(ord, null);
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

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "active",
    message: "LAYORA Google Sheet Webhook is active and connected to sheet: " + TARGET_SPREADSHEET_ID
  })).setMimeType(ContentService.MimeType.JSON);
}

// Built-in Test function to run directly inside Apps Script editor
function testSync() {
  setupSheets();
  var ss = getSpreadsheet();
  var sheet = ss.getSheetByName("Orders & Payments");
  Logger.log("Connected to Spreadsheet: " + ss.getName());
  var testOrder = {
    id: "TEST-ALERT-" + Math.floor(1000 + Math.random() * 9000),
    createdAt: new Date().toISOString(),
    customerName: "Layora Verified Customer",
    phone: "+92 339 0131877",
    email: Session.getActiveUser().getEmail(),
    city: "Lahore",
    address: "Model Town, Block C, Lahore",
    items: [{ name: "Blush Vanilla Festive Suit", quantity: 1, size: "M", price: 8500 }],
    totalAmount: 8500,
    paymentMethod: "jazzcash",
    paymentStatus: "paid",
    transactionId: "JC-992014812",
    status: "paid",
    notes: "Apps Script direct test order"
  };
  var row = formatOrderRow(testOrder, null);
  sheet.appendRow(row);
  sendOrderEmailNotification(testOrder, null, Session.getActiveUser().getEmail());
  Logger.log("Successfully logged test row and sent email alert to: " + Session.getActiveUser().getEmail());
}
`;
