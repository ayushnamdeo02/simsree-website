import { Link, useParams } from 'react-router-dom';
import { StatGrid } from '../components/StatCard';
import PageHero, { HeroButton } from '../components/PageHero';
import { Section, SectionTitle, Tagline, Heading, H5, AccentCard, Tag } from '../components/ui';
import { useCommitteeData } from '../lib/useCommitteeData';
import { urlFor } from '../lib/sanity';
import { useKeyFacts, fillFactsDeep } from '../lib/useKeyFacts';

const fallbackBySlug = {
  placement: {
    name: 'Placement Committee',
    heroEyebrow: 'Corporate · Student-Run Committee',
    tagline: '"We connect you to the companies that matter."',
    contactEmail: '{{placementEmail}}',
    stats: [
      { label: 'Members', value: '18', dark: true },
      { label: 'Tenure', value: '2', dark: false },
      { label: 'Events / yr', value: '12+', dark: true },
      { label: 'Student run', value: '100%', dark: false },
    ],
    aboutTitle: 'What the Placement Committee does',
    aboutBody:
      'The Placement Committee runs campus recruitment end to end - recruiter outreach, JD releases, interview scheduling, and the placement reports SIMSREE publishes each year.',
    activities: [
      {
        title: 'Recruiter Outreach',
        description: 'Build and maintain relationships with {{recruiterCount}} recruiting partners.',
      },
      {
        title: 'Process Management',
        description: 'Run PPTs, resume scrutiny, GD-PI scheduling and offer rollouts on campus.',
      },
      {
        title: 'Placement Reporting',
        description: 'Compile and publish the final, summer and executive placement reports.',
      },
    ],
    skillsTitle: 'Skills you build',
    skills: ['Client Relations', 'Negotiation', 'Process Ops', 'Stakeholder Management'],
    equivalentTitle: 'Real-world equivalent',
    equivalentValue: 'Talent Acquisition / Client Partner',
    teamEyebrow: 'Members 2025-26',
    teamTitle: "Who's running this",
    teamTitleHighlight: 'running this',
    teamSubtitle: 'Refreshed annually after induction.',
    team: [
      { name: 'Dr. Anand Mehta', role: 'Chairperson' },
      { name: 'Dr. Anand Mehta', role: 'Vice-Chair' },
      { name: 'Dr. Anand Mehta', role: 'Member' },
      { name: 'Dr. Anand Mehta', role: 'Member' },
      { name: 'Dr. Anand Mehta', role: 'Member' },
      { name: 'Dr. Anand Mehta', role: 'Member' },
    ],
    voiceEyebrow: 'Member Voice',
    voiceTitle: 'In their own words',
    voiceTitleHighlight: 'own words',
    voiceAttribution: 'Tanmay Thomare · Chairperson, Placement 2023-25',
    voiceQuote:
      '"The degree gave me knowledge. The committee gave me a career. By the time I walked into my first day at work, I had already done this job."',
    joinEyebrow: 'Get Involved',
    joinTitle: 'Join Placement Committee',
    joinBody:
      'Selection happens during induction week. Every student is eligible. Email {{placementEmail}} with questions.',
    joinButtons: [
      { label: 'Email committee', url: 'mailto:placements@simsree.org', primary: true },
      { label: 'Apply to SIMSREE', url: '/admissions', primary: false },
    ],
  },

  'course-coordinators': {
    name: 'Course Co-ordinators',
    heroEyebrow: 'Academic · Student-Run Committee',
    tagline: '"Making sure the academic engine never misses a beat."',
    contactEmail: '{{placementEmail}}',
    stats: [
      { label: 'Members', value: '8', dark: true },
      { label: 'Tenure', value: '2', dark: false },
      { label: 'Events / yr', value: '12+', dark: true },
      { label: 'Student run', value: '100%', dark: false },
    ],
    aboutTitle: 'What the Course Co-ordinators does',
    aboutBody:
      'Course Co-ordinators are the academic operational layer - managing the timetable, faculty-student communication, exam logistics, and the academic calendar.',
    activities: [
      {
        title: 'Timetable & Scheduling',
        description: 'Build, publish and revise the academic timetable each term.',
      },
      {
        title: 'Faculty Interface',
        description: 'Channel student feedback to faculty; communicate schedule changes.',
      },
      {
        title: 'Academic Resources',
        description: 'Co-ordinate handouts, readings, study groups, exam-prep.',
      },
    ],
    skillsTitle: 'Skills you build',
    skills: ['Operational Discipline', 'Communication', 'Stakeholder Mgmt', 'Calendar Logic'],
    equivalentTitle: 'Real-world equivalent',
    equivalentValue: 'Programme / Operations Manager',
    teamEyebrow: 'Members 2025-26',
    teamTitle: "Who's running this",
    teamTitleHighlight: 'running this',
    teamSubtitle: 'Refreshed annually after induction.',
    team: [
      { name: 'Dr. Anand Mehta', role: 'Chairperson' },
      { name: 'Dr. Anand Mehta', role: 'Vice-Chair' },
      { name: 'Dr. Anand Mehta', role: 'Member' },
      { name: 'Dr. Anand Mehta', role: 'Member' },
      { name: 'Dr. Anand Mehta', role: 'Member' },
      { name: 'Dr. Anand Mehta', role: 'Member' },
    ],
    voiceEyebrow: 'Member Voice',
    voiceTitle: 'In their own words',
    voiceTitleHighlight: 'own words',
    voiceAttribution: 'Meera Joshi · Course Co-ordinator 2023-25',
    voiceQuote:
      '"It’s the least glamorous role on paper, and the one that protects everything else."',
    joinEyebrow: 'Get Involved',
    joinTitle: 'Join Course Co-ordinators',
    joinBody:
      'Selection happens during induction week. Every student is eligible. Email {{placementEmail}} with questions.',
    joinButtons: [
      { label: 'Email committee', url: 'mailto:placements@simsree.org', primary: true },
      { label: 'Apply to SIMSREE', url: '/admissions', primary: false },
    ],
  },

  'infra-tech': {
    name: 'Infra Tech Committee',
    heroEyebrow: 'Academic · Student-Run Committee',
    tagline: '"The infrastructure that keeps SIMSREE running."',
    contactEmail: '{{placementEmail}}',
    stats: [
      { label: 'Members', value: '10', dark: true },
      { label: 'Tenure', value: '2', dark: false },
      { label: 'Events / yr', value: '12+', dark: true },
      { label: 'Student run', value: '100%', dark: false },
    ],
    aboutTitle: 'What the Infra Tech Committee does',
    aboutBody:
      "Infra-Tech runs SIMSREE's digital backbone - AV systems for events, the website CMS, photo and content moderation across committees, and the campus tech stack.",
    activities: [
      {
        title: 'AV & Event Tech',
        description: 'Run sound, lighting, projection and streaming for every campus event.',
      },
      {
        title: 'Website Operations',
        description: "Maintain the institute's website - content updates, photo approvals, broken links.",
      },
      {
        title: 'Campus Tech Support',
        description: 'Manage the computer lab, projector inventory and committee Drive structure.',
      },
    ],
    skillsTitle: 'Skills you build',
    skills: ['Systems Thinking', 'Tech Ops', 'Quick Troubleshooting', 'Documentation'],
    equivalentTitle: 'Real-world equivalent',
    equivalentValue: 'IT Ops / Tech Programme Manager',
    teamEyebrow: 'Members 2025-26',
    teamTitle: "Who's running this",
    teamTitleHighlight: 'running this',
    teamSubtitle: 'Refreshed annually after induction.',
    team: [
      { name: 'Dr. Anand Mehta', role: 'Chairperson' },
      { name: 'Dr. Anand Mehta', role: 'Vice-Chair' },
      { name: 'Dr. Anand Mehta', role: 'Member' },
      { name: 'Dr. Anand Mehta', role: 'Member' },
      { name: 'Dr. Anand Mehta', role: 'Member' },
      { name: 'Dr. Anand Mehta', role: 'Member' },
    ],
    voiceEyebrow: 'Member Voice',
    voiceTitle: 'In their own words',
    voiceTitleHighlight: 'own words',
    voiceAttribution: 'Devansh Patel · Infra-Tech 2023-25',
    voiceQuote:
      '"If the mic works, the slides are loaded and Wi-Fi held - that was us. Quietly, exactly when it mattered."',
    joinEyebrow: 'Get Involved',
    joinTitle: 'Join Infra Tech Committee',
    joinBody:
      'Selection happens during induction week. Every student is eligible. Email {{placementEmail}} with questions.',
    joinButtons: [
      { label: 'Email committee', url: 'mailto:placements@simsree.org', primary: true },
      { label: 'Apply to SIMSREE', url: '/admissions', primary: false },
    ],
  },

  ssr: {
    name: 'SSR Committee',
    heroEyebrow: 'Social · Student-Run Committee',
    tagline: '"Great managers understand more than markets."',
    contactEmail: 'ssr@simsree.org',
    stats: [
      { label: 'Members', value: '16', dark: true },
      { label: 'Tenure', value: '2', dark: false },
      { label: 'Events / yr', value: '12+', dark: true },
      { label: 'Student run', value: '100%', dark: false },
    ],
    aboutTitle: 'What the SSR Committee does',
    aboutBody:
      "The SSR committee runs Mrudgandha - SIMSREE's flagship community outreach - alongside awareness campaigns, NGO partnerships and on-the-ground volunteer drives.",
    activities: [
      {
        title: 'Mrudgandha Initiative',
        description: "Lead SIMSREE's flagship community-outreach programme through the year.",
      },
      {
        title: 'Awareness Campaigns',
        description: 'Plan campaigns around mental health, gender, sustainability and education.',
      },
      {
        title: 'NGO Partnerships',
        description: 'Build long-term partnerships with 5+ Mumbai-based NGOs.',
      },
    ],
    skillsTitle: 'Skills you build',
    skills: ['Programme Design', 'Community Engagement', 'Impact Measurement', 'Storytelling'],
    equivalentTitle: 'Real-world equivalent',
    equivalentValue: 'CSR / ESG / Social Impact Manager',
    teamEyebrow: 'Members 2025-26',
    teamTitle: "Who's running this",
    teamTitleHighlight: 'running this',
    teamSubtitle: 'Refreshed annually after induction.',
    team: [
      { name: 'Dr. Anand Mehta', role: 'Chairperson' },
      { name: 'Dr. Anand Mehta', role: 'Vice-Chair' },
      { name: 'Dr. Anand Mehta', role: 'Member' },
      { name: 'Dr. Anand Mehta', role: 'Member' },
      { name: 'Dr. Anand Mehta', role: 'Member' },
      { name: 'Dr. Anand Mehta', role: 'Member' },
    ],
    voiceEyebrow: 'Member Voice',
    voiceTitle: 'In their own words',
    voiceTitleHighlight: 'own words',
    voiceAttribution: 'Kavya Maloo · Lead, SSR 2022-24',
    voiceQuote:
      '"Mrudgandha is where I learned that strategy without empathy is just spreadsheets."',
    joinEyebrow: 'Get Involved',
    joinTitle: 'Join SSR Committee',
    joinBody:
      'Selection happens during induction week. Every student is eligible. Email ssr@simsree.org with questions.',
    joinButtons: [
      { label: 'Email committee', url: 'mailto:ssr@simsree.org', primary: true },
      { label: 'Apply to SIMSREE', url: '/admissions', primary: false },
    ],
  },

  'corporate-relations': {
    name: 'Corporate Relations',
    heroEyebrow: 'Corporate · Student-Run Committee',
    tagline: '"We bring the industry inside the classroom."',
    contactEmail: '{{placementEmail}}',
    stats: [
      { label: 'Members', value: '14', dark: true },
      { label: 'Tenure', value: '2', dark: false },
      { label: 'Events / yr', value: '12+', dark: true },
      { label: 'Student run', value: '100%', dark: false },
    ],
    aboutTitle: 'What the Corporate Relations does',
    aboutBody:
      "The CR Committee turns SIMSREE's Churchgate address into a structural advantage - sourcing live projects from corporates, anchoring the institute's guest-lecture calendar, and curating corporate-interaction events.",
    activities: [
      {
        title: 'Live Project Partnerships',
        description: 'Source and scope live consulting briefs from 25+ corporates a year.',
      },
      {
        title: 'Guest Lecture Series',
        description: 'Co-ordinate a weekly senior-leader guest lecture across functions.',
      },
      {
        title: 'Corporate Events',
        description: 'Host panel discussions, breakfast briefings, executive sessions.',
      },
    ],
    skillsTitle: 'Skills you build',
    skills: ['B2B Sales', 'Brief Taking', 'Account Management', 'Executive Comms'],
    equivalentTitle: 'Real-world equivalent',
    equivalentValue: 'Business Development',
    teamEyebrow: 'Members 2025-26',
    teamTitle: "Who's running this",
    teamTitleHighlight: 'running this',
    teamSubtitle: 'Refreshed annually after induction.',
    team: [
      { name: 'Dr. Anand Mehta', role: 'Chairperson' },
      { name: 'Dr. Anand Mehta', role: 'Vice-Chair' },
      { name: 'Dr. Anand Mehta', role: 'Member' },
      { name: 'Dr. Anand Mehta', role: 'Member' },
      { name: 'Dr. Anand Mehta', role: 'Member' },
      { name: 'Dr. Anand Mehta', role: 'Member' },
    ],
    voiceEyebrow: 'Member Voice',
    voiceTitle: 'In their own words',
    voiceTitleHighlight: 'own words',
    voiceAttribution: 'Sreerag Nair · Chairperson, CR 2023-25',
    voiceQuote:
      '"Cold-emailing a CXO for a guest lecture and getting a yes - that’s the skill no MBA classroom teaches you."',
    joinEyebrow: 'Get Involved',
    joinTitle: 'Join Corporate Relations',
    joinBody:
      'Selection happens during induction week. Every student is eligible. Email {{placementEmail}} with questions.',
    joinButtons: [
      { label: 'Email committee', url: 'mailto:placements@simsree.org', primary: true },
      { label: 'Apply to SIMSREE', url: '/admissions', primary: false },
    ],
  },

  alumni: {
    name: 'Alumni Committee',
    heroEyebrow: 'Corporate · Student-Run Committee',
    tagline: '"Building bridges between where you are and where they’ve been."',
    contactEmail: '{{placementEmail}}',
    stats: [
      { label: 'Members', value: '14', dark: true },
      { label: 'Tenure', value: '2', dark: false },
      { label: 'Events / yr', value: '12+', dark: true },
      { label: 'Student run', value: '100%', dark: false },
    ],
    aboutTitle: 'What the Alumni Committee does',
    aboutBody:
      "The Alumni Committee keeps SIMSREE's {{alumniCount}} alumni network actively engaged with the current batch - running Batchmeets, mock GDPI panels, mentorship pairings, and the annual reunion.",
    activities: [
      {
        title: 'Batchmeet & Reunions',
        description: 'Plan annual Batchmeet across Mumbai, Bangalore and Delhi chapters.',
      },
      {
        title: 'Mentorship Pairings',
        description: 'Match current students 1:1 with alumni mentors based on sector interest.',
      },
      {
        title: 'Mock GDPI Panels',
        description: 'Coordinate pre-placement mock interviews with practising alumni recruiters.',
      },
    ],
    skillsTitle: 'Skills you build',
    skills: ['Relationship Building', 'Event Management', 'Coordination', 'Long-Form Comms'],
    equivalentTitle: 'Real-world equivalent',
    equivalentValue: 'Community / Customer Success',
    teamEyebrow: 'Members 2025-26',
    teamTitle: "Who's running this",
    teamTitleHighlight: 'running this',
    teamSubtitle: 'Refreshed annually after induction.',
    team: [
      { name: 'Dr. Anand Mehta', role: 'Chairperson' },
      { name: 'Dr. Anand Mehta', role: 'Vice-Chair' },
      { name: 'Dr. Anand Mehta', role: 'Member' },
      { name: 'Dr. Anand Mehta', role: 'Member' },
      { name: 'Dr. Anand Mehta', role: 'Member' },
      { name: 'Dr. Anand Mehta', role: 'Member' },
    ],
    voiceEyebrow: 'Member Voice',
    voiceTitle: 'In their own words',
    voiceTitleHighlight: 'own words',
    voiceAttribution: 'Akash Rathi · Alumni Committee 2022-24',
    voiceQuote:
      '"Six mock GDPI rounds with alumni. By the time I walked into the real interview, I’d already had every question thrown at me."',
    joinEyebrow: 'Get Involved',
    joinTitle: 'Join Alumni Committee',
    joinBody:
      'Selection happens during induction week. Every student is eligible. Email {{placementEmail}} with questions.',
    joinButtons: [
      { label: 'Email committee', url: 'mailto:placements@simsree.org', primary: true },
      { label: 'Apply to SIMSREE', url: '/admissions', primary: false },
    ],
  },

  'research-consulting': {
    name: 'Research & Consulting',
    heroEyebrow: 'Academic · Student-Run Committee',
    tagline: '"Questions worth answering. Insights worth sharing."',
    contactEmail: '{{placementEmail}}',
    stats: [
      { label: 'Members', value: '12', dark: true },
      { label: 'Tenure', value: '2', dark: false },
      { label: 'Events / yr', value: '12+', dark: true },
      { label: 'Student run', value: '100%', dark: false },
    ],
    aboutTitle: 'What the Research & Consulting does',
    aboutBody:
      'The R&C Club takes on live consulting briefs from real clients - startups, NGOs, mid-market businesses - and publishes original research alongside.',
    activities: [
      {
        title: 'Live Consulting',
        description: 'Scope and deliver 3-5 client engagements per year, end-to-end.',
      },
      {
        title: 'Research Publications',
        description: 'Publish a quarterly insight series authored by student researchers.',
      },
      {
        title: 'Case Competitions',
        description: 'Train and field teams for national-level consulting case contests.',
      },
    ],
    skillsTitle: 'Skills you build',
    skills: ['Hypothesis-Driven Thinking', 'Structured Writing', 'Client Mgmt', 'Slide Craft'],
    equivalentTitle: 'Real-world equivalent',
    equivalentValue: 'Consulting Associate / Strategy Analyst',
    teamEyebrow: 'Members 2025-26',
    teamTitle: "Who's running this",
    teamTitleHighlight: 'running this',
    teamSubtitle: 'Refreshed annually after induction.',
    team: [
      { name: 'Dr. Anand Mehta', role: 'Chairperson' },
      { name: 'Dr. Anand Mehta', role: 'Vice-Chair' },
      { name: 'Dr. Anand Mehta', role: 'Member' },
      { name: 'Dr. Anand Mehta', role: 'Member' },
      { name: 'Dr. Anand Mehta', role: 'Member' },
      { name: 'Dr. Anand Mehta', role: 'Member' },
    ],
    voiceEyebrow: 'Member Voice',
    voiceTitle: 'In their own words',
    voiceTitleHighlight: 'own words',
    voiceAttribution: 'Anushka Rao · Co-lead, R&C 2023-25',
    voiceQuote:
      '"We delivered a market-entry deck for a fintech client in March. They used 80% of it."',
    joinEyebrow: 'Get Involved',
    joinTitle: 'Join Research & Consulting',
    joinBody:
      'Selection happens during induction week. Every student is eligible. Email {{placementEmail}} with questions.',
    joinButtons: [
      { label: 'Email committee', url: 'mailto:placements@simsree.org', primary: true },
      { label: 'Apply to SIMSREE', url: '/admissions', primary: false },
    ],
  },

  'hrudaya-ops': {
    name: 'Hrudaya - Ops Club',
    heroEyebrow: 'Academic · Student-Run Committee',
    tagline: '"Operations is the heartbeat of every business."',
    contactEmail: 'hriday@simsree.org',
    stats: [
      { label: 'Members', value: '14', dark: true },
      { label: 'Tenure', value: '2', dark: false },
      { label: 'Events / yr', value: '12+', dark: true },
      { label: 'Student run', value: '100%', dark: false },
    ],
    aboutTitle: 'What the Hrudaya - Ops Club does',
    aboutBody:
      "हृदय (Hriday - heart) is SIMSREE's operations and supply-chain club. We run industry visits to ports, factories and warehouses, host operations case competitions, and bridge the classroom view of ops with the messy realities of Indian supply chains.",
    activities: [
      {
        title: 'Case Competitions',
        description: 'Run operations and supply-chain case competitions with corporate partners.',
      },
      {
        title: 'Industry Visits',
        description: 'Organise plant, port and DC visits - at least 4 per academic year.',
      },
      {
        title: 'Simulations',
        description: 'Host ops and SCM simulation rounds (beer game, lean simulations).',
      },
    ],
    skillsTitle: 'Skills you build',
    skills: ['Process Thinking', 'Lean & Six Sigma Basics', 'SCM', 'Data Analysis'],
    equivalentTitle: 'Real-world equivalent',
    equivalentValue: 'Supply Chain / Operations Analyst',
    teamEyebrow: 'Members 2025-26',
    teamTitle: "Who's running this",
    teamTitleHighlight: 'running this',
    teamSubtitle: 'Refreshed annually after induction.',
    team: [
      { name: 'Dr. Anand Mehta', role: 'Chairperson' },
      { name: 'Dr. Anand Mehta', role: 'Vice-Chair' },
      { name: 'Dr. Anand Mehta', role: 'Member' },
      { name: 'Dr. Anand Mehta', role: 'Member' },
      { name: 'Dr. Anand Mehta', role: 'Member' },
      { name: 'Dr. Anand Mehta', role: 'Member' },
    ],
    voiceEyebrow: 'Member Voice',
    voiceTitle: 'In their own words',
    voiceTitleHighlight: 'own words',
    voiceAttribution: 'Vikram Sharma · Hriday 2023-25',
    voiceQuote:
      '"An afternoon at JNPT taught me more about logistics than any chapter I read on it."',
    joinEyebrow: 'Get Involved',
    joinTitle: 'Join Hrudaya - Ops Club',
    joinBody:
      'Selection happens during induction week. Every student is eligible. Email hriday@simsree.org with questions.',
    joinButtons: [
      { label: 'Email committee', url: 'mailto:hriday@simsree.org', primary: true },
      { label: 'Apply to SIMSREE', url: '/admissions', primary: false },
    ],
  },

  'marketing-media': {
    name: 'Marketing & Media',
    heroEyebrow: 'Cultural · Student-Run Committee',
    tagline: '"Every post. Every story. Every word. That’s us."',
    contactEmail: 'marketing@simsree.org',
    stats: [
      { label: 'Members', value: '12', dark: true },
      { label: 'Tenure', value: '2', dark: false },
      { label: 'Events / yr', value: '12+', dark: true },
      { label: 'Student run', value: '100%', dark: false },
    ],
    aboutTitle: 'What the Marketing & Media does',
    aboutBody:
      "The voice and the lens of SIMSREE. Owns the institute's social channels, campus photography, design output and event coverage.",
    activities: [
      {
        title: 'Content Strategy',
        description: "Plan and ship the institute's social calendar across Instagram, LinkedIn and YouTube.",
      },
      {
        title: 'Campus Branding',
        description: 'Design every event collateral - posters, reels, merchandise.',
      },
      {
        title: 'Event Coverage',
        description: 'Photograph and film flagship events; deliver edited assets within 48 hours.',
      },
    ],
    skillsTitle: 'Skills you build',
    skills: ['Content Strategy', 'Brand Management', 'Design', 'Analytics'],
    equivalentTitle: 'Real-world equivalent',
    equivalentValue: 'Brand / Content Manager',
    teamEyebrow: 'Members 2025-26',
    teamTitle: "Who's running this",
    teamTitleHighlight: 'running this',
    teamSubtitle: 'Refreshed annually after induction.',
    team: [
      { name: 'Dr. Anand Mehta', role: 'Chairperson' },
      { name: 'Dr. Anand Mehta', role: 'Vice-Chair' },
      { name: 'Dr. Anand Mehta', role: 'Member' },
      { name: 'Dr. Anand Mehta', role: 'Member' },
      { name: 'Dr. Anand Mehta', role: 'Member' },
      { name: 'Dr. Anand Mehta', role: 'Member' },
    ],
    voiceEyebrow: 'Member Voice',
    voiceTitle: 'In their own words',
    voiceTitleHighlight: 'own words',
    voiceAttribution: 'Saloni Shah · Lead, Marketing & Media 2023-25',
    voiceQuote:
      '"We’re not just posting reels. We’re shaping the first impression SIMSREE makes on every aspirant scrolling Instagram tonight."',
    joinEyebrow: 'Get Involved',
    joinTitle: 'Join Marketing & Media',
    joinBody:
      'Selection happens during induction week. Every student is eligible. Email marketing@simsree.org with questions.',
    joinButtons: [
      { label: 'Email committee', url: 'mailto:marketing@simsree.org', primary: true },
      { label: 'Apply to SIMSREE', url: '/admissions', primary: false },
    ],
  },

  events: {
    name: 'Events Committee',
    heroEyebrow: 'Cultural · Student-Run Committee',
    tagline: '"If it happens on campus, we built it."',
    contactEmail: '{{placementEmail}}',
    stats: [
      { label: 'Members', value: '22', dark: true },
      { label: 'Tenure', value: '2', dark: false },
      { label: 'Events / yr', value: '12+', dark: true },
      { label: 'Student run', value: '100%', dark: false },
    ],
    aboutTitle: 'What the Events Committee does',
    aboutBody:
      'From Simerations to inter-college fests, cultural nights to sports day - every flagship moment on the SIMSREE calendar is conceived, funded and delivered by this committee.',
    activities: [
      {
        title: 'Simerations Production',
        description: "Plan and produce SIMSREE's national-level management festival end-to-end.",
      },
      {
        title: 'Inter-College Coordination',
        description: 'Liaise with 30+ visiting institutes, manage entries, schedules and prizes.',
      },
      {
        title: 'Vendor & Logistics',
        description: 'Source venues, AV, catering, security; manage timelines and budgets.',
      },
    ],
    skillsTitle: 'Skills you build',
    skills: ['Logistics', 'Budgeting', 'Vendor Mgmt', 'Crisis Management'],
    equivalentTitle: 'Real-world equivalent',
    equivalentValue: 'Events Manager / Producer',
    teamEyebrow: 'Members 2025-26',
    teamTitle: "Who's running this",
    teamTitleHighlight: 'running this',
    teamSubtitle: 'Refreshed annually after induction.',
    team: [
      { name: 'Dr. Anand Mehta', role: 'Chairperson' },
      { name: 'Dr. Anand Mehta', role: 'Vice-Chair' },
      { name: 'Dr. Anand Mehta', role: 'Member' },
      { name: 'Dr. Anand Mehta', role: 'Member' },
      { name: 'Dr. Anand Mehta', role: 'Member' },
      { name: 'Dr. Anand Mehta', role: 'Member' },
    ],
    voiceEyebrow: 'Member Voice',
    voiceTitle: 'In their own words',
    voiceTitleHighlight: 'own words',
    voiceAttribution: 'Priya Kulkarni · Chairperson, Events 2023-25',
    voiceQuote:
      '"Running Simerations is the closest thing to running a real company I’ve done in college. P&L, deadlines, escalations, the lot."',
    joinEyebrow: 'Get Involved',
    joinTitle: 'Join Events Committee',
    joinBody:
      'Selection happens during induction week. Every student is eligible. Email {{placementEmail}} with questions.',
    joinButtons: [
      { label: 'Email committee', url: 'mailto:placements@simsree.org', primary: true },
      { label: 'Apply to SIMSREE', url: '/admissions', primary: false },
    ],
  },

  'entrepreneurship-cell': {
    name: 'Entrepreneurship Cell',
    heroEyebrow: 'Corporate · Student-Run Committee',
    tagline: '"Ideas are cheap. Execution is the curriculum."',
    contactEmail: '{{placementEmail}}',
    stats: [
      { label: 'Members', value: '14', dark: true },
      { label: 'Tenure', value: '2', dark: false },
      { label: 'Events / yr', value: '12+', dark: true },
      { label: 'Student run', value: '100%', dark: false },
    ],
    aboutTitle: 'What the Entrepreneurship Cell does',
    aboutBody:
      "The E-Cell runs pitch competitions, startup bootcamps, founder mentor circles, and an annual demo day. The reason SIMSREE hasn't just taught entrepreneurship for forty years - it has produced entrepreneurs.",
    activities: [
      {
        title: 'Pitch Events',
        description: 'Organise startup pitch competitions with VC and angel-investor panels.',
      },
      {
        title: 'Founder Mentorship',
        description: 'Connect student founders with mentors from the SIMSREE alumni founder network.',
      },
      {
        title: 'Innovation Challenges',
        description: 'Run hackathons, ideathons, and corporate-sponsored innovation briefs.',
      },
    ],
    skillsTitle: 'Skills you build',
    skills: ['Pitching', 'Product Thinking', 'Mentorship', 'Ecosystem Building'],
    equivalentTitle: 'Real-world equivalent',
    equivalentValue: 'Startup Founder / Venture Analyst',
    teamEyebrow: 'Members 2025-26',
    teamTitle: "Who's running this",
    teamTitleHighlight: 'running this',
    teamSubtitle: 'Refreshed annually after induction.',
    team: [
      { name: 'Dr. Anand Mehta', role: 'Chairperson' },
      { name: 'Dr. Anand Mehta', role: 'Vice-Chair' },
      { name: 'Dr. Anand Mehta', role: 'Member' },
      { name: 'Dr. Anand Mehta', role: 'Member' },
      { name: 'Dr. Anand Mehta', role: 'Member' },
      { name: 'Dr. Anand Mehta', role: 'Member' },
    ],
    voiceEyebrow: 'Member Voice',
    voiceTitle: 'In their own words',
    voiceTitleHighlight: 'own words',
    voiceAttribution: 'Rohan Iyer · Co-lead, E-Cell 2023-25',
    voiceQuote:
      '"I joined E-Cell with an idea. I left with a co-founder, a deck, three rejection letters, and one term sheet."',
    joinEyebrow: 'Get Involved',
    joinTitle: 'Join Entrepreneurship Cell',
    joinBody:
      'Selection happens during induction week. Every student is eligible. Email {{placementEmail}} with questions.',
    joinButtons: [
      { label: 'Email committee', url: 'mailto:placements@simsree.org', primary: true },
      { label: 'Apply to SIMSREE', url: '/admissions', primary: false },
    ],
  },

  'finance-forum': {
    name: 'Finance Forum',
    heroEyebrow: 'Academic · Student-Run Committee',
    tagline: '"Markets move fast. We move faster."',
    contactEmail: '{{placementEmail}}',
    stats: [
      { label: 'Members', value: '16', dark: true },
      { label: 'Tenure', value: '2', dark: false },
      { label: 'Events / yr', value: '12+', dark: true },
      { label: 'Student run', value: '100%', dark: false },
    ],
    aboutTitle: 'What the Finance Forum does',
    aboutBody:
      'Finance Forum is SIMSREE’s flagship finance club - running investment competitions, market simulations, expert speaker series and a quarterly research note.',
    activities: [
      {
        title: 'Market Simulations',
        description: 'Run real-money tracking competitions and trading-room simulations.',
      },
      {
        title: 'Speaker Series',
        description: 'Curate finance guest lectures - fund managers, analysts, central bankers.',
      },
      {
        title: 'Research Notes',
        description:
          'Publish a quarterly SIMSREE Finance Quarterly digest with student-authored sector views.',
      },
    ],
    skillsTitle: 'Skills you build',
    skills: ['Financial Modelling', 'Equity Research', 'Public Speaking', 'Industry Writing'],
    equivalentTitle: 'Real-world equivalent',
    equivalentValue: 'Investment / Consulting Analyst',
    teamEyebrow: 'Members 2025-26',
    teamTitle: "Who's running this",
    teamTitleHighlight: 'running this',
    teamSubtitle: 'Refreshed annually after induction.',
    team: [
      { name: 'Dr. Anand Mehta', role: 'Chairperson' },
      { name: 'Dr. Anand Mehta', role: 'Vice-Chair' },
      { name: 'Dr. Anand Mehta', role: 'Member' },
      { name: 'Dr. Anand Mehta', role: 'Member' },
      { name: 'Dr. Anand Mehta', role: 'Member' },
      { name: 'Dr. Anand Mehta', role: 'Member' },
    ],
    voiceEyebrow: 'Member Voice',
    voiceTitle: 'In their own words',
    voiceTitleHighlight: 'own words',
    voiceAttribution: 'Aanchal Mehta · Member, Finance Forum 2023-25',
    voiceQuote:
      '"Finance Forum is where I went from reading about markets to actually defending a stock pitch in front of a fund manager."',
    joinEyebrow: 'Get Involved',
    joinTitle: 'Join Finance Forum',
    joinBody:
      'Selection happens during induction week. Every student is eligible. Email {{placementEmail}} with questions.',
    joinButtons: [
      { label: 'Email committee', url: 'mailto:placements@simsree.org', primary: true },
      { label: 'Apply to SIMSREE', url: '/admissions', primary: false },
    ],
  },
};

