import { create } from 'zustand';
import { CemeterySlice, createCemeterySlice } from './createCemeterySlice';
import { SoldierSlice, createSoldierSlice } from './createSoldierSlice';
import { createStoneSlice, StoneSlice } from './createStoneSlice';

type StoreState = CemeterySlice & SoldierSlice & StoneSlice;

export const useAppStore = create<StoreState>()((...a) => ({
  ...createCemeterySlice(...a),
  ...createSoldierSlice(...a),
  ...createStoneSlice(...a),
}));
