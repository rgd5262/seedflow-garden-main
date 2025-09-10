import { useState, useEffect } from 'react';
import { Plan } from '@/components/GardenParcel';

const STORAGE_KEY = 'garden-plans';

export const useGardenData = () => {
  const [plans, setPlans] = useState<Plan[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedPlans = localStorage.getItem(STORAGE_KEY);
    if (savedPlans) {
      try {
        const parsedPlans = JSON.parse(savedPlans).map((plan: any) => ({
          ...plan,
          plantedAt: plan.plantedAt ? new Date(plan.plantedAt) : undefined,
          completedAt: plan.completedAt ? new Date(plan.completedAt) : undefined,
        }));
        setPlans(parsedPlans);
      } catch (error) {
        console.error('Error loading garden data:', error);
      }
    }
  }, []);

  // Save data to localStorage whenever plans change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plans));
  }, [plans]);

  const plantSeed = (year: number, month: number, date: number, title: string, description: string = '') => {
    const planDate = new Date(year, month, date);
    const dateString = planDate.toISOString().split('T')[0];
    
    // Check if a plan already exists for this date
    const existingPlan = plans.find(plan => plan.date === dateString);
    if (existingPlan) {
      return false; // Cannot plant on a date that already has a plan
    }

    const newPlan: Plan = {
      id: `${dateString}-${Date.now()}`,
      title,
      description: description || undefined,
      date: dateString,
      state: 'planted',
      plantedAt: new Date(),
    };

    setPlans(prev => [...prev, newPlan]);
    return true;
  };

  const completePlan = (planId: string) => {
    setPlans(prev => prev.map(plan => 
      plan.id === planId 
        ? { ...plan, state: 'completed', completedAt: new Date() }
        : plan
    ));
  };

  const updatePlan = (planId: string, updates: Partial<Pick<Plan, 'title' | 'description' | 'state'>>) => {
    setPlans(prev => prev.map(plan => {
      if (plan.id !== planId) return plan;
      const next: Plan = { ...plan, ...updates };
      if (updates.state === 'completed' && !plan.completedAt) {
        next.completedAt = new Date();
      }
      if (updates.state === 'planted' && plan.completedAt && plan.state === 'completed') {
        // Reopen: clear completedAt when moving back to planted
        next.completedAt = undefined;
      }
      return next;
    }));
  };

  const deletePlan = (planId: string) => {
    setPlans(prev => prev.filter(plan => plan.id !== planId));
  };

  const getPlansForMonth = (year: number, month: number): Plan[] => {
    return plans.filter(plan => {
      const planDate = new Date(plan.date);
      return planDate.getFullYear() === year && planDate.getMonth() === month;
    });
  };

  const getYearStats = (year: number) => {
    const yearPlans = plans.filter(plan => {
      const planDate = new Date(plan.date);
      return planDate.getFullYear() === year;
    });

    return {
      total: yearPlans.length,
      completed: yearPlans.filter(p => p.state === 'completed').length,
      planted: yearPlans.filter(p => p.state === 'planted').length,
      completionRate: yearPlans.length > 0 ? yearPlans.filter(p => p.state === 'completed').length / yearPlans.length : 0,
    };
  };

  return {
    plans,
    plantSeed,
    completePlan,
    updatePlan,
    deletePlan,
    getPlansForMonth,
    getYearStats,
  };
};