// Committees listed on the directory but not yet written up in the CMS still
// get a real page — name, category and the shared join CTA — rather than a
// dead end. Editors fill in the rest per committee.
const DIRECTORY = {
  'finance-forum': ['Finance Forum', 'Academic', 'Markets, investments, financial literacy events.'],
  'entrepreneurship-cell': ['Entrepreneurship Cell', 'Corporate', 'Startup culture, pitches, innovation challenges.'],
  events: ['Events Committee', 'Cultural', 'Simerations, flagship fests, inter-college events.'],
  'marketing-media': ['Marketing & Media', 'Cultural', 'Brand, communications, social media presence.'],
  'hrudaya-ops': ['Hrudaya - Ops Club', 'Academic', 'Operations, supply chain, logistics projects.'],
  'research-consulting': ['Research & Consulting', 'Academic', 'Live research, case studies, consulting pitches.'],
  alumni: ['Alumni Committee', 'Corporate', 'Alumni relations, mentorship, Batchmeet coordination.'],
  'corporate-relations': ['Corporate Relations', 'Corporate', 'Industry partnerships, live projects, speaker series.'],
  ssr: ['SSR Committee', 'Social', 'Social responsibility, community outreach, Mrudgandha.'],
  'infra-tech': ['Infra-Tech Committee', 'Academic', 'Digital operations, tech infrastructure, AV systems.'],
  'course-coordinators': ['Course Co-ordinators', 'Academic', 'Academic scheduling, timetabling, faculty interface.'],
  'chairpersons-council': ['Chairpersons Council', 'Leadership', 'Cross-committee coordination - Year 2 senior leaders.'],
};

