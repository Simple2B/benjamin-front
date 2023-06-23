import { StateCreator } from 'zustand';
import { IStone } from '@/components/stone/PreviewerStone';

export interface StoneSlice {
  currentStone: IStone | null;
  setCurrentStone: (stone: IStone) => void;
}

export const createStoneSlice: StateCreator<StoneSlice> = (set) => ({
  currentStone: null,
  setCurrentStone: (currentStone: IStone) => {
    set({ currentStone: currentStone });
  },
});
