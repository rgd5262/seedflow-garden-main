import React from 'react';
import { cn } from '@/lib/utils';
import seedIcon from '@/assets/seed.png';
import plantSprout from '@/assets/plant-sprout.png';
import plantBloomed from '@/assets/plant-bloomed.png';

export type ParcelState = 'empty' | 'planted' | 'completed';

export interface Plan {
  id: string;
  title: string;
  date: string;
  state: ParcelState;
  plantedAt?: Date;
  completedAt?: Date;
}

interface GardenParcelProps {
  date: number;
  plan?: Plan;
  onPlant: (date: number) => void;
  onComplete: (planId: string) => void;
  isCurrentMonth: boolean;
  className?: string;
}

const GardenParcel: React.FC<GardenParcelProps> = ({
  date,
  plan,
  onPlant,
  onComplete,
  isCurrentMonth,
  className
}) => {
  const handleClick = () => {
    if (!plan && isCurrentMonth) {
      onPlant(date);
    } else if (plan && plan.state === 'planted') {
      onComplete(plan.id);
    }
  };

  const getParcelContent = () => {
    if (!plan) return null;

    switch (plan.state) {
      case 'planted':
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <img 
              src={seedIcon} 
              alt="Planted seed"
              className="w-6 h-6 opacity-80"
            />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-plant-growing rounded-full animate-pulse" />
          </div>
        );
      case 'completed':
        return (
          <div className="relative w-full h-full flex items-center justify-center growth-particles">
            <img 
              src={plantBloomed} 
              alt="Bloomed plant"
              className="w-8 h-8"
            />
          </div>
        );
      default:
        return null;
    }
  };

  const getParcelState = () => {
    if (!plan) return 'parcel-empty';
    if (plan.state === 'planted') return 'parcel-planted';
    if (plan.state === 'completed') return 'parcel-completed';
    return 'parcel-empty';
  };

  const getTooltipText = () => {
    if (!plan) return `Plant a seed for ${date}`;
    if (plan.state === 'planted') return `Complete: ${plan.title}`;
    if (plan.state === 'completed') return `Completed: ${plan.title}`;
    return '';
  };

  return (
    <div
      className={cn(
        "aspect-square rounded-lg relative flex flex-col items-center justify-center cursor-pointer",
        "min-h-12 sm:min-h-16 md:min-h-20",
        getParcelState(),
        !isCurrentMonth && "opacity-50 cursor-not-allowed",
        className
      )}
      onClick={handleClick}
      title={getTooltipText()}
      role="button"
      tabIndex={0}
      aria-label={getTooltipText()}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      {/* Date Number */}
      <div className={cn(
        "absolute top-1 left-1 text-xs font-medium",
        plan?.state === 'completed' ? "text-garden-earth" : "text-muted-foreground"
      )}>
        {date}
      </div>
      
      {/* Plant Content */}
      <div className="flex-1 flex items-center justify-center">
        {getParcelContent()}
      </div>
      
      {/* Hover State Indicator */}
      {!plan && isCurrentMonth && (
        <div className="absolute inset-0 bg-plant-growing/10 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-dashed border-plant-growing rounded-full" />
        </div>
      )}
    </div>
  );
};

export default GardenParcel;