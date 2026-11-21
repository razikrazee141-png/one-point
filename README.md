# ONE POINT – ASSURED TECH ZONE

> **"Education. Empowerment. Digital Accessibility."**  
> *"One destination. Multiple solutions. Better opportunities."*  
> Operating under **NextGen Organisation**

A modern, responsive, production-ready web application for **ONE POINT – ASSURED TECH ZONE**, an independent digital public service and student-support organisation operating across Karnataka.

---

## 🌟 Key Features

1. **Brand Identity & Governance**
   - Deep navy blue, royal blue, white, and subtle gold/red brand palette matching the official corporate identity.
   - Prominent, transparent notices communicating that One Point is an **independent service organisation operating under NextGen Organisation** and **not a government department**.

2. **Complete Page Architecture**
   - **Home (`/`)**: Hero section, service highlights, featured opportunities, why choose One Point, 4-step workflow, NextGen stewardship.
   - **About Us (`/about`)**: Mission, Vision, Core Values (*Accessibility, Transparency, Reliability, Empowerment, Innovation*), NextGen parentage, operational governance.
   - **Services (`/services`)**: In-depth breakdown of the 4 service categories:
     - *Education Support* (Scholarships, Education loans, Admissions assistance, Career guidance)
     - *Government Scheme Assistance* (Welfare scheme info, Eligibility guidance, Application assistance, Documentation guidance)
     - *Digital Services* (Online applications, Documentation assistance, Essential digital services)
     - *Technology Solutions* (Digital platforms, Technology-enabled public service solutions)
   - **Schemes & Opportunities (`/schemes`)**: Dynamic directory with category filters (*All Schemes, Scholarships, Education Loans, Government Welfare, Admissions, Other Opportunities*), search filter, dynamic scheme cards.
   - **Individual Scheme Details (`/schemes/[slug]`)**: Dedicated scheme pages with benefits, eligibility criteria, required documents checklist, step-by-step application process, important dates/deadlines, official portal link, independent disclaimer, and embedded enquiry form.
   - **Contact (`/contact`)**: Contact form, configurable placeholders (phone, WhatsApp, email, office address, working hours), FAQ accordion, and social links.
   - **Legal Pages**: Privacy Policy (`/privacy-policy`) and Terms & Conditions (`/terms-and-conditions`).

3. **Custom Built-In Enquiry Form System**
   - Built directly into the website (zero Google Forms embeds).
   - Collects:
     - **Required**: Full Name, Mobile Number (10-digit Indian mobile validation), District (dropdown of all 31 Karnataka districts), Scheme Name (auto-populated based on the page), Enquiry Message.
     - **Optional**: Email Address, Taluk / Locality, Education Qualification.
     - **Mandatory Consent Checkbox**.
   - Generates unique tracking **Submission ID** (e.g., `OP-2611-9771`) for each enquiry.
   - Real-time client-side and server-side validation.
   - Silent honeypot anti-spam protection and submission rate limiting.

4. **Google Sheets + Google Apps Script Integration**
   - Automatic recording of enquiries into Google Spreadsheet named:  
     **`ONE POINT – ENQUIRY MANAGEMENT`**
   - Manages tabs:
     1. `All Enquiries`
     2. `Scholarships`
     3. `Education Loans`
     4. `Government Schemes`
     5. `Admissions`
     6. `Other Services`
   - Ready-to-deploy script located in `google-apps-script/Code.gs`.
   - Complete setup guide in `GOOGLE_SHEETS_SETUP.md`.
   - Server-side API endpoint `/api/enquiry` prevents private credential exposure to frontend clients.

5. **Extensible Scheme Management**
   - New schemes can be added or updated without touching UI code by editing `src/data/schemes.ts`.
   - Contact details and phone numbers can be updated in `src/config/site.ts`.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Add your Google Apps Script Web App URL:
```env
GOOGLE_APPS_SCRIPT_URL="https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec"
```
*(If left empty, the site operates in local demonstration mode, logging enquiries and issuing valid Submission IDs).*

### 3. Run Development Server
```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
pnpm build
pnpm start
```

---

## 📊 Google Sheets Setup Quick Reference

1. Create a new Google Sheet named **`ONE POINT – ENQUIRY MANAGEMENT`**.
2. Open **Extensions** > **Apps Script**.
3. Paste the contents of [`google-apps-script/Code.gs`](file:///c:/Users/Mohammed%20Rayif/OneDrive/Documents/NextGen/onepint-site/google-apps-script/Code.gs).
4. Click **Deploy** > **New deployment** > **Web app** (Execute as: *Me*, Who has access: *Anyone*).
5. Paste the generated Web App URL into your `.env.local` or Vercel Environment Variables.
6. For full details, see [`GOOGLE_SHEETS_SETUP.md`](file:///c:/Users/Mohammed%20Rayif/OneDrive/Documents/NextGen/onepint-site/GOOGLE_SHEETS_SETUP.md).

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Backend Sync**: Next.js API Routes + Google Apps Script Web App
- **Database**: Google Sheets (`ONE POINT – ENQUIRY MANAGEMENT`)
- **Deployment**: Vercel ready
