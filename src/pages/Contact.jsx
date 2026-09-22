import { useState } from 'react';
import {
  AlertCircle,
  ArrowUpRight,
  Briefcase,
  CheckCircle2,
  ChevronDown,
  GraduationCap,
  Handshake,
  Loader2,
  Mail,
  Newspaper,
  Phone,
  Users,
} from 'lucide-react';
import PageHero, { HeroButton } from '../components/PageHero';
import { Section, SectionTitle, H5, H6 } from '../components/ui';
import { heroImage } from '../lib/heroImage';
import { useContactData } from '../lib/useContactData';
import { urlFor } from '../lib/sanity';
import { useKeyFacts, fillFactsDeep } from '../lib/useKeyFacts';

const ROLE_ICONS = {
  student: GraduationCap,
  recruiter: Briefcase,
  alumnus: Users,
  press: Newspaper,
  vendor: Handshake,
};

const COUNT_WORDS = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
// Figma directory portraits, used when a department has no Sanity photo.
const DEPT_PHOTOS = [1, 2, 3, 4, 5].map((n) => `/images/contact/dept-${n}.webp`);
const img = (image, fallback, w) => (image ? urlFor(image).width(w).auto('format').url() : fallback);
// Figma banner buttons: white, 1px navy border, navy 16 medium, 40 tall.
const BANNER_BTN =
  'inline-flex items-center gap-3 h-10 px-5 rounded-md bg-white outline outline-1 -outline-offset-1 outline-navy-900 text-navy-900 text-base leading-[150%] font-medium hover:bg-navy-50';

const fallbackPage = {
  heroEyebrow: 'Who are you here as?',
  heroTitle: "Pick a path. We'll route you.",
  heroTitleItalic: 'route you.',
  heroDescription:
    'Pick your role below and the page surfaces the right contact, form and next step.',

  pickerEyebrow: 'I am a…',
  pickerTitle: 'paths · one page.',
  pickerTitleHighlight: 'one page.',
  pickerSubtitle: 'Pick your role below — the page tailors itself to you.',

  generalEyebrow: 'General Contact',
  generalTitle: 'Send us a message.',
  generalTitleHighlight: 'message.',
  generalSubtitle: 'General enquiry form — or pick a role above for a faster, tailored route.',
  generalSubmitLabel: 'Send my message',
  generalFootnote: 'Generic enquiry · routes to info@simsree.org',

  directoryEyebrow: 'Department Directory · Live-Site Data',
  directoryTitle: 'Direct department contacts',
  directorySubtitle: 'Every number and email below is current and official.',
  departments: [
    { name: 'Dr. Shriniwas Dhure', role: 'Director', phone: '+91 22 6151 0700' },
    { name: 'Mr. Ravindra Nannaware', role: 'Administration', phone: '+91 22 6151 0700' },
    { name: 'Vinayak Khanvilkar', role: 'MMS Admissions', phone: '+91 22 6151 0700' },
    { name: 'Library', role: '', phone: '022 6151 0708 / 0709' },
    { name: 'SIMAA', role: 'Alumni Association', phone: '+91 22 6151 0730' },
  ],
  directoryPanels: [
    {
      title: 'Chairpersons (live site)',
      body: 'Sumedh Deshpande & Yash Raj Pandey Email: chairpersons@simsree.org',
    },
    {
      title: 'Admissions helpers (student team)',
      rows: [
        { label: 'AJINKYA ADSUL', value: '+91 91378 58003' },
        { label: 'RUPAL DHARPURE', value: '+91 91378 52811' },
        { label: 'SOURABH PATIL', value: '+91 91378 40385' },
        { label: 'VISHAL PATIL', value: '+91 91378 42060' },
        { label: 'Harshit Golechha', value: '+91 83698 92445' },
        { label: 'Himanshu Agarwal', value: '+91 86918 04379' },
        { label: 'Kunal Kumar', value: '+91 88507 35980' },
        { label: 'Yukta Dubla', value: '+91 70208 01643' },
      ],
    },
    {
      title: 'Placement Cell',
      body: 'Paras Surve · +91 8830 532 100 · Sahil Sawant · +91 8097 251 728 Email: {{placementEmail}}',
    },
  ],

  locationEyebrow: 'Find Us',
  locationTitle: 'B-Road, Churchgate, Mumbai 400 020',
  locationTitleHighlight: 'Churchgate',
  locationSubtitle: '2 minutes from Churchgate station · inside Sydenham College campus.',
  mapsUrl: 'https://maps.google.com/?q=SIMSREE+Churchgate+Mumbai',
  directionsTitle: 'Step-by-step from Churchgate station',
  directions: [
    'Exit at Churchgate station east side',
    'Walk along B-Road past the cricket grounds',
    'Sydenham College gates · campus on the right',
    'SIMSREE block · second floor entry',
  ],

  disclosureEyebrow: 'Mandatory Disclosure',
  disclosureTitle: 'Anti-Ragging Helpline.',
  disclosureTitleHighlight: 'Helpline.',
  disclosureBody:
    'SIMSREE has zero tolerance for ragging. If you experience or witness ragging, call any of these numbers anonymously.',
  disclosureButtons: [
    { label: 'UGC Helpline · 1800 180 5522', url: 'tel:18001805522', primary: true },
    { label: 'SIMSREE Anti-Ragging · 022 6151 0701', url: 'tel:02261510701', primary: false },
    { label: 'Email', url: 'mailto:antiragging@simsree.org', primary: false },
  ],
  disclosureCards: [
    { title: 'Counselling Cell', body: 'counselling@simsree.org · confidential.' },
    { title: 'Internal Complaints Committee', body: 'icc@simsree.org · 7-day acknowledgement.' },
    { title: 'Accessibility', body: 'ada@simsree.org · WCAG 2.1 AA in progress.' },
  ],

  fallbackEmail: 'info@simsree.org',
  consentLabel: "I agree to SIMSREE's privacy notice.",
  successTitle: 'Message sent.',
  successBody: 'We reply within 1 business day.',
  failTitle: "That didn't go through.",
  failBody: 'Your details are still here — try again, or email us instead.',
};

