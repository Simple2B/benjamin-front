import { StateCreator } from 'zustand';
import { CemeteryOut } from '@/openapi';

export interface CemeterySlice {
  currentCemetery: CemeteryOut | null;
  setCurrentCemetery: (cemetery: CemeteryOut) => void;
}

export const createCemeterySlice: StateCreator<CemeterySlice> = (set) => ({
  currentCemetery: null,
  setCurrentCemetery: (currentCemetery: CemeteryOut) => {
    set({ currentCemetery: currentCemetery });
  },
});
