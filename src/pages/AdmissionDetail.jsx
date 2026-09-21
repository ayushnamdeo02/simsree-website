import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  ClipboardCheck,
  Download,
  FileText,
  Info,
  ListChecks,
  Users,
} from 'lucide-react';

import { useAdmissionDetailData } from '../lib/useAdmissionDetailData';
import { urlFor } from '../lib/sanity';
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

function TitleWithHighlight({ text = '', highlight, className }) {
  const idx = highlight ? text.indexOf(highlight) : -1;
  if (idx === -1) return <h2 className={className}>{text}</h2>;
  return (
    <h2 className={className}>
      {text.slice(0, idx)}
      <span className="text-teal-500">{highlight}</span>
      {text.slice(idx + highlight.length)}
    </h2>
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

  const heroImageUrl = ad.heroImage ? urlFor(ad.heroImage).width(1600).url() : null;
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
      {/* Hero */}
      <section
        className="min-h-[380px] md:h-[440px] bg-gray-400 relative overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: heroImageUrl
            ? `url('${heroImageUrl}')`
            : 'linear-gradient(180deg, #8a8f9e, #cfd3da)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/45 to-navy-950/10" />
        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-[55px] pt-32 pb-10 md:pb-[48px] md:h-full flex flex-col justify-end text-white">
          <div className="text-xs text-white/70 mb-4 flex items-center">
            <Link to="/" className="hover:text-white">Home</Link>
            <span className="mx-1.5">/</span>
            <Link to="/admissions" className="hover:text-white">Admissions</Link>
            <span className="mx-1.5">/</span>
            <span className="text-white">{ad.shortName}</span>
          </div>
          <span className="text-[11px] font-semibold tracking-widest uppercase text-white/90 mb-3">
            {ad.heroEyebrow}
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-semibold mb-4">{ad.heroTitle}</h1>
          <p className="max-w-md text-sm text-white/85 leading-relaxed mb-7">{ad.heroDescription}</p>
          <div className="flex flex-wrap gap-3">
            {(ad.heroButtons || []).map((b) => (
              <a
                key={b.label}
                href={b.url || '#'}
                className={`text-sm font-medium px-5 py-3 rounded-md transition-colors flex items-center gap-2 w-fit ${
                  b.primary
                    ? 'bg-sky-600 hover:bg-teal-600 text-white'
                    : 'bg-white hover:bg-gray-100 text-navy-900'
                }`}
              >
                {b.label}
                {b.primary && <ArrowUpRight size={15} />}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Stat cards */}
      {has('stats') && (
        <section className="py-10 lg:py-14">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
              {ad.stats.map((s) => (
                <div
                  key={s.label}
                  className="border border-navy-100 border-l-2 border-l-sky-600 rounded-sm px-6 py-5"
                >
                  <span className="text-[10px] font-semibold tracking-widest uppercase text-ink-400">
                    {s.label}
                  </span>
                  <p className="font-display text-2xl font-semibold text-navy-900 mt-2 mb-2">
                    {s.value}
                  </p>
                  {s.note && <p className="text-[11px] text-ink-400 leading-relaxed">{s.note}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Steps band — optional navy strip of icon cards */}
      {ad.stepsBandTitle && has('stepsBand') && (
        <section className="bg-navy-900 text-white py-14 lg:py-20">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
            <h2 className="font-display text-2xl md:text-3xl font-semibold mb-2">
              {ad.stepsBandTitle}
            </h2>
            {ad.stepsBandSubtitle && (
              <p className="text-sm text-white/70 mb-8">{ad.stepsBandSubtitle}</p>
            )}
            <div className="bg-white rounded-lg p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {ad.stepsBand.map((s, i) => {
                const Icon = STEP_ICONS[s.icon] || FileText;
                return (
                  <div key={s.title} className="flex flex-col items-center text-center">
                    <span className="w-14 h-14 rounded-full border border-navy-100 flex items-center justify-center mb-4">
                      <Icon size={20} className="text-navy-900" />
                    </span>
                    <p className="text-sm font-medium text-navy-900 mb-1">
                      {i + 1}. {s.title}
                    </p>
                    {s.note && <p className="text-[11px] text-ink-400">{s.note}</p>}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Body — sticky nav beside the content */}
      <div className="max-w-[1280px] mx-auto px-6 lg:px-0 pb-16 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10 lg:gap-16 items-start">
          <nav
            aria-label="On this page"
            className="hidden lg:block sticky top-32 border border-navy-100 rounded-lg p-5"
          >
            <p className="text-sm font-medium text-navy-900 mb-4">On this page</p>
            <ul className="space-y-1">
              {navSections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    aria-current={activeId === s.id ? 'true' : undefined}
                    className={`block text-xs py-1.5 pl-3 border-l-2 transition-colors ${
                      activeId === s.id
                        ? 'border-l-sky-600 text-navy-900 font-medium'
                        : 'border-l-transparent text-ink-600 hover:text-navy-900'
                    }`}
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="min-w-0">
            {/* Key dates */}
            {has('timeline') && (
              <section id="dates" className="scroll-mt-32 mb-16">
                <span className="text-xs font-semibold tracking-widest uppercase text-navy-900">
                  {ad.datesEyebrow}
                </span>
                <TitleWithHighlight
                  text={ad.datesTitle}
                  highlight={ad.datesTitleHighlight}
                  className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-5 mb-3"
                />
                <p className="text-sm text-ink-600 mb-8">{ad.datesSubtitle}</p>

                {/* Wide timeline scrolls inside its own container */}
                <div className="overflow-x-auto">
                  <ol className="bg-navy-900 rounded-lg p-7 flex gap-4 min-w-[720px] list-none m-0">
                    {ad.timeline.map((t, i) => (
                      <li key={`${t.label}-${i}`} className="flex-1 flex flex-col">
                        <span className="text-[9px] font-semibold tracking-widest uppercase text-white/50 mb-4">
                          {t.month}
                        </span>
                        <span
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-semibold mb-4 ${
                            t.highlight ? 'bg-white text-navy-900' : 'bg-white/15 text-white'
                          }`}
                        >
                          {i + 1}
                        </span>
                        <span className="text-xs font-medium text-white mb-1">{t.label}</span>
                        {t.note && <span className="text-[10px] text-white/50">{t.note}</span>}
                      </li>
                    ))}
                  </ol>
                </div>
              </section>
            )}

            {/* Eligibility */}
            {has('eligibilityCards') && (
              <section id="eligibility" className="scroll-mt-32 mb-16">
                <span className="text-xs font-semibold tracking-widest uppercase text-navy-900">
                  {ad.eligibilityEyebrow}
                </span>
                <TitleWithHighlight
                  text={ad.eligibilityTitle}
                  highlight={ad.eligibilityTitleHighlight}
                  className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-5 mb-3"
                />
                <p className="text-sm text-ink-600 mb-8">{ad.eligibilitySubtitle}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {ad.eligibilityCards.map((c, i) => (
                    <div
                      key={c.title}
                      className={`rounded-sm px-6 py-5 flex flex-col border border-l-2 ${
                        c.warning
                          ? 'bg-[#FBF7E8] border-[#E8DFC2] border-l-[#C9A227]'
                          : 'border-navy-100 border-l-sky-600'
                      }`}
                    >
                      {c.warning ? (
                        <span className="inline-block w-fit text-[9px] font-semibold tracking-widest uppercase text-[#8A6D0B] bg-[#F3E9C9] px-2 py-1 rounded mb-3">
                          Important
                        </span>
                      ) : (
                        <span className="text-[11px] font-semibold text-ink-400 mb-3">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                      )}
                      <h3 className="font-display text-lg font-semibold text-navy-900 mb-2">
                        {c.title}
                      </h3>
                      <p className="text-sm text-ink-600 leading-relaxed mb-4">{c.description}</p>
                      {c.footnote && (
                        <p
                          className={`text-[10px] font-semibold tracking-widest uppercase mt-auto ${
                            c.warning ? 'text-[#8A6D0B]' : 'text-sky-600'
                          }`}
                        >
                          {c.footnote}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Process */}
            {has('processSteps') && (
              <section id="process" className="scroll-mt-32 mb-16">
                <span className="text-xs font-semibold tracking-widest uppercase text-navy-900">
                  {ad.processEyebrow}
                </span>
                <TitleWithHighlight
                  text={ad.processTitle}
                  highlight={ad.processTitleHighlight}
                  className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-5 mb-3"
                />
                <p className="text-sm text-ink-600 mb-8">{ad.processSubtitle}</p>

                <ol className="space-y-4 list-none m-0 p-0">
                  {ad.processSteps.map((s, i) => (
                    <li
                      key={s.title}
                      className={`flex gap-5 rounded-lg px-6 py-5 border ${
                        s.complete
                          ? 'bg-[#FBF7E8] border-[#E8DFC2]'
                          : 'bg-white border-navy-100'
                      }`}
                    >
                      <span
                        className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-semibold ${
                          s.complete ? 'bg-[#C9A227] text-white' : 'bg-navy-900 text-white'
                        }`}
                      >
                        {s.complete ? <Check size={14} /> : String(i + 1).padStart(2, '0')}
                      </span>
                      <div className="min-w-0">
                        <h3 className="font-display text-lg font-semibold text-navy-900 mb-1.5">
                          {s.title}
                        </h3>
                        <p className="text-sm text-ink-600 leading-relaxed">{s.description}</p>
                        {s.footnote && (
                          <p
                            className={`text-[10px] font-semibold tracking-widest uppercase mt-3 ${
                              s.complete ? 'text-[#8A6D0B]' : 'text-sky-600'
                            }`}
                          >
                            {s.footnote}
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {/* Fees */}
            {ad.feesTotalValue && (
              <section id="fees" className="scroll-mt-32 mb-16">
                <span className="text-xs font-semibold tracking-widest uppercase text-navy-900">
                  {ad.feesEyebrow}
                </span>
                <TitleWithHighlight
                  text={ad.feesTitle}
                  highlight={ad.feesTitleHighlight}
                  className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-5 mb-3"
                />
                <p className="text-sm text-ink-600 mb-8">{ad.feesSubtitle}</p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-navy-900 text-white rounded-lg p-7">
                    <span className="text-[10px] font-semibold tracking-widest uppercase text-white/60">
                      {ad.feesTotalLabel}
                    </span>
                    <p className="font-display text-4xl font-semibold mt-2 mb-1">
                      {ad.feesTotalValue}
                    </p>
                    {ad.feesTotalNote && (
                      <p className="text-[11px] text-white/60 mb-6">{ad.feesTotalNote}</p>
                    )}
                    <dl className="space-y-0">
                      {(ad.feesBreakdown || []).map((r) => (
                        <div
                          key={r.label}
                          className="flex items-center justify-between gap-3 py-2.5 border-b border-white/10 last:border-b-0"
                        >
                          <dt className="text-xs text-white/70">{r.label}</dt>
                          <dd className="text-xs font-medium text-white m-0">{r.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>

                  <div className="space-y-5">
                    {(ad.feesPanels || []).map((f) => (
                      <div
                        key={f.label}
                        className="border border-navy-100 border-l-2 border-l-sky-600 rounded-sm px-6 py-5"
                      >
                        <span className="text-[10px] font-semibold tracking-widest uppercase text-ink-400">
                          {f.label}
                        </span>
                        <p className="font-display text-xl font-semibold text-navy-900 mt-2 mb-1">
                          {f.value}
                        </p>
                        {f.note && <p className="text-[11px] text-ink-400">{f.note}</p>}
                      </div>
                    ))}
                  </div>
                </div>

                {ad.feesFootnote && (
                  <p
                    className={`flex items-start gap-2.5 text-xs leading-relaxed border rounded-sm px-5 py-4 mt-6 ${
                      ad.feesFootnoteHighlight
                        ? 'bg-[#FBF7E8] border-[#E8DFC2] text-ink-600'
                        : 'border-navy-100 text-ink-600'
                    }`}
                  >
                    <Info
                      size={14}
                      className={`shrink-0 mt-0.5 ${
                        ad.feesFootnoteHighlight ? 'text-[#C9A227]' : 'text-sky-600'
                      }`}
                    />
                    <span>{ad.feesFootnote}</span>
                  </p>
                )}
              </section>
            )}

            {/* Documents */}
            {has('documentGroups') && (
              <section id="documents" className="scroll-mt-32 mb-16">
                <span className="text-xs font-semibold tracking-widest uppercase text-navy-900">
                  {ad.documentsEyebrow}
                </span>
                <TitleWithHighlight
                  text={ad.documentsTitle}
                  highlight={ad.documentsTitleHighlight}
                  className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-5 mb-8"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                  {ad.documentGroups.map((g) => (
                    <div
                      key={g.title}
                      className="border border-navy-100 border-l-2 border-l-sky-600 rounded-sm px-6 py-5"
                    >
                      <h3 className="font-display text-lg font-semibold text-navy-900 mb-4">
                        {g.title}
                      </h3>
                      <ul className="space-y-2 list-none m-0 p-0">
                        {(g.items || []).map((item) => (
                          <li key={item} className="flex gap-2.5 text-sm text-ink-600">
                            <span className="text-sky-600 shrink-0">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {ad.documentsCtaLabel && (
                  <a
                    href={ad.documentsCtaUrl || '#'}
                    className="bg-navy-900 hover:bg-navy-800 transition-colors text-white text-sm font-medium px-5 py-3 rounded-md inline-flex items-center gap-2"
                  >
                    {ad.documentsCtaLabel} <Download size={14} />
                  </a>
                )}
              </section>
            )}

            {/* FAQ */}
            {has('faqs') && (
              <section id="faq" className="scroll-mt-32">
                <span className="text-xs font-semibold tracking-widest uppercase text-navy-900">
                  {ad.faqEyebrow}
                </span>
                <TitleWithHighlight
                  text={ad.faqTitle}
                  highlight={ad.faqTitleHighlight}
                  className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-5 mb-8"
                />

                <div>
                  {ad.faqs.map((f, i) => (
                    <details
                      key={f.question}
                      open={i === 0}
                      className={`group rounded-sm px-6 py-1 mb-3 border ${
                        i === 0
                          ? 'bg-[#FBF7E8] border-[#E8DFC2]'
                          : 'bg-white border-navy-100'
                      }`}
                    >
                      <summary className="flex items-center justify-between gap-4 py-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                        <span className="text-sm font-medium text-navy-900">{f.question}</span>
                        <ChevronDown
                          size={16}
                          className="shrink-0 text-ink-400 transition-transform group-open:rotate-180"
                        />
                      </summary>
                      {f.answer && (
                        <p className="text-sm text-ink-600 leading-relaxed pb-4 pr-8">{f.answer}</p>
                      )}
                    </details>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>

      {/* Closing CTA */}
      <section id="apply" className="bg-navy-900 text-white py-16 lg:py-24 scroll-mt-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <span className="text-xs font-semibold tracking-widest uppercase text-white/80">
            {ad.ctaEyebrow}
          </span>
          <TitleWithHighlight
            text={ad.ctaTitle}
            highlight={ad.ctaTitleHighlight}
            className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold mt-5 mb-4"
          />
          <p className="text-sm text-white/75 max-w-md mb-8">{ad.ctaSubtitle}</p>
          <div className="flex flex-wrap gap-3">
            {(ad.ctaButtons || []).map((b) => (
              <a
                key={b.label}
                href={b.url || '#'}
                className={`text-sm font-medium px-4 py-2.5 rounded-md transition-colors flex items-center gap-2 ${
                  b.primary
                    ? 'bg-sky-600 hover:bg-teal-600 text-white'
                    : 'bg-white hover:bg-gray-100 text-navy-900'
                }`}
              >
                {b.label}
                {b.primary && <ArrowUpRight size={14} />}
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
