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