const fallbackRoles = [
  {
    name: 'Prospective Student',
    cardDescription: 'Admissions · programmes · fees · eligibility',
    icon: 'student',
    panelEyebrow: 'Prospective Student',
    panelTitle: 'MMS · M.Sc. Finance · MFM · MMM · Ph.D',
    panelSubtitle: 'Routes to admissions@simsree.org · response within 1 business day.',
    showForm: true,
    formSubmitLabel: 'Send Message',
    formFootnote: 'Generic enquiry · routes to info@simsree.org',
    cards: [
      {
        title: 'Admissions helpers (student team)',
        body: 'AJINKYA ADSUL · +91 91378 58003 · RUPAL DHARPURE · +91 91378 52811 · SOURABH PATIL · +91 91378 40385 · VISHAL PATIL · +91 91378 42060',
      },
      { title: 'MMS office', body: 'Vinayak Khanvilkar · 022 6151 0709 · admissions@simsree.org' },
      { title: 'M.Sc. Finance', body: 'simsree.edu@gmail.com · 022 6151 0709' },
    ],
    order: 1,
  },
  {
    name: 'Recruiter',
    cardDescription: 'Campus visits · JDs · MoUs · routes to Placements',
    icon: 'recruiter',
    panelEyebrow: 'Recruiter',
    panelTitle: 'Recruiters, straight to Placements',
    panelTitleHighlight: 'Placements',
    panelSubtitle: 'Find recruiter contacts on the Placements tab — we keep them in one place.',
    panelButtons: [
      { label: 'Submit your hiring needs', url: '/placements/recruiter-engagement', primary: true },
      { label: 'Email Placement Cell', url: 'mailto:placements@simsree.org', primary: false },
    ],
    cards: [
      { title: 'Placement Office Hours', body: 'Mon-Sat · 11am-7pm' },
      { title: 'Paras Surve', body: '+91 8830 532 100', linkLabel: 'Call · WhatsApp', linkUrl: 'tel:+918830532100' },
      { title: 'Sahil Sawant', body: '+91 8097 251 728', linkLabel: 'Call · WhatsApp', linkUrl: 'tel:+918097251728' },
    ],
    order: 2,
  },
  {
    name: 'Alumnus',
    cardDescription: 'SIMAA · Batchmeet · mentoring · directory',
    icon: 'alumnus',
    panelEyebrow: 'Alumnus',
    panelTitle: 'Welcome home.',
    panelTitleHighlight: 'home.',
    panelSubtitle:
      'Update your profile, attend Batchmeet and find your batch on the Alumni Gateway — run by SIMAA, the formal alumni body.',
    panelButtons: [
      { label: 'Reconnect on the Alumni Gateway', url: '/alumni-portal', primary: true },
      { label: 'Open the SIMAA Portal', url: '/alumni-portal', primary: false },
    ],
    cards: [
      { title: 'Register on Gateway', body: 'Create an account · add your career milestones.' },
      { title: 'Mentor a junior', body: 'Get matched with a current student in your sector.' },
      { title: 'Speak at Batchmeet 2026', body: 'Annual alumni evening · March 2026.' },
    ],
    banner: {
      title: 'SIMAA Office',
      detail: '+91 22 6151 0730 · simaa@simsree.org',
      callLabel: 'Call',
      callUrl: 'tel:+912261510730',
      emailLabel: 'Email the alumni team',
      emailUrl: 'mailto:simaa@simsree.org',
    },
    order: 3,
  },
  {
    name: 'Press / Media',
    cardDescription: 'Interview requests · statements · photos',
    icon: 'press',
    panelEyebrow: 'Press / Media',
    panelTitle: 'Stories · statements.',
    panelTitleHighlight: 'statements.',
    panelSubtitle:
      'Interview the Director · official statements on awards or rankings · campus photos · alumni leads.',
    panelButtons: [
      { label: 'Email Marketing & Media', url: 'mailto:marketing@simsree.org', primary: true },
      { label: 'Download the press kit', url: '#', primary: false },
    ],
    cards: [
      { title: 'Interviews', body: 'Director · faculty · select alumni · within 48 hours.' },
      { title: 'Photos & B-roll', body: 'Campus · committee work · events · Simerations · TEDxSIMSREE.' },
      { title: 'Data & Stats', body: 'Placements · diversity · rankings · accreditations.' },
    ],
    order: 4,
  },
  {
    name: 'Vendor / Partner',
    cardDescription: 'Procurement · MDP · sponsorship',
    icon: 'vendor',
    panelEyebrow: 'Vendor / Partner',
    panelTitle: 'Procurement · MDP · Sponsorship.',
    panelTitleHighlight: 'Sponsorship.',
    panelSubtitle:
      'Routes to administration@simsree.org for procurement · mdp@simsree.org for MDP design · simerations@simsree.org for sponsorship.',
    showForm: true,
    formSubmitLabel: 'Send Message',
    formFootnote: 'Vendor form · routes to administration@simsree.org',
    order: 5,
  },
];