function genericCommittee(slug) {
  const entry = DIRECTORY[slug];
  if (!entry) return null;
  const [name, category, description] = entry;
  return {
    name,
    heroEyebrow: `${category} · Student-Run Committee`,
    tagline: description,
    joinEyebrow: 'Get Involved',
    joinTitle: `Join ${name}`,
    joinBody:
      'Selection happens during induction week. Every student is eligible. Email {{placementEmail}} with questions.',
    joinButtons: [
      { label: 'Email committee', url: 'mailto:placements@simsree.org', primary: true },
      { label: 'Apply to SIMSREE', url: '/admissions', primary: false },
    ],
  };
}
// Figma hero photo per committee, used until an image is set in the Studio.
const HERO_FALLBACK = Object.fromEntries(
  [
    'placement', 'alumni', 'corporate-relations', 'course-coordinators', 'entrepreneurship-cell',
    'events', 'finance-forum', 'infra-tech', 'marketing-media', 'hrudaya-ops', 'research-consulting', 'ssr',
  ].map((s) => [s, `/images/committees/hero-${s}.webp`]),
);
// Figma member portraits, in card order, for members without a photo yet.
const MEMBER_FALLBACK = [1, 2, 3, 4, 5, 6].map((n) => `/images/committees/member-${n}.webp`);

