import { useEffect, useState } from 'react';
import { sanityClient } from './sanity';

const QUERY = `*[_type == "keyFacts"][0]`;

// Facts that appear on many pages. Every page reads them from here, so the
// college edits a placement figure once rather than hunting five pages.
export const FACT_DEFAULTS = {
  placementRate: '100%',
  avgCtc: '₹16.5L',
  highestCtc: '₹38L',
  recruiterCount: '120+',
  alumniCount: '5000+',
  foundedYear: '1983',
  affiliation: 'Mumbai University · Dr Homi Bhabha SU',
  committeeCount: '13',
  address: 'B-Road, Churchgate, Mumbai 400 020',
  placementEmail: 'placements@simsree.org',
  admissionsEmail: 'admissions@simsree.org',
  admissionsPhone: '022 6151 0709',
  cetCellName: 'State CET Cell, Government of Maharashtra',
  noQuotaShort: 'Zero management quota',
  noQuotaStatement:
    'SIMSREE has no management quota, no reserved seats, and no payment seats of any kind. All admissions are routed strictly through the State CET Cell, Government of Maharashtra, on merit. Reject any agent who claims otherwise.',
};

export function useKeyFacts() {
  const [facts, setFacts] = useState(FACT_DEFAULTS);

  useEffect(() => {
    let cancelled = false;
    sanityClient
      .fetch(QUERY)
      .then((result) => {
        if (!cancelled && result) setFacts({ ...FACT_DEFAULTS, ...result });
      })
      .catch(() => {
        /* fall back to defaults — a facts fetch failure must not blank a page */
      });
    return () => { cancelled = true; };
  }, []);

  return facts;
}

// Substitutes {{placeholders}} in CMS text with live fact values, so editors can
// write "Get hired — {{recruiterCount}} recruiters" in any field on any page.
export function fillFacts(text, facts) {
  if (typeof text !== 'string' || !text.includes('{{')) return text;
  return text.replace(/\{\{(\w+)\}\}/g, (m, key) =>
    Object.prototype.hasOwnProperty.call(facts, key) ? facts[key] : m
  );
}

// Same substitution applied through a whole content tree, so a page resolves
// tokens once on its merged content instead of at every render site.
export function fillFactsDeep(value, facts) {
  if (typeof value === 'string') return fillFacts(value, facts);
  if (Array.isArray(value)) return value.map((v) => fillFactsDeep(v, facts));
  if (value && typeof value === 'object') {
    // Leave Sanity refs/assets untouched — only content strings are filled.
    if (value._type === 'image' || value._type === 'file' || value.asset) return value;
    const out = {};
    for (const k of Object.keys(value)) out[k] = fillFactsDeep(value[k], facts);
    return out;
  }
  return value;
}
