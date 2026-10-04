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

// Main navigation, per the "Section 3 NEW Tabs" Figma frame. A dropdown item with
// `children` is a group: its sub-links show indented beneath it, and a group with
// no `path` ("Full Time") is a plain heading.
export const mainNav = [
  { label: 'Home', path: '/' },
  {
    label: 'About Us',
    path: '/about',
    children: [
      { label: 'About Us', path: '/about' },
      { label: 'History, Vision & Mission, Core Values', path: '/about/history' },
      { label: "From Director's Desk", path: '/about/directors-message' },
      { label: 'Rankings', path: '/about/rankings' },
      { label: 'Campus Facilities', path: '/about/campus-life' },
      { label: 'Institute Brochure', path: '/brochure' },
    ],
  },
  {
    label: 'Academics',
    path: '/academics',
    children: [
      { label: 'Courses Offered', path: '/academics' },
      {
        label: 'Full Time',
        children: [
          { label: 'Master of Management Studies', path: '/academics/mms' },
          { label: 'Master of Science in Finance', path: '/academics/msc-finance' },
        ],
      },
      {
        label: 'Executive',
        children: [
          { label: "Master's Degree in Marketing Management", path: '/academics/mmm' },
          { label: "Master's Degree in Finance Management", path: '/academics/mfm' },
        ],
      },
      { label: 'Doctor of Philosophy (Ph.D.)', path: '/academics/phd' },
      {
        label: 'Faculty',
        path: '/academics/faculty',
        children: [
          { label: 'Core Faculty', path: '/academics/faculty#core' },
          { label: 'Visiting Faculty', path: '/academics/faculty#visiting' },
        ],
      },
    ],
  },
  {
    label: 'Admissions',
    path: '/admissions',
    children: [
      { label: 'Master of Management Studies', path: '/admissions/mms' },
      { label: 'Master of Science in Finance', path: '/admissions/msc-finance' },
      { label: "Master's Degree in Marketing Management", path: '/admissions/mmm' },
      { label: "Master's Degree in Finance Management", path: '/admissions/mfm' },
      { label: 'Doctor of Philosophy (Ph.D.)', path: '/admissions/phd' },
    ],
  },
  {
    label: 'Alumni',
    path: '/alumni-portal',
    children: [
      { label: 'Alumni Page', path: '/alumni-portal' },
      { label: 'Illustrious Alumni', path: '/about/alumni' },
      { label: 'SIMAA', path: '/alumni-portal#services' },
      { label: 'Alumni Gateway', path: '/alumni-portal#register' },
      { label: 'Simarthan', path: '/about/simarthan' },
    ],
  },
  {
    label: "Student's Corner",
    path: '/students',
    children: [
      { label: "Student's Corner - Landing", path: '/students' },
      { label: 'Batch Profile', path: '/students/batch-profile' },
      { label: 'Achievements', path: '/students/achievements' },
      {
        label: 'Student Body Structure',
        path: '/students/body-structure',
        children: [
          { label: 'Placement Committee', path: '/students/committees/placement' },
          { label: 'Chairperson Council (Chairperson and General Secretaries)', path: '/students/leadership' },
          { label: 'Alumni Committee', path: '/students/committees/alumni' },
          { label: 'Corporate Relations Committee', path: '/students/committees/corporate-relations' },
          { label: 'Course Coordinators', path: '/students/committees/course-coordinators' },
          { label: 'Entrepreneurship Cell', path: '/students/committees/entrepreneurship-cell' },
          { label: 'Events Committee', path: '/students/committees/events' },
          { label: 'Finance Forum', path: '/students/committees/finance-forum' },
          { label: 'Infra Tech Committee', path: '/students/committees/infra-tech' },
          { label: 'Marketing and Media Committee', path: '/students/committees/marketing-media' },
          { label: 'हृदय - The Operations Club', path: '/students/committees/hrudaya-ops' },
          { label: 'Research and Consulting Committee', path: '/students/committees/research-consulting' },
          { label: 'Student Social Responsibility Committee', path: '/students/committees/ssr' },
        ],
      },
    ],
  },
  {
    label: 'Events & Activities',
    path: '/events',
    children: [
      { label: 'Career Catalyst Program', path: '/events/development-programmes?tab=catalyst#tabs' },
      { label: 'Management Development Program', path: '/events/development-programmes' },
      { label: 'Guest Lectures', path: '/events/industry-events' },
      { label: 'Flagship Events', path: '/events/flagship' },
      { label: 'SIMERATIONS', path: '/events/simerations' },
    ],
  },
  {
    label: 'Placements',
    path: '/placements',
    children: [
      { label: 'Placements Committee', path: '/placements/contact' },
      { label: 'Why Recruit at SIMSREE', path: '/placements/why-recruit' },
      { label: 'List of Recruiters', path: '/placements/partners' },
      { label: 'MMS Placement Reports', path: '/placements/reports' },
      { label: 'MSc Finance Placement Reports', path: '/placements/reports' },
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
