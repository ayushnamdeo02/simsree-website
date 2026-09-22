import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowUpRight,
  Check,
  ClipboardCheck,
  FileText,
  Info,
  ListChecks,
  Minus,
  Plus,
  Users,
} from 'lucide-react';
import PageHero, { HeroButton } from '../components/PageHero';
import { Section, SectionTitle, Tagline, Heading, H5, H6, AccentCard } from '../components/ui';
import { heroImage } from '../lib/heroImage';
import { composeTitle } from '../lib/text';
import { useAdmissionDetailData } from '../lib/useAdmissionDetailData';
import { useKeyFacts, fillFactsDeep } from '../lib/useKeyFacts';

const STEP_ICONS = {
  form: FileText,
  shortlist: Users,
  assessment: ClipboardCheck,
  final: ListChecks,
};

const fallbackBySlug = {
  mms: {
    shortName: 'MMS',
    heroEyebrow: 'MMS · AY 2026-27',
    heroTitle: 'MMS admissions.',
    heroDescription:
      'Everything you need to apply — full eligibility, cycle dates, fees, documents, FAQ, and the application form.',
    heroButtons: [
      { label: 'Start your MMS application', url: '#apply', primary: true },
      { label: 'Get MMS forms & affidavits', url: '/admissions/downloads', primary: false },
      { label: 'Compare all programmes', url: '/admissions', primary: false },
    ],
    stats: [
      { label: 'Cycle', value: 'AY 2026-27', note: 'Notification · Apr 2026' },
      { label: 'Applications', value: 'May — Jun 2026', note: 'Window opens early May · closes 30 Jun' },
      { label: 'Total fees', value: '~₹4.5L', note: '4 instalments · per Govt. of Maharashtra' },
      { label: 'Status', value: 'Pre-launch', note: 'CET dates announced via State CET Cell' },
    ],
    datesEyebrow: 'Key Dates · AY 2026-27',
    datesTitle: 'When does the MMS cycle run?',
    datesTitleHighlight: 'MMS',
    datesSubtitle:
      'A six-stage rolling timeline. Dates are tentative; CET publishes binding dates in the Notification PDF.',
    timeline: [
      { month: 'Apr 2026', label: 'Notification', note: 'Official PDF released' },
      { month: 'May 2026', label: 'Applications open', note: 'Register on CET portal' },
      { month: 'Jun 2026', label: 'Applications close', note: '30 Jun deadline' },
      { month: 'Jul 2026', label: 'Entrance & CAP-PI', note: 'GD-PI counselling' },
      { month: 'Aug 2026', label: 'Result & merit list', note: 'Seat allotment' },
      { month: 'Aug 2026', label: 'Induction', note: 'Session starts', highlight: true },
    ],
    eligibilityEyebrow: 'Eligibility',
    eligibilityTitle: 'See if you qualify.',
    eligibilityTitleHighlight: 'qualify.',
    eligibilitySubtitle:
      'Five criteria a candidate must satisfy. Each is verified during CET counselling and document upload.',
    eligibilityCards: [
      {
        title: "Bachelor's degree",
        description:
          "Any recognised 3-year bachelor's degree (or equivalent four-year programme) from a UGC-recognised university.",
        footnote: 'All streams accepted',
      },
      {
        title: 'Minimum 50%',
        description:
          'You will need a bachelor\'s degree with min 50% (45% reserved), a Maharashtra CET (MMS-CMAT/CET) score, GD + PI, and age 21+.',
        footnote: '45% for reserved',
      },
      {
        title: 'Valid CET / CMAT score',
        description:
          'A valid score in MAH-MMS-CET or CMAT for the relevant academic year. Score must appear in the State CET Cell merit list.',
        footnote: 'CET / CMAT · Current AY only',
      },
      {
        title: 'Domicile / category',
        description:
          'Maharashtra State Home State candidates and All-India candidates both eligible · seat matrix per State CET Cell rules.',
        footnote: '85% MS · 15% AI quota',
      },
      {
        title: 'Age of medical fitness',
        description:
          'Minimum age 21 on the date of admission. Medical fitness certificate at the time of joining.',
        footnote: '21+ · Medically fit',
      },
      {
        title: '{{noQuotaShort}}',
        description:
          'SIMSREE has no management quota, no payment seats, and no agent appointments. All admissions are strictly merit-based, routed through the State CET Cell, Govt. of Maharashtra.',
        footnote: 'Report agents to {{admissionsEmail}}',
        warning: true,
      },
    ],
    processEyebrow: 'Admission Process',
    processTitle: 'How you are selected.',
    processTitleHighlight: 'selected.',
    processSubtitle:
      'The CET Cell publishes the merit list. Counselling decides the allotment. Document verification finalises the seat. Here is the full flow.',
    processSteps: [
      {
        title: 'Register on the State CET Cell portal',
        description:
          'Create your candidate profile at cetcell.mahacet.org with name, photo, signature, category, and bank details.',
        footnote: 'cetcell.mahacet.org · Apr-May 2026',
      },
      {
        title: 'Appear for MAH-MMS-CET / CMAT',
        description:
          'Either the state CET (MAH-MMS-CET, conducted by State CET Cell) or a valid CMAT score. CMAT scores accepted as per the year notification.',
        footnote: 'CET · 200 marks · 2.5 hrs · MCQ',
      },
      {
        title: 'Submit CAP (Central Allotment Process) preferences',
        description:
          'Fill your preferred institutes in order. SIMSREE typically appears at the top for candidates aiming for a Mumbai full-time programme. Lock your preferences before the deadline.',
        footnote: 'CAP I → CAP II → CAP III rounds',
      },
      {
        title: 'Get allotted · document verification',
        description:
          'If allotted SIMSREE in a CAP round, freeze the seat and report to SIMSREE for offline verification (originals + 2 photocopies + photos).',
        footnote: 'Verification at Churchgate campus',
      },
      {
        title: 'GD-PI counselling (institute-level)',
        description:
          'SIMSREE conducts a group discussion + personal interview as part of counselling — used for shortlisting in some categories. Not a re-rank — your CET score remains the primary criterion.',
        footnote: '~30 min total · Churchgate · Weekday',
      },
      {
        title: 'Pay fees · join induction',
        description:
          'Pay first-instalment fees via the State CET Cell payment gateway. Induction week begins early August. Welcome to SIMSREE.',
        footnote: 'First instalment · ~₹1.15L',
        complete: true,
      },
    ],
    feesEyebrow: 'Fees',
    feesTitle: 'What you will pay.',
    feesSubtitle:
      'Approximate breakdown for AY 2026-27. Final fees and revisions appear in the official Notification PDF.',
    feesTotalLabel: 'Programme total',
    feesTotalValue: '~₹4.5L',
    feesTotalNote: 'Across 4 semesters · 2 years',
    feesBreakdown: [
      { label: 'Tuition', value: '~₹3.2L' },
      { label: 'Development', value: '~₹0.4L' },
      { label: 'Library / Lab / Exam', value: '~₹0.6L' },
      { label: 'Caution deposit (refundable)', value: '~₹0.3L' },
    ],
    feesPanels: [
      { label: 'Per instalment', value: '~₹1.15L', note: '4 instalments · 1 per semester' },
      { label: 'Scholarships', value: 'EBC · SC · ST · OBC', note: 'Per Govt. of Maharashtra reimbursement' },
      { label: 'Payment via', value: 'CET Cell portal', note: 'Online · UPI / NEFT / Card' },
    ],
    documentsEyebrow: 'Documents Required',
    documentsTitle: 'What to bring.',
    documentsTitleHighlight: 'bring.',
    documentGroups: [
      {
        title: 'Academic documents',
        items: [
          'SSC mark sheet + certificate',
          'HSC mark sheet + certificate',
          "Bachelor's degree + all-semester mark sheets",
          'CET / CMAT score card',
        ],
      },
      {
        title: 'Personal & reservation',
        items: [
          'Passport-size photographs',
          'Aadhaar / valid government ID',
          'Caste certificate (if applicable)',
          'Domicile certificate (if applicable)',
          'Gap certificate affidavit (if applicable)',
          'Anti-ragging affidavit (mandatory)',
        ],
      },
    ],
    documentsCtaLabel: 'Download all forms (PDF)',
    documentsCtaUrl: '/admissions/downloads',
    faqEyebrow: 'FAQ',
    faqTitle: 'Your questions, answered.',
    faqTitleHighlight: 'answered.',
    faqs: [
      {
        question: 'When does the MMS cycle open this year?',
        answer:
          'May 2026 · check the official Notification PDF on the Downloads page for exact dates.',
      },
      { question: 'What is the entrance pattern?', answer: '' },
      { question: 'Is there hostel accommodation?', answer: '' },
      { question: 'Are scholarships available?', answer: '' },
      { question: 'Whom do I contact for queries?', answer: '' },
    ],
    ctaEyebrow: 'Ready?',
    ctaTitle: 'Start your MMS application.',
    ctaTitleHighlight: 'MMS application.',
    ctaSubtitle:
      'Send the form below — the admissions office replies within 1 business day.',
    ctaButtons: [
      { label: 'Open the application form', url: '#', primary: true },
      { label: 'Download the MMS notification (PDF)', url: '/admissions/downloads', primary: false },
      { label: 'Contact admissions', url: '/contact', primary: false },
    ],
  },

  'msc-finance': {
    shortName: 'M.Sc. Finance',
    heroEyebrow: 'M.Sc. Finance · AY 2026-27',
    heroTitle: 'M.Sc. Finance admissions.',
    heroDescription:
      'Everything you need to apply — full eligibility, cycle dates, fees, documents, FAQ, and the application form.',
    heroButtons: [
      { label: 'Start your M.Sc. Finance application', url: '#apply', primary: true },
      { label: 'Get M.Sc. Finance forms', url: '/admissions/downloads', primary: false },
      { label: 'Compare all programmes', url: '/admissions', primary: false },
    ],
    stats: [
      { label: 'Cycle', value: 'AY 2026-27', note: 'Notification · May 2026' },
      { label: 'Applications', value: 'Jun — Jul 2026', note: 'SIMSREE entrance + GD-PI · 40 seats' },
      { label: 'Total fees', value: '~₹3.8L', note: '4 instalments · 2-year programme' },
      { label: 'Status', value: 'Pre-launch', note: 'CFP® partnership track included' },
    ],
    stepsBandTitle: 'Steps for Admission',
    stepsBandSubtitle: 'The Process is as follows:',
    stepsBand: [
      { title: 'Online Application', note: 'Start Your Application', icon: 'form' },
      { title: 'Candidate Shortlisting', note: 'Merit-based screening', icon: 'shortlist' },
      { title: 'Assessment Round', note: 'Entrance + Personal Interview', icon: 'assessment' },
      { title: 'Final Selection List', note: 'Get Your Admission Decision', icon: 'final' },
    ],
    datesEyebrow: 'Key Dates · AY 2026-27',
    datesTitle: 'When does the M.Sc. Finance cycle run?',
    datesTitleHighlight: 'M.Sc. Finance',
    datesSubtitle:
      'A six-stage rolling timeline. Dates are tentative; the official Notification PDF carries the binding schedule.',
    timeline: [
      { month: 'May 2026', label: 'Notification', note: 'Official PDF released' },
      { month: 'Jun 2026', label: 'Applications open', note: 'SIMSREE portal' },
      { month: 'Jul 2026', label: 'Applications close', note: 'Entrance test window' },
      { month: 'Jul 2026', label: 'Entrance & GD-PI', note: 'Churchgate campus' },
      { month: 'Aug 2026', label: 'Merit list', note: 'Seat allotment' },
      { month: 'Aug 2026', label: 'Induction', note: 'Session starts', highlight: true },
    ],
    eligibilityEyebrow: 'Eligibility',
    eligibilityTitle: 'See if you qualify.',
    eligibilityTitleHighlight: 'qualify.',
    eligibilitySubtitle:
      'Six criteria a candidate must satisfy. Each is verified during the entrance and document upload stages.',
    eligibilityCards: [
      {
        title: "Bachelor's degree",
        description:
          "You'll need a bachelor's in Mathematics / Statistics / Economics / Commerce / Engineering, min 50%, plus our entrance test and GD-PI.",
        footnote: 'Quantitative streams preferred',
      },
      {
        title: 'Minimum 50%',
        description:
          "Minimum aggregate of 50% in bachelor's (45% for reserved categories defined by Govt. of Maharashtra).",
        footnote: '45% for reserved',
      },
      {
        title: 'SIMSREE entrance',
        description:
          'Institute-level test · objective + analytical sections · quantitative aptitude, financial literacy, comprehension.',
        footnote: 'Held at Churchgate · ~2 hrs',
      },
      {
        title: 'GD + PI clearance',
        description:
          'Group discussion and personal interview after the entrance. Shortlist is by combined entrance + GD-PI score.',
        footnote: 'Same day or next day slot',
      },
      {
        title: 'CFP® pathway eligibility',
        description:
          'Programme includes a structured Certified Financial Planner pathway · candidates must be open to the additional FPSB India curriculum.',
        footnote: 'Optional but recommended',
      },
      {
        title: '{{noQuotaShort}}',
        description:
          'SIMSREE has no management quota, no payment seats, and no agent appointments. All admissions are strictly merit-based.',
        footnote: 'Report agents to {{admissionsEmail}}',
        warning: true,
      },
    ],
    processEyebrow: 'Admission Process',
    processTitle: "How you're selected.",
    processTitleHighlight: 'selected.',
    processSubtitle:
      'Sit our entrance test (objective + analytical), then a group discussion and personal interview. The official notification PDF publishes each May-July, and includes the CFP® certification pathway.',
    processSteps: [
      {
        title: 'Register on the SIMSREE admissions portal',
        description:
          'Create your candidate profile · upload photo, signature, category certificate, marksheets · pay the application fee.',
        footnote: 'SIMSREE.ORG/ADMISSIONS · May-Jun 2026',
      },
      {
        title: 'Appear for the SIMSREE entrance test',
        description:
          'Two-hour objective + analytical test covering quantitative aptitude, financial literacy, English, and logical reasoning.',
        footnote: '200 marks · MCQ · Churchgate centre',
      },
      {
        title: 'Shortlist for GD-PI',
        description:
          'Shortlist of ~3× the seat strength (≈120 candidates) called for group discussion and personal interview.',
        footnote: 'Shortlist published within 10 days',
      },
      {
        title: 'GD + PI · same-day evaluation',
        description:
          '20-minute group discussion + 15-minute personal interview by a faculty + industry panel. Scored on coherence, depth, motivation.',
        footnote: 'Held at Churchgate · Weekday',
      },
      {
        title: 'Merit list · 40-seat allotment',
        description:
          'Combined entrance + GD + PI score forms the merit list. Reserved-category candidates are listed per Govt. of Maharashtra rules.',
        footnote: '40 seats · Merit only',
      },
      {
        title: 'Pay fees · join induction',
        description:
          'Pay first-instalment fees online. Induction starts early August with the CFP® pathway orientation.',
        footnote: 'First instalment · ~₹0.95L',
        complete: true,
      },
    ],
    feesEyebrow: 'Fees',
    feesTitle: "What you'll pay.",
    feesSubtitle:
      'Approximate breakdown for AY 2026-27. Final fees and any revisions appear in the official Notification PDF.',
    feesTotalLabel: 'Programme total',
    feesTotalValue: '~₹3.8L',
    feesTotalNote: 'Across 4 semesters · 2 years',
    feesBreakdown: [
      { label: 'Tuition', value: '~₹2.7L' },
      { label: 'Development', value: '~₹0.4L' },
      { label: 'Library / Lab / Exam', value: '~₹0.4L' },
      { label: 'Caution deposit (refundable)', value: '~₹0.3L' },
    ],
    feesPanels: [
      { label: 'Per instalment', value: '~₹0.95L', note: '4 instalments · 1 per semester' },
      { label: 'Scholarships', value: 'EBC · SC · ST · OBC', note: 'Per Govt. of Maharashtra reimbursement' },
      { label: 'Payment via', value: 'SIMSREE portal', note: 'UPI / NEFT / Card' },
    ],
    feesFootnote:
      'Fees are subject to revision per Government of Maharashtra approval. CFP® pathway exams are billed separately by FPSB India. Hostel is not provided by SIMSREE.',
    documentsEyebrow: 'Documents Required',
    documentsTitle: 'What to bring.',
    documentsTitleHighlight: 'bring.',
    documentGroups: [
      {
        title: 'Academic documents',
        items: [
          'SSC mark sheet + certificate',
          'HSC mark sheet + certificate',
          "Bachelor's degree + all-semester mark sheets",
          'Entrance score card (if applicable)',
        ],
      },
      {
        title: 'Personal & reservation',
        items: [
          'Passport-size photographs',
          'Aadhaar / valid government ID',
          'Caste certificate (if applicable)',
          'Domicile certificate (if applicable)',
          'Gap certificate affidavit (if applicable)',
          'Anti-ragging affidavit (mandatory)',
        ],
      },
    ],
    documentsCtaLabel: 'Download all forms (PDF)',
    documentsCtaUrl: '/admissions/downloads',
    faqEyebrow: 'FAQ',
    faqTitle: 'Your questions, answered.',
    faqTitleHighlight: 'answered.',
    faqs: [
      {
        question: 'When does the M.Sc. Finance cycle open this year?',
        answer:
          'Jun 2026 · check the official Notification PDF on the Downloads page for exact dates.',
      },
      { question: 'What is the entrance pattern?', answer: '' },
      { question: 'Is there hostel accommodation?', answer: '' },
      { question: 'Are scholarships available?', answer: '' },
      { question: 'Whom do I contact for queries?', answer: '' },
    ],
    ctaEyebrow: 'Ready?',
    ctaTitle: 'Start your M.Sc. Finance application.',
    ctaTitleHighlight: 'M.Sc. Finance application.',
    ctaSubtitle:
      'Send the form below — the admissions office replies within 1 business day.',
    ctaButtons: [
      { label: 'Open application form', url: '#', primary: true },
      {
        label: 'Download the M.Sc. Finance notification (PDF)',
        url: '/admissions/downloads',
        primary: false,
      },
      { label: 'Contact admissions', url: '/contact', primary: false },
    ],
  },

  mmm: {
    shortName: 'MMM',
    heroEyebrow: 'MMM Executive · AY 2026-27',
    heroTitle: 'MMM Executive admissions.',
    heroDescription:
      'Everything you need to apply — full eligibility, cycle dates, fees, documents, FAQ, and the application form.',
    heroButtons: [
      { label: 'Start your MMM application', url: '#apply', primary: true },
      { label: 'Get MMM forms & affidavits', url: '/admissions/downloads', primary: false },
      { label: 'Compare all programmes', url: '/admissions', primary: false },
    ],
    stats: [
      { label: 'Cohort', value: 'AY 2026-27', note: 'Executive · 3 years · weekends' },
      { label: 'Round 4 closes', value: '30 Jun 2026', note: 'SIMSREE entrance + interview' },
      { label: 'Total fees', value: '~₹2.8L', note: 'Paid by semester · 60 seats' },
      { label: 'Status', value: 'Round 4 · Live', note: 'Apply before 30 June close' },
    ],
    datesEyebrow: 'Key Dates · AY 2026-27',
    datesTitle: 'When does the MMM cycle run?',
    datesTitleHighlight: 'MMM',
    datesSubtitle:
      'A six-stage rolling timeline. Dates are tentative; CET Cell publishes binding dates in the Notification PDF.',
    timeline: [
      { month: 'Jan 2026', label: 'Round 1', note: 'First intake window' },
      { month: 'Mar 2026', label: 'Round 2', note: 'Second window' },
      { month: 'May 2026', label: 'Round 3', note: 'Third window' },
      { month: '30 Jun 2026', label: 'Round 4', note: 'Closes 30 Jun' },
      { month: 'Jul 2026', label: 'Result & merit', note: '60-seat allotment' },
      { month: 'Aug 2026', label: 'Cohort joins', note: 'First weekend session', highlight: true },
    ],
    eligibilityEyebrow: 'Eligibility',
    eligibilityTitle: 'See if you qualify.',
    eligibilityTitleHighlight: 'qualify.',
    eligibilitySubtitle:
      'Six criteria designed for working marketing professionals seeking weekend executive education.',
    eligibilityCards: [
      {
        title: "Bachelor's degree",
        description:
          "3-year bachelor's (or equivalent) from a UGC-recognised university · any stream accepted with marketing work-ex.",
        footnote: 'Any discipline',
      },
      {
        title: 'Minimum 50%',
        description:
          "Minimum aggregate of 50% in bachelor's (45% for reserved categories defined by Govt. of Maharashtra).",
        footnote: '45% for reserved',
      },
      {
        title: 'Valid CET / CMAT score',
        description:
          'Minimum two years of full-time work experience in brand, growth, sales, agency, digital, retail, B2B marketing, or related roles.',
        footnote: 'Verified via payslips + ITRs',
      },
      {
        title: 'Employer NOC',
        description:
          'No Objection Certificate from your current employer permitting weekend attendance at Churchgate for the 3-year duration.',
        footnote: 'Mandatory · Format on Downloads',
      },
      {
        title: 'Entrance + interview',
        description:
          'SIMSREE entrance test followed by a 20-minute panel interview covering brand sense, career trajectory, and motivation.',
        footnote: 'Held at Churchgate · Weekday slot',
      },
      {
        title: '{{noQuotaShort}}',
        description:
          'SIMSREE has no management quota, no payment seats, and no agent appointments. All admissions are strictly merit-based, routed through the State CET Cell, Govt. of Maharashtra.',
        footnote: 'Report agents to {{admissionsEmail}}',
        warning: true,
      },
    ],
    processEyebrow: 'Admission Process',
    processTitle: "How you're selected.",
    processTitleHighlight: 'selected.',
    processSubtitle:
      'The CET Cell publishes the merit list. Counselling decides the allotment. Document verification finalises the seat. Here is the full flow.',
    processSteps: [
      {
        title: 'Register on the SIMSREE admissions portal',
        description:
          'Create your profile · upload bachelor’s, payslips, ITRs, ID proof, photograph, signature · pay the application fee.',
        footnote: 'SIMSREE.ORG/ADMISSIONS · ~30 min',
      },
      {
        title: 'Submit employer NOC',
        description:
          'Upload the signed NOC from your current employer permitting weekend-class attendance for the 3-year programme.',
        footnote: 'Format · Downloadable PDF',
      },
      {
        title: 'SIMSREE entrance test',
        description:
          '90-minute objective + analytical paper · marketing basics, consumer behaviour, English, logical reasoning.',
        footnote: '150 marks · MCQ',
      },
      {
        title: 'Panel interview',
        description:
          '20-minute panel interview by 2 faculty + 1 senior alumni · covers career trajectory, brand POVs, motivation.',
        footnote: 'Same day as entrance',
      },
      {
        title: 'Merit list · 60 seats allotted',
        description:
          'Combined entrance + interview + work-ex score forms the merit list. Result is published within 3 weeks of the round closing.',
        footnote: '60 seats · 3-year cohort',
      },
      {
        title: 'Pay fees · join induction',
        description:
          'Pay first-semester instalment online. Orientation Saturday in early August · classes start the following weekend.',
        footnote: 'First instalment · ~₹0.55L',
        complete: true,
      },
    ],
    feesEyebrow: 'Fees',
    feesTitle: "What you'll pay.",
    feesSubtitle:
      'Approximate breakdown for the 3-year MMM Executive cohort starting AY 2026-27.',
    feesTotalLabel: 'Programme total',
    feesTotalValue: '~₹2.8L',
    feesTotalNote: 'Across 6 semesters · 3 years',
    feesBreakdown: [
      { label: 'Tuition', value: '~₹2.1L' },
      { label: 'Library / Lab / Exam', value: '~₹0.3L' },
      { label: 'Industry interaction levy', value: '~₹0.2L' },
      { label: 'Caution deposit (refundable)', value: '~₹0.2L' },
    ],
    feesPanels: [
      { label: 'Per instalment', value: '~₹0.55L', note: '6 instalments · 1 per semester' },
      {
        label: 'Employer reimbursement',
        value: 'Many firms cover 50-100%',
        note: 'Check your employer L&D policy',
      },
      { label: 'Payment via', value: 'SIMSREE portal', note: 'UPI / NEFT / Corporate cheque' },
    ],
    feesFootnote:
      'Fees are subject to revision per Government of Maharashtra approval. Final binding fees appear in the round-specific Notification PDF. Hostel is not provided · weekend cohort typically commutes.',
    documentsEyebrow: 'Documents Required',
    documentsTitle: 'What to bring.',
    documentsTitleHighlight: 'bring.',
    documentGroups: [
      {
        title: 'Academic documents',
        items: [
          'SSC mark sheet + certificate',
          'HSC mark sheet + certificate',
          "Bachelor's degree + all-semester mark sheets",
          'Entrance score card (if applicable)',
        ],
      },
      {
        title: 'Personal & reservation',
        items: [
          'Passport-size photographs',
          'Aadhaar / valid government ID',
          'Caste certificate (if applicable)',
          'Domicile certificate (if applicable)',
          'Gap certificate affidavit (if applicable)',
          'Anti-ragging affidavit (mandatory)',
        ],
      },
    ],
    documentsCtaLabel: 'Download all forms (PDF)',
    documentsCtaUrl: '/admissions/downloads',
    faqEyebrow: 'FAQ',
    faqTitle: 'Your questions, answered.',
    faqTitleHighlight: 'answered.',
    faqs: [
      {
        question: 'When does the MMM Executive cycle open this year?',
        answer:
          'Open now · check the official Notification PDF on the Downloads page for exact dates.',
      },
      { question: 'What is the entrance pattern?', answer: '' },
      { question: 'Is there hostel accommodation?', answer: '' },
      { question: 'Are scholarships available?', answer: '' },
      { question: 'Whom do I contact for queries?', answer: '' },
    ],
    ctaEyebrow: 'Ready?',
    ctaTitle: 'Start your MMM application.',
    ctaTitleHighlight: 'MMM application.',
    ctaSubtitle:
      'Send the form below — the admissions office replies within 1 business day.',
    ctaButtons: [
      { label: 'Open application form', url: '#', primary: true },
      { label: 'Download the MMM notification (PDF)', url: '/admissions/downloads', primary: false },
      { label: 'Contact admissions', url: '/contact', primary: false },
    ],
  },

  mfm: {
    shortName: 'MFM',
    heroEyebrow: 'MFM Executive · AY 2026-27',
    heroTitle: 'MFM Executive admissions.',
    heroDescription:
      'Everything you need to apply — full eligibility, cycle dates, fees, documents, FAQ, and the application form.',
    heroButtons: [
      { label: 'Start your MFM application', url: '#apply', primary: true },
      { label: 'Get MFM forms & affidavits', url: '/admissions/downloads', primary: false },
      { label: 'Compare all programmes', url: '/admissions', primary: false },
    ],
    stats: [
      { label: 'Cohort', value: 'AY 2026-27', note: 'Executive · 3 years · weekends' },
      { label: 'Round 4 closes', value: '30 Jun 2026', note: 'SIMSREE entrance + interview' },
      { label: 'Total fees', value: '~₹2.8L', note: 'Paid by semester · 60 seats' },
      { label: 'Status', value: 'Round 4 · Live', note: 'Apply before 30 June close' },
    ],
    datesEyebrow: 'Key Dates · AY 2026-27',
    datesTitle: 'When does the MFM cycle run?',
    datesTitleHighlight: 'MFM',
    datesSubtitle: 'Rolling rounds. Round 4 is currently live and closes on 30 June 2026.',
    timeline: [
      { month: 'Jan 2026', label: 'Round 1', note: 'First intake window' },
      { month: 'Mar 2026', label: 'Round 2', note: 'Second window' },
      { month: 'May 2026', label: 'Round 3', note: 'Third window' },
      { month: '30 Jun 2026', label: 'Round 4', note: 'Closes 30 Jun' },
      { month: 'Jul 2026', label: 'Result & merit', note: '60-seat allotment' },
      { month: 'Aug 2026', label: 'Cohort joins', note: 'First weekend session', highlight: true },
    ],
    eligibilityEyebrow: 'Eligibility',
    eligibilityTitle: 'See if you qualify.',
    eligibilityTitleHighlight: 'qualify.',
    eligibilitySubtitle:
      'Six criteria designed for working finance professionals seeking weekend executive education.',
    eligibilityCards: [
      {
        title: "Bachelor's degree",
        description:
          "3-year bachelor's (or equivalent) from a UGC-recognised university · any stream accepted with finance work-ex.",
        footnote: 'Any discipline',
      },
      {
        title: 'Minimum 50%',
        description:
          "Minimum aggregate of 50% in bachelor's (45% for reserved categories defined by Govt. of Maharashtra).",
        footnote: '45% for reserved',
      },
      {
        title: '2+ years finance work-ex',
        description:
          'Minimum two years of full-time work experience in banking, treasury, FP&A, equity research, audit, fintech, or related finance roles.',
        footnote: 'Verified via payslips + ITRs',
      },
      {
        title: 'Employer NOC',
        description:
          'A No Objection Certificate from your current employer permitting weekend attendance at Churchgate for the 3-year duration.',
        footnote: 'Mandatory · Format on Downloads page',
      },
      {
        title: 'Entrance + interview',
        description:
          'SIMSREE entrance test (objective + analytical) followed by a 20-minute panel interview covering career and motivation.',
        footnote: 'Held at Churchgate · Weekday slot',
      },
      {
        title: '{{noQuotaShort}}',
        description:
          'No management quota, no payment seats, no agents. Cohort is selected purely on entrance + interview + work-ex strength.',
        footnote: 'Report agents to {{admissionsEmail}}',
        warning: true,
      },
    ],
    processEyebrow: 'Admission Process',
    processTitle: "How you're selected.",
    processTitleHighlight: 'selected.',
    processSubtitle: 'A six-step flow optimised for working professionals · two weekday slots in total.',
    processSteps: [
      {
        title: 'Register on the SIMSREE admissions portal',
        description:
          'Create your profile · upload bachelor’s, payslips, ITRs, ID proof, photograph, signature · pay the application fee.',
        footnote: 'SIMSREE.ORG/ADMISSIONS · ~30 min',
      },
      {
        title: 'Submit employer NOC',
        description:
          'Upload the signed NOC from your current employer permitting weekend-class attendance for the 3-year programme.',
        footnote: 'Format · Downloadable PDF',
      },
      {
        title: 'SIMSREE entrance test',
        description:
          '90-minute objective + analytical paper · quantitative aptitude, finance basics, English, logical reasoning. Held on a weekday at Churchgate.',
        footnote: '150 marks · MCQ',
      },
      {
        title: 'Panel interview',
        description:
          '20-minute panel interview by 2 faculty + 1 senior alumni · covers career trajectory, motivation, finance fundamentals.',
        footnote: 'Same day as entrance',
      },
      {
        title: 'Merit list · 60 seats allotted',
        description:
          'Combined entrance + interview + work-ex score forms the merit list. Result is published within 3 weeks of the round closing.',
        footnote: '60 seats · 3-year cohort',
      },
      {
        title: 'Pay fees · weekend induction',
        description:
          'Pay first-semester instalment online. Orientation Saturday in early August · classes start the following weekend.',
        footnote: 'First instalment · ~₹0.55L',
        complete: true,
      },
    ],
    feesEyebrow: 'Fees',
    feesTitle: "What you'll pay.",
    feesSubtitle:
      'Approximate breakdown for the 3-year MFM Executive cohort starting AY 2026-27.',
    feesTotalLabel: 'Programme total',
    feesTotalValue: '~₹2.8L',
    feesTotalNote: 'Across 6 semesters · 3 years',
    feesBreakdown: [
      { label: 'Tuition', value: '~₹2.1L' },
      { label: 'Library / Lab / Exam', value: '~₹0.3L' },
      { label: 'Industry interaction levy', value: '~₹0.2L' },
      { label: 'Caution deposit (refundable)', value: '~₹0.2L' },
    ],
    feesPanels: [
      { label: 'Per instalment', value: '~₹0.55L', note: '6 instalments · 1 per semester' },
      {
        label: 'Employer reimbursement',
        value: 'Many firms cover 50-100%',
        note: 'Check your employer L&D policy',
      },
      { label: 'Payment via', value: 'SIMSREE portal', note: 'UPI / NEFT / Corporate cheque' },
    ],
    feesFootnote:
      'Fees are subject to revision per Government of Maharashtra approval. Final binding fees appear in the round-specific Notification PDF. Hostel is not provided · weekend cohort typically commutes.',
    documentsEyebrow: 'Documents Required',
    documentsTitle: 'What to bring.',
    documentsTitleHighlight: 'bring.',
    documentGroups: [
      {
        title: 'Academic documents',
        items: [
          'SSC mark sheet + certificate',
          'HSC mark sheet + certificate',
          "Bachelor's degree + all-semester mark sheets",
          'Entrance score card (if applicable)',
        ],
      },
      {
        title: 'Personal & reservation',
        items: [
          'Passport-size photographs',
          'Aadhaar / valid government ID',
          'Caste certificate (if applicable)',
          'Domicile certificate (if applicable)',
          'Gap certificate affidavit (if applicable)',
          'Anti-ragging affidavit (mandatory)',
        ],
      },
    ],
    documentsCtaLabel: 'Download all forms (PDF)',
    documentsCtaUrl: '/admissions/downloads',
    faqEyebrow: 'FAQ',
    faqTitle: 'Your questions, answered.',
    faqTitleHighlight: 'answered.',
    faqs: [
      {
        question: 'When does the MFM Executive cycle open this year?',
        answer:
          'Open now · check the official Notification PDF on the Downloads page for exact dates.',
      },
      { question: 'What is the entrance pattern?', answer: '' },
      { question: 'Is there hostel accommodation?', answer: '' },
      { question: 'Are scholarships available?', answer: '' },
      { question: 'Whom do I contact for queries?', answer: '' },
    ],
    ctaEyebrow: 'Ready?',
    ctaTitle: 'Start your MFM application.',
    ctaTitleHighlight: 'MFM application.',
    ctaSubtitle:
      'Send the form below — the admissions office replies within 1 business day.',
    ctaButtons: [
      { label: 'Open application form', url: '#', primary: true },
      { label: 'Download the MFM notification (PDF)', url: '/admissions/downloads', primary: false },
      { label: 'Contact admissions', url: '/contact', primary: false },
    ],
  },

  phd: {
    shortName: 'PhD',
    heroEyebrow: 'PhD · AY 2026-27',
    heroTitle: 'PhD admissions.',
    heroDescription:
      'Everything you need to apply — full eligibility, cycle dates, fees, documents, FAQ, and the application form.',
    heroButtons: [
      { label: 'Start your PhD application', url: '#apply', primary: true },
      { label: 'Get PhD forms & affidavits', url: '/admissions/downloads', primary: false },
      { label: 'Compare all programmes', url: '/admissions', primary: false },
    ],
    stats: [
      { label: 'Cohort', value: 'AY 2026-27', note: 'Doctoral · 3-5 years · 8-12 seats' },
      { label: 'Next cycle', value: 'TBA · Aug 2026', note: 'PET + proposal + interview' },
      { label: 'Annual fees', value: '~₹1.5L / yr', note: 'Per Mumbai University / Dr Homi Bhabha SU' },
      { label: 'Latest result', value: 'AY 2025-26', note: 'Announced Sept 2025 · 11 admits' },
    ],
    datesEyebrow: 'Key Dates · AY 2026-27',
    datesTitle: 'When does the PhD cycle run?',
    datesTitleHighlight: 'PhD',
    datesSubtitle:
      'The PhD cycle is on a separate calendar tied to the affiliating university. Dates below are tentative and confirmed via the PET Notification.',
    timeline: [
      { month: 'Aug 2026', label: 'PET Notification', note: 'University portal' },
      { month: 'Sep 2026', label: 'Applications open', note: 'Online form' },
      { month: 'Oct 2026', label: 'PET entrance', note: '3-hour written test' },
      { month: 'Nov 2026', label: 'Proposal submission', note: '2-3k word research proposal' },
      { month: 'Dec 2026', label: 'Faculty interview', note: 'DRC + proposal defence' },
      { month: 'Jan 2027', label: 'Cohort joins', note: 'Coursework begins', highlight: true },
    ],
    eligibilityEyebrow: 'Eligibility',
    eligibilityTitle: 'See if you qualify.',
    eligibilityTitleHighlight: 'qualify.',
    eligibilitySubtitle:
      'Six criteria for the PhD cohort. Selection is competitive · 8-12 seats annually across all disciplines.',
    eligibilityCards: [
      {
        title: "Master's degree",
        description:
          "Master's in Management, Commerce, Economics, Engineering, or a relevant discipline from a UGC-recognised university.",
        footnote: 'Relevant to chosen research area',
      },
      {
        title: 'Minimum 55%',
        description:
          "Minimum aggregate of 55% in master's (50% for reserved categories defined by Govt. of Maharashtra).",
        footnote: '50% for reserved',
      },
      {
        title: 'PET clearance',
        description:
          'Pass the PhD Entrance Test (PET) conducted by the affiliating university. UGC-NET / JRF / GATE qualified candidates may be exempt.',
        footnote: 'NET / JRF / GATE — exemption possible',
      },
      {
        title: 'Research proposal',
        description:
          'A 2,000-3,000 word research proposal in your chosen sub-discipline · problem statement, literature gap, method, expected contribution.',
        footnote: 'Submitted post-PET clearance',
      },
      {
        title: 'Supervisor availability',
        description:
          'A faculty member willing to supervise your research in the proposed area must have an open slot. Reach out to faculty before applying.',
        footnote: 'Max ~8 candidates per supervisor',
      },
      {
        title: 'Cohort competition',
        description:
          'Only 8-12 admits per year across all disciplines. Selection is strictly merit-based · weighted across PET score, proposal, interview, prior research.',
        footnote: '~60-100 applicants per cycle',
        warning: true,
      },
    ],
    processEyebrow: 'Admission Process',
    processTitle: "How you're selected.",
    processTitleHighlight: 'selected.',
    processSubtitle: 'A six-step flow optimised for working professionals · two weekday slots in total.',
    processSteps: [
      {
        title: 'Identify your supervisor & sub-discipline',
        description:
          'Browse the Faculty Directory · email 2-3 faculty whose work aligns with your interest · confirm availability before applying.',
        footnote: 'Faculty Directory · Aug-Sep 2026',
      },
      {
        title: 'Apply on the university portal',
        description:
          "Register on the affiliating university's PhD portal · upload master's mark sheets, ID, NET/JRF/GATE proof if applicable · pay application fee.",
        footnote: 'University portal · ~45 min',
      },
      {
        title: 'PhD Entrance Test (PET)',
        description:
          '3-hour written test · research methodology, statistics, subject-area knowledge, English. NET/JRF/GATE candidates exempt per current notification.',
        footnote: 'Held at affiliated centre · Oct 2026',
      },
      {
        title: 'Submit research proposal',
        description:
          'PET-qualified candidates submit a 2k-3k word research proposal · problem, literature gap, method, expected contribution. Evaluated by DRC.',
        footnote: '2,000-3,000 words · with references',
      },
      {
        title: 'DRC + supervisor interview',
        description:
          '45-minute interview by the Doctoral Research Committee + proposed supervisor · defend your proposal, discuss method, prior research, timeline.',
        footnote: 'Held at Churchgate · Dec 2026',
      },
      {
        title: 'Register · coursework begins',
        description:
          'DRC publishes the final 8-12 admits. Pay first-year fees, register with the affiliating university, begin coursework.',
        footnote: 'First-year fees · ~₹1.5L',
        complete: true,
      },
    ],
    feesEyebrow: 'Fees',
    feesTitle: "What you'll pay.",
    feesTitleHighlight: 'pay.',
    feesSubtitle:
      'PhD fees are set by the affiliating university · approximate annual amounts shown for AY 2026-27.',
    feesTotalLabel: 'Programme total',
    feesTotalValue: '~₹1.5L',
    feesTotalNote: 'Per year programme · fees paid annually',
    feesBreakdown: [
      { label: 'University tuition', value: '~₹0.9L' },
      { label: 'Library / Lab / Research', value: '~₹0.3L' },
      { label: 'DRC + viva fees', value: '~₹0.1L' },
      { label: 'Caution deposit (refundable)', value: '~₹0.2L' },
    ],
    feesPanels: [
      {
        label: 'Fellowships',
        value: 'JRF / UGC / Simarthan',
        note: 'Need + merit-based · check status post-PET',
      },
      { label: 'Thesis submission', value: '~₹0.2L', note: 'One-time · at viva-voce stage' },
      { label: 'Payment via', value: 'University portal', note: 'Annual · NEFT / Card' },
    ],
    feesFootnote:
      'Fees are set and revised by the affiliating university (currently Mumbai University · transitioning to Dr Homi Bhabha State University). Final binding fees appear in the PET Notification PDF.',
    feesFootnoteHighlight: true,
    documentsEyebrow: 'Documents Required',
    documentsTitle: 'What to bring.',
    documentsTitleHighlight: 'bring.',
    documentGroups: [
      {
        title: 'Academic documents',
        items: [
          'SSC mark sheet + certificate',
          'HSC mark sheet + certificate',
          "Bachelor's degree + all-semester mark sheets",
          'Entrance score card (if applicable)',
        ],
      },
      {
        title: 'Personal & reservation',
        items: [
          'Passport-size photographs',
          'Aadhaar / valid government ID',
          'Caste certificate (if applicable)',
          'Domicile certificate (if applicable)',
          'Gap certificate affidavit (if applicable)',
          'Anti-ragging affidavit (mandatory)',
        ],
      },
    ],
    documentsCtaLabel: 'Download all forms (PDF)',
    documentsCtaUrl: '/admissions/downloads',
    faqEyebrow: 'FAQ',
    faqTitle: 'Your questions, answered.',
    faqTitleHighlight: 'answered.',
    faqs: [
      {
        question: 'When does the PhD cycle open this year?',
        answer: 'TBA · check the official Notification PDF on the Downloads page for exact dates.',
      },
      { question: 'What is the entrance pattern?', answer: '' },
      { question: 'Is there hostel accommodation?', answer: '' },
      { question: 'Are scholarships available?', answer: '' },
      { question: 'Whom do I contact for queries?', answer: '' },
    ],
    ctaEyebrow: 'Ready?',
    ctaTitle: 'Start your PhD application.',
    ctaTitleHighlight: 'PhD application.',
    ctaSubtitle:
      'Send the form below — the admissions office replies within 1 business day.',
    ctaButtons: [
      { label: 'Open application form', url: '#', primary: true },
      { label: 'Download the PhD notification (PDF)', url: '/admissions/downloads', primary: false },
      { label: 'Contact admissions', url: '/contact', primary: false },
    ],
  },
};

