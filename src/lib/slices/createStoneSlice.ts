import { StateCreator } from 'zustand';
import { IStone } from '@/components/stone/PreviewerStone';

export interface StoneSlice {
  currentStone: IStone[] | undefined;
  setCurrentStone: (stones: IStone[]) => void;
}

export const createStoneSlice: StateCreator<StoneSlice> = (set) => ({
  currentStone: [],
  setCurrentStone: (stones: IStone[]) => {
    set({ currentStone: stones });
  },
});
