/**
 * Centralized Editorial & Structured Data for Sambhrama Gold Company.
 *
 * STRICT COMPLIANCE POLICY:
 * - Never invent a founding year, branch counts, customer statistics, certifications, or awards.
 * - Certificates and Testimonials arrays hold only verified, approved entries supplied by the company.
 * - Real Estate portfolio and Loan products do not fabricate unverified projects, interest rates, or regulatory licenses.
 */

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  iconName:
    | "Scale"
    | "Microscope"
    | "IndianRupee"
    | "ClipboardCheck"
    | "ShieldCheck"
    | "HeartHandshake"
    | "Award"
    | "Eye"
    | "Sparkles";
}

export interface ProcessStep {
  stepNumber: string;
  title: string;
  description: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  highlights: string[];
  ctaText: string;
  ctaLink: string;
}

export interface VentureOverviewItem {
  id: "real-estate" | "loans" | "gold";
  title: string;
  subtitle: string;
  description: string;
  path: string;
  imageUrl: string;
  imageAlt: string;
  highlights: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export type CertificateCategory =
  | "Company Registrations"
  | "Applicable Business Licenses"
  | "Professional Certifications"
  | "Awards/Recognitions";

export interface CertificateItem {
  id: string;
  title: string;
  category: CertificateCategory;
  issuer: string;
  referenceNote?: string;
  fileUrl: string;
  fileType: "image" | "pdf";
  verified: boolean;
}

export interface TestimonialItem {
  id: string;
  customerName: string;
  location?: string;
  reviewContent: string;
  rating?: number; // 1 - 5 optional
  customerImageUrl?: string;
  videoUrl?: string;
  approved: boolean;
}

export interface RealEstateProjectItem {
  id: string;
  title: string;
  category: "Residential" | "Commercial" | "Plot / Development";
  location: string;
  status: string;
  summary: string;
  imageUrl?: string;
  verified: boolean;
}

export const whyChooseFeatures: FeatureItem[] = [
  {
    id: "transparent-evaluation",
    title: "Transparent Gold Evaluation",
    description:
      "Every evaluation is conducted openly in your presence with clear explanations of weight and purity readings.",
    iconName: "Eye",
  },
  {
    id: "professional-testing",
    title: "Professional Testing",
    description:
      "We utilize non-destructive scientific purity assessment methodologies so your ornaments remain unharmed during inspection.",
    iconName: "Microscope",
  },
  {
    id: "competitive-pricing",
    title: "Competitive Pricing",
    description:
      "Valuations are aligned with our published 22K and 24K reference rates per gram, subject to verified purity and net weight.",
    iconName: "IndianRupee",
  },
  {
    id: "simple-selling-process",
    title: "Simple Selling Process",
    description:
      "A structured, respectful step-by-step workflow designed to eliminate unnecessary delays or complicated paperwork.",
    iconName: "ClipboardCheck",
  },
  {
    id: "secure-transactions",
    title: "Secure Transactions",
    description:
      "Complete documentation, identity verification compliance, and secure settlement handling in a confidential office environment.",
    iconName: "ShieldCheck",
  },
  {
    id: "customer-focused-service",
    title: "Customer-Focused Service",
    description:
      "Dedicated specialists provide courteous guidance with zero obligation until you formally confirm the valuation offer.",
    iconName: "HeartHandshake",
  },
];

export const homeSellingSteps: ProcessStep[] = [
  {
    stepNumber: "01",
    title: "Contact",
    description:
      "Reach out via our online enquiry form, phone, or WhatsApp to schedule your consultation or ask preliminary questions.",
  },
  {
    stepNumber: "02",
    title: "Visit Office",
    description:
      "Visit our office with your gold items, the original customer purchase bill/invoice, and valid government-issued identity and address proof.",
  },
  {
    stepNumber: "03",
    title: "Gold Testing",
    description:
      "Our specialists perform careful, transparent purity testing and weight measurement in your presence.",
  },
  {
    stepNumber: "04",
    title: "Valuation",
    description:
      "Receive a clear buying offer calculated from verified net gold weight, karat purity, and our published reference rate.",
  },
  {
    stepNumber: "05",
    title: "Transaction Completion",
    description:
      "Upon your acceptance, purchase bill verification, and KYC completion, the transaction is documented and settled through approved payment channels.",
  },
];

export const sellGoldPageSteps: ProcessStep[] = [
  {
    stepNumber: "01",
    title: "Customer Enquiry",
    description:
      "Submit your gold details online or contact our team to plan your visit and confirm required documents including your purchase bill.",
  },
  {
    stepNumber: "02",
    title: "Gold & Bill Verification",
    description:
      "Each ornament or coin is inspected in your presence alongside your customer purchase bill/invoice, hallmark details, and purity.",
  },
  {
    stepNumber: "03",
    title: "Gold Valuation",
    description:
      "We calculate a transparent valuation based on net gold weight, verified purity, and current company reference rates.",
  },
  {
    stepNumber: "04",
    title: "Price Confirmation",
    description:
      "Review the itemized offer at your comfort. We proceed only after your explicit written confirmation.",
  },
  {
    stepNumber: "05",
    title: "Transaction Completion",
    description:
      "Complete mandatory purchase bill and KYC documentation to receive settlement in accordance with company policy and regulatory norms.",
  },
];

export const acceptedGoldCategories = [
  {
    title: "Old Gold",
    description:
      "Heirloom or long-held gold ornaments and traditional pieces evaluated respectfully for their true intrinsic gold content (customer purchase bill required).",
  },
  {
    title: "Used Gold Jewellery",
    description:
      "Everyday or occasional wear necklaces, bangles, rings, chains, and bracelets assessed accurately by net weight and purity (customer purchase bill required).",
  },
  {
    title: "Gold Coins",
    description:
      "22K and 24K gold coins, bars, and medallions verified through non-destructive testing alongside the purchase invoice.",
  },
  {
    title: "Broken Gold Jewellery",
    description:
      "Damaged, mismatched, or incomplete gold ornaments valued purely on their verified gold purity and net weight with purchase bill verification.",
  },
  {
    title: "Other Eligible Gold Items",
    description:
      "Other genuine gold articles subject to customer purchase bill verification, ownership confirmation, purity testing, and company compliance policies.",
  },
];

export const homeServices: ServiceItem[] = [
  {
    id: "gold-buying",
    title: "Gold Buying",
    description:
      "Direct, dignified purchase of old, used, or broken gold jewellery and coins with transparent evaluation and mandatory purchase bill verification.",
    highlights: ["22K & 24K Gold Accepted", "Purchase Bill Required", "Compliant KYC Process"],
    ctaText: "Sell Your Gold",
    ctaLink: "/sell-your-gold",
  },
  {
    id: "gold-valuation",
    title: "Gold Valuation",
    description:
      "Itemized assessment of net weight and karat purity aligned with administrator-published reference rates per gram.",
    highlights: ["In-Person Calculation", "Net Weight Clarity", "No-Obligation Offer"],
    ctaText: "Request Valuation",
    ctaLink: "/sell-your-gold#sell-gold-enquiry",
  },
  {
    id: "gold-purity-testing",
    title: "Gold Purity Testing",
    description:
      "Professional, non-destructive verification of gold purity conducted right before your eyes by trained specialists.",
    highlights: ["Non-Destructive Method", "Accurate Karat Reading", "Transparent Inspection"],
    ctaText: "Learn About Testing",
    ctaLink: "/ventures/gold",
  },
  {
    id: "gold-enquiries",
    title: "Gold-Related Enquiries",
    description:
      "Personal guidance on mandatory purchase bill & KYC documents, eligible gold items, and current reference rates before you visit.",
    highlights: ["Dedicated Assistance", "Documentation Guidance", "Prompt Follow-Up"],
    ctaText: "Contact Our Team",
    ctaLink: "/contact",
  },
];

export const venturesData: VentureOverviewItem[] = [
  {
    id: "gold",
    title: "Gold Division",
    subtitle: "Transparent Gold Buying, Purity Testing & Valuation",
    description:
      "Our flagship gold division offers ethical gold buying, scientific purity verification, and accurate valuation grounded in complete transparency.",
    path: "/ventures/gold",
    imageUrl: "/images/venture-gold.jpg",
    imageAlt: "Traditional Indian 22K gold jewellery and 24K coins on a crimson cushion beside a precision weighing scale",
    highlights: [
      "Direct Buying of Old & Used Gold",
      "Non-Destructive Purity Testing",
      "Transparent Rate Per Gram Valuation",
    ],
  },
  {
    id: "real-estate",
    title: "Real Estate Division",
    subtitle: "Residential & Commercial Property Advisory",
    description:
      "Structured property consultation and real estate services connecting clients with residential and commercial property opportunities.",
    path: "/ventures/real-estate",
    imageUrl: "/images/venture-real-estate.jpg",
    imageAlt: "Contemporary Indian residential and commercial architectural complex at golden hour",
    highlights: [
      "Residential Property Enquiries",
      "Commercial Space Consultation",
      "Transparent Documentation Support",
    ],
  },
  {
    id: "loans",
    title: "Loans & Financial Enquiries",
    subtitle: "Structured Financing Consultation & Guidance",
    description:
      "Dedicated consultation for financing and loan requirements with clear documentation guidance and personalized requirement assessment.",
    path: "/ventures/loans",
    imageUrl: "/images/venture-loans.jpg",
    imageAlt: "Indian financial consultation desk with advisor and client reviewing loan documents",
    highlights: [
      "Personalized Requirement Assessment",
      "Clear Eligibility & Document Guidance",
      "Confidential Consultation Process",
    ],
  },
];

export const coreValues = [
  {
    title: "Transparency",
    description:
      "Every step—from weighing and purity testing to final price confirmation—is conducted openly in front of the customer.",
  },
  {
    title: "Trust",
    description:
      "We build lasting relationships by honoring our commitments and providing honest, pressure-free consultations.",
  },
  {
    title: "Integrity",
    description:
      "Strict adherence to ethical business practices, accurate measurements, and statutory KYC compliance.",
  },
  {
    title: "Customer Satisfaction",
    description:
      "A welcoming, dignified environment where every client receives attentive, respectful service.",
  },
  {
    title: "Professional Service",
    description:
      "Trained specialists, standardized workflows, and clear communication across our Gold, Real Estate, and Loans divisions.",
  },
];

export const companyHistoryEditorial = {
  heading: "Our Background & Philosophy",
  paragraphs: [
    "Sambhrama Gold Company was established with a clear purpose: to bring dignity, clarity, and professionalism to gold selling and diversified client advisory services.",
    "Recognizing that customers parting with personal or family gold deserve complete honesty, we designed our evaluation workflow around visible testing, accurate weighing, and clear communication—ensuring every customer understands how their valuation is derived before making a decision.",
    "Alongside our core Gold operations, Sambhrama extends its commitment to trust and structured service across Real Estate and Loans enquiries, serving individuals and families with integrity.",
  ],
};

export const sellGoldFAQs: FAQItem[] = [
  {
    question: "How do I sell my gold at Sambhrama Gold Company?",
    answer:
      "You can start by submitting an enquiry on our website or contacting our office directly. Bring your gold items along with the customer purchase bill/invoice and valid government-issued identity and address proof to our office, where we conduct purity testing and weighing in your presence before presenting a buying offer.",
  },
  {
    question: "Is the customer purchase bill required to sell gold?",
    answer:
      "Yes. By company compliance policy, the customer purchase bill (original purchase invoice/receipt) is required along with valid government-issued photo ID and address proof to verify lawful ownership before completing any gold buying transaction.",
  },
  {
    question: "How does the gold valuation process work?",
    answer:
      "Our specialists first separate or account for any non-gold attachments (such as stones, beads, or wax) to determine the net gold weight. We then test the karat purity using non-destructive methods and apply our current reference rate for that purity level. The final buying offer depends on verified gold purity, net weight, and company policy.",
  },
  {
    question: "What types of gold items are eligible for sale?",
    answer:
      "We evaluate Old Gold, Used Gold Jewellery, Gold Coins, Broken Gold Jewellery, and other eligible genuine gold items owned by the seller. All items require the customer purchase bill and standard KYC compliance verification.",
  },
  {
    question: "What documents are required to sell gold?",
    answer:
      "Customers are required to bring: (1) The customer purchase bill / purchase invoice for the gold items, and (2) Valid government-issued photo identification and address proof (such as Aadhaar Card, PAN Card, Voter ID, or Passport).",
  },
  {
    question: "How long does the evaluation and transaction process take?",
    answer:
      "Standard purity testing and valuation typically take only a short time during your in-office appointment, depending on the number of items being assessed and verification of your purchase bill and KYC documents.",
  },
  {
    question: "What payment methods are used for settlement?",
    answer:
      "Once the valuation is confirmed and the customer purchase bill and KYC documentation are verified, settlements are processed through secure, compliant payment channels (such as bank transfer / NEFT / RTGS / IMPS or other permitted modes) in accordance with company policy and applicable statutory regulations.",
  },
];

/**
 * Verified Certificates Registry
 * IMPORTANT: Only certificates that have been explicitly supplied and verified are marked `verified: true`.
 * Empty by default until official registration documents/PDFs are uploaded by management.
 */
export const verifiedCertificates: CertificateItem[] = [];

/**
 * Verified Testimonials Registry
 * IMPORTANT: Never fabricate customer names, reviews, ratings, or Google review counts.
 * Only genuine, approved reviews with `approved: true` are rendered.
 */
export const approvedTestimonials: TestimonialItem[] = [];

/**
 * Verified Real Estate Portfolio Registry
 * Editable list of verified projects. Empty by default so no fictional developments are shown.
 */
export const verifiedRealEstateProjects: RealEstateProjectItem[] = [];