export default function CommitteeDetail() {
  const { slug } = useParams();
  const facts = useKeyFacts();
  const { data, loading } = useCommitteeData(slug);
  const fallback = fallbackBySlug[slug] || genericCommittee(slug);
  const c = fillFactsDeep(data || fallback, facts);

  if (loading && !fallback) {
    return <div className="max-w-[1280px] mx-auto px-6 py-32 text-sm text-ink-600">Loading…</div>;
  }

  if (!c) {
    return (
      <div className="max-w-[1280px] mx-auto px-6 py-32">
        <h1 className="font-display text-3xl font-medium text-navy-900 mb-4">Committee not found</h1>
        <p className="text-sm text-ink-600 mb-6">This committee page has not been created in the CMS yet.</p>
        <Link to="/students/body-structure" className="text-sm font-medium text-teal-500 hover:text-teal-600">
          See all committees
        </Link>
      </div>
    );
  }

  const heroImageUrl = c.heroImage
    ? urlFor(c.heroImage).width(1920).auto('format').url()
    : c.image
      ? urlFor(c.image).width(1920).auto('format').url()
      : HERO_FALLBACK[slug];

  const has = (k) => Array.isArray(c[k]) && c[k].length > 0;

  return (
    <div className="bg-white">
      <PageHero
        image={heroImageUrl}
        breadcrumb={[
          { label: 'Home', to: '/' },
          { label: 'About Us', to: '/about' },
          { label: 'Student Body Structure', to: '/students/body-structure' },
          { label: c.name },
        ]}
        eyebrow={c.heroEyebrow}
        title={c.name}
        titleWidth={706}
        description={c.tagline}
        descriptionWidth={628}
        actions={[
          ...(c.contactEmail ? [{ label: `Email ${c.contactEmail}`, href: `mailto:${c.contactEmail}`, primary: true }] : []),
          { label: `All ${facts.committeeCount} committees`, to: '/students/body-structure' },
        ]}
      />

      {/* Stats — Figma "Layout / 396": 64 padding, four 296x300 cards, 32 gap (2x2, 16 gap on mobile). */}
      {has('stats') && (
        <section className="px-5 py-12 md:px-16 md:py-20">
          <StatGrid stats={c.stats} />
        </section>
      )}

      {/* What it does — tagline/title/body, then activities card and skills column, 80 gap. */}
      {(c.aboutTitle || has('activities')) && (
        <Section>
          <Tagline>About this committee</Tagline>
          <Heading text={c.aboutTitle} highlight={c.name} className="text-navy-900 mt-8" />
          {c.aboutBody && <p className="mt-6 text-base md:text-lg leading-[150%] text-black">{c.aboutBody}</p>}

          <div className="mt-10 md:mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {has('activities') && (
              <AccentCard>
                {c.activities.map((a, i) => (
                  <div key={a.title} className={i > 0 ? 'mt-6 pt-12 border-t border-black/20' : ''}>
                    <H5>{a.title}</H5>
                    <p className="mt-4 text-base leading-[150%] text-black">{a.description}</p>
                  </div>
                ))}
              </AccentCard>
            )}

            <div className="flex flex-col gap-8">
              {has('skills') && (
                <div>
                  <H5>{c.skillsTitle}</H5>
                  <div className="mt-8 flex flex-wrap gap-3.5 max-w-[364px]">
                    {c.skills.map((s) => (
                      <Tag key={s}>{s}</Tag>
                    ))}
                  </div>
                </div>
              )}
              {c.equivalentValue && (
                <AccentCard accent="bg-navy-900">
                  <H5>{c.equivalentTitle}</H5>
                  <p className="mt-4 text-base leading-[150%] text-black">{c.equivalentValue}</p>
                </AccentCard>
              )}
            </div>
          </div>
        </Section>
      )}

      {/* Team — Figma "CTA / 57" on #24295c: centred header, 3-up 405x522 navy cards. */}
      {has('team') && (
        <Section bg="bg-navy-800" width={1280} className="border-t border-white/20">
          <SectionTitle
            center
            dark
            tagline={c.teamEyebrow}
            title={c.teamTitle}
            highlight={c.teamTitleHighlight}
            body={c.teamSubtitle}
          />
          <div className="mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {c.team.map((m, i) => {
              const photoUrl = m.photo
                ? urlFor(m.photo).width(700).auto('format').url()
                : MEMBER_FALLBACK[i % MEMBER_FALLBACK.length];
              return (
                <div
                  key={`${m.name}-${i}`}
                  className="hover-card bg-navy-900 rounded-2xl outline outline-1 -outline-offset-1 outline-white/20 shadow-small p-8 flex flex-col gap-16"
                >
                  <div
                    className="h-80 rounded-2xl bg-white/10 bg-cover bg-center"
                    style={photoUrl ? { backgroundImage: `url('${photoUrl}')` } : undefined}
                  />
                  <div className="flex flex-col gap-2 text-white">
                    <H5 as="p" className="text-white">
                      {m.name}
                    </H5>
                    <p className="text-lg leading-[150%]">{m.role}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Section>
      )}

      {/* Member voice — Figma "Layout / 141": 768 header, 80 gap, grey quote bar. */}
      {c.voiceQuote && (
        <Section width={1280}>
          <SectionTitle
            tagline={c.voiceEyebrow}
            title={c.voiceTitle}
            highlight={c.voiceTitleHighlight}
            body={c.voiceAttribution}
          />
          <figure className="mt-10 md:mt-12">
            <AccentCard bg="bg-navy-50">
              <blockquote className="-my-4 text-lg leading-[150%] text-black">{c.voiceQuote}</blockquote>
            </AccentCard>
          </figure>
        </Section>
      )}

      {/* Join CTA — Figma "CTA / 57" navy: 64 padding, 613 column, Eastern Blue tagline. */}
      <section className="bg-navy-900 text-white px-5 py-12 md:px-16 md:py-20 border-t border-white/20">
        <div className="max-w-[1280px] mx-auto">
          <div className="max-w-[613px]">
            <Tagline className="text-teal-400">{c.joinEyebrow || 'Get Involved'}</Tagline>
            <Heading
              text={c.joinTitle || `Join ${c.name}`}
              highlight={c.name}
              className="text-white mt-4"
              highlightClass="text-teal-400"
            />
            {c.joinBody && <p className="mt-6 text-lg leading-[150%] max-w-[504px]">{c.joinBody}</p>}
          </div>
          <div className="mt-8 flex flex-col md:flex-row gap-3.5">
            {(c.joinButtons || []).map((b) => (
              <HeroButton key={b.label} label={b.label} href={b.url} primary={b.primary} icon={false} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
