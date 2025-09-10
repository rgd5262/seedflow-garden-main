import React from 'react';
import { cn } from '@/lib/utils';
import GardenParcel, { Plan } from './GardenParcel';

interface MonthlyGardenProps {
  year: number;
  month: number; // 0-11
  plans: Plan[];
  onPlant: (date: number) => void;
  onComplete: (planId: string) => void;
  className?: string;
}

const MonthlyGarden: React.FC<MonthlyGardenProps> = ({
  year,
  month,
  plans,
  onPlant,
  onComplete,
  className
}) => {
  const currentDate = new Date();
  const isCurrentMonth = currentDate.getFullYear() === year && currentDate.getMonth() === month;
  
  // Generate calendar grid
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay(); // 0 = Sunday

  // Generate array of dates including empty cells for proper grid alignment
  const calendarDates: (number | null)[] = [];
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDates.push(null);
  }
  
  // Add actual dates
  for (let date = 1; date <= daysInMonth; date++) {
    calendarDates.push(date);
  }

  const getPlanForDate = (date: number): Plan | undefined => {
    return plans.find(plan => {
      const planDate = new Date(plan.date);
      return planDate.getDate() === date && 
             planDate.getMonth() === month && 
             planDate.getFullYear() === year;
    });
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className={cn("w-full max-w-4xl mx-auto", className)}>
      {/* Month Header */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          {monthNames[month]} {year}
        </h2>
        <p className="text-muted-foreground">
          Plant your daily seeds and watch your garden grow
        </p>
      </div>

      {/* Week Day Headers */}
      <div className="calendar-grid calendar-week-header mb-2 px-4">
        {weekDays.map(day => (
          <div 
            key={day} 
            className="text-center text-sm font-medium text-muted-foreground py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Garden Grid */}
      <div className="garden-grid bg-garden-earth/30 rounded-xl border border-border/50 backdrop-blur-sm">
        {calendarDates.map((date, index) => (
          <div key={index} className="relative">
            {date ? (
              <GardenParcel
                date={date}
                plan={getPlanForDate(date)}
                onPlant={onPlant}
                onComplete={onComplete}
                isCurrentMonth={isCurrentMonth}
              />
            ) : (
              <div className="aspect-square" /> // Empty cell for spacing
            )}
          </div>
        ))}
      </div>

      {/* Month Stats */}
      <div className="mt-6 flex justify-center space-x-8 text-sm">
        <div className="text-center">
          <div className="text-2xl font-bold text-plant-growing">
            {plans.filter(p => p.state === 'planted').length}
          </div>
          <div className="text-muted-foreground">Seeds Planted</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-plant-bloomed">
            {plans.filter(p => p.state === 'completed').length}
          </div>
          <div className="text-muted-foreground">Plants Grown</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-autumn-gold">
            {Math.round((plans.filter(p => p.state === 'completed').length / daysInMonth) * 100)}%
          </div>
          <div className="text-muted-foreground">Completion</div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyGarden;