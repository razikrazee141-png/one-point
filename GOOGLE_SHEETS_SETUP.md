# ONE POINT – ASSURED TECH ZONE: Google Sheets Integration Guide

This document describes how to deploy the **Google Apps Script** backend to automatically record website enquiries directly into a structured Google Spreadsheet.

Operating Organisation: **NextGen Organisation**  
Project: **ONE POINT – ASSURED TECH ZONE**

---

## 1. Create the Google Spreadsheet

1. Go to [Google Sheets](https://sheets.new) while logged into your organisation's Google account.
2. Rename the spreadsheet to:
   ```text
   ONE POINT – ENQUIRY MANAGEMENT
   ```
3. You can leave the default sheet as is; the script will automatically create, format, and color-code the required tabs upon the first submission:
   - `All Enquiries`
   - `Scholarships`
   - `Education Loans`
   - `Government Schemes`
   - `Admissions`
   - `Other Services`

---

## 2. Add Google Apps Script

1. In your newly created Google Sheet, click **Extensions** in the top menu and select **Apps Script**.
2. Replace any default code in the editor with the entire content of:
   ```text
   google-apps-script/Code.gs
   ```
   *(Located in the website project repository).*
3. Rename the Apps Script project to `ONE POINT Enquiry API`.
4. Click the **Save** (disk icon) or press `Ctrl + S`.

---

## 3. Deploy as a Web App

1. In the upper-right corner of the Apps Script editor, click **Deploy** > **New deployment**.
2. Click the gear icon (**Select type**) and choose **Web app**.
3. Fill in the deployment details:
   - **Description**: `ONE POINT Production Enquiry Webhook`
   - **Execute as**: `Me (your email address)`
   - **Who has access**: `Anyone` *(Crucial so that the Next.js server endpoint can POST without requiring OAuth popups)*
4. Click **Deploy**.
5. Grant required permissions when prompted:
   - Click *Review permissions*
   - Choose your Google account
   - Click *Advanced* (bottom left)
   - Click *Go to ONE POINT Enquiry API (unsafe)*
   - Click *Allow*
6. Once deployed, copy the **Web app URL** (it will look like `https://script.google.com/macros/s/AKfycb.../exec`).

---

## 4. Connect with the Website

1. In the root directory of your website project, create or edit `.env.local`:
   ```bash
   GOOGLE_APPS_SCRIPT_URL="https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec"
   ```
2. For production deployment on **Vercel**:
   - Go to your Project Settings > **Environment Variables**
   - Add Key: `GOOGLE_APPS_SCRIPT_URL`
   - Value: `https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec`
   - Apply to *Production, Preview, and Development*.

---

## 5. Security & Architecture Workflow

```
[User Browser Form]
        │
        ▼ (Client-side validation & mobile formatting)
[/api/enquiry (Next.js Server API)]
        │  • Server-side field validation
        │  • Honeypot anti-spam check
        │  • Unique Submission ID generation (e.g., OP-2026-XXXX)
        │  • Timestamp generation
        │  • Deduplication buffer
        ▼
[Google Apps Script Web App]
        │
        ├──► Appends record to "All Enquiries" Tab
        └──► Appends record to relevant Category Tab
```

### Safety Features
- **Zero Frontend Credential Exposure**: The Google Apps Script URL is kept on the Next.js server side. The browser never sees private endpoints or Google credentials.
- **Spam Prevention**: Silent honeypot trap field and submission rate limiters.
- **Graceful Fallback**: If the environment variable `GOOGLE_APPS_SCRIPT_URL` is not yet configured, the website API generates the Submission ID, logs the enquiry safely on the server, and informs the response payload that it is running in local demonstration mode.

---

## 6. Columns Recorded in Every Sheet

| Column | Header | Description |
|--------|--------|-------------|
| A | `Submission ID` | Unique tracking code (e.g. `OP-173200-8421`) |
| B | `Date and Time` | ISO / Human readable Indian Standard Time |
| C | `Applicant Name` | Full name of applicant |
| D | `Mobile Number` | 10-digit phone number (formatted as text) |
| E | `Email` | Optional email address |
| F | `District` | Karnataka district |
| G | `Taluk` | Optional Taluk / Locality |
| H | `Scheme Name` | Associated scheme or "General Service Assistance" |
| I | `Category` | Scholarships, Education Loans, Government Schemes, etc. |
| J | `Enquiry Message` | Detailed enquiry text |
| K | `Consent` | "Yes" indicating explicit user consent |
| L | `Status` | Initial status: `New` |
