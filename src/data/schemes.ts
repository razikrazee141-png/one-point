export type SchemeCategory =
  | "scholarships"
  | "education-loans"
  | "government-welfare"
  | "admissions"
  | "other-opportunities";

export interface ImportantDate {
  label: string;
  value: string;
  isTentative?: boolean;
}

export interface Scheme {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  category: SchemeCategory;
  categoryLabel: string;
  eligibilitySummary: string;
  fullDescription: string;
  benefits: string[];
  eligibilityCriteria: string[];
  requiredDocuments: string[];
  applicationProcess: string[];
  importantDates: ImportantDate[];
  officialWebsite?: string;
  image?: string;
  badge?: string;
  featured?: boolean;
  isPlaceholder: boolean;
  targetAudience: string;
  updatedAt: string;
}

export const SCHEME_CATEGORIES: { id: SchemeCategory | "all"; label: string }[] = [
  { id: "all", label: "All Schemes" },
  { id: "scholarships", label: "Scholarships" },
  { id: "education-loans", label: "Education Loans" },
  { id: "government-welfare", label: "Government Welfare" },
  { id: "admissions", label: "Admissions" },
  { id: "other-opportunities", label: "Other Opportunities" },
];

export const SCHEMES: Scheme[] = [
  // 1. EXTRACTED RECENT SCHEME: Directorate of Minorities Fee Reimbursement Scheme
  {
    id: "SCH-REAL-001",
    slug: "karnataka-minorities-fee-reimbursement-scheme-2025-26",
    title: "Directorate of Minorities Fee Reimbursement Scheme 2025–26 (Additional Opportunity)",
    shortDescription:
      "Special additional application window officially opened by the Directorate of Minorities, Government of Karnataka, for eligible minority students pursuing MBBS, PG Medical, Engineering, and other professional/technical courses.",
    category: "scholarships",
    categoryLabel: "Scholarships",
    eligibilitySummary:
      "Minority students in Karnataka studying MBBS / Medical, PG Medical, Engineering, and recognized Technical/Professional courses.",
    fullDescription:
      "The Directorate of Minorities, Government of Karnataka, has officially issued a major update providing an additional opportunity for eligible minority students to submit online applications for the Fee Reimbursement Scheme for the academic year 2025–26. Previously, several colleges and universities failed to update students' academic records within the prescribed timeline, preventing eligible candidates from submitting on time. This additional window ensures that no deserving candidate is deprived of legitimate fee reimbursement benefits.",
    benefits: [
      "Tuition fee reimbursement directly sanctioned under Karnataka Directorate of Minorities norms",
      "Coverage across professional disciplines: MBBS, PG Medical, Engineering, and Technical streams",
      "Protection from financial hardship for minority families pursuing costly professional degrees",
      "Assistance with college e-attestation and university portal record synchronization via One Point Tech Zone",
    ],
    eligibilityCriteria: [
      "Must be a domicile resident of Karnataka",
      "Must belong to notified minority communities (Muslim, Christian, Jain, Buddhist, Sikh, Parsi)",
      "Currently enrolled in MBBS / Medical Courses, PG Medical Courses, Engineering Courses, or other approved Professional & Technical Courses",
      "College / University must have completed academic details entry on the state portal",
      "Valid Income and Caste Certificate issued by competent revenue authority",
    ],
    requiredDocuments: [
      "Aadhaar Card linked to active bank account (NPCI / DBT mapped)",
      "College Admission Allotment Order and current year Fee Receipt",
      "Income & Caste Certificate with valid RD number",
      "Previous Semester / Academic Mark Cards",
      "Bonafide Certificate / College Identity Card",
      "Bank Passbook copy showing IFSC and Account Number",
    ],
    applicationProcess: [
      "Verify student academic status and e-attestation on the SSP portal",
      "Review eligibility credentials at One Point Tech Zone",
      "Submit digital application via the official Karnataka State Scholarship Portal (SSP)",
      "Submit acknowledgment copy to college scholarship nodal officer for college verification",
      "Track sanction order and Direct Benefit Transfer (DBT) credit",
    ],
    importantDates: [
      { label: "Application Start Date", value: "14 November 2026", isTentative: false },
      { label: "Last Date to Apply", value: "30 November 2026", isTentative: false },
      { label: "Application Window Status", value: "Additional Official Opportunity (Active)", isTentative: false },
    ],
    officialWebsite: "https://ssp.karnataka.gov.in/",
    badge: "Big Update • Additional Window",
    featured: true,
    isPlaceholder: false,
    targetAudience: "MBBS, PG Medical, Engineering & Professional Technical Students",
    updatedAt: "2026-11-21",
  },

  // 2. EXTRACTED RECENT SCHEME: Karnataka Nursing Incentive Scheme 2026–27
  {
    id: "SCH-REAL-002",
    slug: "karnataka-nursing-incentive-scheme-2026-27",
    title: "Karnataka Nursing Incentive Scheme 2026–27 (₹25,000 Incentive)",
    shortDescription:
      "Government of Karnataka Directorate of Minorities financial incentive of ₹25,000 for eligible minority community students enrolled in B.Sc Nursing and GNM Nursing courses.",
    category: "scholarships",
    categoryLabel: "Scholarships",
    eligibilitySummary:
      "Karnataka minority students pursuing B.Sc Nursing or GNM Nursing with annual family income up to ₹2.50 Lakh.",
    fullDescription:
      "Under the Directorate of Minorities, the Government of Karnataka has announced the Karnataka Nursing Incentive Scheme 2026–27. To encourage students from minority communities to pursue essential healthcare careers, the government provides a direct incentive grant of ₹25,000. This financial assistance helps cover training fees, books, clinical aprons, and examination expenses. Applications are processed through the official Karnataka Seva Sindhu / Seva One portal.",
    benefits: [
      "Direct incentive grant of ₹25,000 disbursed to eligible students",
      "Supports students undergoing rigorous B.Sc Nursing and GNM clinical training",
      "Reduces debt burden for healthcare students and their families",
      "Complete document readiness and Seva Sindhu portal submission support at One Point Tech Zone",
    ],
    eligibilityCriteria: [
      "Must be a permanent resident of Karnataka",
      "Must belong to an eligible notified minority community (Muslim, Christian, Jain, Buddhist, Sikh, Parsi)",
      "Must be actively studying B.Sc Nursing or GNM (General Nursing & Midwifery) in a recognized institution",
      "Annual family income limit must not exceed ₹2.50 Lakh (₹2,50,000)",
      "Compliance with terms and conditions specified in the official Directorate of Minorities notification",
    ],
    requiredDocuments: [
      "Aadhaar Card of the applicant",
      "Valid Income Certificate (Family income within ₹2.50 Lakh ceiling)",
      "Valid Minority Community / Caste Certificate",
      "Proof of admission / study certificate for B.Sc Nursing or GNM course",
      "Current academic fee receipt from the nursing institution",
      "Bank Account details seeded with Aadhaar for DBT transfer",
    ],
    applicationProcess: [
      "Check income certificate validity and course enrollment verification",
      "Submit online application via the official Seva Sindhu / Seva One portal",
      "Upload verified certificates and college admission confirmation",
      "Obtain application reference acknowledgement number",
      "Departmental verification and direct sanction transfer",
    ],
    importantDates: [
      { label: "Application Starting Date", value: "16 November 2026", isTentative: false },
      { label: "Last Date to Apply", value: "31 December 2026", isTentative: false },
      { label: "Incentive Quantum", value: "₹25,000 Direct Benefit", isTentative: false },
    ],
    officialWebsite: "https://sevaone.karnataka.gov.in/services/",
    badge: "₹25,000 Incentive Grant",
    featured: true,
    isPlaceholder: false,
    targetAudience: "B.Sc Nursing & GNM Nursing Students",
    updatedAt: "2026-11-21",
  },

  // 3. EXTRACTED RECENT SCHEME: SSP Scholarship 2026–27 (Final Opportunity Window)
  {
    id: "SCH-REAL-003",
    slug: "karnataka-ssp-scholarship-2026-27-final-opportunity",
    title: "SSP Scholarship 2026–27: Final Month to Apply (No More Extensions)",
    shortDescription:
      "Crucial deadline alert for Karnataka students applying for Pre-Matric and Post-Matric SSP scholarships. Official notice confirms this is the final month to apply with no further extension announced.",
    category: "scholarships",
    categoryLabel: "Scholarships",
    eligibilitySummary:
      "All eligible Pre-Matric and Post-Matric students in Karnataka across schools, PUC, Degree, Diploma, and PG courses.",
    fullDescription:
      "The State Scholarship Portal (SSP), Government of Karnataka, is currently conducting its final intake cycle for the academic year 2026–27. The state authorities have issued a clear public alert notifying students that this is their final opportunity to submit SSP applications, with NO further extensions scheduled. The scheme covers Pre-Matric school scholarships, Post-Matric college scholarships, fee reimbursements, and maintenance allowances. Students are urged not to wait until the final deadline.",
    benefits: [
      "Direct monetary scholarship and maintenance allowances credited to bank accounts",
      "Tuition and exam fee concessions for qualifying socio-economic categories",
      "Unified single-window access across Social Welfare, BCWD, Minorities, and Tribal Welfare departments",
      "Assistance with e-attestation, Aadhaar seeding, and application status correction at One Point",
    ],
    eligibilityCriteria: [
      "Domicile resident of the State of Karnataka",
      "Enrolled in recognized schools (Pre-Matric, Class 1–10) or colleges/universities (Post-Matric, PUC, ITI, Diploma, Degree, PG, Medical, Engineering)",
      "Satisfying departmental income criteria (Social Welfare, Minorities, BCWD, Tribal Welfare)",
      "Mandatory Aadhaar card linked with active bank account and NPCI mapping",
    ],
    requiredDocuments: [
      "Student Aadhaar Card and linked mobile number",
      "SATS (Student Achievement Tracking System) Number for school students / College Registration Number",
      "Income & Caste Certificate with active RD Number",
      "College / School Fee Receipt and Admission Details",
      "E-attestation of marks cards and bonafide credentials",
      "Bank passbook seeded with Aadhaar",
    ],
    applicationProcess: [
      "Create or log in to Student Account on https://ssp.karnataka.gov.in/",
      "Enter SATS ID / College Registration Details and verify e-attestation numbers",
      "Submit scholarship request mapping relevant department entitlement",
      "Generate submission acknowledgment slip for institutional submission",
      "Track DBT payment status via SSP portal",
    ],
    importantDates: [
      { label: "Application Window", value: "Final Month Active Cycle", isTentative: false },
      { label: "Extension Status", value: "No Further Extension Announced", isTentative: false },
      { label: "Action Urgency", value: "Apply Immediately Before Portal Closure", isTentative: false },
    ],
    officialWebsite: "https://ssp.karnataka.gov.in/",
    badge: "Urgent • Final Chance",
    featured: true,
    isPlaceholder: false,
    targetAudience: "Pre-Matric, Post-Matric & Higher Education Students in Karnataka",
    updatedAt: "2026-11-21",
  },

  // 4. Subsidised Higher Education Loan Assistance
  {
    id: "SCH-002",
    slug: "subsidised-higher-education-loan-facilitation-sample",
    title: "Subsidised Technical & Professional Education Loan Assistance",
    shortDescription:
      "End-to-end guidance for students seeking low-interest or interest-subsidy education loans from nationalised banks and state finance corporations.",
    category: "education-loans",
    categoryLabel: "Education Loans",
    eligibilitySummary: "Students admitted to recognized professional, engineering, medical, or management courses.",
    fullDescription:
      "One Point simplifies the complex banking and subsidy process for higher education financing. We assist families in identifying appropriate bank credit lines, assembling banking dossiers, applying for central/state interest subsidy schemes, and addressing collateral or co-applicant requirements.",
    benefits: [
      "Access to information on government interest subsidy schemes (e.g., during moratorium period)",
      "Assistance with Vidya Lakshmi portal registration and bank branch coordination",
      "Zero hidden facilitation fees — transparent student-first guidance",
      "Structured documentation package preparation to avoid repetitive bank queries",
    ],
    eligibilityCriteria: [
      "Confirmed admission in recognized university/institute through merit or entrance exam",
      "Eligible co-applicant (parent/guardian) with steady source of income or farming background",
      "Course of study must fall under approved technical/vocational/degree curricula",
      "Compliance with bank-specified credit guidelines and KYC norms",
    ],
    requiredDocuments: [
      "Admission confirmation letter & fee structure breakdown from the institution",
      "Entrance exam scorecard / Rank proof",
      "KYC documents of student and co-applicant (Aadhaar, PAN Card, Voter ID)",
      "Bank statements of co-borrower for past 6 months",
      "Income proof / ITR / Form 16 / Salary slips / Land revenue records",
      "Collateral security documents (where applicable for loan quantum exceeding thresholds)",
    ],
    applicationProcess: [
      "Eligibility evaluation and loan amount structuring at One Point",
      "Compilation and formatting of academic and financial credentials",
      "Online application routing through formal educational loan platforms",
      "Sanction letter monitoring and disbursement tranche coordination",
    ],
    importantDates: [
      { label: "Admissions & Loan Intake", value: "Open throughout Academic Intake Cycles", isTentative: false },
      { label: "Interest Subsidy Application Deadline", value: "Configurable per bank notification", isTentative: true },
    ],
    officialWebsite: "https://www.vidyalakshmi.co.in/",
    featured: true,
    isPlaceholder: true,
    targetAudience: "Aspiring Engineers, Doctors, Management & Degree Pursuers",
    updatedAt: "2026-11-20",
  },

  // 5. State Citizen Welfare Access Programme
  {
    id: "SCH-003",
    slug: "state-citizen-welfare-digital-access-programme-sample",
    title: "Citizen Welfare & Public Benefit Scheme Access Programme",
    shortDescription:
      "Comprehensive assistance for rural and semi-urban households to discover, verify eligibility, and enroll in state citizen welfare entitlements.",
    category: "government-welfare",
    categoryLabel: "Government Welfare",
    eligibilitySummary: "Eligible families, farmers, artisans, and women seeking social security & welfare benefits.",
    fullDescription:
      "Many eligible citizens miss out on crucial public welfare schemes due to digital barriers and documentation hurdles. One Point acts as a dependable community digital bridge, assisting citizens with Aadhaar linkage, ration card updates, social security pension filings, and direct benefit transfer (DBT) verification.",
    benefits: [
      "Direct guidance on monthly financial security and healthcare entitlement schemes",
      "Correction and synchronization of personal details across identity registries",
      "SMS and ground assistance on application acceptance and sanction orders",
      "Protection from fraudulent middlemen and unauthorized fees",
    ],
    eligibilityCriteria: [
      "Criteria vary by specific state department (Revenue, Social Welfare, Women & Child Development)",
      "Valid state resident identification credentials",
      "Specific socio-economic category or age parameters according to each designated scheme",
    ],
    requiredDocuments: [
      "Aadhaar Card with linked active mobile number",
      "Ration Card (BPL / AAY / Priority Household)",
      "Caste & Income Certificate (where relevant)",
      "Bank Passbook with active DBT (Direct Benefit Transfer) seeding",
      "Disability certificate / Senior citizen proof (for pension schemes)",
    ],
    applicationProcess: [
      "Citizen walk-in or website enquiry registration",
      "Eligibility diagnosis using scheme criteria matrices",
      "Document scanning and upload via authorised public service gateways",
      "Generation of official tracking acknowledgment slip for citizen records",
    ],
    importantDates: [
      { label: "Enrollment Cycle", value: "Continuous / Subject to Government Portal Uptime", isTentative: false },
      { label: "Annual Verification Window", value: "As notified by relevant department", isTentative: true },
    ],
    officialWebsite: "https://sevasindhu.karnataka.gov.in/",
    featured: false,
    isPlaceholder: true,
    targetAudience: "Families, Women Beneficiaries, Senior Citizens, Unorganized Workers",
    updatedAt: "2026-11-20",
  },

  // 6. Professional Degree & Vocational Admission Counselling
  {
    id: "SCH-004",
    slug: "stem-degree-counselling-admissions-guidance-sample",
    title: "Professional Degree & Vocational Admission Counselling Assistance",
    shortDescription:
      "Holistic guidance for high school and pre-university graduates navigating entrance examinations, seat counseling, and institutional admissions.",
    category: "admissions",
    categoryLabel: "Admissions",
    eligibilitySummary: "Class 10, Class 12, Pre-University (PUC), and Diploma holders seeking higher education seats.",
    fullDescription:
      "Navigating government seat quotas, institutional counselling rounds, cutoff rankings, and document verification requires timely and reliable counsel. One Point supports students with counselling calendar tracking, mock choice filling, document readiness, and fee waiver verification.",
    benefits: [
      "Personalized course mapping based on student aptitude and academic scores",
      "Guidance through state CET / NEET / institutional counselling rounds",
      "Timely alert notifications for critical option entry dates and seat acceptance windows",
      "Fee concession and seat reservation rule clarity",
    ],
    eligibilityCriteria: [
      "Completion of qualifying examination (10th / 12th / PUC / Diploma or equivalent)",
      "Participation in respective entrance examination (CET, COMEDK, NEET, or institute tests)",
      "Valid category reservation certificates (if claiming reservation quotas)",
    ],
    requiredDocuments: [
      "SSLC / 10th Standard Marks Card",
      "PUC / 12th Standard Marks Card",
      "Entrance Exam Admit Card and Rank Card",
      "Study Certificates (7+ years Karnataka schooling for domicile quota where applicable)",
      "Rural Study / Kannada Medium Certificates (if claiming reservation)",
      "Transfer Certificate and Migration Certificate",
    ],
    applicationProcess: [
      "Student profile creation and rank review",
      "Mock option entry and preference list optimization",
      "Online counselling portal registration and document upload",
      "Reporting and physical verification assistance at nodal centres",
    ],
    importantDates: [
      { label: "Counselling Schedule Announcement", value: "Subject to Official Examination Board Schedule", isTentative: true },
      { label: "Option Entry Rounds", value: "Phase 1 & Phase 2 Calendars (TBA)", isTentative: true },
    ],
    officialWebsite: "https://cetonline.karnataka.gov.in/kea/",
    featured: false,
    isPlaceholder: true,
    targetAudience: "School Leavers, PUC Science/Commerce/Arts Graduates, Diploma Students",
    updatedAt: "2026-11-20",
  },

  // 7. Vocational Skills & Digital Literacy Empowerment
  {
    id: "SCH-006",
    slug: "vocational-skills-digital-certification-empowerment-sample",
    title: "Vocational Skills & Digital Literacy Empowerment Initiative",
    shortDescription:
      "Support for youth seeking subsidized vocational upskilling, government-certified IT programs, and industrial apprentice placements.",
    category: "other-opportunities",
    categoryLabel: "Other Opportunities",
    eligibilitySummary: "Youth aged 18–35 seeking market-relevant technical trades and digital certifications.",
    fullDescription:
      "This initiative facilitates access to state skill development missions, certified digital fabrication, modern office applications, web technologies, and apprentice registration schemes. One Point assists youth in choosing accredited courses and accessing course fee subsidies.",
    benefits: [
      "Government-recognized skill certification pathway assistance",
      "Zero-cost or highly subsidized training enrollment guidance",
      "National Apprenticeship Promotion Scheme (NAPS) portal onboarding",
      "Hands-on digital lab orientation at One Point Assured Tech Zones",
    ],
    eligibilityCriteria: [
      "Age between 18 and 35 years at the time of application",
      "Minimum 10th pass / ITI / Diploma / Any Graduate",
      "Commitment to complete full-time or weekend training modules",
    ],
    requiredDocuments: [
      "Aadhaar Card",
      "Educational qualification certificates",
      "Recent passport-size photo",
      "Bank passbook copy",
    ],
    applicationProcess: [
      "Candidate skill profiling and course counseling",
      "Portal registration and batch scheduling",
      "Nodal center attendance tracking",
      "Certification assessment registration support",
    ],
    importantDates: [
      { label: "Monthly Batch Registration", value: "Rolling Admissions every month", isTentative: false },
      { label: "Certification Assessment Dates", value: "Quarterly Schedule (TBA)", isTentative: true },
    ],
    officialWebsite: "https://skillconnect.kaushalkar.com/",
    featured: false,
    isPlaceholder: true,
    targetAudience: "Youth, Job Seekers, ITI Graduates, Upskilling Candidates",
    updatedAt: "2026-11-20",
  },
];

export function getAllSchemes(): Scheme[] {
  return SCHEMES;
}

export function getFeaturedSchemes(): Scheme[] {
  return SCHEMES.filter((scheme) => scheme.featured);
}

export function getSchemeBySlug(slug: string): Scheme | undefined {
  return SCHEMES.find((scheme) => scheme.slug === slug);
}

export function getSchemesByCategory(category: SchemeCategory | "all"): Scheme[] {
  if (category === "all") {
    return SCHEMES;
  }
  return SCHEMES.filter((scheme) => scheme.category === category);
}
