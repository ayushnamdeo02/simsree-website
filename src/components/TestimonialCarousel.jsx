import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { urlFor } from '../lib/sanity';

function imgUrl(image, width) {
  if (!image) return undefined;
  if (typeof image === 'string') return image;
  try {
    return urlFor(image).width(width).auto('format').url();
  } catch {
    return undefined;
  }
}

// Quotes arrive with or without their own quote marks; the card adds curly ones.
const unquote = (q = '') => q.trim().replace(/^["“]+|["”]+$/g, '');

// Figma "Testimonial / 12 /": three 427 columns (48 right padding); H6 22 quote,
// hairline, 66px avatar with name (+ programme) and meta lines; dots + square
// arrows below.
export default function TestimonialCarousel({ testimonials }) {
  const [index, setIndex] = useState(0);
  const pageCount = Math.max(1, Math.ceil(testimonials.length / 3));
  const page = Math.min(index, pageCount - 1);
  const visible = testimonials.slice(page * 3, page * 3 + 3);
  const goTo = (i) => setIndex(((i % pageCount) + pageCount) % pageCount);

  return (
    <div className="flex flex-col gap-12">
      <div className="grid md:grid-cols-3 gap-12 md:gap-0">
        {visible.map((t) => {
          const photo = imgUrl(t.photo, 132);
          return (
            <figure key={t._id || t.name} className="flex flex-col gap-8 md:pr-12">
              <blockquote className="flex-1 font-display font-medium text-[22px] leading-[140%] tracking-[-0.01em] text-black">
                &ldquo;{unquote(t.quote)}&rdquo;
              </blockquote>
              <div className="h-px bg-black/20" aria-hidden="true" />
              <figcaption className="flex items-center gap-4">
                <div
                  className="w-[66px] h-[66px] rounded-full bg-navy-50 bg-cover bg-center shrink-0"
                  style={photo ? { backgroundImage: `url('${photo}')` } : undefined}
                />
                <div className="text-black">
                  <p className="text-base leading-[150%]">
                    <span className="font-semibold">{t.name}</span>
                    {t.programme && <span className="ml-1.5">({t.programme})</span>}
                  </p>
                  {(t.meta || '').split('\n').map((line) => (
                    <p key={line} className="text-sm leading-[150%]">
                      {line}
                    </p>
                  ))}
                </div>
              </figcaption>
            </figure>
          );
        })}
      </div>

      <div className="flex items-center justify-between h-12">
        <div className="flex items-center gap-2">
          {Array.from({ length: pageCount }).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Show testimonials ${i + 1}`}
              className={`w-2 h-2 rounded-full ${i === page ? 'bg-black' : 'bg-black/20'}`}
            />
          ))}
        </div>
        <div className="flex items-center gap-4">
          {[
            { icon: ArrowLeft, label: 'Previous testimonials', to: page - 1 },
            { icon: ArrowRight, label: 'Next testimonials', to: page + 1 },
          ].map(({ icon: Icon, label, to }) => (
            <button
              key={label}
              onClick={() => goTo(to)}
              aria-label={label}
              className="w-12 h-12 rounded bg-white outline outline-1 -outline-offset-1 outline-black/20 flex items-center justify-center hover:bg-navy-50 transition-colors"
            >
              <Icon size={24} strokeWidth={1.5} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

