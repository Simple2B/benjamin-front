import { Grave } from '@/openapi';

export interface ICoordinates {
  lat: number;
  lng: number;
}

export const calculateDistance = (from: ICoordinates, to: ICoordinates) => {
  const lon1 = (to.lng * Math.PI) / 180;
  const lon2 = (from.lng * Math.PI) / 180;
  const lat1 = (to.lat * Math.PI) / 180;
  const lat2 = (from.lat * Math.PI) / 180;

  let dlon = lon2 - lon1;
  let dlat = lat2 - lat1;
  let a =
    Math.pow(Math.sin(dlat / 2), 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);

  let c = 2 * Math.asin(Math.sqrt(a));

  let r = 6371;

  return c * r;
};

export const getMarksGroup = (graveCoordinates: Grave[]) => {
  const mediumLevelMarkers: Grave[] = getMediumLevelMarkers(graveCoordinates);

  const minimumLevelMarkers = mediumLevelMarkers.slice(0, 5);
  return [mediumLevelMarkers, minimumLevelMarkers, graveCoordinates];
};

const getMediumLevelMarkers = (graveCoordinates: Grave[]) => {
  const currentMonth = new Date().getMonth() + 1;

  const mediumLevelMarkers: Grave[] = graveCoordinates.reduce(
    (acc: Grave[], grave) => {
      if (acc.length < 20) {
        if (grave.isHeadstoneChanged === true) {
          acc.push(grave);
        }
      }
      return acc;
    },
    []
  );

  if (mediumLevelMarkers.length < 20) {
    graveCoordinates.forEach((grave) => {
      if (mediumLevelMarkers.length < 20) {
        const month = grave.deathDate
          ? parseInt(grave.deathDate.split('-')[1])
          : 0;
        if (grave.isHeadstoneChanged === false && month == currentMonth) {
          mediumLevelMarkers.push(grave);
        }
      }
    });
  }

  while (mediumLevelMarkers.length < 20) {
    const nextGrave = graveCoordinates[mediumLevelMarkers.length];
    if (nextGrave) {
      mediumLevelMarkers.push(nextGrave);
    } else {
      break;
    }
  }
  return mediumLevelMarkers;
};
