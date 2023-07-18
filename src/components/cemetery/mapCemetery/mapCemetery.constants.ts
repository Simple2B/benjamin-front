import L from 'leaflet';

export const davidStarIcon = L.icon({
  iconUrl: '/images/icons/location-pin-davig-star.svg',
  shadowUrl: '',
  iconSize: [70, 135],
  shadowSize: [30, 44],
  iconAnchor: [22, 84],
  shadowAnchor: [4, 62],
  popupAnchor: [-3, -76],
});

export const currentPositionIcon = L.icon({
  iconUrl: '/images/icons/current-position-location-pin.svg',
  shadowUrl: '',
  iconSize: [20, 65],
  shadowSize: [30, 44],
  iconAnchor: [12, 84],
  shadowAnchor: [4, 62],
  popupAnchor: [-3, -76],
});
