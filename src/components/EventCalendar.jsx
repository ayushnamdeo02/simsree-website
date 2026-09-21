import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

// Monday-first weekday index for a given date.
const mondayIndex = (d) => (d.getDay() + 6) % 7;

const toKey = (y, m, day) =>
  `${y}-${String(m + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

// Builds the 6×7 grid, padding with the neighbouring months' days so the
// calendar keeps a stable height as months change.
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
  while (cells.length % 7 !== 0 || cells.length < 35) {
    cells.push({ day: next++, outside: true });
  }
  return cells;
}

export default function EventCalendar({ events = [], selected, onSelect, initialDate }) {
  const start = initialDate ? new Date(initialDate) : new Date();
  const [view, setView] = useState({ year: start.getFullYear(), month: start.getMonth() });

  // Which days in the visible month have events, and of what audience.
  const dayMarks = useMemo(() => {
    const marks = new Map();
    for (const e of events) {
      if (!e.date) continue;
      const [y, m] = e.date.split('-').map(Number);
      if (y !== view.year || m - 1 !== view.month) continue;
      const key = e.date;
      const existing = marks.get(key) || new Set();
      existing.add(e.audience === 'corporate' ? 'corporate' : 'student');
      marks.set(key, existing);
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
    <div className="border border-navy-100 rounded-lg p-6">
      <div className="flex items-center justify-between mb-5">
        <p className="font-display text-lg font-semibold text-navy-900">
          {MONTHS[view.month]} {view.year}
        </p>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => shift(-1)}
            aria-label="Previous month"
            className="w-7 h-7 rounded flex items-center justify-center text-ink-400 hover:text-navy-900 hover:bg-navy-50 transition-colors"
          >
            <ChevronLeft size={15} />
          </button>
          <button
            type="button"
            onClick={() => shift(1)}
            aria-label="Next month"
            className="w-7 h-7 rounded flex items-center justify-center text-ink-400 hover:text-navy-900 hover:bg-navy-50 transition-colors"
          >
            <ChevronRight size={15} />
          </button>
        </div>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr>
            {WEEKDAYS.map((w) => (
              <th
                key={w}
                scope="col"
                className="text-[10px] font-normal text-ink-400 pb-2 text-center"
              >
                {w}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: cells.length / 7 }, (_, row) => (
            <tr key={row}>
              {cells.slice(row * 7, row * 7 + 7).map((c, i) => {
                const key = c.outside ? null : toKey(view.year, view.month, c.day);
                const marks = key ? dayMarks.get(key) : null;
                const isSelected = key && key === selected;
                return (
                  <td key={i} className="p-0.5 text-center">
                    {c.outside ? (
                      <span className="block w-9 h-9 leading-9 text-xs text-ink-400/40">
                        {c.day}
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => onSelect?.(isSelected ? null : key)}
                        aria-pressed={isSelected}
                        aria-label={`${c.day} ${MONTHS[view.month]} ${view.year}${
                          marks ? ` — ${marks.size} event type(s)` : ''
                        }`}
                        className={`relative w-9 h-9 rounded text-xs transition-colors ${
                          isSelected
                            ? 'bg-sky-500 text-white'
                            : marks
                              ? 'text-navy-900 font-medium hover:bg-navy-50'
                              : 'text-navy-900 hover:bg-navy-50'
                        }`}
                      >
                        {c.day}
                        {marks && !isSelected && (
                          <span className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
                            {[...marks].map((m) => (
                              <span
                                key={m}
                                className={`w-1 h-1 rounded-full ${
                                  m === 'corporate' ? 'bg-sky-500' : 'bg-navy-900'
                                }`}
                              />
                            ))}
                          </span>
                        )}
                      </button>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex gap-5 mt-5 pt-4 border-t border-navy-100">
        <span className="flex items-center gap-2 text-[10px] text-ink-600">
          <span className="w-1.5 h-1.5 rounded-full bg-navy-900" /> Student event
        </span>
        <span className="flex items-center gap-2 text-[10px] text-ink-600">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-500" /> MDP / Corporate
        </span>
      </div>
    </div>
  );
}
