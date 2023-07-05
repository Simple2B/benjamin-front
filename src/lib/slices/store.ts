import { create } from 'zustand';
import { CemeterySlice, createCemeterySlice } from './createCemeterySlice';
import { SoldierSlice, createSoldierSlice } from './createSoldierSlice';
import { createStoneSlice, StoneSlice } from './createStoneSlice';
import {
  FilteredSoldierSlice,
  createFilteredSoldiersSlice,
} from './createFilteredSoldier';

type StoreState = CemeterySlice &
  SoldierSlice &
  StoneSlice &
  FilteredSoldierSlice;

export const useAppStore = create<StoreState>()((...a) => ({
  ...createCemeterySlice(...a),
  ...createSoldierSlice(...a),
  ...createStoneSlice(...a),
  ...createFilteredSoldiersSlice(...a),
}));
