'use client';
import React, { useState } from 'react';
import IconButton from '../IconButton';
import { ICONS_NAME } from '../constants/iconName';
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import * as L from 'leaflet';

export type ICoordinates = {
  lat: number;
  lng: number;
};

type IMapCemeteryProps = {
  center: ICoordinates;
  markers: ICoordinates[];
};

const davidStarIcon = L.icon({
  iconUrl: '/images/icons/location-pin-davig-star.svg',
  shadowUrl: '',
  iconSize: [20, 65],
  shadowSize: [30, 44],
  iconAnchor: [12, 84],
  shadowAnchor: [4, 62],
  popupAnchor: [-3, -76],
});

const currentPositionIcon = L.icon({
  iconUrl: '/images/icons/current-position-location-pin.svg',
  shadowUrl: '',
  iconSize: [20, 65],
  shadowSize: [30, 44],
  iconAnchor: [12, 84],
  shadowAnchor: [4, 62],
  popupAnchor: [-3, -76],
});

export default function MapCemetery({ center, markers }: IMapCemeteryProps) {
  return (
    <div
      className={`w-full absolute flex justify-end items-end t-0 l-0 h-[calc(100vh-175px)]`}
    >
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={13}
        scrollWheelZoom={true}
        zoomControl={false}
        style={{ height: '100%', width: '100%', zIndex: 0 }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((marker, index) => (
          <Marker
            position={[marker.lat, marker.lng]}
            icon={davidStarIcon}
            key={index}
          >
            <Popup>Marker</Popup>
          </Marker>
        ))}
        <CurrentLocationMarker />
      </MapContainer>

      <div className="flex w-12 h-12 justify-center items-center bg-white rounded-3xl rotate-45 mb-[22px] mr-2 absolute">
        <IconButton iconName={ICONS_NAME.navigation} className="w-5 h-5" />
      </div>
    </div>
  );
}

const CurrentLocationMarker = () => {
  const [position, setPosition] = useState<ICoordinates | null>(null);
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <Marker position={position} icon={currentPositionIcon}>
      <Popup>You are here</Popup>
    </Marker>
  );
};