// The dates label carries the programme name, so it reads correctly per guide.
const sectionsFor = (shortName) => [
  { id: 'dates', label: `${shortName} 2026 key dates` },
  { id: 'eligibility', label: 'Eligibility' },
  { id: 'process', label: 'Process' },
  { id: 'fees', label: 'Fees' },
  { id: 'documents', label: 'Documents' },
  { id: 'faq', label: 'FAQ' },
];

// Figma section pills: yellow tint (dates, fees, documents, FAQ) or Eastern Blue
// Lightest (eligibility, process); SemiBold 16/150 navy, radius 16.
const PILL_TONES = {
  yellow: 'bg-[#fffbec] text-navy-900',
  sky: 'bg-sky-50 text-navy-900',
  navy: 'bg-navy-50 text-navy-900',
  teal: 'bg-sky-50 text-teal-500',
};
// Stat cards cycle cycle/applications/fees/status tag colours as in Figma.
const STAT_TONES = ['yellow', 'teal', 'yellow', 'navy'];

function Pill({ tone = 'yellow', small = false, children }) {
  return (
    <span
      className={`w-fit px-2.5 py-1 rounded-2xl uppercase ${
        small ? 'text-xs leading-[150%]' : 'text-base leading-[150%] font-semibold'
      } ${PILL_TONES[tone] || PILL_TONES.yellow}`}
    >
      {children}
    </span>
  );
}

