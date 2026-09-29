// Extracted from Nav_bar_section.pdf (Figma export) — full sitemap of the SIMSREE site.
// Each top-level nav item has a landing path and a dropdown of sub-pages.

export const utilityLinks = [
  { label: 'NIRF Report', path: '/nirf-report' },
  { label: 'TEDxSIMSREE', path: '/events/tedxsimsree' },
  { label: 'Direct Verify', path: '/direct-verify' },
  { label: 'SIMAA', path: '/alumni-portal' },
  { label: 'Brochure', path: '/brochure' },
  { label: 'Disclosure', path: '/disclosure' },
];

export const mainNav = [
  { label: 'Home', path: '/' },
  {
    label: 'About Us',
    path: '/about',
    children: [
      { label: 'History', path: '/about/history' },
      { label: "Director's Message", path: '/about/directors-message' },
      { label: 'Rankings & Accreditations', path: '/about/rankings' },
      { label: 'Campus Life & Facilities', path: '/about/campus-life' },
      { label: 'Illustrious Alumni', path: '/about/alumni' },
      { label: 'Student-Driven System', path: '/about/student-driven-system' },
      { label: 'Alumni Portal', path: '/alumni-portal' },
      { label: 'Simarthan', path: '/about/simarthan' },
    ],
  },
  {
    label: 'Academics',
    path: '/academics',
    children: [
      { label: 'Programmes Overview', path: '/academics' },
      { label: 'MMS · Masters of Mgmt Studies', path: '/academics/mms' },
      { label: 'M.Sc. Finance', path: '/academics/msc-finance' },
      { label: "MFM · Master's in Financial Mgmt", path: '/academics/mfm' },
      { label: "MMM · Master's in Marketing Mgmt", path: '/academics/mmm' },
      { label: 'PhD · Doctor of Philosophy', path: '/academics/phd' },
      { label: 'Faculty Directory', path: '/academics/faculty' },
    ],
  },
  {
    label: 'Admissions',
    path: '/admissions',
    children: [
      { label: 'MMS Admissions', path: '/admissions/mms' },
      { label: 'M.Sc. Finance Admissions', path: '/admissions/msc-finance' },
      { label: 'MFM Admissions', path: '/admissions/mfm' },
      { label: 'MMM Admissions', path: '/admissions/mmm' },
      { label: 'PhD Admissions', path: '/admissions/phd' },
      { label: 'Downloads & Affidavits', path: '/admissions/downloads' },
    ],
  },
  {
    label: "Student's Corner",
    path: '/students',
    children: [
      { label: 'Achievements', path: '/students/achievements' },
      { label: 'Batch Profile', path: '/students/batch-profile' },
      { label: 'Leadership Directory', path: '/students/leadership' },
      { label: 'Student Body Structure', path: '/students/body-structure' },
      { label: 'Life @ SIMSREE', path: '/students/life' },
    ],
  },
  {
    label: 'Events',
    path: '/events',
    children: [
      { label: 'Landing + Calendar', path: '/events' },
      { label: 'Simerations', path: '/events/simerations' },
      { label: 'TEDxSIMSREE', path: '/events/tedxsimsree' },
      { label: 'Flagship Events', path: '/events/flagship' },
      { label: 'Industry Events Hub', path: '/events/industry' },
      { label: 'Development Programmes', path: '/events/development-programmes' },
      { label: 'News & Announcements', path: '/events/news' },
    ],
  },
  {
    label: 'Placements',
    path: '/placements',
    children: [
      { label: 'Why Recruit', path: '/placements/why-recruit' },
      { label: 'Placement Reports Hub', path: '/placements/reports' },
      { label: 'Recruiting Partners', path: '/placements/partners' },
      { label: 'Placement Contact', path: '/placements/contact' },
      { label: 'Recruiter Engagement', path: '/placements/recruiter-engagement' },
    ],
  },
  { label: 'Contact Us', path: '/contact' },
];

export const footerColumns = [
  {
    heading: 'About',
    links: [
      { label: 'History & Vision', path: '/about/history' },
      { label: "Director's Message", path: '/about/directors-message' },
      { label: 'Rankings', path: '/about/rankings' },
      { label: 'Facilities', path: '/about/campus-life' },
      { label: 'Alumni', path: '/about/alumni' },
    ],
  },
  {
    heading: 'Academic',
    links: [
      { label: 'MMS', path: '/academics/mms' },
      { label: 'M.Sc. Finance', path: '/academics/msc-finance' },
      { label: 'MFM', path: '/academics/mfm' },
      { label: 'MMM', path: '/academics/mmm' },
      { label: 'PhD', path: '/academics/phd' },
    ],
  },
  {
    heading: 'Students',
    links: [
      { label: "Student's Corner", path: '/students' },
      { label: 'Batch Profile', path: '/students/batch-profile' },
      { label: 'Student Body Structure', path: '/students/body-structure' },
      { label: 'Events', path: '/events' },
      { label: 'Placements', path: '/placements' },
    ],
  },
  {
    heading: 'Placement',
    links: [
      { label: 'NIRF', path: '/nirf-report' },
      { label: 'Direct Verify', path: '/direct-verify' },
      { label: 'Anti-Ragging', path: '/anti-ragging' },
      { label: 'Disclosure', path: '/disclosure' },
      { label: 'Contact Us', path: '/contact' },
    ],
  },
];
