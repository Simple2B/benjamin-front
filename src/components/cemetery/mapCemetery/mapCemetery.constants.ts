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
  shadowUrl: '/images/icons/shadow.svg',
  iconSize: [20, 65],
  shadowSize: [40, 64],
  iconAnchor: [0, 0],
  shadowAnchor: [28, 23],
  popupAnchor: [-3, -76],
});
