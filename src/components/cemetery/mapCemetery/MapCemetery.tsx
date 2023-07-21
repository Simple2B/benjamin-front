'use client';
import React, { useEffect, useState } from 'react';
import IconButton from '../../IconButton';
import { ICONS_NAME } from '../../constants/iconName';
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Grave } from '@/openapi';
import { davidStarIcon } from './mapCemetery.constants';
import { calculateDistance, createIcon } from './mapCemetery.utils';
import { MAP_ACCESS_TOKEN } from '@/components/constants/constants';
import { useRouter } from 'next/navigation';
import { PATH } from '@/components/constants/path.constants';
import urlJoin from 'url-join';
import { useAppStore } from '@/lib/slices/store';

interface DeviceOrientationEventiOS extends DeviceOrientationEvent {
  requestPermission?: () => Promise<'granted' | 'denied'>;
}

export type ICoordinates = {
  lat: number;
  lng: number;
};

type IMapCemeteryProps = {
  center: ICoordinates;
  graves_coordinates: Array<Grave>;
  cemeteryUuid: string;
  zoom: number;
};

export default function MapCemetery({
  center,
  graves_coordinates,
  cemeteryUuid,
  zoom,
}: IMapCemeteryProps) {
  const [hasPermition, setHasPermition] = useState<boolean>(false);
  const [isTerrian, setIsTerrian] = useState<boolean>(true);
  const [compass, setCompass] = useState<number>(0);

  const router = useRouter();

  const { setCurrentMapPosition, currentMapPosition } = useAppStore();

  function handler(e: any) {
    const compass = e.webkitCompassHeading || Math.abs(e.alpha - 360);
    setCompass(compass);
  }

  useEffect(() => {
    if (
      typeof (DeviceOrientationEvent as unknown as DeviceOrientationEventiOS)
        .requestPermission === 'function'
    ) {
      (DeviceMotionEvent as any)
        .requestPermission()
        .then((permissionState: 'granted' | 'denied') => {
          if (permissionState === 'granted') {
            window.addEventListener('deviceorientation', handler, true);
          }
        })
        .catch(console.error);
    } else {
      window.addEventListener('deviceorientationabsolute', handler, true);
    }

    // start navigation
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

  const handleChangeView = () => {
    setIsTerrian(!isTerrian);
  };

  return (
    <>
      <div
        className={`w-full absolute flex justify-end items-end t-0 l-0 h-screen`}
      >
        <MapContainer
          center={[center.lat, center.lng]}
          zoom={zoom}
          scrollWheelZoom={true}
          zoomControl={false}
          style={{ height: '100%', width: '100%', zIndex: 0 }}
        >
          {isTerrian ? (
            <TileLayer
              attribution={
                'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
              }
              url={`https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}`}
            />
          ) : (
            <TileLayer
              attribution={
                '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              }
              url={`https://{s}.tile.jawg.io/jawg-sunny/{z}/{x}/{y}{r}.png?access-token=${MAP_ACCESS_TOKEN}`}
            />
          )}
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
            ) => {
              const eventHandlers = {
                click: () => {
                  setCurrentMapPosition({
                    zoom: zoom,
                    latlng: currentMapPosition?.latlng ?? {
                      lat: burialLocationLatitude ?? 0,
                      lng: burialLocationLongitude ?? 0,
                    },
                  });
                  router.push(
                    urlJoin(PATH.cemetery, cemeteryUuid, PATH.soldier, uuid)
                  );
                },
              };
              return (
                <Marker
                  position={[
                    burialLocationLatitude ?? 0,
                    burialLocationLongitude ?? 0,
                  ]}
                  icon={davidStarIcon}
                  key={index}
                  eventHandlers={eventHandlers}
                ></Marker>
              );
            }
          )}
          <CurrentLocationMarker center={center} compass={compass} />
        </MapContainer>
        <>
          <div
            className="flex w-10 h-10 justify-center items-center bg-[#EDF8FB] rounded-3xl mb-[305px] mr-2 absolute"
            id="navigation-button"
          >
            <IconButton iconName={ICONS_NAME.navigation} className="w-5 h-5" />
          </div>

          {isTerrian ? (
            <div
              className="flex w-10 h-10 justify-center items-center bg-[#EDF8FB] rounded-3xl mb-[250px] mr-2 absolute"
              onClick={handleChangeView}
            >
              <IconButton iconName={ICONS_NAME.globe} className="w-5 h-5" />
            </div>
          ) : (
            <div
              className="flex w-10 h-10 justify-center items-center bg-[#EDF8FB] rounded-3xl mb-[250px] mr-2 absolute"
              onClick={handleChangeView}
            >
              <IconButton iconName={ICONS_NAME.map} className="w-5 h-5" />
            </div>
          )}
        </>
      </div>
    </>
  );
}

type ICurrentLocationMarkerProps = {
  center: ICoordinates;
  compass: number;
};

const CurrentLocationMarker = ({
  center,
  compass,
}: ICurrentLocationMarkerProps) => {
  const [position, setPosition] = useState<ICoordinates | null>(null);
  const [iconUrl, setIconURL] = useState<string>('/images/icons/399308.png');

  const { setCurrentMapPosition, currentMapPosition } = useAppStore();

  const navigationButton = document.getElementById('navigation-button');

  const map = useMap();

  useMapEvents({
    zoomend(e) {
      const currentZoom = map.getZoom();
      const currentLocation = e.target.getCenter();
      setCurrentMapPosition({
        zoom: currentZoom,
        latlng: currentLocation,
      });
    },
    dragend(e) {
      const currentLocation = e.target.getCenter();
      const currentZoom = currentMapPosition?.zoom ?? 13;

      setCurrentMapPosition({
        zoom: currentZoom,
        latlng: currentLocation,
      });
    },
    click(e) {
      const currentLocation = e.target.getCenter();
      const currentZoom = currentMapPosition?.zoom ?? 13;

      setCurrentMapPosition({
        zoom: currentZoom,
        latlng: currentLocation,
      });
    },
  });

  function onLocationFound(e: any) {
    const currentCoordinates: ICoordinates = e.latlng;
    const distance = calculateDistance(center, currentCoordinates);

    if (distance > 5) {
      setPosition(null);
      map.flyTo(center, map.getZoom());
    } else {
      setPosition(currentCoordinates);
      map.flyTo(currentCoordinates, map.getZoom());
    }
  }

  navigationButton?.addEventListener('click', () => {
    map.locate();
    map.on('locationfound', onLocationFound);
  });

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

  const image = new Image();
  image.src = '/images/icons/399308.png';

  image.onload = () => {
    canvas.width = 25;
    canvas.height = 25;

    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(compass * (Math.PI / 180));
    ctx.translate(-(canvas.width / 2), -(canvas.height / 2));
    ctx.drawImage(image, 0, 0, 25, 25);
    ctx?.restore();

    setIconURL(canvas.toDataURL());
  };

  return position === null ? null : (
    <Marker position={position} icon={createIcon(iconUrl)}></Marker>
  );
};