const FIELDS = [
  { name: 'name', label: 'Your name', placeholder: 'First & Last', required: true },
  { name: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com', required: true },
  { name: 'phone', label: 'Phone (WhatsApp)', type: 'tel', placeholder: '+91.....' },
  { name: 'role', label: "I'm a...", type: 'select', required: true },
  { name: 'subject', label: 'Subject', placeholder: "What's it about?", required: true, full: true },
  { name: 'message', label: 'Message', type: 'textarea', rows: 5, placeholder: 'How can we help ?', required: true, full: true },
];

const EMPTY = Object.fromEntries(FIELDS.map((f) => [f.name, '']));

// Figma bar card: hairline + "small" shadow, 3px Eastern Blue bar, content 32
// from it with 16 top/bottom and 32 right: H5 navy title over the details.
function BarCard({ title, children, className = '' }) {
  return (
    <div className={`flex gap-4 md:gap-8 bg-white outline outline-1 -outline-offset-1 outline-black/20 shadow-small ${className}`}>
      <span className="w-[3px] shrink-0 bg-teal-500" aria-hidden="true" />
      <div className="flex-1 min-w-0 py-4 pr-4 md:pr-6 flex flex-col gap-4">
        <H5 as="h3" className="max-md:text-[22px]">{title}</H5>
        {children}
      </div>
    </div>
  );
}

function validate(values, consent) {
  const errors = {};
  for (const f of FIELDS) {
    if (f.required && !values[f.name].trim()) errors[f.name] = 'Required';
  }
  if (values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = 'Enter a valid email address';
  }
  if (!consent) errors.consent = 'Required';
  return errors;
}

export default function Contact() {
  const facts = useKeyFacts();
  const { data } = useContactData();
  const cp = fillFactsDeep({ ...fallbackPage, ...(data?.page || {}) }, facts);
  const roles = fillFactsDeep(data?.roles?.length ? data.roles : fallbackRoles, facts);

  // null = no role picked, showing the general form
  const [roleIndex, setRoleIndex] = useState(null);
  const role = roleIndex === null ? null : roles[roleIndex];

  const [values, setValues] = useState(EMPTY);
  const [consent, setConsent] = useState(false);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

  const sending = status === 'sending';

  const roleOptions = roles.map((r) => r.name);

  const setField = (name, value) => {
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: undefined }));
  };

  const handleBlur = (name) => {
    setTouched((t) => ({ ...t, [name]: true }));
    const next = validate(values, consent);
    setErrors((e) => ({ ...e, [name]: next[name] }));
  };

  const mailtoHref = () => {
    const lines = FIELDS.filter((f) => values[f.name].trim()).map(
      (f) => `${f.label}: ${values[f.name].trim()}`
    );
    const body = `${lines.join('\n')}\n\nSent from the SIMSREE contact form.`;
    return `mailto:${cp.fallbackEmail}?subject=${encodeURIComponent(
      values.subject.trim() || 'Website enquiry'
    )}&body=${encodeURIComponent(body)}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const next = validate(values, consent);
    setErrors(next);
    setTouched(Object.fromEntries([...FIELDS.map((f) => [f.name, true]), ['consent', true]]));
    if (Object.values(next).some(Boolean)) return;

    // With no endpoint set there is nothing to POST to, so hand the enquiry to
    // the visitor's mail client rather than pretending to send.
    if (!cp.endpointUrl) {
      window.location.href = mailtoHref();
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch(cp.endpointUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...values, consent, path: role?.name || 'General' }),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      setStatus('success');
      setValues(EMPTY);
      setConsent(false);
      setTouched({});
    } catch {
      setStatus('fail');
    }
  };

  const fieldError = (name) => touched[name] && errors[name];

  // Figma inputs: 48px, 1px black border, 12 padding, 16/150; labels 16/150 8 above.
  const inputCls = (err) =>
    `w-full bg-white border px-3 text-base leading-[150%] text-black placeholder:text-black/60 focus:outline-none focus:ring-2 focus:ring-teal-500/40 ${
      err ? 'border-red-500' : 'border-black'
    }`;

  const renderForm = (submitLabel, footnote) =>
    status === 'success' ? (
      <div role="status" className="max-w-[814px] p-8 bg-white outline outline-1 -outline-offset-1 outline-black/20 flex flex-col gap-6">
        <div className="flex items-start gap-3">
          <CheckCircle2 size={24} className="text-emerald-600 shrink-0" />
          <div>
            <H6 as="h3" className="text-black">
              {cp.successTitle}
            </H6>
            <p className="text-base leading-[150%] text-black">{cp.successBody}</p>
          </div>
        </div>
        <HeroButton label="Send another message" onClick={() => setStatus('idle')} className="w-fit" />
      </div>
    ) : (
      <form onSubmit={handleSubmit} noValidate className="max-w-[814px]">
        {status === 'fail' && (
          <div role="alert" className="mb-6 p-5 outline outline-1 -outline-offset-1 outline-red-300 flex items-start gap-3">
            <AlertCircle size={20} className="text-red-500 shrink-0 mt-0.5" />
            <div className="text-base leading-[150%] text-black">
              <p className="font-semibold">{cp.failTitle}</p>
              <p>{cp.failBody}</p>
              <a href={mailtoHref()} className="text-navy-900 underline underline-offset-2">
                Email {cp.fallbackEmail} instead
              </a>
            </div>
          </div>
        )}

        <fieldset disabled={sending} className="border-0 p-0 m-0 disabled:opacity-60">
          <div className="grid md:grid-cols-2 gap-6">
            {FIELDS.map((f) => {
              const err = fieldError(f.name);
              return (
                <div key={f.name} className={`flex flex-col gap-2 ${f.full ? 'md:col-span-2' : ''}`}>
                  <label htmlFor={`c-${f.name}`} className="text-base leading-[150%] text-black">
                    {f.label}
                    {f.required && <span className="text-[#d00416]"> *</span>}
                  </label>
                  {f.type === 'select' ? (
                    <div className="relative">
                      <select
                        id={`c-${f.name}`}
                        value={values[f.name]}
                        onChange={(e) => setField(f.name, e.target.value)}
                        onBlur={() => handleBlur(f.name)}
                        aria-invalid={!!err}
                        className={`${inputCls(err)} h-12 pr-10 appearance-none ${values[f.name] ? '' : 'text-black/60'}`}
                      >
                        <option value="">Select Prospective Student,</option>
                        {roleOptions.map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                      <ChevronDown size={24} strokeWidth={1.5} className="pointer-events-none absolute right-3 top-3" />
                    </div>
                  ) : f.type === 'textarea' ? (
                    <textarea
                      id={`c-${f.name}`}
                      value={values[f.name]}
                      onChange={(e) => setField(f.name, e.target.value)}
                      onBlur={() => handleBlur(f.name)}
                      placeholder={f.placeholder}
                      aria-invalid={!!err}
                      className={`${inputCls(err)} h-[180px] py-3 resize-y`}
                    />
                  ) : (
                    <input
                      id={`c-${f.name}`}
                      type={f.type || 'text'}
                      value={values[f.name]}
                      onChange={(e) => setField(f.name, e.target.value)}
                      onBlur={() => handleBlur(f.name)}
                      placeholder={f.placeholder}
                      aria-invalid={!!err}
                      className={`${inputCls(err)} h-12`}
                    />
                  )}
                  {err && <p className="text-sm text-red-600">{err}</p>}
                </div>
              );
            })}
          </div>

          <label className="mt-6 pb-4 flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => {
                setConsent(e.target.checked);
                if (e.target.checked) setErrors((er) => ({ ...er, consent: undefined }));
              }}
              onBlur={() => handleBlur('consent')}
              aria-invalid={!!fieldError('consent')}
              className="mt-0.5 w-[18px] h-[18px] shrink-0 accent-navy-900"
            />
            <span className="text-sm leading-[150%] text-black">{cp.consentLabel}</span>
          </label>
          {fieldError('consent') && <p className="text-sm text-red-600">Please accept the privacy notice.</p>}

          <button
            type="submit"
            className="mt-2 h-11 px-6 rounded-md bg-teal-500 hover:bg-teal-600 outline outline-1 -outline-offset-1 outline-teal-500 text-white text-base leading-[150%] font-medium inline-flex items-center gap-2 transition-colors"
          >
            {sending && <Loader2 size={20} className="animate-spin" />}
            {sending ? 'Sending…' : submitLabel}
          </button>
        </fieldset>

        {footnote && <p className="mt-6 text-sm leading-[150%] text-black">{footnote}</p>}
      </form>
    );

  const helpers = (cp.directoryPanels || [])[1];

  return (
    <div className="bg-white">
      <PageHero
        image={heroImage(cp.heroImage, '/images/contact/hero.webp', { stretch: true })}
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Contact Us' }]}
        eyebrow={cp.heroEyebrow}
        eyebrowUpper
        title={cp.heroTitle}
        titleItalic={cp.heroTitleItalic}
        titleWidth={900}
        description={cp.heroDescription}
        descriptionWidth={628}
      />

      {/* Role picker — five 237 cards (24 gaps): 36px icon, H6 navy, 14/150 copy;
          the picked one turns navy with the "large" shadow. */}
      <Section width={1280}>
        <SectionTitle
          tagline={cp.pickerEyebrow}
          title={`${COUNT_WORDS[roles.length] || roles.length} ${cp.pickerTitle}`}
          highlight={cp.pickerTitleHighlight}
          body={cp.pickerSubtitle}
        />
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {roles.map((r, i) => {
            const Icon = ROLE_ICONS[r.icon] || GraduationCap;
            const active = roleIndex === i;
            return (
              <button
                key={r.name}
                type="button"
                onClick={() => setRoleIndex(active ? null : i)}
                aria-pressed={active}
                className={`text-left p-6 flex flex-col gap-6 transition-colors outline outline-1 -outline-offset-1 ${
                  active ? 'bg-navy-900 outline-navy-900 shadow-large text-white' : 'bg-white outline-black/20 shadow-small hover:bg-navy-50'
                }`}
              >
                <Icon size={36} strokeWidth={1.5} className={active ? 'text-white' : 'text-black'} />
                <span className="flex flex-col gap-2">
                  <H6 as="span" className={active ? 'text-white' : 'text-navy-900'}>
                    {r.name}
                  </H6>
                  <span className={`text-sm leading-[150%] ${active ? 'text-ink-50' : 'text-black'}`}>{r.cardDescription}</span>
                </span>
              </button>
            );
          })}
        </div>
      </Section>

      {/* Panel — the picked role's route, or the general form. */}
      <Section width={1280}>
        <SectionTitle
          tagline={role ? role.panelEyebrow : cp.generalEyebrow}
          title={role ? role.panelTitle : cp.generalTitle}
          highlight={role ? role.panelTitleHighlight : cp.generalTitleHighlight}
          body={role ? role.panelSubtitle : cp.generalSubtitle}
          width={role ? 961 : 768}
        />

        {role?.panelButtons?.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-6">
            {role.panelButtons.map((b) => (
              <HeroButton key={b.label} label={b.label} href={b.url} primary={b.primary} />
            ))}
          </div>
        )}

        {(!role || role.showForm) && (
          <div className="mt-20">{renderForm(role ? role.formSubmitLabel || 'Send Message' : cp.generalSubmitLabel, role ? role.formFootnote : cp.generalFootnote)}</div>
        )}

        {role?.cards?.length > 0 && (
          <div className="mt-20 grid md:grid-cols-3 gap-8">
            {role.cards.map((c) => (
              <BarCard key={c.title} title={c.title}>
                {c.body && <p className="text-sm leading-[150%] text-black">{c.body}</p>}
                {c.linkLabel && (
                  <a href={c.linkUrl || '#'} className="text-sm leading-[150%] text-navy-900 underline underline-offset-2">
                    {c.linkLabel}
                  </a>
                )}
              </BarCard>
            ))}
          </div>
        )}

        {role?.banner?.title && (
          <div className="mt-20 p-6 rounded-2xl bg-navy-900 outline outline-1 -outline-offset-1 outline-black/20 text-white flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
            <div className="flex-1 min-w-0 flex items-center gap-4">
              <GraduationCap size={48} strokeWidth={1.5} className="shrink-0" />
              <div className="flex flex-col gap-1">
                <p className="text-lg leading-[150%]">{role.banner.title}</p>
                <p className="text-sm leading-[150%]">{role.banner.detail}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              {role.banner.callUrl && (
                <a href={role.banner.callUrl} className={BANNER_BTN}>
                  {role.banner.callLabel} <Phone size={24} strokeWidth={1.5} />
                </a>
              )}
              {role.banner.emailUrl && (
                <a href={role.banner.emailUrl} className={BANNER_BTN}>
                  {role.banner.emailLabel} <Mail size={24} strokeWidth={1.5} />
                </a>
              )}
            </div>
          </div>
        )}
      </Section>

      {/* Directory — #eaeaf1; five 211 round portraits (22 semibold name, 18/150
          role + phone), then bar cards: two stacked | the helpers list. */}
      <Section bg="bg-navy-50" width={1280}>
        <SectionTitle tagline={cp.directoryEyebrow} title={cp.directoryTitle} body={cp.directorySubtitle} />
        <div className="mt-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 lg:gap-x-14 gap-y-12">
          {(cp.departments || []).map((d, i) => (
            <div key={d.name} className="flex flex-col items-center gap-4 text-center text-black">
              <div
                className="w-full max-w-[211px] aspect-square rounded-full bg-navy-100 bg-cover bg-center"
                style={{ backgroundImage: `url('${img(d.photo, DEPT_PHOTOS[i % DEPT_PHOTOS.length], 422)}')` }}
              />
              <div>
                <p className="text-lg md:text-[22px] leading-[150%] font-semibold lg:whitespace-nowrap">{d.name}</p>
                {d.role && <p className="text-base md:text-lg leading-[150%]">{d.role}</p>}
                {d.phone && (
                  <a href={`tel:${d.phone.replace(/[^\d+]/g, '')}`} className="block text-base md:text-lg leading-[150%] hover:underline underline-offset-2">
                    {d.phone}
                  </a>
                )}
                {d.email && (
                  <a href={`mailto:${d.email}`} className="block text-base leading-[150%] break-all hover:underline underline-offset-2">
                    {d.email}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-20 grid lg:grid-cols-[714fr_534fr] gap-8 items-stretch">
          <div className="flex flex-col gap-4">
            {(cp.directoryPanels || [])
              .filter((_, i) => i !== 1)
              .map((p) => (
                <BarCard key={p.title} title={p.title} className="flex-1">
                  {p.body && <p className="text-sm leading-[150%] text-black">{p.body}</p>}
                </BarCard>
              ))}
          </div>
          {helpers && (
            <BarCard title={helpers.title}>
              <ul className="list-none m-0 p-0 text-sm leading-[150%] text-black">
                {(helpers.rows || []).map((r) => (
                  <li key={r.label}>
                    {r.label} · {r.value}
                  </li>
                ))}
              </ul>
            </BarCard>
          )}
        </div>
      </Section>

      {/* Find us — 698 copy (title, buttons, directions bar card) | 502 map. */}
      <Section width={1280}>
        <div className="grid lg:grid-cols-[698px_1fr] gap-12 lg:gap-20">
          <div className="flex flex-col gap-20">
            <SectionTitle tagline={cp.locationEyebrow} title={cp.locationTitle} highlight={cp.locationTitleHighlight} body={cp.locationSubtitle} width={698} />
            <div className="flex flex-col gap-6 max-w-[534px]">
              <div className="flex flex-wrap gap-6">
                <a
                  href={cp.mapsUrl || '#'}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 h-11 px-6 rounded-md bg-navy-900 hover:bg-navy-800 outline outline-1 -outline-offset-1 outline-navy-900 text-white text-base leading-[150%] font-medium transition-colors"
                >
                  Open in Google Maps <ArrowUpRight size={24} strokeWidth={1.5} />
                </a>
                <HeroButton label="Walking directions" href={cp.mapsUrl} />
              </div>
              {cp.directions?.length > 0 && (
                <BarCard title={cp.directionsTitle}>
                  <ol className="list-decimal m-0 pl-5 text-sm leading-[150%] text-black">
                    {cp.directions.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ol>
                </BarCard>
              )}
            </div>
          </div>
          <div className="h-[335px] lg:h-[534px] bg-navy-50 overflow-hidden">
            {cp.mapEmbedUrl ? (
              <iframe
                src={cp.mapEmbedUrl}
                title="SIMSREE campus location"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <a href={cp.mapsUrl || '#'} target="_blank" rel="noreferrer" aria-label="Open the campus on Google Maps" className="block w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('/images/contact/map.webp')" }} />
            )}
          </div>
        </div>
      </Section>

      {/* Anti-ragging — title, navy + outline buttons, three hairline cards. */}
      <Section width={1280}>
        <SectionTitle tagline={cp.disclosureEyebrow} title={cp.disclosureTitle} body={cp.disclosureBody} />
        <div className="mt-12 flex flex-wrap gap-6">
          {(cp.disclosureButtons || []).map((b) =>
            b.primary ? (
              <a
                key={b.label}
                href={b.url || '#'}
                className="inline-flex items-center gap-3 h-11 px-6 rounded-md bg-navy-900 hover:bg-navy-800 outline outline-1 -outline-offset-1 outline-navy-900 text-white text-base leading-[150%] font-medium transition-colors"
              >
                {b.label} <ArrowUpRight size={24} strokeWidth={1.5} />
              </a>
            ) : (
              <HeroButton key={b.label} label={b.label} href={b.url} />
            ),
          )}
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-8">
          {(cp.disclosureCards || []).map((c) => (
            <div key={c.title} className="min-h-[128px] py-4 px-8 flex flex-col justify-center gap-2 outline outline-1 -outline-offset-1 outline-black/20 shadow-small">
              <H6 as="h3">{c.title}</H6>
              <p className="text-base leading-[150%] text-black">{c.body}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
