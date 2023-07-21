import { ICoordinates } from '@/components/cemetery/mapCemetery/MapCemetery';
import { StateCreator } from 'zustand';

export interface IMapPosition {
  zoom: number;
  latlng: ICoordinates;
}

export interface MapPositionSlice {
  currentMapPosition: IMapPosition | null;
  setCurrentMapPosition: (mapPosition: IMapPosition) => void;
}

export const createMapPositionSlice: StateCreator<MapPositionSlice> = (
  set
) => ({
  currentMapPosition: null,
  setCurrentMapPosition: (currentMapPosition: IMapPosition) => {
    set({ currentMapPosition: currentMapPosition });
  },
});
