import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { StatGrid } from '../components/StatCard';
import PageHero, { HeroButton } from '../components/PageHero';
import { Section, SectionTitle, Tagline, Heading, H5, H6, AccentCard, Tag } from '../components/ui';
import { useCommitteeData } from '../lib/useCommitteeData';
import { urlFor } from '../lib/sanity';
import { useKeyFacts, fillFactsDeep } from '../lib/useKeyFacts';

const fallbackBySlug = {
  placement: {
    showJoin: false,
    aboutStyle: 'cards',
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
    eventsEyebrow: 'Always Something Happening',
    eventsTitle: 'Upcoming Placement Events',
    eventsTitleHighlight: 'Placement Events',
    eventsSubtitle: 'Key activities and recruitment events throughout the academic year.',
    events: [
      { date: '2024-05-06', title: 'Aptitude Training', description: 'Prepare with focused aptitude sessions.', ctaLabel: 'Register Now', ctaUrl: '/placements/contact' },
      { date: '2024-05-14', title: 'Company Orientation', description: 'Meet recruiters and explore opportunities.', ctaLabel: 'Register Now', ctaUrl: '/placements/contact' },
      { date: '2024-05-22', title: 'Mock Interviews', description: 'Practice interviews with expert feedback.', ctaLabel: 'Register Now', ctaUrl: '/placements/contact' },
      { date: '2024-05-30', title: 'Pre-Placement Talks', description: 'Learn about roles and recruitment processes.', ctaLabel: 'Register Now', ctaUrl: '/placements/contact' },
    ],
    eventsCtaLabel: 'See the full calendar',
    eventsCtaUrl: '/events#calendar',
    teamEyebrow: 'Members 2025-26',
    teamTitle: "Who's running this",
    teamTitleHighlight: 'running this',
    teamSubtitle: 'Refreshed annually after induction.',
    team: [
      { name: 'Mandar Yadav', role: 'Coordinator', group: 'MMS', photoUrl: '/images/committees/team/placement-mandar-yadav.webp' },
      { name: 'Nakul Nandanwar', role: 'Coordinator', group: 'MMS', photoUrl: '/images/committees/team/placement-nakul-nandanwar.webp' },
      { name: 'Abhishek Mishra', role: 'Senior Member', group: 'MMS', photoUrl: '/images/committees/team/placement-abhishek-mishra.webp' },
      { name: 'Astha Agrawal', role: 'Senior Member', group: 'MMS', photoUrl: '/images/committees/team/placement-astha-agrawal.webp' },
      { name: 'Atharva Deshkar', role: 'Senior Member', group: 'MMS', photoUrl: '/images/committees/team/placement-atharva-deshkar.webp' },
      { name: 'Damya Singh', role: 'Senior Member', group: 'MMS', photoUrl: '/images/committees/team/placement-damya-singh.webp' },
      { name: 'Esha Shet', role: 'Senior Member', group: 'MMS', photoUrl: '/images/committees/team/placement-esha-shet.webp' },
      { name: 'Niraj Chavan', role: 'Senior Member', group: 'MMS', photoUrl: '/images/committees/team/placement-niraj-chavan.webp' },
      { name: 'Nischay Nisar', role: 'Senior Member', group: 'MMS', photoUrl: '/images/committees/team/placement-nischay-nisar.webp' },
      { name: 'Pranav Shete', role: 'Senior Member', group: 'MMS', photoUrl: '/images/committees/team/placement-pranav-shete.webp' },
      { name: 'Rahul Kumbhare', role: 'Senior Member', group: 'MMS', photoUrl: '/images/committees/team/placement-rahul-kumbhare.webp' },
      { name: 'Shriya Parab', role: 'Senior Member', group: 'MMS', photoUrl: '/images/committees/team/placement-shriya-parab.webp' },
      { name: 'Tashu Rastogi', role: 'Senior Member', group: 'MMS', photoUrl: '/images/committees/team/placement-tashu-rastogi.webp' },
      { name: 'Vaishnavi Bangale', role: 'Senior Member', group: 'MMS', photoUrl: '/images/committees/team/placement-vaishnavi-bangale.webp' },
      { name: 'Sahil Nathwani', role: 'Member', group: 'MSc', photoUrl: '/images/committees/team/placement-sahil-nathwani.webp' },
      { name: 'Tejas Patil', role: 'Member', group: 'MSc', photoUrl: '/images/committees/team/placement-tejas-patil.webp' },
      { name: 'Vidhi Nanvani', role: 'Member', group: 'MSc', photoUrl: '/images/committees/team/placement-vidhi-nanvani.webp' },
      { name: 'Deepesh Gupta', role: 'Member', group: 'MSc', photoUrl: '/images/committees/team/placement-deepesh-gupta.webp' },
      { name: 'Prachiti Sathe', role: 'Member', group: 'MSc', photoUrl: '/images/committees/team/placement-prachiti-sathe.webp' },
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
    showJoin: false,
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
    showJoin: false,
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
    showJoin: false,
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
    showJoin: false,
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
    showJoin: false,
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
    yearEyebrow: 'A Year in the Committee',
    yearTitle: 'What we ran in 2025-26',
    yearTitleHighlight: '2025-26',
    yearSubtitle: 'Twelve months of activities, from induction week to the annual reunion and handover.',
    yearItems: [
      { month: 'July', title: 'Induction & Team Formation', tag: 'Internal', description: 'New batch inducted, roles assigned across mentorship, events and outreach verticals.' },
      { month: 'August', title: 'Alumni Batchmeet - Mumbai', tag: 'Flagship', description: '180+ alumni across batches reconnected at the flagship Mumbai chapter meet.' },
      { month: 'September', title: 'Mentorship Pairing Drive', tag: 'Mentorship', description: '1:1 matching of 240 students with alumni mentors by sector and role interest.' },
      { month: 'October', title: 'Mock GDPI Rounds', tag: 'Placements', description: 'Six rounds of mock group discussions and interviews with practising alumni recruiters.' },
      { month: 'December', title: 'Bangalore & Delhi Chapters', tag: 'Chapters', description: 'Regional batchmeets hosted to widen the network beyond the Mumbai base.' },
      { month: 'February', title: 'Alumni Speaker Series', tag: 'Learning', description: 'Four sessions on consulting, BFSI, product and operations career tracks.' },
      { month: 'April', title: 'Annual Reunion', tag: 'Flagship', description: 'Campus-wide reunion with the felicitation ceremony and legacy batch honours.' },
      { month: 'June', title: 'Year Report & Handover', tag: 'Internal', description: 'Impact report published and the committee handed over to the incoming team.' },
    ],
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
    showJoin: false,
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
    showJoin: false,
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
      { name: 'Bushra Mulla', role: 'Coordinator', photoUrl: '/images/committees/team/hrudaya-ops-bushra-mulla.webp' },
      { name: 'Rohit Hugge', role: 'Coordinator', photoUrl: '/images/committees/team/hrudaya-ops-rohit-hugge.webp' },
      { name: 'Chetan Patil', role: 'Senior Member', photoUrl: '/images/committees/team/hrudaya-ops-chetan-patil.webp' },
      { name: 'Kalyan Reddy Baddamwar', role: 'Senior Member', photoUrl: '/images/committees/team/hrudaya-ops-kalyan-reddy-baddamwar.webp' },
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
    showJoin: false,
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
      { name: 'Shravan Dubey', role: 'Senior Member', photoUrl: '/images/committees/team/marketing-media-shravan-dubey.webp' },
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
    showJoin: false,
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
      { name: 'Darshil Kothari', role: 'Coordinator', photoUrl: '/images/committees/team/events-darshil-kothari.webp' },
      { name: 'Prachiti Thakare', role: 'Coordinator', photoUrl: '/images/committees/team/events-prachiti-thakare.webp' },
      { name: 'Nidhi Baghel', role: 'Senior Member', photoUrl: '/images/committees/team/events-nidhi-baghel.webp' },
      { name: 'Nishit Soni', role: 'Senior Member', photoUrl: '/images/committees/team/events-nishit-soni.webp' },
      { name: 'Priyamvad Ranade', role: 'Senior Member', photoUrl: '/images/committees/team/events-priyamvad-ranade.webp' },
      { name: 'Rayna Sahay', role: 'Senior Member', photoUrl: '/images/committees/team/events-rayna-sahay.webp' },
      { name: 'Shardul Khandebharad', role: 'Senior Member', photoUrl: '/images/committees/team/events-shardul-khandebharad.webp' },
      { name: 'Shayan Maqsood', role: 'Senior Member', photoUrl: '/images/committees/team/events-shayan-maqsood.webp' },
      { name: 'Susmeet Munji', role: 'Senior Member', photoUrl: '/images/committees/team/events-susmeet-munji.webp' },
      { name: 'Venugopal Tallapelli', role: 'Senior Member', photoUrl: '/images/committees/team/events-venugopal-tallapelli.webp' },
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
    showJoin: false,
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
      { name: 'Jahaan Desai', role: 'Coordinator', photoUrl: '/images/committees/team/entrepreneurship-cell-jahaan-desai.webp' },
      { name: 'Siddhant Pol', role: 'Coordinator', photoUrl: '/images/committees/team/entrepreneurship-cell-siddhant-pol.webp' },
      { name: 'Anukriti Raj', role: 'Senior Member', photoUrl: '/images/committees/team/entrepreneurship-cell-anukriti-raj.webp' },
      { name: 'Krishna Vyas', role: 'Senior Member', photoUrl: '/images/committees/team/entrepreneurship-cell-krishna-vyas.webp' },
      { name: 'Manas Mehta', role: 'Senior Member', photoUrl: '/images/committees/team/entrepreneurship-cell-manas-mehta.webp' },
      { name: 'Rishi Jain', role: 'Senior Member', photoUrl: '/images/committees/team/entrepreneurship-cell-rishi-jain.webp' },
      { name: 'Sharvari Itagi', role: 'Senior Member', photoUrl: '/images/committees/team/entrepreneurship-cell-sharvari-itagi.webp' },
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
    showJoin: false,
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
      { name: 'Ashray Mulki', role: 'Coordinator', photoUrl: '/images/committees/team/finance-forum-ashray-mulki.webp' },
      { name: 'Deepak Joshi', role: 'Coordinator', photoUrl: '/images/committees/team/finance-forum-deepak-joshi.webp' },
      { name: 'Aadarsh Pandey', role: 'Senior Member', photoUrl: '/images/committees/team/finance-forum-aadarsh-pandey.webp' },
      { name: 'Afreen Shaikh', role: 'Senior Member', photoUrl: '/images/committees/team/finance-forum-afreen-shaikh.webp' },
      { name: 'Harsh Picha', role: 'Senior Member', photoUrl: '/images/committees/team/finance-forum-harsh-picha.webp' },
      { name: 'Prachi Taparia', role: 'Senior Member', photoUrl: '/images/committees/team/finance-forum-prachi-taparia.webp' },
      { name: 'Premsagar Chavan', role: 'Senior Member', photoUrl: '/images/committees/team/finance-forum-premsagar-chavan.webp' },
      { name: 'Rutika Sawant', role: 'Senior Member', photoUrl: '/images/committees/team/finance-forum-rutika-sawant.webp' },
      { name: 'Trevor DaCosta', role: 'Senior Member', photoUrl: '/images/committees/team/finance-forum-trevor-dacosta.webp' },
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
  'infra-tech': ['Infra Tech Committee', 'Academic', 'Digital operations, tech infrastructure, AV systems.'],
  'course-coordinators': ['Course Co-ordinators', 'Academic', 'Academic scheduling, timetabling, faculty interface.'],
  'chairpersons-council': ['Chairpersons Council', 'Leadership', 'Cross-committee coordination - Year 2 senior leaders.'],
};

function genericCommittee(slug) {
  const entry = DIRECTORY[slug];
  if (!entry) return null;
  const [name, category, description] = entry;
  return {
    showJoin: false,
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

// Navy date tile for a committee event: weekday, day number, month + year.
function EventDate({ date }) {
  const d = new Date(`${date}T00:00:00`);
  if (Number.isNaN(d.getTime())) return null;
  const part = (opts) => d.toLocaleDateString('en-GB', opts);
  return (
    <div className="w-[96px] shrink-0 rounded-lg bg-navy-900 text-white flex flex-col items-center justify-center py-3 gap-0.5">
      <span className="text-xs leading-[150%]">{part({ weekday: 'short' })}</span>
      <span className="font-display font-medium text-[28px] leading-[120%]">{part({ day: '2-digit' })}</span>
      <span className="text-xs leading-[150%] uppercase">{part({ month: 'short', year: 'numeric' })}</span>
    </div>
  );
}

export default function CommitteeDetail() {
  const { slug } = useParams();
  const facts = useKeyFacts();
  const { data, loading } = useCommitteeData(slug);
  const [teamGroup, setTeamGroup] = useState(null);
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
  // Team tabs: one per programme (in order of first appearance) when members carry one.
  const teamGroups = has('team') ? [...new Set(c.team.map((m) => m.group).filter(Boolean))] : [];
  const activeGroup = teamGroups.includes(teamGroup) ? teamGroup : teamGroups[0];
  const teamShown = teamGroups.length > 1 ? c.team.filter((m) => m.group === activeGroup) : c.team || [];

  return (
    <div className="bg-white">
      <PageHero
        image={heroImageUrl}
        eyebrow={c.heroEyebrow}
        title={c.name}
        // Room for the longest committee name on one line ("Entrepreneurship Cell").
        titleWidth={1100}
        description={c.tagline}
        descriptionWidth={628}
        // The email + "All committees" buttons show only when switched on in the Studio.
        actions={
          c.showHeroButtons
            ? [
                ...(c.contactEmail ? [{ label: `Email ${c.contactEmail}`, href: `mailto:${c.contactEmail}`, primary: true }] : []),
                { label: `All ${facts.committeeCount} committees`, to: '/students/body-structure' },
              ]
            : []
        }
      />

      {/* Stats — Figma "Layout / 396": 64 padding, four 296x300 cards, 32 gap (2x2, 16 gap on mobile). */}
      {has('stats') && (
        <section className="px-5 py-12 md:px-16 md:py-20">
          <StatGrid stats={c.stats} />
        </section>
      )}

      {/* What it does (default "list" layout) — white: tagline/title/body, then an
          activities card and skills column, 80 gap. */}
      {c.aboutStyle !== 'cards' && (c.aboutTitle || has('activities')) && (
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

      {/* What it does ("cards" layout, e.g. Placement) — navy band: white title (committee name in teal) and body, then
          the activities as white numbered cards beside a skills + equivalent column. */}
      {c.aboutStyle === 'cards' && (c.aboutTitle || has('activities')) && (
        <Section bg="bg-navy-900" className="text-white">
          <Tagline className="text-white">About this committee</Tagline>
          <Heading text={c.aboutTitle} highlight={c.name} className="text-white mt-6 md:mt-8" highlightClass="text-teal-400" />
          {c.aboutBody && <p className="mt-6 max-w-[1240px] text-base md:text-lg leading-[150%] text-white/90">{c.aboutBody}</p>}

          {/* Figma: three 284x364 cards 24 apart (900) | 48 gap | 364 column whose
              equivalent card sits on the cards' bottom edge. */}
          <div className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-[900fr_364fr] gap-10 lg:gap-12 items-stretch">
            {has('activities') && (
              <ol className="m-0 p-0 list-none grid sm:grid-cols-3 gap-6">
                {c.activities.map((a, i) => (
                  <li key={a.title} className="flex flex-col gap-8 p-8 lg:min-h-[364px] rounded-2xl bg-white text-black shadow-small">
                    <span className="w-[68px] h-[78px] shrink-0 rounded-2xl bg-navy-900 flex items-center justify-center font-display font-medium text-[36px] leading-none text-white">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="flex flex-col gap-4">
                      <h3 className="font-display font-medium text-[24px] md:text-[28px] leading-[140%] tracking-[-0.01em] text-navy-900">{a.title}</h3>
                      <p className="text-base leading-[150%] text-black">{a.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            )}

            <div className="flex flex-col justify-between gap-10">
              {has('skills') && (
                <div>
                  <h3 className="font-display font-medium text-[24px] md:text-[28px] leading-[140%] tracking-[-0.01em] text-white">{c.skillsTitle}</h3>
                  <div className="mt-8 flex flex-wrap gap-x-3 gap-y-3.5">
                    {c.skills.map((s) => (
                      <span key={s} className="inline-flex items-center h-[29px] px-3 rounded-2xl bg-white text-sm leading-[150%] text-navy-900">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {c.equivalentValue && (
                <AccentCard className="!rounded-none [&>div]:py-8 [&>div]:pl-8">
                  <p className="font-display font-medium text-[24px] md:text-[28px] leading-[140%] tracking-[-0.01em] text-navy-900">{c.equivalentTitle}</p>
                  <p className="mt-4 text-base leading-[150%] text-black">{c.equivalentValue}</p>
                </AccentCard>
              )}
            </div>
          </div>
        </Section>
      )}

      {/* Upcoming events — white, centred header, 2-up hairline cards with a navy date
          tile, title, line and an outline button, then the calendar link. */}
      {has('events') && (
        <Section width={1280}>
          <SectionTitle
            center
            tagline={c.eventsEyebrow}
            title={c.eventsTitle}
            highlight={c.eventsTitleHighlight}
            body={c.eventsSubtitle}
          />
          <div className="mt-10 md:mt-12 grid md:grid-cols-2 gap-6">
            {c.events.map((e) => (
              <div key={`${e.title}-${e.date}`} className="flex items-center gap-5 md:gap-6 p-5 md:p-6 rounded-xl bg-white outline outline-1 -outline-offset-1 outline-black/15 shadow-small">
                <EventDate date={e.date} />
                <div className="flex-1 min-w-0 flex flex-col items-start gap-2">
                  <H6 as="h3" className="text-black">
                    {e.title}
                  </H6>
                  {e.description && <p className="text-sm leading-[150%] text-black">{e.description}</p>}
                  {e.ctaLabel && (
                    <Link
                      to={e.ctaUrl || '/placements/contact'}
                      className="mt-1 inline-flex items-center h-9 px-4 rounded-md bg-white outline outline-1 -outline-offset-1 outline-black/20 text-sm leading-[150%] font-medium text-navy-900 hover:bg-navy-50 transition-colors"
                    >
                      {e.ctaLabel}
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
          {c.eventsCtaLabel && (
            <div className="mt-10 md:mt-12 flex justify-center">
              <Link
                to={c.eventsCtaUrl || '/events#calendar'}
                className="inline-flex items-center gap-2 h-11 px-6 rounded-md bg-navy-900 text-white text-base leading-[150%] font-medium hover:bg-navy-800 transition-colors"
              >
                {c.eventsCtaLabel} <ArrowRight size={20} strokeWidth={1.5} />
              </Link>
            </div>
          )}
        </Section>
      )}

      {/* A year in the committee — #eaeaf1: left title, then a timeline of months:
          navy dot + rule, month label, white card (Playfair title, outline tag, line). */}
      {has('yearItems') && (
        <Section bg="bg-navy-50" width={1312}>
          <SectionTitle tagline={c.yearEyebrow} title={c.yearTitle} highlight={c.yearTitleHighlight} body={c.yearSubtitle} />
          <ol className="mt-10 md:mt-16 m-0 p-0 list-none flex flex-col gap-8 md:gap-[76px]">
            {c.yearItems.map((y) => (
              <li key={`${y.month}-${y.title}`} className="grid grid-cols-[26px_1fr] md:grid-cols-[26px_200px_1fr] lg:grid-cols-[26px_270px_1fr] gap-x-5 md:gap-x-10 items-start">
                <div className="row-span-2 md:row-span-1 flex flex-col items-center self-stretch">
                  <span className="w-[26px] h-[26px] rounded-full bg-navy-900 shrink-0" aria-hidden="true" />
                  <span className="mt-3 flex-1 w-0.5 bg-navy-900 md:min-h-[80px]" aria-hidden="true" />
                </div>
                <p className="self-center text-base md:text-[22px] leading-[150%] uppercase text-navy-900">{y.month}</p>
                <div className="col-start-2 md:col-start-auto mt-3 md:mt-0 flex flex-col gap-3 p-6 md:p-8 rounded-xl bg-white outline outline-1 -outline-offset-1 outline-black/15 shadow-small">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-display font-medium text-[22px] md:text-[28px] leading-[140%] tracking-[-0.01em] text-navy-900">{y.title}</h3>
                    {y.tag && (
                      <span className="inline-flex items-center h-7 px-3 rounded-2xl outline outline-1 -outline-offset-1 outline-black/20 text-xs md:text-sm leading-[150%] uppercase text-navy-900">
                        {y.tag}
                      </span>
                    )}
                  </div>
                  {y.description && <p className="text-base leading-[150%] text-black">{y.description}</p>}
                </div>
              </li>
            ))}
          </ol>
        </Section>
      )}

      {/* Team — Figma "CTA / 57" on #24295c: centred header, 3-up 405x522 navy cards.
          When members carry a programme (MMS / MSc), underline tabs switch between them. */}
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
          {teamGroups.length > 1 && (
            <div role="tablist" aria-label="Team by programme" className="mt-10 md:mt-12 flex justify-center gap-8">
              {teamGroups.map((g) => (
                <button
                  key={g}
                  type="button"
                  role="tab"
                  aria-selected={g === activeGroup}
                  onClick={() => setTeamGroup(g)}
                  className={`pb-2 border-b-2 text-base leading-[150%] uppercase transition-colors ${
                    g === activeGroup ? 'border-teal-400 text-white font-medium' : 'border-transparent text-white/70 hover:text-white'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          )}
          {/* One, two or four members sit centred (1-up / 2-up), at the 3-up card width. */}
          <div
            className={`mt-10 md:mt-12 grid grid-cols-1 gap-8 ${
              teamShown.length === 1
                ? 'max-w-[405px] mx-auto'
                : teamShown.length === 2 || teamShown.length === 4
                  ? 'md:grid-cols-2 max-w-[842px] mx-auto'
                  : 'md:grid-cols-2 lg:grid-cols-3'
            }`}
          >
            {teamShown.map((m, i) => {
              const photoUrl = m.photo
                ? urlFor(m.photo).width(700).auto('format').url()
                : m.photoUrl || MEMBER_FALLBACK[i % MEMBER_FALLBACK.length];
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

      {/* Join CTA — Figma "CTA / 57" navy: 64 padding, 613 column, Eastern Blue tagline.
          Hidden on every committee for now; turn it on per committee in the Studio (showJoin). */}
      {c.showJoin !== false && (
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
      )}
    </div>
  );
}
