# SIMSREE Website — React

## Setup
```
npm install
npm run dev
```
Opens at http://localhost:5173

## Build
```
npm run build
npm run preview
```


## What's built
- **Design system**: colors/fonts extracted from the Figma exports, set up as Tailwind v4 theme tokens in `src/index.css`
- **Layout**: Navbar (with mega-menu dropdowns + mobile menu) and Footer, matching the Figma nav bar design — see `src/components/Layout.jsx`, `Navbar.jsx`, `Footer.jsx`
- **Homepage** (`src/pages/Home.jsx`): fully built from the Homepage.pdf export — hero, stat cards, news grid, "find your path", "why SIMSREE" factors, location section, testimonial, recruiter logos, upcoming events, flagship events, CTA + disclaimer
- **Routing**: every page in the sitemap (`src/data/sitemap.js`, extracted from Nav_bar_section.pdf) is wired up in `App.jsx` and renders as a placeholder (`PageStub.jsx`) until we build its detailed layout

## Reusable components
- `StatCard` — the alternating navy/white counter cards (used on Homepage, and matches Card.pdf / committee.pdf patterns)
- `EventCard` — date-badge event listing row
- `NewsCard` — news/announcement card with download or read-more action
- `SectionHeading` — eyebrow + serif heading pattern used throughout

## Not yet built (needs the individual Figma exports reviewed next)
About Us, Academics, Admissions, Student's Corner, Events, Placements, Contact Us detail pages —
currently routed but showing placeholders. Admin panel not started (no admin screens were in the
design export — scope to be confirmed with client per the timeline doc).

## Notes / things to confirm
- Exact hex colors were sampled visually from the PDF exports, not pulled from Figma dev-mode —
  worth a quick pass against the real design tokens once we have Figma access (or a dev-mode export)
- Images are placeholder grey blocks — real photography from the design needs to be exported and dropped in
- Recruiter logos in the "120+ companies hire here" section are placeholder text — need actual logo assets
