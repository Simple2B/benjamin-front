import { create } from 'zustand';
import { CemeterySlice, createCemeterySlice } from './createCemeterySlice';
import { SoldierSlice, createSoldierSlice } from './createSoldierSlice';
import { createStoneSlice, StoneSlice } from './createStoneSlice';
import {
  FilteredSoldierSlice,
  createFilteredSoldiersSlice,
} from './createFilteredSoldier';
import { createMessageSlice, MessageSlice } from './createMessageScile';
import {
  createMapPositionSlice,
  MapPositionSlice,
} from './createMapPositionSlices';

type StoreState = CemeterySlice &
  SoldierSlice &
  StoneSlice &
  FilteredSoldierSlice &
  MessageSlice &
  MapPositionSlice;

export const useAppStore = create<StoreState>()((...a) => ({
  ...createCemeterySlice(...a),
  ...createSoldierSlice(...a),
  ...createStoneSlice(...a),
  ...createFilteredSoldiersSlice(...a),
  ...createMessageSlice(...a),
  ...createMapPositionSlice(...a),
}));
