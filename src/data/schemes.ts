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
  {
    id: "SCH-001",
    slug: "post-secondary-higher-education-scholarship-sample",
    title: "Post-Secondary Merit & Means Scholarship Support",
    shortDescription:
      "Financial assistance facilitation for undergraduate and postgraduate students pursuing professional, technical, or general degree courses.",
    category: "scholarships",
    categoryLabel: "Scholarships",
    eligibilitySummary: "Undergraduate / Postgraduate students with demonstrated financial need or academic merit.",
    fullDescription:
      "This placeholder profile represents upcoming post-secondary scholarship schemes facilitated by One Point. Through our tech zone, students receive eligibility screening, document verification, portal registration assistance, and end-to-end application guidance. Detailed government or trust scholarship criteria will be updated once official notifications are gazetted.",
    benefits: [
      "Assistance with annual tuition fee concession and maintenance allowance applications",
      "One-on-one document validation to prevent application rejections",
      "Tracking of application progress across official portals",
      "Guidance for renewal applications across subsequent academic years",
    ],
    eligibilityCriteria: [
      "Applicant must be enrolled in an approved degree/diploma program (Criteria placeholder)",
      "Satisfy designated family annual income ceiling (Details to be updated)",
      "Minimum qualifying percentage in previous qualifying examination (Placeholder)",
      "Valid domicile in the state of Karnataka (Subject to scheme regulations)",
    ],
    requiredDocuments: [
      "Previous Academic Marks Cards / Transcripts",
      "Income & Caste Certificate (issued by competent revenue authority)",
      "Proof of College Admission / Bonafide Certificate",
      "Fee Receipt for the current academic session",
      "Aadhaar Card linked with active bank account",
      "Recent passport-sized photographs",
    ],
    applicationProcess: [
      "Initial enquiry submission and document preliminary review at One Point Tech Zone",
      "Verification of student credentials and category entitlement mapping",
      "Submission of digital application via the official state scholarship portal",
      "College-level verification tracking and acknowledgement archiving",
      "Periodic status updates and disbursement confirmation support",
    ],
    importantDates: [
      { label: "Application Window Opens", value: "Subject to Official Notification (TBA)", isTentative: true },
      { label: "Last Date for Online Submission", value: "To Be Announced by Admin", isTentative: true },
      { label: "Document Verification Deadline", value: "Pending Official Schedule", isTentative: true },
    ],
    officialWebsite: "https://example.gov.in/scholarships-portal",
    featured: true,
    isPlaceholder: true,
    targetAudience: "College & University Students",
    updatedAt: "2026-11-20",
  },
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
      { label: "Interest Subsidy Application Deadline", value: "Configurable per scheme announcement", isTentative: true },
    ],
    officialWebsite: "https://example.gov.in/education-loan-portal",
    featured: true,
    isPlaceholder: true,
    targetAudience: "Aspiring Engineers, Doctors, Management & Degree Pursuers",
    updatedAt: "2026-11-20",
  },
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
    officialWebsite: "https://example.gov.in/citizen-welfare-portal",
    featured: true,
    isPlaceholder: true,
    targetAudience: "Families, Women Beneficiaries, Senior Citizens, Unorganized Workers",
    updatedAt: "2026-11-20",
  },
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
    officialWebsite: "https://example.gov.in/counselling-portal",
    featured: true,
    isPlaceholder: true,
    targetAudience: "School Leavers, PUC Science/Commerce/Arts Graduates, Diploma Students",
    updatedAt: "2026-11-20",
  },
  {
    id: "SCH-005",
    slug: "women-student-stem-fellowship-support-sample",
    title: "Girls & Women in STEM Higher Education Fellowship Support",
    shortDescription:
      "Specialized facilitation connecting female students with private corporate CSR trusts, state grants, and STEM higher education fellowships.",
    category: "scholarships",
    categoryLabel: "Scholarships",
    eligibilitySummary: "Female candidates enrolled in B.Tech, MCA, Data Science, Biotechnology, and Pure Sciences.",
    fullDescription:
      "To encourage greater participation of women in technical education and research, numerous private corporations and public foundations sponsor specialized fellowships. One Point guides young women through SOP drafting, interview readiness, portal registration, and institutional verification.",
    benefits: [
      "Mentorship and access to corporate CSR fellowship programs",
      "Laptop/learning device grant guidance under qualifying programs",
      "Networking support with women leaders in technology",
      "Multi-year financial stipends for qualified scholars",
    ],
    eligibilityCriteria: [
      "Female students enrolled in accredited 1st or 2nd year STEM programs",
      "Consistent academic performance (e.g. 65%+ or equivalent CGPA in previous board)",
      "Compliance with specific trust/foundation income guidelines",
    ],
    requiredDocuments: [
      "Academic mark sheets from 10th standard onwards",
      "College ID card and current enrollment certificate",
      "Statement of Purpose (SOP) / Career Aspiration essay",
      "Income certificate of parents / guardians",
      "Bank account details (in applicant's own name)",
    ],
    applicationProcess: [
      "Profile evaluation and matching with open CSR / Trust fellowship calls",
      "Statement of purpose guidance and CV structuring",
      "Application submission on partner trust portals",
      "Interview prep session for shortlisted candidates",
    ],
    importantDates: [
      { label: "Fellowship Call Open", value: "Subject to Trust Calendar (TBA)", isTentative: true },
      { label: "Application Close", value: "To Be Configured upon Notification", isTentative: true },
    ],
    officialWebsite: "https://example.org/women-in-stem",
    featured: false,
    isPlaceholder: true,
    targetAudience: "Female Students in Technical and Scientific Disciplines",
    updatedAt: "2026-11-20",
  },
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
    officialWebsite: "https://example.gov.in/skill-development",
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
