/**
 * ONE POINT – ASSURED TECH ZONE (NextGen Organisation)
 * Google Apps Script for Enquiry Management System
 * 
 * Target Spreadsheet: "ONE POINT – ENQUIRY MANAGEMENT"
 * Tabs handled:
 * 1. All Enquiries
 * 2. Scholarships
 * 3. Education Loans
 * 4. Government Schemes
 * 5. Admissions
 * 6. Other Services
 */

const SHEET_NAMES = {
  ALL: "All Enquiries",
  SCHOLARSHIPS: "Scholarships",
  EDUCATION_LOANS: "Education Loans",
  GOVERNMENT_SCHEMES: "Government Schemes",
  ADMISSIONS: "Admissions",
  OTHER_SERVICES: "Other Services",
};

const HEADERS = [
  "Submission ID",
  "Date and Time",
  "Applicant Name",
  "Mobile Number",
  "Email",
  "District",
  "Taluk",
  "Scheme Name",
  "Category",
  "Enquiry Message",
  "Consent",
  "Status",
];

/**
 * Handle HTTP POST from website API endpoint
 */
function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return responseJSON({ success: false, error: "Empty or invalid request body" }, 400);
    }

    const payload = JSON.parse(e.postData.contents);

    // Basic Validation
    const {
      submissionId,
      timestamp,
      fullName,
      mobileNumber,
      email = "",
      district,
      taluk = "",
      schemeName,
      category = "other-opportunities",
      message,
      consent,
      status = "New",
    } = payload;

    if (!submissionId || !fullName || !mobileNumber || !district || !message) {
      return responseJSON(
        { success: false, error: "Missing required fields (submissionId, fullName, mobileNumber, district, message)" },
        400
      );
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();

    // Map internal category keys to spreadsheet tab names
    const categoryTabName = mapCategoryToTabName(category);

    // Prepare row data array matching HEADERS
    const rowData = [
      submissionId,
      timestamp || new Date().toISOString(),
      fullName,
      "'" + mobileNumber, // prefix with single quote to preserve 10-digit text formatting
      email,
      district,
      taluk,
      schemeName || "General Enquiry",
      category,
      message,
      consent ? "Yes" : "No",
      status || "New",
    ];

    // 1. Write to "All Enquiries" Tab
    const allSheet = getOrCreateSheet(ss, SHEET_NAMES.ALL);
    appendWithDeduplication(allSheet, rowData, submissionId);

    // 2. Write to Category-Specific Tab
    if (categoryTabName && categoryTabName !== SHEET_NAMES.ALL) {
      const categorySheet = getOrCreateSheet(ss, categoryTabName);
      appendWithDeduplication(categorySheet, rowData, submissionId);
    }

    return responseJSON({
      success: true,
      submissionId: submissionId,
      message: "Enquiry successfully recorded in Google Sheets",
      recordedIn: [SHEET_NAMES.ALL, categoryTabName].filter(Boolean),
    });
  } catch (err) {
    Logger.log("Error processing enquiry: " + err.toString());
    return responseJSON({ success: false, error: err.toString() }, 500);
  }
}

/**
 * Handle HTTP GET (Useful for testing deployment health)
 */
function doGet(e) {
  return responseJSON({
    status: "online",
    system: "ONE POINT – ASSURED TECH ZONE Enquiry Management",
    organisation: "NextGen Organisation",
    timestamp: new Date().toISOString(),
  });
}

/**
 * Helper to map category to Tab
 */
function mapCategoryToTabName(cat) {
  const normalized = (cat || "").toLowerCase();
  if (normalized.includes("scholarship")) return SHEET_NAMES.SCHOLARSHIPS;
  if (normalized.includes("loan")) return SHEET_NAMES.EDUCATION_LOANS;
  if (normalized.includes("welfare") || normalized.includes("govt") || normalized.includes("government")) {
    return SHEET_NAMES.GOVERNMENT_SCHEMES;
  }
  if (normalized.includes("admission")) return SHEET_NAMES.ADMISSIONS;
  return SHEET_NAMES.OTHER_SERVICES;
}

/**
 * Get or create sheet, adding headers if empty
 */
function getOrCreateSheet(ss, name) {
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
  }
  // If empty, add headers with clean corporate formatting
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
    headerRange.setFontWeight("bold");
    headerRange.setBackground("#0F172A"); // Navy blue
    headerRange.setFontColor("#FFFFFF");
    sheet.setFrozenRows(1);
    // Auto-resize columns
    for (let i = 1; i <= HEADERS.length; i++) {
      sheet.setColumnWidth(i, 160);
    }
  }
  return sheet;
}

/**
 * Append row with basic deduplication check against Submission ID in Column A
 */
function appendWithDeduplication(sheet, rowData, submissionId) {
  const lastRow = sheet.getLastRow();
  if (lastRow > 1) {
    // Check recent 100 entries for duplicate submission ID
    const startRow = Math.max(2, lastRow - 100);
    const numRows = lastRow - startRow + 1;
    const existingIds = sheet.getRange(startRow, 1, numRows, 1).getValues().flat();
    if (existingIds.includes(submissionId)) {
      Logger.log("Duplicate submissionId detected, skipping append: " + submissionId);
      return;
    }
  }
  sheet.appendRow(rowData);
}

/**
 * Utility to return JSON response
 */
function responseJSON(data, statusCode = 200) {
  const output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}
