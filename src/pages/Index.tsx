import React, { useState } from 'react';
import { useGardenData } from '@/hooks/useGardenData';
import GardenNavigation from '@/components/GardenNavigation';
import MonthlyGarden from '@/components/MonthlyGarden';
import YearOverview from '@/components/YearOverview';
import PlantSeedDialog from '@/components/PlantSeedDialog';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const currentDate = new Date();
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [showYearView, setShowYearView] = useState(false);
  const [plantDialogOpen, setPlantDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  const {
    plans,
    plantSeed,
    completePlan,
    getPlansForMonth,
  } = useGardenData();

  const handleMonthChange = (month: number, year: number) => {
    setCurrentMonth(month);
    setCurrentYear(year);
    setShowYearView(false);
  };

  const handleMonthSelect = (month: number) => {
    setCurrentMonth(month);
    setShowYearView(false);
  };

  const handlePlantSeed = (date: number) => {
    setSelectedDate(date);
    setPlantDialogOpen(true);
  };

  const handlePlantConfirm = (title: string, description: string) => {
    if (selectedDate !== null) {
      const success = plantSeed(currentYear, currentMonth, selectedDate, title, description);
      if (success) {
        toast({
          title: "Seed Planted! 🌱",
          description: `Your plan for ${title} has been planted and is ready to grow.`,
        });
      } else {
        toast({
          title: "Already Planted",
          description: "You already have a plan for this day. Complete it first!",
          variant: "destructive",
        });
      }
    }
  };

  const handleCompletePlan = (planId: string) => {
    completePlan(planId);
    const plan = plans.find(p => p.id === planId);
    toast({
      title: "Plant Bloomed! 🌸",
      description: `Congratulations! You completed "${plan?.title}". Your garden is growing beautifully.`,
    });
  };

  const currentMonthPlans = getPlansForMonth(currentYear, currentMonth);
  const allYearPlans = plans.filter(plan => {
    const planDate = new Date(plan.date);
    return planDate.getFullYear() === currentYear;
  });

  return (
    <div className="min-h-screen bg-background">
      <GardenNavigation
        currentMonth={currentMonth}
        currentYear={currentYear}
        onMonthChange={handleMonthChange}
        showYearView={showYearView}
        onToggleYearView={() => setShowYearView(!showYearView)}
      />

      <main className="container mx-auto px-4 py-8">
        {showYearView ? (
          <YearOverview
            year={currentYear}
            allPlans={allYearPlans}
            currentMonth={currentMonth}
            onMonthSelect={handleMonthSelect}
          />
        ) : (
          <MonthlyGarden
            year={currentYear}
            month={currentMonth}
            plans={currentMonthPlans}
            onPlant={handlePlantSeed}
            onComplete={handleCompletePlan}
          />
        )}
      </main>

      <PlantSeedDialog
        isOpen={plantDialogOpen}
        onClose={() => {
          setPlantDialogOpen(false);
          setSelectedDate(null);
        }}
        onPlant={handlePlantConfirm}
        date={selectedDate}
        month={currentMonth}
        year={currentYear}
      />

      {/* Floating Help Text */}
      {!showYearView && currentMonthPlans.length === 0 && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-card/90 backdrop-blur-sm border border-border rounded-lg p-4 max-w-sm mx-4 text-center shadow-lg">
          <p className="text-sm text-muted-foreground mb-2">
            Welcome to your daily garden! 🌱
          </p>
          <p className="text-xs text-muted-foreground">
            Click any day to plant a seed (set a goal), then complete it to watch your plant bloom.
          </p>
        </div>
      )}
    </div>
  );
};

export default Index;
