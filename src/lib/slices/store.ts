import { create } from 'zustand';
import { CemeterySlice, createCemeterySlice } from './createCemeterySlice';

// type StoreState = ProductSlice & CartSlice;
type StoreState = CemeterySlice;

export const useAppStore = create<StoreState>()((...a) => ({
  ...createCemeterySlice(...a),
}));
