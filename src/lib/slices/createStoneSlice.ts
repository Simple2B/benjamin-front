import { StateCreator } from 'zustand';
import { IStone } from '@/components/stone/PreviewerStone';

export interface StoneSlice {
  currentStones: IStone[] | undefined;
  setCurrentStone: (stones: IStone[]) => void;
}

export const createStoneSlice: StateCreator<StoneSlice> = (set, get) => ({
  currentStones: [],
  setCurrentStone: (stones: IStone[]) => {
    set({ currentStones: stones });
  },
  // uploadPendingPhotos: async () => {
  //   const stonesToUpload = get().currentStones?.filter(
  //     (stone) => stone.photoSrc?.pending
  //   );
  // },
});
