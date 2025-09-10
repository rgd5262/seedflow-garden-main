import React from 'react';
import { cn, parseLocalDateKey } from '@/lib/utils';
import { Plan } from './GardenParcel';
import YearGrid from './YearGrid';

interface YearOverviewProps {
  year: number;
  allPlans: Plan[];
  currentMonth: number;
  onMonthSelect: (month: number) => void;
  className?: string;
}

const YearOverview: React.FC<YearOverviewProps> = ({
  year,
  allPlans,
  currentMonth,
  onMonthSelect,
  className
}) => {
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const getMonthStats = (month: number) => {
    const monthPlans = allPlans.filter(plan => {
      const planDate = parseLocalDateKey(plan.date);
      return planDate.getMonth() === month && planDate.getFullYear() === year;
    });

    const completed = monthPlans.filter(p => p.state === 'completed').length;
    const planted = monthPlans.filter(p => p.state === 'planted').length;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    return {
      completed,
      planted,
      total: monthPlans.length,
      daysInMonth,
      completionRate: daysInMonth > 0 ? completed / daysInMonth : 0
    };
  };

  const getMonthColor = (month: number) => {
    const stats = getMonthStats(month);
    if (stats.completed > stats.daysInMonth * 0.7) return 'bg-plant-bloomed';
    if (stats.completed > stats.daysInMonth * 0.4) return 'bg-plant-growing';
    if (stats.planted > 0) return 'bg-seed-planted';
    return 'bg-seed-dormant';
  };

  return (
    <div className={cn("w-full max-w-6xl mx-auto", className)}>
      <div className="text-center mb-4">
        <h3 className="text-xl font-semibold text-foreground mb-1">
          {year} Garden Overview
        </h3>
        <p className="text-sm text-muted-foreground">
          Click any month to tend your garden
        </p>
      </div>

      {/* Monthly Summary Grid (compact) */}
      <div className="mb-4 grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-12 gap-2">
        {monthNames.map((name, idx) => {
          const stats = getMonthStats(idx);
          const isActive = idx === currentMonth;
          return (
            <button
              key={idx}
              onClick={() => onMonthSelect(idx)}
              className={cn(
                'relative rounded-md p-2 text-left border border-border/40 transition-all',
                'hover:shadow-lg hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-focus-ring',
                getMonthColor(idx),
                isActive && 'ring-2 ring-focus-ring ring-offset-2 ring-offset-background'
              )}
              title={`${name}: ${stats.completed}/${stats.daysInMonth} completed`}
            >
              <div className="flex items-center justify-between">
                <span className={cn('text-xs font-medium', stats.completed > stats.daysInMonth * 0.5 ? 'text-garden-earth' : 'text-foreground')}>{name}</span>
                <span className={cn('text-xs font-bold', stats.completed > stats.daysInMonth * 0.5 ? 'text-garden-earth' : 'text-foreground')}>{stats.completed}</span>
              </div>
              <div className="flex space-x-0.5 mt-1">
                {[...Array(4)].map((_, i) => (
                  <span
                    key={i}
                    className={cn(
                      'w-1.5 h-1.5 rounded-full',
                      i < Math.ceil((stats.completed / stats.daysInMonth) * 4)
                        ? 'bg-autumn-gold'
                        : stats.completed > stats.daysInMonth * 0.5 
                          ? 'bg-garden-earth/40' 
                          : 'bg-muted-foreground/40'
                    )}
                  />
                ))}
              </div>
            </button>
          );
        })}
      </div>

      {/* Year heatmap */}
      <div className="p-4 bg-garden-earth/20 rounded-lg border border-border/30">
        <YearGrid year={year} allPlans={allPlans} />
      </div>

      {/* Year Summary */}
      <div className="mt-4 flex justify-center space-x-6 text-sm">
        <div className="text-center">
          <div className="text-xl font-bold text-plant-bloomed">
            {allPlans.filter(p => p.state === 'completed').length}
          </div>
          <div className="text-muted-foreground">Total Completed</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-plant-growing">
            {allPlans.filter(p => p.state === 'planted').length}
          </div>
          <div className="text-muted-foreground">Currently Growing</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-autumn-gold">
            {Math.round((allPlans.filter(p => p.state === 'completed').length / 365) * 100)}%
          </div>
          <div className="text-muted-foreground">Year Progress</div>
        </div>
      </div>
    </div>
  );
};

export default YearOverview;