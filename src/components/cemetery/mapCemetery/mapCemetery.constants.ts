import L from 'leaflet';
import { MarkerCluster } from 'leaflet';

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
  shadowSize: [40, 64],
  iconAnchor: [0, 0],
  shadowAnchor: [28, 23],
  popupAnchor: [-3, -76],
});

export const currentSoldierIcon = L.icon({
  iconUrl: '/images/icons/location-pin-current-soldier.svg',
  shadowUrl: '',
  iconSize: [70, 135],
  shadowSize: [30, 44],
  iconAnchor: [22, 84],
  shadowAnchor: [4, 62],
  popupAnchor: [-3, -76],
});

export const createClusterCustomIcon = function (cluster: MarkerCluster) {
  return L.divIcon({
    html: `<svg
    width="80px"
    height="80px"
    viewBox="0 0 80 80"
    xmlns="http://www.w3.org/2000/svg"  
  >
    <image href="/images/icons/location-pin-davig-star.svg" width="80" height="80" />
  </svg>`,
    className: '',
    iconSize: L.point(60, 60, true),
  });
};
