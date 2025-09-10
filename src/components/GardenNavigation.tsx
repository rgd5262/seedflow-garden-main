import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Calendar, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { monthNames } from '@/constants/i18n';
import { STRINGS, type Locale } from '@/constants/i18n';
import { useLocale } from '@/components/LanguageSwitcher';

interface GardenNavigationProps {
  currentMonth: number;
  currentYear: number;
  onMonthChange: (month: number, year: number) => void;
  showYearView: boolean;
  onToggleYearView: () => void;
  className?: string;
}

const GardenNavigation: React.FC<GardenNavigationProps> = ({
  currentMonth,
  currentYear,
  onMonthChange,
  showYearView,
  onToggleYearView,
  className
}) => {
  const { locale } = useLocale();
  const mNames = monthNames(locale);
  const S = STRINGS[locale as Locale];

  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      onMonthChange(11, currentYear - 1);
    } else {
      onMonthChange(currentMonth - 1, currentYear);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      onMonthChange(0, currentYear + 1);
    } else {
      onMonthChange(currentMonth + 1, currentYear);
    }
  };

  const goToCurrentMonth = () => {
    const now = new Date();
    onMonthChange(now.getMonth(), now.getFullYear());
  };

  const monthYearLabel = locale === 'ko'
    ? `${currentYear}년 ${currentMonth + 1}월`
    : `${mNames[currentMonth]} ${currentYear}`;

  return (
    <nav className={cn("garden-nav", className)}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Left: App Title */}
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-foreground">
              🌱 {S.app_title}
            </h1>
          </div>

          {/* Center: Month Navigation */}
          <div className="flex items-center space-x-4">
            <Button
              variant="secondary"
              size="sm"
              onClick={goToPreviousMonth}
              className="p-2"
              disabled={showYearView}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            <div className="text-center min-w-40">
              {showYearView ? (
                <span className="text-lg font-semibold text-foreground">
                  {S.year_overview_title(currentYear)}
                </span>
              ) : (
                <span className="text-lg font-semibold text-foreground">
                  {monthYearLabel}
                </span>
              )}
            </div>

            <Button
              variant="secondary"
              size="sm"
              onClick={goToNextMonth}
              className="p-2"
              disabled={showYearView}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Right: View Controls */}
          <div className="flex items-center space-x-2">
            <Button
              variant={showYearView ? "secondary" : "outline"}
              size="sm"
              onClick={onToggleYearView}
              className="flex items-center space-x-1"
            >
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">{S.nav_year_view}</span>
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={goToCurrentMonth}
              className="flex items-center space-x-1"
            >
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">{S.nav_today}</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default GardenNavigation;