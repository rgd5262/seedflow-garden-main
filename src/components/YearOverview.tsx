import React from 'react';
import { cn } from '@/lib/utils';
import { Plan } from './GardenParcel';

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
      const planDate = new Date(plan.date);
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
      completionRate: monthPlans.length > 0 ? completed / daysInMonth : 0
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

      <div className="grid grid-cols-6 sm:grid-cols-12 gap-2 p-4 bg-garden-earth/20 rounded-lg border border-border/30">
        {monthNames.map((monthName, index) => {
          const stats = getMonthStats(index);
          const isCurrentMonth = index === currentMonth;
          
          return (
            <button
              key={index}
              onClick={() => onMonthSelect(index)}
              className={cn(
                "relative aspect-square rounded-md transition-all duration-300",
                "flex flex-col items-center justify-center p-2",
                "hover:scale-105 hover:shadow-lg cursor-pointer",
                getMonthColor(index),
                isCurrentMonth && "ring-2 ring-focus-ring ring-offset-2 ring-offset-background",
                "group"
              )}
              title={`${monthName}: ${stats.completed}/${stats.daysInMonth} completed`}
            >
              {/* Month Label */}
              <span className={cn(
                "text-xs font-medium mb-1",
                stats.completed > stats.daysInMonth * 0.5 ? "text-garden-earth" : "text-foreground"
              )}>
                {monthName}
              </span>

              {/* Completion Indicator */}
              <div className="flex flex-col items-center">
                <div className={cn(
                  "text-lg font-bold",
                  stats.completed > stats.daysInMonth * 0.5 ? "text-garden-earth" : "text-foreground"
                )}>
                  {stats.completed}
                </div>
                
                {/* Progress Dots */}
                <div className="flex space-x-0.5 mt-1">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className={cn(
                        "w-1 h-1 rounded-full",
                        i < Math.ceil((stats.completed / stats.daysInMonth) * 4)
                          ? "bg-autumn-gold"
                          : stats.completed > stats.daysInMonth * 0.5 
                            ? "bg-garden-earth/40" 
                            : "bg-muted-foreground/40"
                      )}
                    />
                  ))}
                </div>
              </div>

              {/* Hover Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-card text-card-foreground text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                {stats.completed}/{stats.daysInMonth} days completed
              </div>
            </button>
          );
        })}
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