import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { StatGrid } from '../components/StatCard';
import PageHero, { HeroButton } from '../components/PageHero';
import { SectionTitle, Tagline, Heading, H5, H6, AccentCard } from '../components/ui';
import { heroImage } from '../lib/heroImage';
import { composeTitle } from '../lib/text';
import { useProgrammeDetailData } from '../lib/useProgrammeDetailData';
import { urlFor } from '../lib/sanity';
import { useKeyFacts, fillFactsDeep } from '../lib/useKeyFacts';

const fallbackBySlug = {
  mms: {
    shortName: 'MMS',
    heroBadge: 'Full-time · 2 years · 120 seats · 2 years',
    heroTitle: 'Masters of Management Studies',
    heroSubtitle: 'MMS',
    heroButtons: [
      { label: 'Start your AY 2026-27 application', url: '/admissions', primary: true },
      { label: "See what you'll study", url: '#curriculum', primary: false },
      { label: 'Check if you qualify', url: '#eligibility', primary: false },
    ],
    stats: [
      { label: 'Next intake', value: '2026', dark: true },
      { label: 'Seats', value: '120', dark: false },
      { label: 'Years', value: '2', dark: true },
      { label: 'Total fees', value: '~₹4.5L', dark: false },
    ],
    overviewTitle: 'Two years that make you management-ready.',
    overviewTitleHighlight: 'management-ready.',
    overviewSubtitle: 'M.Sc. Finance',
    glanceTitle: 'Programme at a glance',
    glanceRows: [
      { label: 'Duration', value: '2 years' },
      { label: 'Mode', value: 'Full-Time · 2 years · 120 seats' },
      { label: 'Intake', value: '120 seats' },
      { label: 'Fees (total)', value: '~₹4.5L' },
      {
        label: 'Admission via',
        value:
          'State CET Cell · Government of Maharashtra · merit only · followed by GD-PI counselling.',
      },
      { label: 'Affiliation', value: '{{affiliation}}' },
    ],
    specialisationsTitle: 'Specialise where you want to work.',
    specialisationsTitleHighlight: 'Specialise',
    specialisationsSubtitle:
      'Every specialisation gives you dedicated electives, a faculty advisor, and an industry mentor.',
    specialisations: [
      { title: 'Finance', description: 'Capital markets, corporate finance, equity research, derivatives, fintech.' },
      { title: 'Marketing', description: 'Brand management, digital, consumer behaviour, retail, B2B.' },
      { title: 'HR', description: 'Talent management, OD, leadership development, total rewards.' },
      { title: 'Operations', description: 'Supply chain, logistics, lean, six sigma, operations strategy.' },
      { title: 'Systems', description: 'IT systems, business analytics, data science, ERP, digital transformation.' },
    ],
    curriculumTitle: "What you'll learn.",
    curriculumTitleHighlight: 'learn.',
    curriculumSubtitle:
      'Start with management fundamentals, go deep in your specialisation, then prove it on a capstone — with the curriculum refreshed against industry every two years.',
    curriculum: [
      {
        title: 'Semester 1 · Foundations',
        body:
          'Microeconomics · Financial Accounting · Marketing Management · Organisational Behaviour · Statistics for Managers · Business Communication · Information Systems · Indian Economy. Eight foundation courses.',
      },
      { title: 'Semester 2 · Core management', body: '' },
      { title: 'Summer · Internship + live project', body: '' },
      { title: 'Semester 3 · Specialisation electives', body: '' },
      { title: 'Semester 4 · Capstone & placements', body: '' },
    ],
    eligibilityTitle: 'Who can apply.',
    eligibilityTitleHighlight: 'apply.',
    eligibilityCards: [
      {
        title: 'Eligibility',
        description:
          "Bachelor's degree with min 50% (45% reserved categories) · Maharashtra CET (MMS-CMAT/CET) score · GD + PI · age 21+",
      },
      {
        title: 'Admission process',
        description:
          'State CET Cell · Government of Maharashtra · merit only · followed by GD-PI counselling.',
      },
    ],
    eligibilityCtaLabel: 'Start your application · see dates',
    eligibilityCtaUrl: '/admissions',
    outcomesTitle: 'Where MMS graduates land.',
    snapshotTitle: 'Snapshot · MMS 2023-25',
    snapshotPoints: [
      '{{placementRate}} placement',
      '{{avgCtc}} average CTC',
      '{{highestCtc}} highest CTC',
      '{{recruiterCount}} recruiters',
    ],
    snapshotCtaLabel: 'See the full placement report',
    snapshotCtaUrl: '/placements/reports',
    recruitersTitle: 'Top recruiters',
    recruiters: ['Barclays', 'Deloitte', 'Citi', 'Godrej & Boyce', 'Piramal', 'Arcesium'],
    recruitersCtaLabel: 'See all {{recruiterCount}} recruiters',
    recruitersCtaUrl: '/placements/partners',
    voiceQuote:
      '"The degree gave me knowledge. The committee gave me a career. By the time I walked into my first day at work, I had already done this job."',
    voiceName: 'Tanmay Thomare',
    voiceMeta: 'MMS · Batch 2022-24 · Chairperson, Placement Committee',
    ctaEyebrow: 'Ready to Apply?',
    ctaTitle: 'AY 2026-27 cycle is open.',
    ctaTitleHighlight: 'cycle is open.',
    ctaSubtitle:
      'State CET Cell · Government of Maharashtra · merit only · followed by GD-PI counselling.',
    ctaButtons: [
      { label: 'Start your application', url: '/admissions', primary: true },
      { label: 'Talk to a current student', url: '/contact', primary: false },
      { label: 'Download the brochure (PDF)', url: '#', primary: false },
    ],
  },

  'msc-finance': {
    shortName: 'M.Sc. Finance',
    heroBadge: 'Full-time · 2 years · 40 seats · 2 years',
    heroTitle: 'Master of Science in Finance',
    heroSubtitle: 'M.Sc. Finance',
    heroButtons: [
      { label: 'Start your AY 2026-27 application', url: '/admissions', primary: true },
      { label: "See what you'll study", url: '#curriculum', primary: false },
      { label: 'Check if you qualify', url: '#eligibility', primary: false },
    ],
    stats: [
      { label: 'Next intake', value: '2026', dark: true },
      { label: 'Seats', value: '40', dark: false },
      { label: 'Years', value: '2', dark: true },
      { label: 'Total fees', value: '~₹3.8L', dark: false },
    ],
    overviewTitle: "The finance specialist's Master's.",
    overviewTitleHighlight: 'finance',
    overviewSubtitle: 'M.Sc. Finance',
    glanceTitle: 'Programme at a glance',
    glanceRows: [
      { label: 'Duration', value: '2 years' },
      { label: 'Mode', value: 'Full-Time · 2 years · 40 seats' },
      { label: 'Intake', value: '40 seats' },
      { label: 'Fees (total)', value: '~₹3.8L' },
      {
        label: 'Admission via',
        value:
          'SIMSREE entrance test + GD + personal interview · official notification PDF published each May-July.',
      },
      { label: 'Affiliation', value: '{{affiliation}}' },
    ],
    specialisationsTitle: 'Specialise where you want to work.',
    specialisationsTitleHighlight: 'Specialise',
    specialisationsSubtitle:
      'Every specialisation gives you dedicated electives, a faculty advisor, and an industry mentor.',
    specialisations: [
      {
        title: 'Capital Markets',
        description: 'Equity research, trading, portfolio management, investment banking.',
      },
      {
        title: 'Banking',
        description: 'Corporate banking, retail banking, risk, treasury, compliance.',
      },
      {
        title: 'Wealth Management',
        description: 'CFP® pathway · financial planning · advisory · private banking.',
      },
      {
        title: 'Fintech',
        description: 'Payments, lending tech, digital banks, blockchain, RegTech.',
      },
    ],
    curriculumTitle: "What you'll learn.",
    curriculumTitleHighlight: 'learn.',
    curriculumSubtitle:
      'Move from core management to finance electives to a capstone — a curriculum benchmarked against industry every two years.',
    curriculum: [
      {
        title: 'Semester 1 · Foundations of Finance',
        body:
          'Financial Accounting · Quantitative Methods · Microeconomics · Corporate Finance · Indian Financial System · Communication for Finance.',
      },
      { title: 'Semester 2 · Capital Markets & Banking', body: '' },
      { title: 'Summer · Industry internship', body: '' },
      { title: 'Semester 3 · Advanced electives', body: '' },
      { title: 'Semester 4 · CFP® pathway + capstone', body: '' },
    ],
    curriculumCallout: {
      title: 'CFP® Partnership · FPSB India',
      description:
        "Graduate on a structured pathway to the Certified Financial Planner (CFP®) qualification — recognised globally and across India's wealth-management sector — at FPSB India's Best Authorised Institutional Partner 2025.",
    },
    eligibilityTitle: 'Who can apply.',
    eligibilityTitleHighlight: 'apply.',
    eligibilityCards: [
      {
        title: 'Eligibility',
        description:
          "Bachelor's degree with Mathematics / Statistics / Economics / Commerce / Engineering · min 50% · entrance test + interview",
      },
      {
        title: 'Admission process',
        description:
          'SIMSREE entrance test + GD + personal interview · official notification PDF published each May-July.',
      },
    ],
    eligibilityCtaLabel: 'Start your application · see dates',
    eligibilityCtaUrl: '/admissions',
    outcomesTitle: 'Where M.Sc. Finance graduates land.',
    outcomesTitleHighlight: 'land.',
    snapshotTitle: 'Snapshot · M.Sc. Finance 2023-25',
    snapshotPoints: [
      '{{placementRate}} placement',
      'Capital markets · banking · fintech roles',
      'CFP® pathway completion supported',
      'Sector-specific finance recruiters',
    ],
    snapshotCtaLabel: 'See the full placement report',
    snapshotCtaUrl: '/placements/reports',
    recruitersTitle: 'Top recruiters',
    recruiters: ['Barclays', 'Deloitte', 'Citi', 'Godrej & Boyce', 'Piramal', 'Arcesium'],
    recruitersCtaLabel: 'See all {{recruiterCount}} recruiters',
    recruitersCtaUrl: '/placements/partners',
    voiceQuote:
      '"Finance Forum is where I went from reading about markets to actually defending a stock pitch in front of a fund manager."',
    voiceName: 'Aanchal Mehta',
    voiceMeta: 'M.Sc. Finance · Batch 2023-25 · Member, Finance Forum',
    ctaEyebrow: 'Ready to Apply?',
    ctaTitle: 'AY 2026-27 cycle is open.',
    ctaTitleHighlight: 'cycle is open.',
    ctaSubtitle:
      'State CET Cell · Government of Maharashtra · merit only · followed by GD-PI counselling.',
    ctaButtons: [
      { label: 'Start your application', url: '/admissions', primary: true },
      { label: 'Talk to a current student', url: '/contact', primary: false },
      { label: 'Download the brochure (PDF)', url: '#', primary: false },
    ],
  },

  mfm: {
    shortName: 'MFM',
    heroBadge: 'Executive · 3 years · Part-time · 3 years',
    heroTitle: "Master's in Financial Management",
    heroSubtitle: 'MFM Executive',
    heroButtons: [
      { label: 'Start your AY 2026-27 application', url: '/admissions', primary: true },
      { label: "See what you'll study", url: '#curriculum', primary: false },
      { label: 'Check if you qualify', url: '#eligibility', primary: false },
    ],
    stats: [
      { label: 'Next intake', value: '2026', dark: true },
      { label: 'Seats', value: '60', dark: false },
      { label: 'Years', value: '3', dark: true },
      { label: 'Total fees', value: '~₹2.8L', dark: false },
    ],
    overviewTitle: 'Advance in finance without pausing work.',
    overviewTitleHighlight: 'finance',
    overviewTitleBreakAfter: 'finance',
    overviewSubtitle: 'MFM Executive',
    glanceTitle: 'Programme at a glance',
    glanceRows: [
      { label: 'Duration', value: '3 years' },
      { label: 'Mode', value: 'Executive · 3 years · Part-Time' },
      { label: 'Intake', value: '60 seats' },
      { label: 'Fees (total)', value: '~₹2.8L' },
      {
        label: 'Admission via',
        value:
          'SIMSREE entrance test + interview · weekend classes at Churchgate · cohort selection in April-July annually.',
      },
      { label: 'Affiliation', value: '{{affiliation}}' },
    ],
    specialisationsTitle: 'Specialise where you want to work.',
    specialisationsTitleHighlight: 'Specialise',
    specialisationsSubtitle:
      'Every specialisation gives you dedicated electives, a faculty advisor, and an industry mentor.',
    specialisations: [
      {
        title: 'Banking & Treasury',
        description: 'For working bankers, treasury teams, FP&A leads.',
      },
      {
        title: 'Investment & Markets',
        description: 'For working analysts, IB associates, fund managers.',
      },
    ],
    curriculumTitle: "What you'll learn.",
    curriculumTitleHighlight: 'learn.',
    curriculumSubtitle:
      'Apply new finance thinking at work from term one — fundamentals, your electives, and a capstone, refreshed against industry every two years.',
    curriculum: [
      {
        title: 'Year 1 · Foundations',
        body:
          'Financial Accounting · Managerial Economics · Corporate Finance · Statistics · Indian Financial System · Communication.',
      },
      { title: 'Year 2 · Specialisation', body: '' },
      { title: 'Year 3 · Advanced electives + project', body: '' },
    ],
    eligibilityTitle: 'Who can apply.',
    eligibilityTitleHighlight: 'apply.',
    eligibilityCards: [
      {
        title: 'Eligibility',
        description:
          "Bachelor's degree · min 2 years of relevant work experience in finance · employer NOC for executive cohort",
      },
      {
        title: 'Admission process',
        description:
          'SIMSREE entrance test + interview · weekend classes at Churchgate · cohort selection in April-July annually.',
      },
    ],
    eligibilityCtaLabel: 'Start your application · see dates',
    eligibilityCtaUrl: '/admissions',
    outcomesTitle: 'Where the MFM takes your career.',
    outcomesTitleHighlight: 'MFM',
    snapshotTitle: 'Snapshot · MFM Executive 2022-25',
    snapshotPoints: [
      'Cohort already employed on joining',
      'Progression within current employer',
      'Finance leadership and treasury tracks',
      'Employer-sponsored in many cases',
    ],
    snapshotCtaLabel: 'See the full placement report',
    snapshotCtaUrl: '/placements/reports',
    recruitersTitle: 'Top recruiters',
    recruiters: ['Barclays', 'Deloitte', 'Citi', 'Godrej & Boyce', 'Piramal', 'Arcesium'],
    recruitersCtaLabel: 'See all {{recruiterCount}} recruiters',
    recruitersCtaUrl: '/placements/partners',
    voiceQuote:
      '"Three years alongside my day job — and a promotion within six months of graduating. SIMSREE MFM paid back in advance."',
    voiceName: 'Rajeev Khanna',
    voiceMeta: 'MFM Batch 2022-25 · VP, Treasury at MNC bank',
    ctaEyebrow: 'Ready to Apply?',
    ctaTitle: 'AY 2026-27 cycle is open.',
    ctaTitleHighlight: 'cycle is open.',
    ctaSubtitle:
      'State CET Cell · Government of Maharashtra · merit only · followed by GD-PI counselling.',
    ctaButtons: [
      { label: 'Start your application', url: '/admissions', primary: true },
      { label: 'Talk to a current student', url: '/contact', primary: false },
      { label: 'Download the brochure (PDF)', url: '#', primary: false },
    ],
  },

  mmm: {
    shortName: 'MMM',
    heroBadge: 'Executive · 3 years · Part-time · 3 years',
    heroTitle: "Master's in Marketing Management",
    heroSubtitle: 'MMM Executive',
    heroButtons: [
      { label: 'Start your AY 2026-27 application', url: '/admissions', primary: true },
      { label: "See what you'll study", url: '#curriculum', primary: false },
      { label: 'Check if you qualify', url: '#eligibility', primary: false },
    ],
    stats: [
      { label: 'Next intake', value: '2026', dark: true },
      { label: 'Seats', value: '60', dark: false },
      { label: 'Years', value: '3', dark: true },
      { label: 'Total fees', value: '~₹2.8L', dark: false },
    ],
    overviewTitle: 'Advance in marketing without pausing work.',
    overviewTitleHighlight: 'marketing',
    overviewTitleBreakAfter: 'marketing',
    overviewSubtitle: 'MMM Executive',
    glanceTitle: 'Programme at a glance',
    glanceRows: [
      { label: 'Duration', value: '3 years' },
      { label: 'Mode', value: 'Executive · 3 years · Part-Time' },
      { label: 'Intake', value: '60 seats' },
      { label: 'Fees (total)', value: '~₹2.8L' },
      {
        label: 'Admission via',
        value:
          'SIMSREE entrance test + interview · weekend classes at Churchgate · cohort selection in April-July annually.',
      },
      { label: 'Affiliation', value: '{{affiliation}}' },
    ],
    specialisationsTitle: 'Specialise where you want to work.',
    specialisationsTitleHighlight: 'Specialise',
    specialisationsSubtitle:
      'Every specialisation gives you dedicated electives, a faculty advisor, and an industry mentor.',
    specialisations: [
      {
        title: 'Brand & Comms',
        description: 'For brand managers, agency strategists, comms leads.',
      },
      {
        title: 'Sales & Growth',
        description: 'For sales heads, growth marketers, channel managers.',
      },
    ],
    curriculumTitle: "What you'll learn.",
    curriculumTitleHighlight: 'learn.',
    curriculumSubtitle:
      'Apply new marketing thinking at work from term one — fundamentals, your electives, and a capstone, refreshed against industry every two years.',
    curriculum: [
      {
        title: 'Year 1 · Foundations',
        body:
          'Marketing Management · Consumer Behaviour · Managerial Economics · Statistics · Communication · Research Methodology.',
      },
      { title: 'Year 2 · Marketing depth', body: '' },
      { title: 'Year 3 · Strategy + project', body: '' },
    ],
    eligibilityTitle: 'Who can apply.',
    eligibilityTitleHighlight: 'apply.',
    eligibilityCards: [
      {
        title: 'Eligibility',
        description:
          "Bachelor's degree · min 2 years of relevant work experience in marketing · employer NOC",
      },
      {
        title: 'Admission process',
        description:
          'SIMSREE entrance test + interview · weekend classes at Churchgate · cohort selection in April-July annually.',
      },
    ],
    eligibilityCtaLabel: 'Start your application · see dates',
    eligibilityCtaUrl: '/admissions',
    outcomesTitle: 'Where the MMM takes your career.',
    outcomesTitleHighlight: 'MMM',
    snapshotTitle: 'Snapshot · MMM Executive 2021-24',
    snapshotPoints: [
      'Cohort already employed on joining',
      'Progression within current employer',
      'Brand, growth and sales leadership tracks',
      'Employer-sponsored in many cases',
    ],
    snapshotCtaLabel: 'See the full placement report',
    snapshotCtaUrl: '/placements/reports',
    recruitersTitle: 'Top recruiters',
    recruiters: ['Barclays', 'Deloitte', 'Citi', 'Godrej & Boyce', 'Piramal', 'Arcesium'],
    recruitersCtaLabel: 'See all {{recruiterCount}} recruiters',
    recruitersCtaUrl: '/placements/partners',
    voiceQuote:
      '"MMM was a structured way to convert 8 years of marketing intuition into discipline. It changed how I think about every campaign."',
    voiceName: 'Priya Nair',
    voiceMeta: 'MMM Batch 2021-24 · Head of Brand, FMCG',
    ctaEyebrow: 'Ready to Apply?',
    ctaTitle: 'AY 2026-27 cycle is open.',
    ctaTitleHighlight: 'cycle is open.',
    ctaSubtitle:
      'State CET Cell · Government of Maharashtra · merit only · followed by GD-PI counselling.',
    ctaButtons: [
      { label: 'Start your application', url: '/admissions', primary: true },
      { label: 'Talk to a current student', url: '/contact', primary: false },
      { label: 'Download the brochure (PDF)', url: '#', primary: false },
    ],
  },

  phd: {
    shortName: 'PhD',
    heroBadge: 'Doctoral · 3-5 years',
    heroTitle: 'Doctor of Philosophy',
    heroSubtitle: 'PhD',
    heroButtons: [
      { label: 'Start your AY 2026-27 application', url: '/admissions', primary: true },
      { label: "See what you'll study", url: '#curriculum', primary: false },
      { label: 'Check if you qualify', url: '#eligibility', primary: false },
    ],
    stats: [
      { label: 'Next intake', value: '2026', dark: true },
      { label: 'Seats', value: '12', dark: false },
      { label: 'Duration', value: '3-5 yrs', dark: true },
      { label: 'Total fees', value: '~₹1.5L/yr', dark: false },
    ],
    overviewTitle: 'Where your research career begins.',
    overviewTitleHighlight: 'research career',
    overviewSubtitle: 'PhD',
    glanceTitle: 'Programme at a glance',
    glanceRows: [
      { label: 'Duration', value: '3-5 years' },
      { label: 'Mode', value: 'Doctoral' },
      { label: 'Intake', value: '12 seats' },
      { label: 'Fees (total)', value: '~₹1.5L/yr' },
      {
        label: 'Admission via',
        value:
          'PET entrance test + research proposal + interview · subject to supervisor availability · per Mumbai University / Dr Homi Bhabha SU schedule.',
      },
      { label: 'Affiliation', value: '{{affiliation}}' },
    ],
    specialisationsTitle: 'Choose your research area.',
    specialisationsTitleHighlight: 'research area.',
    specialisationsSubtitle:
      'Every area gives you dedicated electives, a faculty advisor, and an industry mentor.',
    specialisations: [
      {
        title: 'Strategy & Org',
        description: 'Strategy, OB, entrepreneurship, governance.',
      },
      {
        title: 'Finance & Accounting',
        description: 'Capital markets, corporate finance, accounting, banking.',
      },
      {
        title: 'Marketing',
        description: 'Consumer behaviour, brand, retail, digital, B2B.',
      },
      {
        title: 'Operations & SCM',
        description: 'Supply chain, operations strategy, technology, sustainability.',
      },
      {
        title: 'HR & OB',
        description: 'People analytics, leadership, talent, OD.',
      },
      {
        title: 'Economics',
        description: 'Indian economy, financial markets, public policy, development.',
      },
    ],
    curriculumTitle: "What you'll learn.",
    curriculumTitleHighlight: 'learn.',
    curriculumSubtitle:
      'Ground your research in coursework and your specialisation, then build toward original work — with the curriculum reviewed against industry every two years.',
    curriculum: [
      {
        title: 'Year 1 · Coursework',
        body:
          'Marketing Management · Consumer Behaviour · Managerial Economics · Statistics · Communication · Research Methodology.',
      },
      { title: 'Year 2 · Research proposal & comprehensive', body: '' },
      { title: 'Year 3+ · Thesis research', body: '' },
    ],
    eligibilityTitle: 'Who can apply.',
    eligibilityTitleHighlight: 'apply.',
    eligibilityCards: [
      {
        title: 'Eligibility',
        description:
          "Master's degree in a relevant discipline · min 55% · entrance test (PET) + research proposal + interview",
      },
      {
        title: 'Admission process',
        description:
          'PET entrance test + research proposal + interview · subject to supervisor availability · per Mumbai University / Dr Homi Bhabha SU schedule.',
      },
    ],
    eligibilityCtaLabel: 'Start your application · see dates',
    eligibilityCtaUrl: '/admissions',
    outcomesTitle: 'Where your PhD takes you.',
    outcomesTitleHighlight: 'PhD',
    snapshotTitle: 'Snapshot · PhD outcomes',
    snapshotPoints: [
      'Academic and research careers',
      'Faculty positions at B-schools',
      'Industry research and policy roles',
      'Published doctoral research',
    ],
    snapshotCtaLabel: 'See the full placement report',
    snapshotCtaUrl: '/placements/reports',
    recruitersTitle: 'Top recruiters',
    recruiters: ['Barclays', 'Deloitte', 'Citi', 'Godrej & Boyce', 'Piramal', 'Arcesium'],
    recruitersCtaLabel: 'See all {{recruiterCount}} recruiters',
    recruitersCtaUrl: '/placements/partners',
    voiceQuote:
      '"The SIMSREE PhD gave me both the rigour of an academic and the practical lens of Mumbai\'s industry. Few doctoral programmes do that."',
    voiceName: 'Dr. Vivek Iyer',
    voiceMeta: 'PhD 2018-22 · Faculty at a Tier-1 B-school',
    ctaEyebrow: 'Ready to Apply?',
    ctaTitle: 'AY 2026-27 cycle is open.',
    ctaTitleHighlight: 'cycle is open.',
    ctaSubtitle:
      'State CET Cell · Government of Maharashtra · merit only · followed by GD-PI counselling.',
    ctaButtons: [
      { label: 'Start your application', url: '/admissions', primary: true },
      { label: 'Talk to a current student', url: '/contact', primary: false },
      { label: 'Download the brochure (PDF)', url: '#', primary: false },
    ],
  },
};

