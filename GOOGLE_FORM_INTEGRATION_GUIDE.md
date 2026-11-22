# Step-by-Step Guide: How to Integrate the Website Form to a Google Form

This guide explains how to connect the custom-built enquiry form on the **ONE POINT – ASSURED TECH ZONE** website directly to a **Google Form**.

When a student submits the enquiry form on the website, it will silently forward all details directly into your Google Form in the background, which also streams into a connected **Google Sheet** automatically!

---

## 🎯 Why This Approach is Best

- **Zero Ugly Embeds**: Visitors interact with the custom, high-speed website UI.
- **Instant Google Storage**: Submissions land directly in your Google Form responses.
- **1-Click Google Sheet Link**: Google Forms has a native button to link all submissions to a live Google Sheet.
- **Instant Email Alerts**: Google Forms has built-in *"Get email notifications for new responses"*.

---

## Step 1: Create Your Google Form

1. Go to [Google Forms](https://forms.google.com) and click **Blank form**.
2. Title the form:
   ```text
   ONE POINT – Student & Scheme Enquiries
   ```
3. Add the following questions (set question type to **Short answer** or **Paragraph**):
   - **Full Name** *(Short answer)*
   - **Mobile Number** *(Short answer)*
   - **District** *(Short answer)*
   - **Scheme Name** *(Short answer)*
   - **Enquiry Message** *(Paragraph)*
   - **Email Address** *(Short answer)*
   - **Taluk / Locality** *(Short answer)*
   - **Education Qualification** *(Short answer)*
   - **Submission ID** *(Short answer)*

---

## Step 2: Get Pre-Filled Link to Extract `entry` IDs

Every field in Google Forms has a unique code called an `entry` ID (e.g. `entry.184729104`). Here is the easiest way to find yours:

1. In your Google Form editor, click the **Three Dots (⋮)** in the top right corner.
2. Select **"Get pre-filled link"**.
3. In the new page that opens, type recognizable placeholder text into each field:
   - Full Name: `TestName`
   - Mobile Number: `9876543210`
   - District: `Bengaluru`
   - Scheme Name: `Scholarship`
   - Enquiry Message: `HelpNeeded`
   - Email Address: `test@email.com`
   - Taluk: `North`
   - Education Qualification: `Degree`
   - Submission ID: `OP-001`
4. Click **"Get link"** at the bottom, then click **"Copy link"**.

---

## Step 3: Inspect the Copied URL

Paste the copied link into a text editor. It will look like this:

```text
https://docs.google.com/forms/d/e/1FAIpQLSfZABC123456789/viewform?usp=pp_url&entry.1012345=TestName&entry.2098765=9876543210&entry.3045678=Bengaluru&entry.4089123=Scholarship&entry.5067890=HelpNeeded&entry.6012345=test%40email.com&entry.7023456=North&entry.8034567=Degree&entry.9045678=OP-001
```

Notice the two critical parts:
1. **The Base URL**:
   Change `/viewform` to `/formResponse`:
   ```text
   https://docs.google.com/forms/d/e/1FAIpQLSfZABC123456789/formResponse
   ```
2. **The Field Entry IDs**:
   - `entry.1012345` corresponds to Full Name
   - `entry.2098765` corresponds to Mobile Number
   - `entry.3045678` corresponds to District
   - `entry.4089123` corresponds to Scheme Name
   - `entry.5067890` corresponds to Enquiry Message
   - `entry.6012345` corresponds to Email Address
   - `entry.7023456` corresponds to Taluk
   - `entry.8034567` corresponds to Qualification
   - `entry.9045678` corresponds to Submission ID

---

## Step 4: Add into `.env.local`

In your website root folder, create or edit `.env.local` and paste your extracted values:

```env
GOOGLE_FORM_URL="https://docs.google.com/forms/d/e/1FAIpQLSfZABC123456789/formResponse"
GOOGLE_FORM_ENTRY_FULL_NAME="entry.1012345"
GOOGLE_FORM_ENTRY_MOBILE="entry.2098765"
GOOGLE_FORM_ENTRY_DISTRICT="entry.3045678"
GOOGLE_FORM_ENTRY_SCHEME="entry.4089123"
GOOGLE_FORM_ENTRY_MESSAGE="entry.5067890"
GOOGLE_FORM_ENTRY_EMAIL="entry.6012345"
GOOGLE_FORM_ENTRY_TALUK="entry.7023456"
GOOGLE_FORM_ENTRY_QUALIFICATION="entry.8034567"
GOOGLE_FORM_ENTRY_SUBMISSION_ID="entry.9045678"
```

For production hosting on **Vercel**:
- Go to Project Settings > **Environment Variables**
- Add the above keys and values.

---

## Step 5: Link Google Form to a Google Sheet (Optional but Recommended)

1. In your Google Form editor, click the **Responses** tab at the top.
2. Click **"Link to Sheets"** (the green spreadsheet icon).
3. Select **"Create a new spreadsheet"** and click **Create**.
4. Every time someone submits the enquiry form on your website, a new row will instantly appear in this Google Sheet in real time!

---

## Step 6: Enable Email Alerts on Submission

1. In Google Form > **Responses** tab, click the **Three Dots (⋮)** next to the Google Sheets icon.
2. Check **"Get email notifications for new responses"**.
3. Now, whenever an applicant submits an enquiry on One Point, you will instantly receive an email alert with their details.
