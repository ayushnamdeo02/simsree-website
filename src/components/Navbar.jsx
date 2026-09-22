import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ArrowUpRight } from 'lucide-react';
import { mainNav as fallbackMainNav, utilityLinks as fallbackUtilityLinks } from '../data/sitemap';
import { useSiteSettings } from '../lib/useSiteSettings';
import { urlFor } from '../lib/sanity';

// Pages with a full-bleed photo hero get a transparent header that turns solid on scroll.
const TRANSPARENT_HERO_ROUTES = ['/', '/about', '/about/history', '/about/directors-message', '/about/rankings', '/about/campus-life', '/about/alumni', '/about/student-driven-system', '/alumni-portal', '/about/simarthan', '/placements', '/placements/why-recruit', '/placements/reports', '/placements/partners', '/placements/contact', '/placements/recruiter-engagement', '/academics', '/academics/mms', '/academics/msc-finance', '/academics/mfm', '/academics/mmm', '/academics/phd', '/academics/faculty', '/admissions', '/admissions/mms', '/admissions/msc-finance', '/admissions/mfm', '/admissions/mmm', '/admissions/phd', '/admissions/downloads', '/students', '/students/achievements', '/students/batch-profile', '/students/leadership', '/students/body-structure', '/students/life', '/contact', '/events', '/events/simerations', '/events/development-programmes', '/events/industry-events'];

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const settings = useSiteSettings();
  const location = useLocation();

  const utilityLinks = settings?.utilityLinks?.length ? settings.utilityLinks : fallbackUtilityLinks;
  const mainNav = settings?.mainNav?.length ? settings.mainNav : fallbackMainNav;
  const applyLabel = settings?.applyButtonLabel || 'Apply';
  const applyUrl = settings?.applyButtonUrl || '/admissions';
  // Slug-driven sections share one layout, so match their prefix rather than
  // listing every slug.
  const TRANSPARENT_PREFIXES = ['/students/committees/'];
  const isTransparentRoute =
    TRANSPARENT_HERO_ROUTES.includes(location.pathname) ||
    TRANSPARENT_PREFIXES.some((p) => location.pathname.startsWith(p));
  const isTransparent = isTransparentRoute && !scrolled && !mobileOpen;

  // Over a photo hero the navbar is transparent, so use the light logo there when one exists.
  const logoSource =
    (isTransparent && settings?.headerLogoLight) || settings?.headerLogo || null;
  // Request 2x the rendered height so the logo stays sharp on retina screens.
  const logoUrl = logoSource ? urlFor(logoSource).height(96).auto('format').url() : null;
  // The uploaded logo is white, so it needs opposite treatment in each state
  // until a proper dark/light pair is supplied: keep it white over the photo
  // hero, and darken it on the white scrolled navbar where it would vanish.
  const onlyOneLogo = !settings?.headerLogoLight;
  const lightenLogo = onlyOneLogo && isTransparent;
  const darkenLogo = onlyOneLogo && !isTransparent;

  useEffect(() => {
    if (!isTransparentRoute) return;
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [isTransparentRoute]);

  useEffect(() => {
    setScrolled(false);
  }, [location.pathname]);

  return (
    <header
      className={`${isTransparentRoute ? 'fixed' : 'sticky'} top-0 left-0 right-0 z-50`}
    >
      {/* Utility bar — Figma "Navbar / 1 /": 48 tall on every screen. Desktop: Inter 14/150,
          24 gap, right-aligned, 14px arrows. Mobile: 12/150, 16 gap, scrolls sideways. */}
      <div className="bg-navy-900 text-white">
        <div className="max-w-[1440px] mx-auto px-5 lg:px-16 h-12 flex items-center lg:justify-end gap-4 lg:gap-6 overflow-x-auto [scrollbar-width:none]">
          {utilityLinks.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              className="flex items-center gap-1 shrink-0 whitespace-nowrap text-xs leading-[150%] lg:text-sm hover:underline underline-offset-2"
            >
              {l.label}
              <ArrowUpRight size={14} strokeWidth={1.5} className="hidden lg:block" />
            </Link>
          ))}
        </div>
      </div>

      {/* Main nav — 1312px frame at x=64 (1440 - 64 - 64), 120px tall (Figma) */}
      <div className={`transition-colors duration-300 ${isTransparent ? 'bg-transparent' : 'bg-white shadow-sm'}`}>
        <div className="max-w-[1440px] mx-auto px-5 lg:px-16">
          {/* Figma: 108 tall with a 192x47 logo on mobile; 120 tall with a 229x56 logo on desktop. */}
          <div className="flex items-center justify-between h-[108px] lg:h-[120px]">
            <Link
              to="/"
              aria-label="SIMSREE — home"
              className={`flex items-center gap-2 shrink-0 font-display font-semibold text-lg transition-colors ${
                isTransparent ? 'text-white' : 'text-navy-900'
              }`}
            >
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt="SIMSREE"
                  className={`h-[47px] lg:h-14 w-auto max-w-[229px] object-contain ${
                    lightenLogo ? 'brightness-0 invert' : darkenLogo ? 'brightness-0' : ''
                  }`}
                />
              ) : (
                <>
                  <div className="w-9 h-9 rounded-full bg-navy-900 flex items-center justify-center text-white text-xs font-sans">
                    S
                  </div>
                  SIMSREE
                </>
              )}
            </Link>

            {/* Desktop nav */}
            {/* Figma: Inter 16/150 links, 16 gap, 16px chevrons 4px from the label. */}
            <nav className="hidden xl:flex items-center gap-4 shrink-0 ml-auto mr-8">
              {mainNav.map((item) => (
                <div
                  key={item.path}
                  className="relative shrink-0"
                  onMouseEnter={() => item.children?.length && setOpenDropdown(item.path)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    to={item.path}
                    className={`flex items-center gap-1 whitespace-nowrap py-2 text-base leading-[150%] transition-colors ${
                      isTransparent ? 'text-white hover:text-white/80' : 'text-ink-900 hover:text-navy-800'
                    }`}
                  >
                    {item.label}
                    {item.children?.length > 0 && <ChevronDown size={16} className="shrink-0" />}
                  </Link>

                  {item.children?.length > 0 && openDropdown === item.path && (
                    <div className="absolute top-full left-0 bg-white shadow-lg rounded-lg border border-gray-100 py-2 min-w-64">
                      {item.children.map((c) => (
                        <Link
                          key={c.path}
                          to={c.path}
                          className="block px-4 py-2 text-sm text-ink-600 hover:bg-gray-50 hover:text-navy-800"
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Stays navy in both the transparent and solid header states (Figma) */}
            <Link
              to={applyUrl}
              className="hidden lg:inline-flex items-center h-11 shrink-0 whitespace-nowrap text-base leading-[150%] font-medium px-6 rounded-md bg-navy-900 text-white hover:bg-navy-800 transition-colors"
            >
              {applyLabel}
            </Link>

            <button
              className={`xl:hidden transition-colors ${isTransparent ? 'text-white' : 'text-ink-900'}`}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="xl:hidden border-t border-gray-100 max-h-[80vh] overflow-y-auto">
          {mainNav.map((item) => (
            <div key={item.path} className="border-b border-gray-50">
              <Link
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className="block px-6 py-3 font-medium text-ink-900"
              >
                {item.label}
              </Link>
              {item.children?.length > 0 && (
                <div className="bg-gray-50 pb-2">
                  {item.children.map((c) => (
                    <Link
                      key={c.path}
                      to={c.path}
                      onClick={() => setMobileOpen(false)}
                      className="block px-10 py-2 text-sm text-ink-600"
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link
            to={applyUrl}
            onClick={() => setMobileOpen(false)}
            className="block m-4 text-center bg-navy-900 text-white font-medium px-5 py-3 rounded-md"
          >
            {applyLabel}
          </Link>
        </div>
      )}
    </header>
  );
}
