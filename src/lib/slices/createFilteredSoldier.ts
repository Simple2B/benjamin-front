import { SoldierCard } from '@/openapi';
import { StateCreator } from 'zustand';

export interface FilteredSoldierSlice {
  currentFilterTitle: string;
  currentFilteredSoldiers: SoldierCard[] | undefined;
  setCurrentFilteredSoldiers: (filteresSoldiers: SoldierCard[]) => void;
  setCurrentFilterTitle: (currentFilterTitle: string) => void;
}

export const createFilteredSoldiersSlice: StateCreator<FilteredSoldierSlice> = (
  set,
  get
) => ({
  currentFilteredSoldiers: [],
  setCurrentFilteredSoldiers: (filteresSoldiers: SoldierCard[]) => {
    set({ currentFilteredSoldiers: filteresSoldiers });
  },
  currentFilterTitle: '',
  setCurrentFilterTitle: (currentFilterTitle: string) => {
    set({ currentFilterTitle: currentFilterTitle });
  },
});
