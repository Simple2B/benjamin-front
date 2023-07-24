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
import {
  SoldierScrollSlice,
  createSoldierScrollSlice,
} from './createSoldierScrollSlices';

type StoreState = CemeterySlice &
  SoldierSlice &
  StoneSlice &
  FilteredSoldierSlice &
  MessageSlice &
  MapPositionSlice &
  SoldierScrollSlice;

export const useAppStore = create<StoreState>()((...a) => ({
  ...createCemeterySlice(...a),
  ...createSoldierSlice(...a),
  ...createStoneSlice(...a),
  ...createFilteredSoldiersSlice(...a),
  ...createMessageSlice(...a),
  ...createMapPositionSlice(...a),
  ...createSoldierScrollSlice(...a),
}));