const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'specialisations', label: 'Specialisations' },
  { id: 'curriculum', label: 'Curriculum' },
  { id: 'eligibility', label: 'Eligibility' },
  { id: 'outcomes', label: 'Placement & outcomes' },
  { id: 'voice', label: 'Student voice' },
];

// Figma sets the admission authority in SemiBold wherever it appears.
const BOLD_PHRASE = 'State CET Cell · Government of Maharashtra';
function BoldLead({ text = '' }) {
  const i = text.indexOf(BOLD_PHRASE);
  if (i === -1) return text;
  return (
    <>
      {text.slice(0, i)}
      <strong className="font-semibold">{BOLD_PHRASE}</strong>
      {text.slice(i + BOLD_PHRASE.length)}
    </>
  );
}

// Native <details> so the accordion works without JS and is keyboard-accessible.
// Figma "Accordion Item": 72px rows, 1px black/20 rules, H6 22 title, chevron.
function CurriculumRow({ item, defaultOpen }) {
  return (
    <details open={defaultOpen} className="group border-b border-black/20 last:border-b-0">
      <summary className="flex items-center justify-between gap-6 min-h-[72px] py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
        <H6 as="span" className="text-black">
          {item.title}
        </H6>
        <ChevronDown size={32} strokeWidth={1.5} className="shrink-0 text-black transition-transform group-open:rotate-180" />
      </summary>
      {item.body && <p className="text-base leading-[150%] text-black pb-6 pr-8">{item.body}</p>}
    </details>
  );
}

