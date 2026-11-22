export interface SiteConfig {
  name: string;
  descriptor: string;
  fullName: string;
  tagline: string;
  supportingStatement: string;
  parentOrg: string;
  disclaimer: string;
  shortDisclaimer: string;
  contact: {
    whatsapp: string;
    whatsappDisplay: string;
    whatsappUrl: string;
    phone: string;
    phoneDisplay: string;
    address: {
      line1: string;
      line2: string;
      city: string;
      state: string;
      pincode: string;
    };
    workingHours: string;
  };
  social: {
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
    youtube: string;
  };
  districtsKarnataka: string[];
}

export const siteConfig: SiteConfig = {
  name: "ONE POINT",
  descriptor: "ASSURED TECH ZONE",
  fullName: "ONE POINT – ASSURED TECH ZONE",
  tagline: "Education. Empowerment. Digital Accessibility.",
  supportingStatement: "One destination. Multiple solutions. Better opportunities.",
  parentOrg: "NextGen Organisation",
  disclaimer:
    "ONE POINT – ASSURED TECH ZONE is an independent digital public service and student-support organisation operating under NextGen Organisation. ONE POINT is NOT a government department, government agency, or government-authorised entity unless specific authorisations are separately established. We provide independent guidance, application assistance, and digital facilitation. We do not guarantee approval for any third-party or government scheme.",
  shortDisclaimer:
    "Independent service organisation operating under NextGen Organisation. Not a government agency.",
  contact: {
    whatsapp: "918197803617",
    whatsappDisplay: "Official WhatsApp Assistance",
    whatsappUrl: "https://wa.me/918197803617?text=Hello%20One%20Point%20Team%2C%20I%20would%20like%20assistance%20with%20an%20educational%20scheme.",
    phone: "+918197803617",
    phoneDisplay: "Official Student Helpline",
    address: {
      line1: "Tech Zone Public Assistance Network",
      line2: "Operating across Karnataka District Network",
      city: "Bengaluru & Karnataka District Hubs",
      state: "Karnataka",
      pincode: "560001",
    },
    workingHours: "Monday – Saturday: 9:30 AM to 6:30 PM",
  },
  social: {
    facebook: "https://facebook.com/onepointtechzone",
    twitter: "https://twitter.com/onepointtech",
    instagram: "https://instagram.com/onepointtechzone",
    linkedin: "https://linkedin.com/company/onepoint-techzone",
    youtube: "https://youtube.com/@onepointtechzone",
  },
  districtsKarnataka: [
    "Bagalkot",
    "Ballari (Bellary)",
    "Belagavi (Belgaum)",
    "Bengaluru Rural",
    "Bengaluru Urban",
    "Bidar",
    "Chamarajanagar",
    "Chikkaballapur",
    "Chikkamagaluru",
    "Chitradurga",
    "Dakshina Kannada",
    "Davanagere",
    "Dharwad",
    "Gadag",
    "Hassan",
    "Haveri",
    "Kalaburagi (Gulbarga)",
    "Kodagu",
    "Kolar",
    "Koppal",
    "Mandya",
    "Mysuru (Mysore)",
    "Raichur",
    "Ramanagara",
    "Shivamogga (Shimoga)",
    "Tumakuru (Tumkur)",
    "Udupi",
    "Uttara Kannada (Karwar)",
    "Vijayanagara",
    "Yadgir",
    "Other / Outside Karnataka",
  ],
};
