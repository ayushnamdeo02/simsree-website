import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import { SectionTitle } from '../components/ui';
import { heroImage } from '../lib/heroImage';
import { composeTitle } from '../lib/text';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { useRecruiterEngagementData } from '../lib/useRecruiterEngagementData';
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

// Figma tag colours per state; every card carries the same Eastern Blue bar.
const TONE_CLASSES = {
  idle: 'bg-navy-50 text-navy-900',
  sending: 'bg-[#ffdb43]/10 text-[#dfb400]',
  success: 'bg-[#1fc16b]/10 text-[#1fc16b]',
  fail: 'bg-[#d00416]/10 text-[#d00416]',
};

const STATE_ACCENT = {
  idle: 'border-l-teal-500',
  sending: 'border-l-teal-500',
  success: 'border-l-teal-500',
  fail: 'border-l-teal-500',
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
      <PageHero
        image={heroImage(rp.heroImage, '/images/placements/engagement-hero.webp')}
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Placement', to: '/placements' }, { label: 'Recruiter Engagement' }]}
        eyebrow={rp.heroEyebrow}
        eyebrowUpper
        title={rp.heroTitle}
        titleItalic={rp.heroTitleItalic}
        description={rp.heroDescription}
        descriptionWidth={628}
      />

      {/* Form */}
      <section className="px-5 py-16 md:px-16 md:py-28">
        <div className="max-w-[1280px] mx-auto">
          <SectionTitle
            tagline={rp.formEyebrow}
            title={composeTitle(rp.formTitle, rp.formTitleHighlight)}
            highlight={rp.formTitleHighlight}
            body={rp.formSubtitle}
            className="mb-20"
          />

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
            <form onSubmit={handleSubmit} noValidate className="max-w-[814px]">
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {FIELDS.map((f) => {
                    const err = fieldError(f.name);
                    // Figma "Text input": 48 tall, padding 12, 1px black border, square, 16/150.
                    const base = `rounded w-full min-h-12 border p-3 text-base leading-[150%] text-black placeholder:text-black/60 focus:outline-none transition-colors ${
                      err
                        ? 'border-red-500'
                        : 'border-black focus:border-teal-500'
                    }`;
                    return (
                      <div key={f.name} className={f.full ? 'md:col-span-2' : ''}>
                        <label
                          htmlFor={f.name}
                          className="block text-base leading-[150%] text-black mb-2"
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
                  <span className="text-sm leading-[150%] text-black">{rp.consentLabel}</span>
                </label>
                {fieldError('consent') && (
                  <p className="text-xs text-red-500 mt-1.5">
                    Please accept the privacy notice to continue.
                  </p>
                )}

                <button
                  type="submit"
                  className="mt-6 h-11 bg-navy-900 hover:bg-navy-800 disabled:hover:bg-navy-900 transition-colors text-white text-base leading-[150%] font-medium px-6 rounded-md flex items-center gap-2"
                >
                  {sending && <Loader2 size={15} className="animate-spin" />}
                  {sending ? 'Sending…' : rp.submitLabel}
                </button>
              </fieldset>

              <p className="text-sm leading-[150%] text-black mt-6">{rp.formFootnote}</p>
            </form>
          )}
        </div>
      </section>

      {/* State machine */}
      <section className="bg-navy-50 px-5 py-16 md:px-16 md:py-28">
        <div className="max-w-[1280px] mx-auto">
          <SectionTitle
            tagline={rp.statesEyebrow}
            title={composeTitle(rp.statesTitle, rp.statesTitleHighlight)}
            highlight={rp.statesTitleHighlight}
          />
          <p className="mt-6 max-w-[598px] text-base md:text-lg leading-[150%] text-black">{rp.statesSubtitle}</p>

          {/* Figma: 624x100 white bar cards, 32 gap; tag over an H6 22 line. */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8 gap-y-6">
            {stateCards.map((c) => (
              <div
                key={c.label}
                className={`rounded-lg overflow-hidden rounded-lg overflow-hidden bg-white outline outline-1 -outline-offset-1 outline-black/20 shadow-small border-l-[3px] min-h-[100px] flex flex-col justify-center gap-2 px-3 py-4 ${
                  STATE_ACCENT[c.tone] || STATE_ACCENT.idle
                }`}
              >
                <span
                  className={`w-fit text-sm leading-[150%] uppercase px-2.5 py-1 rounded-2xl ${
                    TONE_CLASSES[c.tone] || TONE_CLASSES.idle
                  }`}
                >
                  {c.label}
                </span>
                <p className="font-display font-medium text-[22px] leading-[140%] tracking-[-0.01em] text-navy-900">{c.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
