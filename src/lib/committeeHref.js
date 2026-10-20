// Committees that have their own page instead of the generic committee detail.
const OWN_PAGE = {
  'chairpersons-council': '/students/leadership',
};

export const committeeHref = (slug) => (slug ? OWN_PAGE[slug] || `/students/committees/${slug}` : undefined);
