import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertCircle,
  ArrowUpRight,
  Briefcase,
  CheckCircle2,
  GraduationCap,
  Loader2,
  Mail,
  Newspaper,
  Phone,
  Tag,
  Users,
} from 'lucide-react';
import { useContactData } from '../lib/useContactData';
import { urlFor } from '../lib/sanity';
import { useKeyFacts, fillFactsDeep } from '../lib/useKeyFacts';

const ROLE_ICONS = {
  student: GraduationCap,
  recruiter: Briefcase,
  alumnus: Users,
  press: Newspaper,
  vendor: Tag,
};

const fallbackPage = {
  heroEyebrow: 'Who are you here as?',
  heroTitle: "Pick a path. We'll route you.",
  heroTitleItalic: 'route you.',
  heroDescription:
    'Pick your role below and the page surfaces the right contact, form and next step.',

  pickerEyebrow: 'I am a...',
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

function TitleWithHighlight({ text = '', highlight, className, prefix }) {
  const idx = highlight ? text.indexOf(highlight) : -1;
  const body =
    idx === -1 ? (
      text
    ) : (
      <>
        {text.slice(0, idx)}
        <span className="text-teal-500">{highlight}</span>
        {text.slice(idx + highlight.length)}
      </>
    );
  return (
    <h2 className={className}>
      {prefix && <>{prefix} </>}
      {body}
    </h2>
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

  const heroImageUrl = cp.heroImage ? urlFor(cp.heroImage).width(1600).url() : null;
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

  const italic = cp.heroTitleItalic;
  const iIdx = italic ? (cp.heroTitle || '').indexOf(italic) : -1;

  const renderForm = (submitLabel, footnote) =>
    status === 'success' ? (
      <div role="status" className="max-w-[820px] border border-emerald-200 bg-emerald-50 rounded-lg p-8">
        <div className="flex items-start gap-3 mb-5">
          <CheckCircle2 size={22} className="text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-display text-xl font-semibold text-navy-900 mb-2">
              {cp.successTitle}
            </h3>
            <p className="text-sm text-ink-600">{cp.successBody}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="border border-navy-100 hover:bg-navy-50 transition-colors text-navy-900 text-sm font-medium px-4 py-2.5 rounded-md"
        >
          Send another message
        </button>
      </div>
    ) : (
      <form onSubmit={handleSubmit} noValidate className="max-w-[820px]">
        {status === 'fail' && (
          <div role="alert" className="border border-red-200 bg-red-50 rounded-lg p-6 mb-8 flex items-start gap-3">
            <AlertCircle size={20} className="text-red-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-navy-900 mb-1">{cp.failTitle}</h3>
              <p className="text-sm text-ink-600 mb-3">{cp.failBody}</p>
              <a href={mailtoHref()} className="text-sm font-medium text-sky-600 hover:text-teal-600">
                Email {cp.fallbackEmail} instead
              </a>
            </div>
          </div>
        )}

        <fieldset disabled={sending} className="border-0 p-0 m-0 disabled:opacity-60">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            {FIELDS.map((f) => {
              const err = fieldError(f.name);
              const base = `w-full border rounded-md px-4 py-3 text-sm text-navy-900 placeholder:text-ink-400 focus:outline-none transition-colors ${
                err ? 'border-red-400 focus:border-red-500' : 'border-navy-100 focus:border-sky-600'
              }`;
              return (
                <div key={f.name} className={f.full ? 'md:col-span-2' : ''}>
                  <label htmlFor={`c-${f.name}`} className="block text-sm text-navy-900 mb-2">
                    {f.label}
                    {f.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  {f.type === 'select' ? (
                    <select
                      id={`c-${f.name}`}
                      value={values[f.name]}
                      onChange={(e) => setField(f.name, e.target.value)}
                      onBlur={() => handleBlur(f.name)}
                      aria-invalid={!!err}
                      className={`${base} ${values[f.name] ? '' : 'text-ink-400'}`}
                    >
                      <option value="">Select Prospective Student,</option>
                      {roleOptions.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  ) : f.type === 'textarea' ? (
                    <textarea
                      id={`c-${f.name}`}
                      rows={f.rows}
                      value={values[f.name]}
                      onChange={(e) => setField(f.name, e.target.value)}
                      onBlur={() => handleBlur(f.name)}
                      placeholder={f.placeholder}
                      aria-invalid={!!err}
                      className={`${base} resize-y`}
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
                      className={base}
                    />
                  )}
                  {err && <p className="text-xs text-red-500 mt-1.5">{err}</p>}
                </div>
              );
            })}
          </div>

          <label className="flex items-start gap-3 mt-6 cursor-pointer">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => {
                setConsent(e.target.checked);
                if (e.target.checked) setErrors((er) => ({ ...er, consent: undefined }));
              }}
              onBlur={() => handleBlur('consent')}
              aria-invalid={!!fieldError('consent')}
              className="mt-0.5 w-4 h-4 shrink-0 accent-navy-900"
            />
            <span className="text-sm text-ink-600">{cp.consentLabel}</span>
          </label>
          {fieldError('consent') && (
            <p className="text-xs text-red-500 mt-1.5">Please accept the privacy notice.</p>
          )}

          <button
            type="submit"
            className="mt-6 bg-sky-600 hover:bg-teal-600 transition-colors text-white text-sm font-medium px-5 py-3 rounded-md flex items-center gap-2"
          >
            {sending && <Loader2 size={15} className="animate-spin" />}
            {sending ? 'Sending…' : submitLabel}
          </button>
        </fieldset>

        {footnote && <p className="text-xs text-ink-400 mt-4">{footnote}</p>}
      </form>
    );

  return (
    <div className="bg-white">
      {/* Hero */}
      <section
        className="min-h-[360px] md:h-[420px] bg-gray-400 relative overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: heroImageUrl
            ? `url('${heroImageUrl}')`
            : 'linear-gradient(180deg, #8a8f9e, #cfd3da)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/45 to-navy-950/10" />
        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-[55px] pt-32 pb-10 md:pb-[44px] md:h-full flex flex-col justify-end text-white">
          <div className="text-xs text-white/70 mb-4 flex items-center">
            <Link to="/" className="hover:text-white">Home</Link>
            <span className="mx-1.5">/</span>
            <span className="text-white">Contact Us</span>
          </div>
          <span className="text-[11px] font-semibold tracking-widest uppercase text-white/90 mb-3">
            {cp.heroEyebrow}
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-semibold mb-4">
            {iIdx === -1 ? (
              cp.heroTitle
            ) : (
              <>
                {cp.heroTitle.slice(0, iIdx)}
                <span className="italic">{italic}</span>
                {cp.heroTitle.slice(iIdx + italic.length)}
              </>
            )}
          </h1>
          <p className="max-w-md text-sm text-white/85 leading-relaxed">{cp.heroDescription}</p>
        </div>
      </section>

      {/* Role picker */}
      <section className="py-16 lg:py-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <span className="text-xs font-semibold tracking-widest uppercase text-navy-900">
            {cp.pickerEyebrow}
          </span>
          <TitleWithHighlight
            prefix={roles.length === 5 ? 'Five' : roles.length}
            text={cp.pickerTitle}
            highlight={cp.pickerTitleHighlight}
            className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-5 mb-3"
          />
          <p className="text-sm text-ink-600 mb-8">{cp.pickerSubtitle}</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {roles.map((r, i) => {
              const Icon = ROLE_ICONS[r.icon] || GraduationCap;
              const active = roleIndex === i;
              return (
                <button
                  key={r.name}
                  type="button"
                  onClick={() => setRoleIndex(active ? null : i)}
                  aria-pressed={active}
                  className={`text-left rounded-lg border p-5 transition-colors ${
                    active
                      ? 'bg-navy-900 border-navy-900 text-white'
                      : 'bg-white border-navy-100 hover:border-navy-300'
                  }`}
                >
                  <Icon size={20} className={`mb-5 ${active ? 'text-white' : 'text-navy-900'}`} />
                  <p
                    className={`font-display text-lg font-semibold mb-1.5 ${
                      active ? 'text-white' : 'text-navy-900'
                    }`}
                  >
                    {r.name}
                  </p>
                  <p className={`text-[11px] leading-relaxed ${active ? 'text-white/70' : 'text-ink-600'}`}>
                    {r.cardDescription}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Panel — role-specific, or the general form */}
      <section className="pb-16 lg:pb-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <span className="text-xs font-semibold tracking-widest uppercase text-navy-900">
            {role ? role.panelEyebrow : cp.generalEyebrow}
          </span>
          <TitleWithHighlight
            text={role ? role.panelTitle : cp.generalTitle}
            highlight={role ? role.panelTitleHighlight : cp.generalTitleHighlight}
            className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-5 mb-3"
          />
          <p className="text-sm text-ink-600 max-w-2xl mb-8">
            {role ? role.panelSubtitle : cp.generalSubtitle}
          </p>

          {role?.panelButtons?.length > 0 && (
            <div className="flex flex-wrap gap-3 mb-10">
              {role.panelButtons.map((b) => (
                <a
                  key={b.label}
                  href={b.url || '#'}
                  className={`text-sm font-medium px-4 py-2.5 rounded-md transition-colors ${
                    b.primary
                      ? 'bg-sky-600 hover:bg-teal-600 text-white'
                      : 'border border-navy-100 text-navy-900 hover:bg-navy-50'
                  }`}
                >
                  {b.label}
                </a>
              ))}
            </div>
          )}

          {/* Form for roles that take a message, and for the general state */}
          {(!role || role.showForm) &&
            renderForm(
              role ? role.formSubmitLabel || 'Send Message' : cp.generalSubmitLabel,
              role ? role.formFootnote : cp.generalFootnote
            )}

          {role?.cards?.length > 0 && (
            <div
              className={`grid grid-cols-1 md:grid-cols-3 gap-5 ${role.showForm ? 'mt-10' : ''}`}
            >
              {role.cards.map((c) => (
                <div
                  key={c.title}
                  className="border border-navy-100 border-l-2 border-l-sky-600 rounded-sm px-6 py-5"
                >
                  <h3 className="font-display text-lg font-semibold text-navy-900 mb-2">
                    {c.title}
                  </h3>
                  {c.body && <p className="text-xs text-ink-600 leading-relaxed">{c.body}</p>}
                  {c.linkLabel && (
                    <a
                      href={c.linkUrl || '#'}
                      className="text-xs font-medium text-sky-600 hover:text-teal-600 transition-colors mt-2 inline-block"
                    >
                      {c.linkLabel}
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}

          {role?.banner?.title && (
            <div className="bg-navy-900 text-white rounded-lg px-6 py-5 flex flex-wrap items-center gap-4 mt-6">
              <GraduationCap size={20} className="shrink-0 text-white/80" />
              <div className="min-w-0 flex-1">
                <p className="font-medium">{role.banner.title}</p>
                <p className="text-xs text-white/70 mt-0.5">{role.banner.detail}</p>
              </div>
              <div className="flex gap-2">
                {role.banner.callUrl && (
                  <a
                    href={role.banner.callUrl}
                    className="bg-white hover:bg-gray-100 transition-colors text-navy-900 text-xs font-medium px-4 py-2 rounded-md flex items-center gap-1.5"
                  >
                    {role.banner.callLabel} <Phone size={12} />
                  </a>
                )}
                {role.banner.emailUrl && (
                  <a
                    href={role.banner.emailUrl}
                    className="bg-white hover:bg-gray-100 transition-colors text-navy-900 text-xs font-medium px-4 py-2 rounded-md flex items-center gap-1.5"
                  >
                    {role.banner.emailLabel} <Mail size={12} />
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Department directory */}
      <section className="bg-navy-50 py-16 lg:py-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <span className="text-xs font-semibold tracking-widest uppercase text-navy-900">
            {cp.directoryEyebrow}
          </span>
          <h2 className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-5 mb-3">
            {cp.directoryTitle}
          </h2>
          <p className="text-sm text-ink-600 mb-10">{cp.directorySubtitle}</p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 mb-10">
            {(cp.departments || []).map((d) => {
              const photoUrl = d.photo ? urlFor(d.photo).width(300).url() : null;
              return (
                <div key={d.name} className="flex flex-col items-center text-center">
                  <div
                    className="w-[110px] h-[110px] rounded-full bg-gray-200 bg-cover bg-center mb-4"
                    style={photoUrl ? { backgroundImage: `url('${photoUrl}')` } : undefined}
                  />
                  <p className="text-sm font-semibold text-navy-900">{d.name}</p>
                  {d.role && <p className="text-xs text-ink-600 mt-0.5">{d.role}</p>}
                  {d.phone && (
                    <a
                      href={`tel:${d.phone.replace(/[^\d+]/g, '')}`}
                      className="text-xs text-ink-600 hover:text-sky-600 transition-colors mt-0.5"
                    >
                      {d.phone}
                    </a>
                  )}
                  {d.email && (
                    <a
                      href={`mailto:${d.email}`}
                      className="text-xs text-ink-600 hover:text-sky-600 transition-colors break-all"
                    >
                      {d.email}
                    </a>
                  )}
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
            <div className="flex flex-col gap-5">
              {(cp.directoryPanels || [])
                .filter((_, i) => i !== 1)
                .map((p) => (
                  <div key={p.title} className="bg-white border border-navy-100 border-l-2 border-l-sky-600 rounded-sm px-6 py-5">
                    <h3 className="font-display text-lg font-semibold text-navy-900 mb-2">
                      {p.title}
                    </h3>
                    {p.body && <p className="text-[11px] text-ink-600 leading-relaxed">{p.body}</p>}
                  </div>
                ))}
            </div>

            {(cp.directoryPanels || [])[1] && (
              <div className="bg-white border border-navy-100 border-l-2 border-l-sky-600 rounded-sm px-6 py-5">
                <h3 className="font-display text-lg font-semibold text-navy-900 mb-3">
                  {cp.directoryPanels[1].title}
                </h3>
                <dl className="grid grid-cols-1 gap-1 m-0">
                  {(cp.directoryPanels[1].rows || []).map((r) => (
                    <div key={r.label} className="flex gap-2 text-[11px]">
                      <dt className="text-ink-600">{r.label}</dt>
                      <dd className="text-ink-600 m-0">· {r.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Find us */}
      <section className="py-16 lg:py-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
            <div>
              <span className="text-xs font-semibold tracking-widest uppercase text-navy-900">
                {cp.locationEyebrow}
              </span>
              <TitleWithHighlight
                text={cp.locationTitle}
                highlight={cp.locationTitleHighlight}
                className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-5 mb-3"
              />
              <p className="text-sm text-ink-600 mb-6">{cp.locationSubtitle}</p>

              <div className="flex flex-wrap gap-3 mb-8">
                <a
                  href={cp.mapsUrl || '#'}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-navy-900 hover:bg-navy-800 transition-colors text-white text-sm font-medium px-4 py-2.5 rounded-md flex items-center gap-2"
                >
                  Open in Google Maps <ArrowUpRight size={14} />
                </a>
                <a
                  href={cp.mapsUrl || '#'}
                  target="_blank"
                  rel="noreferrer"
                  className="border border-navy-100 hover:bg-navy-50 transition-colors text-navy-900 text-sm font-medium px-4 py-2.5 rounded-md"
                >
                  Walking directions
                </a>
              </div>

              {cp.directions?.length > 0 && (
                <div className="border border-navy-100 border-l-2 border-l-sky-600 rounded-sm px-6 py-5">
                  <h3 className="font-display text-lg font-semibold text-navy-900 mb-3">
                    {cp.directionsTitle}
                  </h3>
                  <ol className="list-decimal pl-4 space-y-1">
                    {cp.directions.map((d) => (
                      <li key={d} className="text-[11px] text-ink-600">
                        {d}
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>

            <div className="h-[320px] rounded-lg bg-gray-200 overflow-hidden">
              {cp.mapEmbedUrl && (
                <iframe
                  src={cp.mapEmbedUrl}
                  title="SIMSREE campus location"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Anti-ragging */}
      <section className="pb-16 lg:pb-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <span className="text-xs font-semibold tracking-widest uppercase text-navy-900">
            {cp.disclosureEyebrow}
          </span>
          <TitleWithHighlight
            text={cp.disclosureTitle}
            highlight={cp.disclosureTitleHighlight}
            className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-5 mb-3"
          />
          <p className="text-sm text-ink-600 max-w-lg mb-6">{cp.disclosureBody}</p>

          <div className="flex flex-wrap gap-3 mb-8">
            {(cp.disclosureButtons || []).map((b) => (
              <a
                key={b.label}
                href={b.url || '#'}
                className={`text-sm font-medium px-4 py-2.5 rounded-md transition-colors flex items-center gap-2 ${
                  b.primary
                    ? 'bg-navy-900 hover:bg-navy-800 text-white'
                    : 'border border-navy-100 text-navy-900 hover:bg-navy-50'
                }`}
              >
                {b.label}
                {b.primary && <ArrowUpRight size={14} />}
              </a>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {(cp.disclosureCards || []).map((c) => (
              <div
                key={c.title}
                className="border border-navy-100 border-l-2 border-l-sky-600 rounded-sm px-6 py-5"
              >
                <h3 className="font-display text-lg font-semibold text-navy-900 mb-2">{c.title}</h3>
                <p className="text-xs text-ink-600">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
