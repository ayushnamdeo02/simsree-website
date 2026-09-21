export default {
  name: 'keyFacts',
  title: 'Key Facts',
  type: 'document',
  description:
    'Facts that appear on many pages. Edit once here and every page using them updates. Nothing else needs changing.',
  groups: [
    {name: 'placement', title: 'Placement'},
    {name: 'institution', title: 'Institution'},
    {name: 'contact', title: 'Contact'},
    {name: 'admissions', title: 'Admissions Wording'},
  ],
  fields: [
    // Placement — refreshed each year from the final placement report
    {name: 'placementRate', title: 'Placement rate', description: 'e.g. "100%" — shown as "100% placement"', type: 'string', group: 'placement', initialValue: '100%'},
    {name: 'avgCtc', title: 'Average CTC', description: 'e.g. "₹16.5L"', type: 'string', group: 'placement', initialValue: '₹16.5L'},
    {name: 'highestCtc', title: 'Highest CTC', description: 'e.g. "₹38L"', type: 'string', group: 'placement', initialValue: '₹38L'},
    {name: 'recruiterCount', title: 'Recruiter count', description: 'e.g. "120+"', type: 'string', group: 'placement', initialValue: '120+'},

    // Institution
    {name: 'alumniCount', title: 'Alumni count', description: 'e.g. "5000+"', type: 'string', group: 'institution', initialValue: '5000+'},
    {name: 'foundedYear', title: 'Founded year', description: 'e.g. "1983" — rendered as "Since 1983"', type: 'string', group: 'institution', initialValue: '1983'},
    {name: 'affiliation', title: 'Affiliating university', description: 'e.g. "Mumbai University · Dr Homi Bhabha SU"', type: 'string', group: 'institution', initialValue: 'Mumbai University · Dr Homi Bhabha SU'},
    {name: 'committeeCount', title: 'Student committee count', description: 'e.g. "13"', type: 'string', group: 'institution', initialValue: '13'},

    // Contact
    {name: 'address', title: 'Address', type: 'string', group: 'contact', initialValue: 'B-Road, Churchgate, Mumbai 400 020'},
    {name: 'placementEmail', title: 'Placement email', type: 'string', group: 'contact', initialValue: 'placements@simsree.org'},
    {name: 'admissionsEmail', title: 'Admissions email', type: 'string', group: 'contact', initialValue: 'admissions@simsree.org'},
    {name: 'admissionsPhone', title: 'Admissions phone', type: 'string', group: 'contact', initialValue: '022 6151 0709'},

    // Admissions wording — the phrasing that must stay identical site-wide
    {name: 'cetCellName', title: 'CET Cell name', description: 'e.g. "State CET Cell, Government of Maharashtra"', type: 'string', group: 'admissions', initialValue: 'State CET Cell, Government of Maharashtra'},
    {
      name: 'noQuotaShort',
      title: 'No-quota short phrase',
      description: 'The heading-length version, e.g. "Zero management quota"',
      type: 'string',
      group: 'admissions',
      initialValue: 'Zero management quota',
    },
    {
      name: 'noQuotaStatement',
      title: 'No-quota full statement',
      description:
        'The full wording used in notices and eligibility cards. This is a formal claim about admissions — keep one approved version here rather than rewording it per page.',
      type: 'text',
      rows: 4,
      group: 'admissions',
      initialValue:
        'SIMSREE has no management quota, no reserved seats, and no payment seats of any kind. All admissions are routed strictly through the State CET Cell, Government of Maharashtra, on merit. Reject any agent who claims otherwise.',
    },
  ],
  preview: {prepare() { return {title: 'Key Facts'} }},
}