// Section header with a pill instead of a plain tagline (Figma "Frame 2147230023").
function PillHeader({ tone, pill, title = '', highlight, body }) {
  return (
    <div className="flex flex-col gap-4">
      {pill && <Pill tone={tone}>{pill}</Pill>}
      <div className="flex flex-col gap-6">
        <Heading text={composeTitle(title, highlight)} highlight={highlight} />
        {body && <p className="max-w-[847px] text-base md:text-lg leading-[150%] text-black">{body}</p>}
      </div>
    </div>
  );
}

export default function AdmissionDetail() {
  const facts = useKeyFacts();
  const { slug } = useParams();
  const { data, loading } = useAdmissionDetailData(slug);
  const fallback = fallbackBySlug[slug];
  const ad = fillFactsDeep(data || fallback, facts);

  const [activeId, setActiveId] = useState('dates');

  // Scroll-spy: highlight the nav entry for whichever section is in view.
  useEffect(() => {
    if (!ad) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-140px 0px -55% 0px', threshold: 0 }
    );
    for (const s of sectionsFor(ad.shortName || '')) {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [ad]);

  if (loading && !fallback) {
    return <div className="max-w-[1280px] mx-auto px-6 py-32 text-sm text-ink-600">Loading…</div>;
  }

  if (!ad) {
    return (
      <div className="max-w-[1280px] mx-auto px-6 py-32">
        <h1 className="font-display text-3xl font-semibold text-navy-900 mb-4">
          Admission guide not found
        </h1>
        <p className="text-sm text-ink-600 mb-6">
          This admission guide has not been created in the CMS yet.
        </p>
        <Link to="/admissions" className="text-sm font-medium text-sky-600 hover:text-teal-600">
          Back to all admissions
        </Link>
      </div>
    );
  }

  const has = (k) => Array.isArray(ad[k]) && ad[k].length > 0;

  // A section only appears in the nav if the page actually has that content.
  const navSections = sectionsFor(ad.shortName || '').filter((s) => {
    if (s.id === 'dates') return has('timeline');
    if (s.id === 'eligibility') return has('eligibilityCards');
    if (s.id === 'process') return has('processSteps');
    if (s.id === 'fees') return !!ad.feesTotalValue;
    if (s.id === 'documents') return has('documentGroups');
    if (s.id === 'faq') return has('faqs');
    return true;
  });

  return (
    <div className="bg-white">
      <PageHero
        image={heroImage(ad.heroImage, `/images/admissions/hero-${slug}.webp`)}
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Admissions', to: '/admissions' }, { label: ad.shortName }]}
        eyebrow={ad.heroEyebrow}
        eyebrowUpper
        title={ad.heroTitle}
        titleWidth={900}
        description={ad.heroDescription}
        descriptionWidth={628}
        actions={(ad.heroButtons || []).map((b) => ({ label: b.label, href: b.url, primary: b.primary }))}
      />

      {/* Stat bar cards — Figma: four 304x205, 32 gap; tag, H5 value, 16/150 note. */}
      {has('stats') && (
        <section className="px-5 py-16 md:p-16">
          <div className="max-w-[1312px] mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {ad.stats.map((s, i) => (
              <AccentCard key={s.label}>
                <div className="flex flex-col gap-4">
                  <Pill tone={STAT_TONES[i % STAT_TONES.length]} small>
                    {s.label}
                  </Pill>
                  <div className="flex flex-col gap-3">
                    <H5>{s.value}</H5>
                    {s.note && <p className="text-base leading-[150%] text-black">{s.note}</p>}
                  </div>
                </div>
              </AccentCard>
            ))}
          </div>
        </section>
      )}

      {/* Optional navy band of icon steps (PhD). */}
      {ad.stepsBandTitle && has('stepsBand') && (
        <Section bg="bg-navy-900" width={1280} className="text-white">
          <SectionTitle dark title={ad.stepsBandTitle} body={ad.stepsBandSubtitle} />
          <div className="mt-12 bg-white rounded-2xl p-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {ad.stepsBand.map((s, i) => {
              const Icon = STEP_ICONS[s.icon] || FileText;
              return (
                <div key={s.title} className="flex flex-col items-center text-center gap-3 text-navy-900">
                  <span className="w-14 h-14 rounded-full outline outline-1 -outline-offset-1 outline-navy-900 flex items-center justify-center">
                    <Icon size={24} strokeWidth={1.5} />
                  </span>
                  <H6 as="p">
                    {i + 1}. {s.title}
                  </H6>
                  {s.note && <p className="text-sm leading-[150%] text-black">{s.note}</p>}
                </div>
              );
            })}
          </div>
        </Section>
      )}

      {/* Body — 274 "On this page" card, 80 gap, 958 column; sections 80 apart. */}
      <section className="px-5 py-16 md:px-16 md:py-28">
        <div className="max-w-[1312px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20">
          <aside className="hidden lg:block w-[274px] shrink-0">
            <nav
              aria-label="On this page"
              className="sticky top-40 p-8 rounded-2xl bg-white outline outline-1 -outline-offset-1 outline-black/20 shadow-small"
            >
              <H6 as="p" className="text-black">
                On this page
              </H6>
              <span className="block h-px bg-black/20 my-4" aria-hidden="true" />
              <ul className="flex flex-col gap-1">
                {navSections.map((s) => {
                  const active = activeId === s.id;
                  return (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        aria-current={active ? 'true' : undefined}
                        className={`flex items-center min-h-12 pl-8 pr-1 border-l-[3px] text-base leading-[150%] whitespace-nowrap text-navy-900 ${
                          active ? 'font-medium border-teal-500 shadow-small' : 'border-transparent'
                        }`}
                      >
                        {s.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>

          <div className="flex-1 min-w-0 flex flex-col gap-20">
            {/* Key dates — navy panel, radius 16, padding 48/64: month (Eastern Blue
                Light), 60px #0d0f22 ring with Eastern Blue hairline, 14px labels. */}
            {has('timeline') && (
              <div id="dates" className="scroll-mt-40 flex flex-col gap-20">
                <PillHeader tone="yellow" pill={ad.datesEyebrow} title={ad.datesTitle} highlight={ad.datesTitleHighlight} body={ad.datesSubtitle} />
                <div className="overflow-x-auto">
                  <ol className="min-w-[720px] m-0 list-none flex justify-between gap-2 px-8 md:px-16 py-12 rounded-2xl bg-navy-900 text-white">
                    {ad.timeline.map((t, i) => (
                      <li key={`${t.label}-${i}`} className="flex-1 flex flex-col items-center gap-4 text-center">
                        <span className="text-base leading-[150%] uppercase text-teal-400">{t.month}</span>
                        <span
                          className={`w-[60px] h-[60px] rounded-full flex items-center justify-center font-display font-medium text-[22px] outline outline-1 -outline-offset-1 outline-teal-500 ${
                            t.highlight ? 'bg-white text-navy-900' : 'bg-navy-950 text-white'
                          }`}
                        >
                          {t.highlight ? <Check size={24} /> : i + 1}
                        </span>
                        <span className="flex flex-col gap-2">
                          <span className="font-display font-medium text-sm leading-[140%]">{t.label}</span>
                          {t.note && <span className="text-xs leading-[150%] text-navy-50">{t.note}</span>}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            )}

            {/* Eligibility — three 303 bar cards per row: H5 number, H6 title,
                16/150 copy, teal uppercase footnote; the warning card is yellow. */}
            {has('eligibilityCards') && (
              <div id="eligibility" className="scroll-mt-40 flex flex-col gap-20">
                <PillHeader
                  tone="sky"
                  pill={ad.eligibilityEyebrow}
                  title={ad.eligibilityTitle}
                  highlight={ad.eligibilityTitleHighlight}
                  body={ad.eligibilitySubtitle}
                />
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {ad.eligibilityCards.map((c, i) => (
                    <div
                      key={c.title}
                      className={`flex min-h-[378px] outline outline-1 -outline-offset-1 shadow-small ${
                        c.warning ? 'bg-[#fffbec] outline-[#dfb400]' : 'bg-white outline-black/20'
                      }`}
                    >
                      <span className={`w-[3px] shrink-0 ${c.warning ? 'bg-[#dfb400]' : 'bg-teal-500'}`} aria-hidden="true" />
                      <div className="flex-1 flex flex-col justify-between gap-12 py-8 pl-6 pr-6">
                        <div className="flex flex-col gap-4">
                          {c.warning ? (
                            <Pill tone="yellow" small>
                              Important
                            </Pill>
                          ) : (
                            <H5 as="span">{String(i + 1).padStart(2, '0')}</H5>
                          )}
                          <H6 as="h3" className="text-black">
                            {c.title}
                          </H6>
                          <p className="text-base leading-[150%] text-black">{c.description}</p>
                        </div>
                        {c.footnote && (
                          <p className={`text-base leading-[150%] font-semibold uppercase ${c.warning ? 'text-[#dfb400]' : 'text-teal-500'}`}>
                            {c.footnote}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Process — #eaeaf1 cards (radius 16, #d5d6e3 hairline, padding 24) joined
                by 56px connectors; 48px navy circles; the last step is yellow. */}
            {has('processSteps') && (
              <div id="process" className="scroll-mt-40 flex flex-col gap-20">
                <PillHeader tone="sky" pill={ad.processEyebrow} title={ad.processTitle} highlight={ad.processTitleHighlight} body={ad.processSubtitle} />
                <ol className="m-0 p-0 list-none flex flex-col">
                  {ad.processSteps.map((s, i, all) => (
                    <li key={s.title} className="flex flex-col">
                      <div
                        className={`flex gap-6 md:gap-10 p-6 rounded-2xl outline outline-1 -outline-offset-1 ${
                          s.complete ? 'bg-[#fffbec] outline-[#dfb400]' : 'bg-navy-50 outline-navy-100'
                        }`}
                      >
                        <span
                          className={`w-12 h-12 shrink-0 rounded-full flex items-center justify-center text-lg leading-[150%] ${
                            s.complete ? 'bg-teal-500 outline outline-4 -outline-offset-4 outline-white/0 text-white' : 'bg-navy-900 text-white'
                          }`}
                        >
                          {s.complete ? <Check size={24} strokeWidth={2.5} /> : String(i + 1).padStart(2, '0')}
                        </span>
                        <div className="min-w-0 flex flex-col gap-6">
                          <div className="flex flex-col gap-2">
                            <H6 as="h3">{s.title}</H6>
                            <p className="text-base leading-[150%] text-black">{s.description}</p>
                          </div>
                          {s.footnote && <p className="text-base leading-[150%] font-semibold uppercase text-teal-500">{s.footnote}</p>}
                        </div>
                      </div>
                      {i < all.length - 1 && <span className="ml-11 w-0.5 h-14 bg-black/20" aria-hidden="true" />}
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Fees — 463 navy total card (padding 48) | stacked bar panels. */}
            {ad.feesTotalValue && (
              <div id="fees" className="scroll-mt-40 flex flex-col gap-20">
                <PillHeader tone="yellow" pill={ad.feesEyebrow} title={ad.feesTitle} highlight={ad.feesTitleHighlight} body={ad.feesSubtitle} />
                <div className="flex flex-col gap-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-6 p-8 md:p-12 rounded-2xl bg-navy-900 text-white">
                      <div className="flex flex-col gap-4">
                        <Tagline className="text-teal-400">{ad.feesTotalLabel}</Tagline>
                        <div className="flex flex-col gap-2">
                          <span className="font-display font-medium text-[52px] leading-[120%] tracking-[-0.01em] text-teal-400">
                            {ad.feesTotalValue}
                          </span>
                          {ad.feesTotalNote && <span className="text-base leading-[150%] text-navy-50">{ad.feesTotalNote}</span>}
                        </div>
                      </div>
                      <dl className="flex flex-col border-t border-white/20">
                        {(ad.feesBreakdown || []).map((r) => (
                          <div key={r.label} className="flex justify-between gap-4 py-3 border-b border-white/20 last:border-b-0 text-sm leading-[150%]">
                            <dt className="text-navy-50">{r.label}</dt>
                            <dd className="m-0 text-teal-400">{r.value}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                    <div className="flex flex-col gap-4">
                      {(ad.feesPanels || []).map((f) => (
                        <AccentCard key={f.label} className="[&>div]:py-4">
                          <div className="flex flex-col gap-3">
                            <Tagline className="text-teal-500">{f.label}</Tagline>
                            <div className="flex flex-col gap-2">
                              <H5>{f.value}</H5>
                              {f.note && <p className="text-base leading-[150%] text-black">{f.note}</p>}
                            </div>
                          </div>
                        </AccentCard>
                      ))}
                    </div>
                  </div>
                  {ad.feesFootnote && (
                    <p
                      className={`flex items-start gap-3 p-6 rounded-2xl text-sm leading-[150%] text-black outline outline-1 -outline-offset-1 ${
                        ad.feesFootnoteHighlight ? 'bg-[#fffbec] outline-[#dfb400]' : 'bg-white outline-black/20'
                      }`}
                    >
                      <Info size={20} strokeWidth={1.5} className="shrink-0 text-[#dfb400]" />
                      <span>{ad.feesFootnote}</span>
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Documents — two bar cards with 14/150 disc lists, navy CTA. */}
            {has('documentGroups') && (
              <div id="documents" className="scroll-mt-40 flex flex-col gap-20">
                <PillHeader tone="yellow" pill={ad.documentsEyebrow} title={ad.documentsTitle} highlight={ad.documentsTitleHighlight} />
                <div className="flex flex-col gap-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    {ad.documentGroups.map((g) => (
                      <AccentCard key={g.title}>
                        <H6 as="h3">{g.title}</H6>
                        <ul className="mt-4 list-disc pl-5 text-sm leading-[150%] text-black">
                          {(g.items || []).map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </AccentCard>
                    ))}
                  </div>
                  {ad.documentsCtaLabel && (
                    <Link
                      to={ad.documentsCtaUrl || '/admissions/downloads'}
                      className="inline-flex items-center gap-3 w-fit h-11 px-6 rounded-md bg-navy-900 text-white text-base leading-[150%] font-medium hover:bg-navy-800 transition-colors"
                    >
                      {ad.documentsCtaLabel} <ArrowUpRight size={24} strokeWidth={1.5} />
                    </Link>
                  )}
                </div>
              </div>
            )}

            {/* FAQ — radius-16 boxed items 24 apart; the open one is yellow-tinted. */}
            {has('faqs') && (
              <div id="faq" className="scroll-mt-40 flex flex-col gap-20">
                <PillHeader tone="yellow" pill={ad.faqEyebrow} title={ad.faqTitle} highlight={ad.faqTitleHighlight} />
                <div className="flex flex-col gap-6">
                  {ad.faqs.map((f, i) => (
                    <details
                      key={f.question}
                      open={i === 0}
                      className="group p-6 rounded-2xl outline outline-1 -outline-offset-1 outline-navy-100 bg-white open:bg-[#fffbec]"
                    >
                      <summary className="flex items-center justify-between gap-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                        <H6 as="span">{f.question}</H6>
                        <Plus size={20} className="shrink-0 group-open:hidden" />
                        <Minus size={20} className="shrink-0 hidden group-open:block" />
                      </summary>
                      {f.answer && <p className="mt-4 text-base leading-[150%] text-black">{f.answer}</p>}
                    </details>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Closing CTA — navy, left column, Eastern Blue tagline. */}
      <section id="apply" className="bg-navy-900 text-white px-5 py-16 md:p-16 border-t border-white/20 scroll-mt-24">
        <div className="max-w-[1280px] mx-auto">
          <Tagline className="text-teal-400">{ad.ctaEyebrow}</Tagline>
          <Heading
            text={composeTitle(ad.ctaTitle, ad.ctaTitleHighlight)}
            highlight={ad.ctaTitleHighlight}
            className="text-white mt-4"
            highlightClass="text-teal-400"
          />
          <p className="mt-6 max-w-[598px] text-base leading-[150%]">{ad.ctaSubtitle}</p>
          <div className="mt-8 flex flex-col md:flex-row gap-3.5">
            {(ad.ctaButtons || []).map((b) => (
              <HeroButton key={b.label} label={b.label} href={b.url} primary={b.primary} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
