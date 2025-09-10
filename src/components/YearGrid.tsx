import React, { useMemo } from 'react';
import { cn, formatLocalDateKey } from '@/lib/utils';
import { Plan } from '@/components/GardenParcel';
import { MONTHS_SHORT, STRINGS, type Locale } from '@/constants/i18n';
import { useLocale } from '@/components/LanguageSwitcher';

interface YearGridProps {
  year: number;
  allPlans: Plan[];
  className?: string;
  onMonthSelect?: (monthIndex: number) => void; // optional navigation
}

function getMonthAbbr(monthIndex: number, locale: Locale): string {
  const abbr = MONTHS_SHORT[locale] as readonly string[];
  return abbr[monthIndex] ?? '';
}

export const YearGrid: React.FC<YearGridProps> = ({ year, allPlans, className, onMonthSelect }) => {
  const { locale } = useLocale();
  const S = STRINGS[locale as Locale];

  // Map local dateKey -> state/title for O(1) lookup
  const stateByDate = useMemo(() => {
    const map = new Map<string, { state: Plan['state']; title: string }>();
    for (const plan of allPlans) {
      map.set(plan.date, { state: plan.state, title: plan.title });
    }
    return map;
  }, [allPlans]);

  // Build weekly columns (Sunday->Saturday per column)
  const { weeks, labelMonths } = useMemo(() => {
    const startOfYear = new Date(year, 0, 1);
    const endOfYear = new Date(year, 11, 31);

    const startSunday = new Date(startOfYear);
    startSunday.setDate(startSunday.getDate() - startSunday.getDay()); // back to Sunday

    const endSaturday = new Date(endOfYear);
    endSaturday.setDate(endSaturday.getDate() + (6 - endSaturday.getDay())); // forward to Saturday

    const weeks: Array<Array<Date | null>> = [];
    const labelMonths: number[] = []; // month index for each week column, -1 if none

    const cursor = new Date(startSunday);
    let prevLabelMonth: number | null = null;
    while (cursor <= endSaturday) {
      const week: Array<Date | null> = [];
      let weekHasMonthLabel = -1;

      for (let i = 0; i < 7; i++) {
        const isInYear = cursor.getFullYear() === year;
        week.push(isInYear ? new Date(cursor) : null);

        if (isInYear && cursor.getDate() === 1) {
          weekHasMonthLabel = cursor.getMonth();
        }

        cursor.setDate(cursor.getDate() + 1);
      }

      // Month label strategy: label only when month changes (first-of-month within this week)
      if (weekHasMonthLabel !== -1 && weekHasMonthLabel !== prevLabelMonth) {
        labelMonths.push(weekHasMonthLabel);
        prevLabelMonth = weekHasMonthLabel;
      } else {
        labelMonths.push(-1);
      }

      weeks.push(week);
    }

    return { weeks, labelMonths };
  }, [year]);

  const getCellClass = (date: Date | null): string => {
    if (!date) return 'bg-transparent';
    const dateKey = formatLocalDateKey(date);
    const info = stateByDate.get(dateKey);
    if (!info) return 'bg-seed-dormant/40';
    if (info.state === 'completed') return 'bg-plant-bloomed';
    if (info.state === 'planted') return 'bg-seed-planted';
    return 'bg-seed-dormant/40';
  };

  const getTitle = (date: Date | null): string => {
    if (!date) return '';
    const dateKey = formatLocalDateKey(date);
    const info = stateByDate.get(dateKey);
    if (!info) return `${dateKey} • empty`;
    return `${dateKey} • ${info.state}${info.title ? ` • ${info.title}` : ''}`;
  };

  return (
    <div className={cn('w-full', className)}>
      {/* Month labels row: grid with the same number of week columns */}
      <div
        className={cn('grid gap-[2px] px-1 h-5 select-none', '[grid-template-columns:repeat(var(--yg-weeks),minmax(0,1fr))]')}
        style={{ ['--yg-weeks' as any]: weeks.length } as React.CSSProperties}
      >
        {labelMonths.map((m, idx) => (
          <div key={idx} className="flex items-end justify-center overflow-hidden">
            {m !== -1 && (
              <span className="text-[10px] text-muted-foreground leading-none whitespace-nowrap text-ellipsis overflow-hidden">
                {getMonthAbbr(m, locale as Locale)}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Heatmap grid: columns = weeks, each column stacks 7 day squares */}
      <div
        className={cn('grid gap-[2px] px-1', '[grid-template-columns:repeat(var(--yg-weeks),minmax(0,1fr))]')}
        style={{ ['--yg-weeks' as any]: weeks.length } as React.CSSProperties}
      >
        {weeks.map((week, colIdx) => (
          <div key={colIdx} className="flex flex-col gap-[2px]">
            {week.map((date, rowIdx) => (
              <div
                key={rowIdx}
                className={cn(
                  'w-full aspect-square box-border rounded-[2px] border border-border/20',
                  getCellClass(date)
                )}
                title={getTitle(date)}
                aria-label={getTitle(date)}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground px-1">
        <span>{S.legend_less}</span>
        <span className="w-3 h-3 rounded-[2px] bg-seed-dormant/40 border border-border/20" />
        <span className="w-3 h-3 rounded-[2px] bg-seed-planted border border-border/20" />
        <span className="w-3 h-3 rounded-[2px] bg-plant-bloomed border border-border/20" />
        <span>{S.legend_more}</span>
      </div>
    </div>
  );
};

export default YearGrid;