// Shared section header — Figma: tagline, 16 gap, H2 52, 24 gap, 18/150 body.
// `breakAfter` forces the design's line break after that word.
function Header({ tagline, title = '', highlight, breakAfter, body }) {
  const text =
    breakAfter && title.includes(`${breakAfter} `) ? title.replace(`${breakAfter} `, `${breakAfter}
`) : composeTitle(title, highlight);
  return <SectionTitle tagline={tagline} title={text} highlight={highlight} body={body} width={958} />;
}

export default function ProgrammeDetail() {
  const facts = useKeyFacts();
  const { slug } = useParams();
  const { data, loading } = useProgrammeDetailData(slug);
  const fallback = fallbackBySlug[slug];
  const pd = fillFactsDeep(data || fallback, facts);

  const [activeId, setActiveId] = useState(SECTIONS[0].id);
  const sectionRefs = useRef({});

  // Scroll-spy: highlight the nav entry for whichever section is in view.
  useEffect(() => {
    if (!pd) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-140px 0px -55% 0px', threshold: 0 }
    );
    for (const s of SECTIONS) {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [pd]);

  if (loading && !fallback) {
    return <div className="max-w-[1280px] mx-auto px-6 py-32 text-sm text-ink-600">Loading…</div>;
  }

  if (!pd) {
    return (
      <div className="max-w-[1280px] mx-auto px-6 py-32">
        <h1 className="font-display text-3xl font-semibold text-navy-900 mb-4">
          Programme not found
        </h1>
        <p className="text-sm text-ink-600 mb-6">
          This programme page has not been created in the CMS yet.
        </p>
        <Link to="/academics" className="text-sm font-medium text-sky-600 hover:text-teal-600">
          Back to all programmes
        </Link>
      </div>
    );
  }

  const voicePhotoUrl = pd.voicePhoto
    ? urlFor(pd.voicePhoto).width(120).auto('format').url()
    : '/images/director/avatar.webp';

  const has = (k) => Array.isArray(pd[k]) && pd[k].length > 0;
  // A section only appears in the nav if the page actually has that content.
  const navSections = SECTIONS.filter((s) => {
    if (s.id === 'specialisations') return has('specialisations');
    if (s.id === 'curriculum') return has('curriculum');
    if (s.id === 'eligibility') return has('eligibilityCards');
    if (s.id === 'voice') return !!pd.voiceQuote;
    return true;
  });

  return (
    <div className="bg-white">
      <PageHero
        image={heroImage(pd.heroImage, `/images/academics/hero-${slug}.webp`)}
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Academics', to: '/academics' }, { label: pd.shortName }]}
        eyebrow={pd.heroBadge}
        eyebrowUpper
        title={pd.heroTitle}
        titleWidth={900}
        description={pd.heroSubtitle}
        actions={(pd.heroButtons || []).map((b) => ({ label: b.label, href: b.url, primary: b.primary }))}
      />

      {has('stats') && (
        <section className="px-5 py-16 md:p-16">
          <StatGrid stats={pd.stats} />
        </section>
      )}

      {/* Body — Figma: 274 "On this page" card, 80 gap, 958 content column whose
          sections sit 80 apart (and 80 from their own header). */}
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
                        className={`flex items-center min-h-12 pl-8 pr-1 text-base leading-[150%] whitespace-nowrap text-navy-900 ${
                          active ? 'font-medium border-l-[3px] border-teal-500 shadow-small' : 'border-l-[3px] border-transparent'
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
            {/* Overview + at-a-glance box (#eaeaf1, 3px bar, 14/150 label/value rows). */}
            <div id="overview" ref={(el) => (sectionRefs.current.overview = el)} className="scroll-mt-40 flex flex-col gap-20">
              <Header
                tagline="Overview"
                title={pd.overviewTitle}
                highlight={pd.overviewTitleHighlight}
                breakAfter={pd.overviewTitleBreakAfter}
                body={pd.overviewSubtitle}
              />
              {has('glanceRows') && (
                <AccentCard bg="bg-navy-50">
                  <H5>{pd.glanceTitle}</H5>
                  <span className="block h-px bg-black/20 my-4" aria-hidden="true" />
                  <dl className="flex flex-col gap-4">
                    {pd.glanceRows.map((r, i, all) => (
                      <div
                        key={r.label}
                        className={`flex flex-wrap gap-x-4 gap-y-1 text-sm leading-[150%] pb-1.5 ${
                          i < all.length - 1 ? 'border-b border-black/20' : ''
                        }`}
                      >
                        <dt className="uppercase text-ink-400">{r.label}</dt>
                        <dd className="text-black">{r.value}</dd>
                      </div>
                    ))}
                  </dl>
                </AccentCard>
              )}
            </div>

            {has('specialisations') && (
              <div id="specialisations" className="scroll-mt-40 flex flex-col gap-20">
                <Header
                  tagline="Specialisations"
                  title={pd.specialisationsTitle}
                  highlight={pd.specialisationsTitleHighlight}
                  body={pd.specialisationsSubtitle}
                />
                <div className="grid md:grid-cols-2 gap-8">
                  {pd.specialisations.map((s) => (
                    <AccentCard key={s.title}>
                      <H5>{s.title}</H5>
                      <p className="mt-4 text-base leading-[150%] text-black">{s.description}</p>
                    </AccentCard>
                  ))}
                </div>
              </div>
            )}

            {has('curriculum') && (
              <div id="curriculum" className="scroll-mt-40 flex flex-col gap-20">
                <Header
                  tagline="Curriculum"
                  title={pd.curriculumTitle}
                  highlight={pd.curriculumTitleHighlight}
                  body={pd.curriculumSubtitle}
                />
                <div className="max-w-[768px] border-y border-black/20">
                  {pd.curriculum.map((item, i) => (
                    <CurriculumRow key={item.title} item={item} defaultOpen={i === 0} />
                  ))}
                </div>
              </div>
            )}

            {has('eligibilityCards') && (
              <div id="eligibility" className="scroll-mt-40 flex flex-col gap-20">
                <Header tagline="Eligibility & admission" title={pd.eligibilityTitle} highlight={pd.eligibilityTitleHighlight} />
                <div className="flex flex-col gap-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    {pd.eligibilityCards.map((c) => (
                      <AccentCard key={c.title}>
                        <H5>{c.title}</H5>
                        <p className="mt-4 text-base leading-[150%] text-black">
                          <BoldLead text={c.description} />
                        </p>
                      </AccentCard>
                    ))}
                  </div>
                  {pd.eligibilityCtaLabel && (
                    <Link
                      to={pd.eligibilityCtaUrl || '/admissions'}
                      className="inline-flex items-center gap-3 w-fit h-11 px-6 rounded-md bg-navy-900 text-white text-base leading-[150%] font-medium hover:bg-navy-800 transition-colors"
                    >
                      {pd.eligibilityCtaLabel} <ArrowUpRight size={24} strokeWidth={1.5} />
                    </Link>
                  )}
                </div>
              </div>
            )}

            {/* Outcomes — navy snapshot card | recruiter chips card, both 463. */}
            <div id="outcomes" className="scroll-mt-40 flex flex-col gap-20">
              <Header tagline="Placement & outcomes" title={pd.outcomesTitle} highlight={pd.outcomesTitleHighlight} />
              <div className="grid md:grid-cols-2 gap-8">
                {has('snapshotPoints') && (
                  <AccentCard bg="bg-navy-900" className="text-white">
                    <div className="flex flex-col gap-6">
                      <H6 as="h3" className="text-teal-400">
                        {pd.snapshotTitle}
                      </H6>
                      <ul className="list-disc pl-5 flex flex-col text-sm leading-[150%] text-navy-50">
                        {pd.snapshotPoints.map((pt) => (
                          <li key={pt}>{pt}</li>
                        ))}
                      </ul>
                      {pd.snapshotCtaLabel && (
                        <div>
                          <HeroButton label={pd.snapshotCtaLabel} to={pd.snapshotCtaUrl} primary />
                        </div>
                      )}
                    </div>
                  </AccentCard>
                )}
                {has('recruiters') && (
                  <AccentCard>
                    <div className="flex flex-col gap-6">
                      <H5>{pd.recruitersTitle}</H5>
                      <div className="grid grid-cols-3 gap-2.5">
                        {pd.recruiters.map((r) => (
                          <span
                            key={r}
                            className="h-11 flex items-center justify-center px-2 rounded-lg outline outline-1 -outline-offset-1 outline-black text-sm leading-[150%] text-black text-center"
                          >
                            {r}
                          </span>
                        ))}
                      </div>
                      {pd.recruitersCtaLabel && (
                        <Link
                          to={pd.recruitersCtaUrl || '/placements/partners'}
                          className="inline-flex items-center gap-3 w-fit h-11 px-6 text-base leading-[150%] font-medium text-black hover:underline underline-offset-2"
                        >
                          {pd.recruitersCtaLabel} <ArrowUpRight size={24} strokeWidth={1.5} />
                        </Link>
                      )}
                    </div>
                  </AccentCard>
                )}
              </div>
            </div>

            {/* Student voice — navy card, radius 16, padding 48/64: H6 quote, 60px avatar. */}
            {pd.voiceQuote && (
              <div id="voice" className="scroll-mt-40 flex flex-col gap-20">
                <Tagline>Student voice</Tagline>
                <figure className="m-0 -mt-12 px-6 py-8 md:px-16 md:py-12 rounded-2xl bg-navy-900 text-white flex flex-col gap-8">
                  <blockquote className="max-w-[768px] font-display font-medium text-[22px] leading-[140%] md:text-[28px] tracking-[-0.01em]">
                    {pd.voiceQuote}
                  </blockquote>
                  <figcaption className="flex flex-wrap items-center gap-4">
                    <div
                      className="w-[60px] h-[60px] rounded-full bg-white/20 bg-cover bg-center shrink-0"
                      style={{ backgroundImage: `url('${voicePhotoUrl}')` }}
                    />
                    <H6 as="span" className="text-white">
                      {pd.voiceName}
                    </H6>
                    <span className="text-base leading-[150%]">{pd.voiceMeta}</span>
                  </figcaption>
                </figure>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Apply — navy, 64 padding, left column, Eastern Blue tagline, bold-lead copy. */}
      <section className="bg-navy-900 text-white px-5 py-16 md:p-16 border-t border-white/20">
        <div className="max-w-[1280px] mx-auto">
          <Tagline className="text-teal-400">{pd.ctaEyebrow}</Tagline>
          <Heading
            text={composeTitle(pd.ctaTitle, pd.ctaTitleHighlight)}
            highlight={pd.ctaTitleHighlight}
            className="text-white mt-4"
            highlightClass="text-teal-400"
          />
          <p className="mt-6 text-base leading-[150%]">
            <BoldLead text={pd.ctaSubtitle} />
          </p>
          <div className="mt-8 flex flex-col md:flex-row gap-3.5">
            {(pd.ctaButtons || []).map((b) => (
              <HeroButton key={b.label} label={b.label} href={b.url} primary={b.primary} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
