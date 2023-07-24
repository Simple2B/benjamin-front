import { StateCreator } from 'zustand';

export interface SoldierScrollSlice {
  currenSoldierScroll: boolean;
  setCurrentSoldierScroll: (soldierScroll: boolean) => void;
}

export const createSoldierScrollSlice: StateCreator<SoldierScrollSlice> = (
  set
) => ({
  currenSoldierScroll: false,
  setCurrentSoldierScroll: (currenSoldierScroll: boolean) => {
    set({ currenSoldierScroll: currenSoldierScroll });
  },
});
