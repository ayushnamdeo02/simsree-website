import { Link } from 'react-router-dom';
import { footerColumns as fallbackFooterColumns } from '../data/sitemap';
import { useSiteSettings } from '../lib/useSiteSettings';
import { urlFor } from '../lib/sanity';

// lucide-react dropped brand icons in newer versions — lightweight inline SVGs instead.
const socialIcons = {
  linkedin: (
    <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.11 1 2.48 1 4.98 2.12 4.98 3.5zM.24 8.24H4.7V22H.24V8.24zM8.35 8.24h4.27v1.88h.06c.6-1.13 2.06-2.32 4.24-2.32 4.53 0 5.37 2.98 5.37 6.86V22h-4.46v-6.5c0-1.55-.03-3.55-2.17-3.55-2.17 0-2.5 1.7-2.5 3.44V22H8.35V8.24z" />
  ),
  facebook: (
    <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.5-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" />
  ),
  instagram: (
    <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07zM12 0C8.74 0 8.33.01 7.05.07c-1.28.06-2.15.26-2.91.56a5.9 5.9 0 0 0-2.13 1.39A5.9 5.9 0 0 0 .62 4.14c-.3.76-.5 1.63-.56 2.91C0 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.28.26 2.15.56 2.91.31.79.72 1.46 1.39 2.13.67.67 1.34 1.08 2.13 1.39.76.3 1.63.5 2.91.56C8.33 24 8.74 24 12 24s3.67-.01 4.95-.07c1.28-.06 2.15-.26 2.91-.56a5.9 5.9 0 0 0 2.13-1.39 5.9 5.9 0 0 0 1.39-2.13c.3-.76.5-1.63.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.28-.26-2.15-.56-2.91a5.9 5.9 0 0 0-1.39-2.13A5.9 5.9 0 0 0 19.86.63c-.76-.3-1.63-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1 0 12 18.16 6.16 6.16 0 0 0 12 5.84zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-10.4a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z" />
  ),
  x: (
    <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.4l-5.8-7.58-6.64 7.58H.47l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93zm-1.29 19.5h2.04L6.49 3.24H4.3L17.61 20.65z" />
  ),
  youtube: (
    <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.51 3.5 12 3.5 12 3.5s-7.51 0-9.38.55A3.02 3.02 0 0 0 .5 6.19 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.14C4.49 20.5 12 20.5 12 20.5s7.51 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.81zM9.6 15.5v-7l6.42 3.5-6.42 3.5z" />
  ),
};

function SocialIcon({ name, size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      {socialIcons[name]}
    </svg>
  );
}

export default function Footer() {
  const settings = useSiteSettings();
  const footerColumns = settings?.footerColumns?.length ? settings.footerColumns : fallbackFooterColumns;
  const addressLine1 = settings?.footerAddressLine1 || 'Sydenham Institute of Management Studies, Research & Entrepreneurship Education';
  const addressLine2 = settings?.footerAddressLine2 || 'B-Road, Churchgate, Mumbai 400 020';
  // Prefer a dedicated footer emblem; otherwise reuse the light header logo,
  // which is the same crest and already reversed for dark backgrounds.
  const emblemSource =
    settings?.footerEmblem || settings?.headerLogoLight || settings?.headerLogo || null;
  const emblemUrl = emblemSource ? urlFor(emblemSource).height(96).auto('format').url() : null;

  return (
    // Figma "Footer / 6 /": 80/64 padding (64/20 on mobile), 1280 container, 80 gap to credits.
    <footer className="bg-navy-900 text-white border-t border-white/20">
      <div className="max-w-[1280px] mx-auto box-content px-5 py-16 md:px-16 md:py-20">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Brand column — 620 wide: 229x56 logo, 40 gap, then 390 content with 20 gaps. */}
          <div className="lg:w-[620px] shrink-0 flex flex-col gap-10">
            {emblemUrl ? (
              <img src={emblemUrl} alt="SIMSREE" className="h-14 w-auto max-w-[229px] object-contain object-left" />
            ) : (
              <div className="h-14" />
            )}
            <div className="max-w-[390px] flex flex-col gap-5">
              <p className="text-lg leading-[150%] font-semibold">{addressLine1}</p>
              <p className="text-base leading-[150%]">{addressLine2}</p>
              <div className="flex gap-4">
                <SocialIcon name="linkedin" />
                <SocialIcon name="facebook" />
                <SocialIcon name="instagram" />
                <SocialIcon name="x" />
                <SocialIcon name="youtube" />
              </div>
            </div>
          </div>

          {/* Four 125-wide link columns, 40 gap (two rows of two on mobile). */}
          <div className="grid grid-cols-[125px_125px] gap-10 justify-between lg:flex lg:ml-auto">
            {footerColumns.map((col) => (
              <div key={col.heading} className="w-[125px]">
                <h4 className="text-base leading-[150%] font-semibold mb-4">{col.heading}</h4>
                <ul>
                  {col.links.map((l) => (
                    <li key={l.path}>
                      <Link to={l.path} className="block py-2 text-sm leading-[150%] hover:underline underline-offset-2">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Credits — 1px white/20 rule, 32 gap, Inter 14/150. */}
        <div className="mt-20 pt-8 border-t border-white/20 text-sm leading-[150%]">
          © {new Date().getFullYear()} SIMSREE · All rights reserved · Designed by DigIN Media rights reserved.
        </div>
      </div>
    </footer>
  );
}
