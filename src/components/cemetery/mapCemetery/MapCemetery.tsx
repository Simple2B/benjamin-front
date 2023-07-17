'use client';
import React, { use, useEffect, useState } from 'react';
import IconButton from '../../IconButton';
import { ICONS_NAME } from '../../constants/iconName';
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Grave } from '@/openapi';
import { davidStarIcon, currentPositionIcon } from './mapCemetery.constants';
import { calculateDistance } from './mapCemetery.utils';

export type ICoordinates = {
  lat: number;
  lng: number;
};

type IMapCemeteryProps = {
  center: ICoordinates;
  graves_coordinates: Array<Grave>;
};

export default function MapCemetery({
  center,
  graves_coordinates,
}: IMapCemeteryProps) {
  const [hasPermition, setHasPermition] = useState<boolean>(false);
  const [currentLocation, setCurrentLocation] = useState<ICoordinates | null>();

  useEffect(() => {
    navigator.permissions
      .query({
        name: 'geolocation',
      })
      .then(function (result) {
        const onLocationFetchSuccess = (position: GeolocationPosition) => {
          setHasPermition(true);
        };

        const onLocationFetchFailure = (error = {}) => {
          setHasPermition(false);
        };

        navigator.geolocation.getCurrentPosition(
          onLocationFetchSuccess,
          onLocationFetchFailure
        );

        if (result.state === 'denied') {
          onLocationFetchFailure();
        }

        // This will still work for Chrome
        result.onchange = function () {
          if (result.state === 'denied') {
            onLocationFetchFailure();
          }
        };
      });
  }, []);
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
          attribution='<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png"
        />
        {graves_coordinates.map(
          (
            {
              uuid,
              suffix,
              firstName,
              lastName,
              burialLocationLatitude,
              burialLocationLongitude,
            },
            index
          ) => (
            <Marker
              position={[
                burialLocationLatitude ?? 0,
                burialLocationLongitude ?? 0,
              ]}
              icon={davidStarIcon}
              key={index}
            >
              <Popup>
                {suffix} {firstName} {lastName}
              </Popup>
            </Marker>
          )
        )}
        <CurrentLocationMarker center={center} />
      </MapContainer>

      <div
        className="flex w-12 h-12 justify-center items-center bg-white rounded-3xl rotate-45 mb-[70px] mr-2 absolute"
        id="navigation-button"
      >
        <IconButton iconName={ICONS_NAME.navigation} className="w-5 h-5" />
      </div>
    </div>
  );
}

type ICurrentLocationMarkerProps = {
  center: ICoordinates;
};

const CurrentLocationMarker = ({ center }: ICurrentLocationMarkerProps) => {
  const [position, setPosition] = useState<ICoordinates | null>(null);

  const navigationButton = document.getElementById('navigation-button');

  const map = useMap();

  function onLocationFound(e: any) {
    const currentCoordinates: ICoordinates = e.latlng;
    const distance = calculateDistance(center, currentCoordinates);
    console.log(currentCoordinates);
    if (distance > 5) {
      setPosition(center);
      map.flyTo(center, map.getZoom());
    } else {
      setPosition(currentCoordinates);
      map.flyTo(currentCoordinates, map.getZoom());
    }
  }

  navigationButton?.addEventListener('click', () => {
    console.log('click');
    map.locate();
    map.on('locationfound', onLocationFound);
  });

  return position === null ? null : (
    <Marker position={position} icon={currentPositionIcon}>
      <Popup>You are here</Popup>
    </Marker>
  );
};
