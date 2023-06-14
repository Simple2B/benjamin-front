import { StateCreator } from 'zustand';
import { SoldierOut } from '@/openapi';

export interface SoldierSlice {
  currentSoldier: SoldierOut | null;
  setCurrentSoldier: (cemetery: SoldierOut) => void;
}

export const createSoldierSlice: StateCreator<SoldierSlice> = (set) => ({
  currentSoldier: null,
  setCurrentSoldier: (currentSoldier: SoldierOut) => {
    set({ currentSoldier: currentSoldier });
  },
});
