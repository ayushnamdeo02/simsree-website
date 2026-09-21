import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { useRecruiterEngagementData } from '../lib/useRecruiterEngagementData';
import { urlFor } from '../lib/sanity';
import { useKeyFacts, fillFactsDeep } from '../lib/useKeyFacts';

const fallbackPage = {
  heroEyebrow: 'Structured Intake',
  heroTitle: 'Hire from SIMSREE.',
  heroTitleItalic: 'SIMSREE.',
  heroDescription:
    'Tell us what you need — we book a slot — a Committee member confirms within 24 hours.',

  formEyebrow: 'Recruiter Engagement Form',
  formTitle: 'Submit your hiring needs',
  formTitleHighlight: 'hiring needs',
  formSubtitle: "Fill in your details — we'll confirm a slot within 24 hours.",
  consentLabel:
    "I agree to SIMSREE's privacy notice and consent to be contacted regarding this enquiry.",
  submitLabel: 'Submit hiring needs',
  formFootnote: 'Your request goes straight to {{placementEmail}} and the Placement Chair.',
  sectorOptions: ['BFSI', 'FMCG', 'Consulting', 'IT/Tech', 'Pharma', 'Manufacturing', 'Media', 'Other'],
  engagementOptions: [
    'Final Placement',
    'Summer Internship',
    'Live Project',
    'Guest Lecture',
    'Campus Visit',
    'Other',
  ],

  fallbackEmail: '{{placementEmail}}',

  successTitle: 'Request received.',
  successBody: 'A Placement Committee member will confirm your slot within 24 hours.',
  failTitle: "That didn't go through.",
  failBody: 'Your details are still here — try again, or send them to us by email instead.',

  statesEyebrow: 'Form State Machine — Wireframed',
  statesTitle: 'All four states',
  statesTitleHighlight: 'four states',
  statesSubtitle:
    'What you saw above (idle / sending / success / fail) is the full state machine — submit to walk through it.',
  stateCards: [
    { label: 'Idle', tone: 'idle', description: 'Default · validation on blur' },
    { label: 'Sending', tone: 'sending', description: 'Button spinner · fields locked' },
    { label: 'Success', tone: 'success', description: '"24h response" · next CTAs' },
    { label: 'Fail', tone: 'fail', description: 'Retry · email fallback · values preserved' },
  ],
};

const TONE_CLASSES = {
  idle: 'bg-navy-50 text-navy-900',
  sending: 'bg-amber-50 text-amber-700',
  success: 'bg-emerald-50 text-emerald-700',
  fail: 'bg-red-50 text-red-600',
};

const STATE_ACCENT = {
  idle: 'border-l-navy-900',
  sending: 'border-l-amber-500',
  success: 'border-l-emerald-500',
  fail: 'border-l-red-500',
};

const FIELDS = [
  { name: 'recruiterName', label: 'Recruiter name', placeholder: 'First & Last', required: true },
  { name: 'designation', label: 'Designation', placeholder: 'e.g. Senior HR Manager', required: true },
  { name: 'company', label: 'Company', placeholder: 'First & Last', required: true },
  { name: 'sector', label: 'Sector', type: 'select', required: true, placeholder: 'Select BFSI, FMCG, Consulting, IT/Tech, etc..' },
  { name: 'email', label: 'Work email', type: 'email', placeholder: 'name@company.com', required: true },
  { name: 'phone', label: 'Phone number', type: 'tel', placeholder: '+91.....' },
  { name: 'engagementType', label: 'Engagement type', type: 'select', required: true, full: true, placeholder: 'Final Placement, Summer Intership, etc..' },
  { name: 'roles', label: 'Roles & headcount', type: 'textarea', rows: 1, full: true, placeholder: 'e.g. 2 Mgmt Trainee + 3 Analyst · CTC range' },
  { name: 'window', label: 'Preferred window', type: 'textarea', rows: 1, full: true, placeholder: 'Oct-Dec 2026 (Summer) · Jan-Mar 2026 (Final)' },
  { name: 'notes', label: 'Notes', type: 'textarea', rows: 5, full: true, placeholder: 'Anything else we should know' },
];

const EMPTY = Object.fromEntries(FIELDS.map((f) => [f.name, '']));

