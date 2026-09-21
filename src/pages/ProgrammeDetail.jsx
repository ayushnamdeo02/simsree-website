import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import StatCard from '../components/StatCard';
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

// Splits the title on `highlight` (rendered teal) and optionally forces a line
// break after `breakAfter`, so a two-line heading stays CMS-controlled.
function TitleWithHighlight({ text = '', highlight, breakAfter, className }) {
  const bIdx = breakAfter ? text.indexOf(breakAfter) : -1;
  const lines =
    bIdx === -1
      ? [text]
      : [text.slice(0, bIdx + breakAfter.length), text.slice(bIdx + breakAfter.length).trim()];

  const renderLine = (line) => {
    const idx = highlight ? line.indexOf(highlight) : -1;
    if (idx === -1) return line;
    return (
      <>
        {line.slice(0, idx)}
        <span className="text-teal-500">{highlight}</span>
        {line.slice(idx + highlight.length)}
      </>
    );
  };

  return (
    <h2 className={className}>
      {lines.map((line, i) => (
        <span key={line || i}>
          {i > 0 && <br />}
          {renderLine(line)}
        </span>
      ))}
    </h2>
  );
}

// Native <details> so the accordion works without JS and is keyboard-accessible.
function CurriculumRow({ item, defaultOpen }) {
  return (
    <details open={defaultOpen} className="group border-b border-navy-100 last:border-b-0">
      <summary className="flex items-center justify-between gap-4 py-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
        <span className="text-sm font-medium text-navy-900">{item.title}</span>
        <ChevronDown
          size={16}
          className="shrink-0 text-ink-400 transition-transform group-open:rotate-180"
        />
      </summary>
      {item.body && <p className="text-sm text-ink-600 leading-relaxed pb-5 pr-8">{item.body}</p>}
    </details>
  );
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

  const heroImageUrl = pd.heroImage ? urlFor(pd.heroImage).width(1600).url() : null;
  const voicePhotoUrl = pd.voicePhoto ? urlFor(pd.voicePhoto).width(200).url() : null;

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
      {/* Hero */}
      <section
        className="min-h-[420px] md:h-[480px] bg-gray-400 relative overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: heroImageUrl
            ? `url('${heroImageUrl}')`
            : 'linear-gradient(180deg, #8a8f9e, #cfd3da)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/45 to-navy-950/10" />
        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-[55px] pt-32 pb-12 md:pb-[56px] md:h-full flex flex-col justify-end text-white">
          <div className="text-xs text-white/70 mb-5 flex items-center">
            <Link to="/" className="hover:text-white">Home</Link>
            <span className="mx-1.5">/</span>
            <Link to="/academics" className="hover:text-white">Academics</Link>
            <span className="mx-1.5">/</span>
            <span className="text-white">{pd.shortName}</span>
          </div>
          <span className="text-[11px] font-semibold tracking-widest uppercase text-white/90 mb-4">
            {pd.heroBadge}
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-semibold mb-2 max-w-2xl">
            {pd.heroTitle}
          </h1>
          {pd.heroSubtitle && <p className="text-sm text-white/80 mb-7">{pd.heroSubtitle}</p>}
          <div className="flex flex-wrap gap-3">
            {(pd.heroButtons || []).map((btn) => (
              <a
                key={btn.label}
                href={btn.url || '#'}
                className={`font-medium px-5 py-3 rounded-md transition-colors flex items-center gap-2 w-fit ${
                  btn.primary
                    ? 'bg-sky-600 hover:bg-teal-600 text-white'
                    : 'bg-white hover:bg-gray-100 text-navy-900'
                }`}
              >
                {btn.label}
                {btn.primary && <ArrowUpRight size={16} />}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-[1408px] mx-auto px-6 lg:px-16 py-10 lg:py-16">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {(pd.stats || []).map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>
      </section>

      {/* Body — sticky nav beside the content */}
      <div className="max-w-[1280px] mx-auto px-6 lg:px-0 pb-16 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10 lg:gap-16 items-start">
          {/* On this page */}
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
            {/* Overview */}
            <section id="overview" ref={(el) => (sectionRefs.current.overview = el)} className="scroll-mt-32">
              <span className="text-xs font-semibold tracking-widest uppercase text-navy-900">
                Overview
              </span>
              <TitleWithHighlight
                text={pd.overviewTitle}
                highlight={pd.overviewTitleHighlight}
                breakAfter={pd.overviewTitleBreakAfter}
                className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-5 mb-3 max-w-xl"
              />
              {pd.overviewSubtitle && (
                <p className="text-sm text-ink-600 mb-8">{pd.overviewSubtitle}</p>
              )}

              {has('glanceRows') && (
                <div className="bg-navy-50 rounded-lg p-7 mb-16">
                  <h3 className="font-display text-lg font-semibold text-navy-900 mb-5">
                    {pd.glanceTitle}
                  </h3>
                  <dl className="space-y-0">
                    {pd.glanceRows.map((r) => (
                      <div
                        key={r.label}
                        className="flex flex-col sm:flex-row sm:gap-6 py-3 border-b border-navy-100 last:border-b-0"
                      >
                        <dt className="text-[10px] font-semibold tracking-widest uppercase text-ink-400 sm:w-[120px] shrink-0 pt-0.5">
                          {r.label}
                        </dt>
                        <dd className="text-sm text-navy-900 m-0">{r.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
            </section>

            {/* Specialisations */}
            {has('specialisations') && (
              <section id="specialisations" className="scroll-mt-32 mb-16">
                <span className="text-xs font-semibold tracking-widest uppercase text-navy-900">
                  Specialisations
                </span>
                <TitleWithHighlight
                  text={pd.specialisationsTitle}
                  highlight={pd.specialisationsTitleHighlight}
                  className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-5 mb-3"
                />
                <p className="text-sm text-ink-600 mb-8">{pd.specialisationsSubtitle}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {pd.specialisations.map((s) => (
                    <div
                      key={s.title}
                      className="border border-navy-100 border-l-2 border-l-sky-600 rounded-sm px-6 py-5"
                    >
                      <h3 className="font-display text-lg font-semibold text-navy-900 mb-2">
                        {s.title}
                      </h3>
                      <p className="text-sm text-ink-600 leading-relaxed">{s.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Curriculum */}
            {has('curriculum') && (
              <section id="curriculum" className="scroll-mt-32 mb-16">
                <span className="text-xs font-semibold tracking-widest uppercase text-navy-900">
                  Curriculum
                </span>
                <TitleWithHighlight
                  text={pd.curriculumTitle}
                  highlight={pd.curriculumTitleHighlight}
                  className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-5 mb-3"
                />
                <p className="text-sm text-ink-600 mb-8">{pd.curriculumSubtitle}</p>

                <div className="border-t border-navy-100">
                  {pd.curriculum.map((c, i) => (
                    <CurriculumRow key={c.title} item={c} defaultOpen={i === 0} />
                  ))}
                </div>

                {pd.curriculumCallout?.title && (
                  <div className="bg-navy-900 text-white rounded-lg p-7 mt-8">
                    <h3 className="font-display text-lg font-semibold mb-3">
                      {pd.curriculumCallout.title}
                    </h3>
                    <p className="text-sm text-white/80 leading-relaxed">
                      {pd.curriculumCallout.description}
                    </p>
                  </div>
                )}
              </section>
            )}

            {/* Eligibility */}
            {has('eligibilityCards') && (
              <section id="eligibility" className="scroll-mt-32 mb-16">
                <span className="text-xs font-semibold tracking-widest uppercase text-navy-900">
                  Eligibility & Admission
                </span>
                <TitleWithHighlight
                  text={pd.eligibilityTitle}
                  highlight={pd.eligibilityTitleHighlight}
                  className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-5 mb-8"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                  {pd.eligibilityCards.map((c) => (
                    <div
                      key={c.title}
                      className="border border-navy-100 border-l-2 border-l-sky-600 rounded-sm px-6 py-5"
                    >
                      <h3 className="font-display text-lg font-semibold text-navy-900 mb-2">
                        {c.title}
                      </h3>
                      <p className="text-sm text-ink-600 leading-relaxed">{c.description}</p>
                    </div>
                  ))}
                </div>

                {pd.eligibilityCtaLabel && (
                  <a
                    href={pd.eligibilityCtaUrl || '#'}
                    className="bg-navy-900 hover:bg-navy-800 transition-colors text-white text-sm font-medium px-5 py-3 rounded-md inline-flex items-center gap-2"
                  >
                    {pd.eligibilityCtaLabel} <ArrowUpRight size={14} />
                  </a>
                )}
              </section>
            )}

            {/* Placement & outcomes */}
            <section id="outcomes" className="scroll-mt-32 mb-16">
              <span className="text-xs font-semibold tracking-widest uppercase text-navy-900">
                Placement & Outcomes
              </span>
              <TitleWithHighlight
                text={pd.outcomesTitle}
                highlight={pd.outcomesTitleHighlight}
                className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-5 mb-8"
              />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {has('snapshotPoints') && (
                  <div className="bg-navy-900 text-white rounded-lg p-7">
                    <h3 className="font-display text-lg font-semibold mb-5">{pd.snapshotTitle}</h3>
                    <ul className="space-y-2.5 mb-7">
                      {pd.snapshotPoints.map((pt) => (
                        <li key={pt} className="flex gap-2.5 text-sm text-white/85">
                          <span className="text-sky-500 shrink-0">•</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                    <a
                      href={pd.snapshotCtaUrl || '#'}
                      className="bg-sky-600 hover:bg-teal-600 transition-colors text-white text-sm font-medium px-4 py-2.5 rounded-md inline-flex items-center gap-2"
                    >
                      {pd.snapshotCtaLabel} <ArrowUpRight size={14} />
                    </a>
                  </div>
                )}

                {has('recruiters') && (
                  <div className="border border-navy-100 rounded-lg p-7">
                    <h3 className="font-display text-lg font-semibold text-navy-900 mb-5">
                      {pd.recruitersTitle}
                    </h3>
                    <div className="flex flex-wrap gap-3 mb-7">
                      {pd.recruiters.map((r) => (
                        <span
                          key={r}
                          className="border border-navy-100 rounded-md px-4 py-2.5 text-xs text-navy-900"
                        >
                          {r}
                        </span>
                      ))}
                    </div>
                    <a
                      href={pd.recruitersCtaUrl || '#'}
                      className="text-sm font-medium text-navy-900 hover:text-sky-600 transition-colors inline-flex items-center gap-2"
                    >
                      {pd.recruitersCtaLabel} <ArrowUpRight size={14} />
                    </a>
                  </div>
                )}
              </div>
            </section>

            {/* Student voice */}
            {pd.voiceQuote && (
              <section id="voice" className="scroll-mt-32">
                <span className="text-xs font-semibold tracking-widest uppercase text-navy-900">
                  Student Voice
                </span>
                <figure className="bg-navy-900 text-white rounded-lg p-8 mt-5 m-0">
                  <blockquote className="font-display text-xl leading-relaxed mb-6">
                    {pd.voiceQuote}
                  </blockquote>
                  <figcaption className="flex items-center gap-4">
                    <div
                      className="w-10 h-10 rounded-full bg-white/20 bg-cover bg-center shrink-0"
                      style={voicePhotoUrl ? { backgroundImage: `url('${voicePhotoUrl}')` } : undefined}
                    />
                    <div>
                      <p className="text-sm font-semibold">{pd.voiceName}</p>
                      <p className="text-xs text-white/70">{pd.voiceMeta}</p>
                    </div>
                  </figcaption>
                </figure>
              </section>
            )}
          </div>
        </div>
      </div>

      {/* Apply CTA */}
      <section className="bg-navy-900 text-white py-16 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <span className="text-xs font-semibold tracking-widest uppercase text-white/80">
            {pd.ctaEyebrow}
          </span>
          <TitleWithHighlight
            text={pd.ctaTitle}
            highlight={pd.ctaTitleHighlight}
            className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold mt-5 mb-4"
          />
          <p className="text-sm text-white/75 max-w-lg mb-8">{pd.ctaSubtitle}</p>
          <div className="flex flex-wrap gap-3">
            {(pd.ctaButtons || []).map((b) => (
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
