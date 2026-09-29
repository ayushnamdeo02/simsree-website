import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat', 'Sun'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

// Monday-first weekday index for a given date.
const mondayIndex = (d) => (d.getDay() + 6) % 7;

const toKey = (y, m, day) =>
  `${y}-${String(m + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

// Builds the month grid, padding with the neighbouring months' days so every
// row is complete.
function buildGrid(year, month) {
  const first = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrev = new Date(year, month, 0).getDate();
  const lead = mondayIndex(first);

  const cells = [];
  for (let i = lead - 1; i >= 0; i--) {
    cells.push({ day: daysInPrev - i, outside: true });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, outside: false });
  }
  let next = 1;
  while (cells.length % 7 !== 0) {
    cells.push({ day: next++, outside: true });
  }
  return cells;
}

// Figma "Calendar": white, radius 16, 30 padding. Header (18/150 month, 46px
// chevrons), a 58px weekday row, 64px cells with overlapping #d5d4df hairlines.
// Days with events fill navy (student) or Eastern Blue (MDP / corporate);
// neighbouring-month days are #eaeaf1. Legend of 10px dots below.
export default function EventCalendar({ events = [], selected, onSelect, initialDate }) {
  const start = initialDate ? new Date(initialDate) : new Date();
  const [view, setView] = useState({ year: start.getFullYear(), month: start.getMonth() });

  // The audience of each day's events in the visible month.
  const dayMarks = useMemo(() => {
    const marks = new Map();
    for (const e of events) {
      if (!e.date) continue;
      const [y, m] = e.date.split('-').map(Number);
      if (y !== view.year || m - 1 !== view.month) continue;
      const existing = marks.get(e.date) || new Set();
      existing.add(e.audience === 'corporate' ? 'corporate' : 'student');
      marks.set(e.date, existing);
    }
    return marks;
  }, [events, view]);

  const cells = useMemo(() => buildGrid(view.year, view.month), [view]);

  const shift = (delta) => {
    setView((v) => {
      const d = new Date(v.year, v.month + delta, 1);
      return { year: d.getFullYear(), month: d.getMonth() };
    });
  };

  return (
    <div className="bg-white rounded-2xl py-[30px] lg:px-[30px] flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="text-lg leading-[150%] text-black">
            {MONTHS[view.month]} {view.year}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => shift(-1)}
              aria-label="Previous month"
              className="w-[46px] h-[46px] flex items-center justify-center text-black/40 hover:text-black transition-colors"
            >
              <ChevronLeft size={20} strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={() => shift(1)}
              aria-label="Next month"
              className="w-[46px] h-[46px] flex items-center justify-center text-black hover:text-navy-900 transition-colors"
            >
              <ChevronRight size={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <div role="grid" aria-label={`${MONTHS[view.month]} ${view.year}`}>
          <div role="row" className="grid grid-cols-7 h-[58px]">
            {WEEKDAYS.map((w) => (
              <span key={w} role="columnheader" className="flex items-center justify-center text-xs leading-[150%] text-black">
                {w}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-7 border-l border-t border-[#d5d4df]">
            {cells.map((c, i) => {
              const key = c.outside ? null : toKey(view.year, view.month, c.day);
              const marks = key ? dayMarks.get(key) : null;
              const isSelected = key && key === selected;
              const base = 'h-16 flex items-center justify-center border-r border-b border-[#d5d4df] text-sm leading-[120%]';
              if (c.outside) {
                return (
                  <span key={i} role="gridcell" className={`${base} bg-navy-50 text-black/30`}>
                    {c.day}
                  </span>
                );
              }
              const fill = marks
                ? marks.has('student')
                  ? 'bg-navy-900 text-white'
                  : 'bg-sky-600 text-white'
                : isSelected
                  ? 'bg-navy-50 text-black'
                  : 'text-black hover:bg-navy-50';
              return (
                <button
                  key={i}
                  type="button"
                  role="gridcell"
                  onClick={() => onSelect?.(isSelected ? null : key)}
                  aria-pressed={isSelected}
                  aria-label={`${c.day} ${MONTHS[view.month]} ${view.year}${marks ? ' - has events' : ''}`}
                  className={`${base} transition-colors ${fill} ${isSelected ? 'font-semibold underline underline-offset-4' : ''}`}
                >
                  {c.day}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-6">
        <span className="flex items-center gap-4 text-sm leading-[150%] text-black">
          <span className="w-2.5 h-2.5 rounded-full bg-navy-900" /> Student event
        </span>
        <span className="flex items-center gap-4 text-sm leading-[150%] text-black">
          <span className="w-2.5 h-2.5 rounded-full bg-sky-600" /> MDP / Corporate
        </span>
      </div>
    </div>
  );
}