function TitleWithHighlight({ text, highlight, className }) {
  const idx = highlight ? (text || '').indexOf(highlight) : -1;
  if (idx === -1) return <h2 className={className}>{text}</h2>;
  return (
    <h2 className={className}>
      {text.slice(0, idx)}
      <span className="text-teal-500">{highlight}</span>
      {text.slice(idx + highlight.length)}
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

export default function RecruiterEngagement() {
  const facts = useKeyFacts();
  const { data } = useRecruiterEngagementData();
  const rp = fillFactsDeep({ ...fallbackPage, ...(data || {}) }, facts);
  const stateCards = fillFactsDeep(rp.stateCards?.length ? rp.stateCards : fallbackPage.stateCards, facts);
  const sectorOptions = fillFactsDeep(rp.sectorOptions?.length ? rp.sectorOptions : fallbackPage.sectorOptions, facts);
  const engagementOptions = rp.engagementOptions?.length
    ? rp.engagementOptions
    : fallbackPage.engagementOptions;

  const [values, setValues] = useState(EMPTY);
  const [consent, setConsent] = useState(false);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  // idle | sending | success | fail
  const [status, setStatus] = useState('idle');

  const heroImageUrl = rp.heroImage ? urlFor(rp.heroImage).width(1600).url() : null;
  const italic = rp.heroTitleItalic;
  const iIdx = italic ? (rp.heroTitle || '').indexOf(italic) : -1;

  const sending = status === 'sending';

  const optionsFor = (name) =>
    name === 'sector' ? sectorOptions : name === 'engagementType' ? engagementOptions : [];

  const setField = (name, value) => {
    setValues((v) => ({ ...v, [name]: value }));
    // Clear an error as soon as the field is corrected.
    if (errors[name]) setErrors((e) => ({ ...e, [name]: undefined }));
  };

  // Validation on blur, per the design.
  const handleBlur = (name) => {
    setTouched((t) => ({ ...t, [name]: true }));
    const next = validate(values, consent);
    setErrors((e) => ({ ...e, [name]: next[name] }));
  };

  // Builds the mailto fallback used when no endpoint is configured, or a send fails.
  const mailtoHref = () => {
    const lines = FIELDS.filter((f) => values[f.name].trim()).map(
      (f) => `${f.label}: ${values[f.name].trim()}`
    );
    const body = `${lines.join('\n')}\n\nSent from the SIMSREE recruiter engagement form.`;
    return `mailto:${rp.fallbackEmail}?subject=${encodeURIComponent(
      `Hiring enquiry — ${values.company.trim() || 'SIMSREE'}`
    )}&body=${encodeURIComponent(body)}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const next = validate(values, consent);
    setErrors(next);
    setTouched(Object.fromEntries([...FIELDS.map((f) => [f.name, true]), ['consent', true]]));
    if (Object.values(next).some(Boolean)) return;

    // With no endpoint configured there is nothing to POST to, so hand the
    // enquiry to the recruiter's mail client rather than pretending to send.
    if (!rp.endpointUrl) {
      window.location.href = mailtoHref();
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch(rp.endpointUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...values, consent }),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      setStatus('success');
      setValues(EMPTY);
      setConsent(false);
      setTouched({});
    } catch {
      // Values are deliberately preserved so the recruiter can retry.
      setStatus('fail');
    }
  };

  const fieldError = (name) => touched[name] && errors[name];

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
            <Link to="/placements" className="hover:text-white">Placement</Link>
            <span className="mx-1.5">/</span>
            <span className="text-white">Recruiter Engagement</span>
          </div>
          <span className="text-[11px] font-semibold tracking-widest uppercase text-white/90 mb-4">
            {rp.heroEyebrow}
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-semibold mb-4">
            {iIdx === -1 ? (
              rp.heroTitle
            ) : (
              <>
                {rp.heroTitle.slice(0, iIdx)}
                <span className="italic">{italic}</span>
                {rp.heroTitle.slice(iIdx + italic.length)}
              </>
            )}
          </h1>
          <p className="max-w-md text-sm text-white/85 leading-relaxed">{rp.heroDescription}</p>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <span className="text-xs font-semibold tracking-widest uppercase text-navy-900">
            {rp.formEyebrow}
          </span>
          <TitleWithHighlight
            text={rp.formTitle}
            highlight={rp.formTitleHighlight}
            className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-5 mb-4"
          />
          <p className="text-sm text-ink-600 mb-10">{rp.formSubtitle}</p>

          {/* Success replaces the form; failure sits above it with values intact */}
          {status === 'success' ? (
            <div
              role="status"
              className="max-w-[820px] border border-emerald-200 bg-emerald-50 rounded-lg p-8"
            >
              <div className="flex items-start gap-3 mb-6">
                <CheckCircle2 size={22} className="text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-display text-xl font-semibold text-navy-900 mb-2">
                    {rp.successTitle}
                  </h3>
                  <p className="text-sm text-ink-600">{rp.successBody}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/placements/partners"
                  className="bg-sky-600 hover:bg-teal-600 transition-colors text-white text-sm font-medium px-4 py-2.5 rounded-md"
                >
                  See our recruiting partners
                </Link>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="border border-navy-100 hover:bg-navy-50 transition-colors text-navy-900 text-sm font-medium px-4 py-2.5 rounded-md"
                >
                  Submit another enquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="max-w-[820px]">
              {status === 'fail' && (
                <div
                  role="alert"
                  className="border border-red-200 bg-red-50 rounded-lg p-6 mb-8 flex items-start gap-3"
                >
                  <AlertCircle size={20} className="text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-navy-900 mb-1">{rp.failTitle}</h3>
                    <p className="text-sm text-ink-600 mb-3">{rp.failBody}</p>
                    <a
                      href={mailtoHref()}
                      className="text-sm font-medium text-sky-600 hover:text-teal-600 transition-colors"
                    >
                      Email it to {rp.fallbackEmail} instead
                    </a>
                  </div>
                </div>
              )}

              <fieldset disabled={sending} className="border-0 p-0 m-0 disabled:opacity-60">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                  {FIELDS.map((f) => {
                    const err = fieldError(f.name);
                    const base = `w-full border rounded-md px-4 py-3 text-sm text-navy-900 placeholder:text-ink-400 focus:outline-none transition-colors ${
                      err
                        ? 'border-red-400 focus:border-red-500'
                        : 'border-navy-100 focus:border-sky-600'
                    }`;
                    return (
                      <div key={f.name} className={f.full ? 'md:col-span-2' : ''}>
                        <label
                          htmlFor={f.name}
                          className="block text-sm text-navy-900 mb-2"
                        >
                          {f.label}
                          {f.required && <span className="text-red-500 ml-1">*</span>}
                        </label>

                        {f.type === 'select' ? (
                          <select
                            id={f.name}
                            name={f.name}
                            value={values[f.name]}
                            onChange={(e) => setField(f.name, e.target.value)}
                            onBlur={() => handleBlur(f.name)}
                            aria-invalid={!!err}
                            className={`${base} ${values[f.name] ? '' : 'text-ink-400'}`}
                          >
                            <option value="">{f.placeholder}</option>
                            {optionsFor(f.name).map((o) => (
                              <option key={o} value={o}>
                                {o}
                              </option>
                            ))}
                          </select>
                        ) : f.type === 'textarea' ? (
                          <textarea
                            id={f.name}
                            name={f.name}
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
                            id={f.name}
                            name={f.name}
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

                <label className="flex items-start gap-3 mt-8 cursor-pointer">
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
                  <span className="text-sm text-ink-600">{rp.consentLabel}</span>
                </label>
                {fieldError('consent') && (
                  <p className="text-xs text-red-500 mt-1.5">
                    Please accept the privacy notice to continue.
                  </p>
                )}

                <button
                  type="submit"
                  className="mt-8 bg-navy-900 hover:bg-navy-800 disabled:hover:bg-navy-900 transition-colors text-white text-sm font-medium px-5 py-3 rounded-md flex items-center gap-2"
                >
                  {sending && <Loader2 size={15} className="animate-spin" />}
                  {sending ? 'Sending…' : rp.submitLabel}
                </button>
              </fieldset>

              <p className="text-xs text-ink-400 mt-4">{rp.formFootnote}</p>
            </form>
          )}
        </div>
      </section>

      {/* State machine */}
      <section className="bg-navy-50 py-16 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-0">
          <span className="text-xs font-semibold tracking-widest uppercase text-navy-900">
            {rp.statesEyebrow}
          </span>
          <TitleWithHighlight
            text={rp.statesTitle}
            highlight={rp.statesTitleHighlight}
            className="font-display text-4xl md:text-[52px] md:leading-[120%] font-semibold text-navy-900 mt-5 mb-4"
          />
          <p className="text-sm text-ink-600 max-w-lg mb-10">{rp.statesSubtitle}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
            {stateCards.map((c) => (
              <div
                key={c.label}
                className={`bg-white border border-navy-100 border-l-2 rounded-sm px-6 py-5 ${
                  STATE_ACCENT[c.tone] || STATE_ACCENT.idle
                }`}
              >
                <span
                  className={`inline-block text-[10px] font-semibold tracking-widest uppercase px-2 py-1 rounded mb-3 ${
                    TONE_CLASSES[c.tone] || TONE_CLASSES.idle
                  }`}
                >
                  {c.label}
                </span>
                <p className="font-display text-lg text-navy-900">{c.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
