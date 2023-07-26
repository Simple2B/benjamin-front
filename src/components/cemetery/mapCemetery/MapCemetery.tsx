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
  Tooltip,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Grave } from '@/openapi';
import {
  createClusterCustomIcon,
  currentSoldierIcon,
  davidStarIcon,
} from './mapCemetery.constants';
import { calculateDistance } from './mapCemetery.utils';
import { MAP_ACCESS_TOKEN } from '@/components/constants/constants';
import { useRouter } from 'next/navigation';
import { PATH } from '@/components/constants/path.constants';
import urlJoin from 'url-join';
import { useAppStore } from '@/lib/slices/store';
import L from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';

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
  soldierUuid?: string;
  isTerrianView: boolean;
};

export default function MapCemetery({
  center,
  graves_coordinates,
  cemeteryUuid,
  zoom,
  soldierUuid,
  isTerrianView,
}: IMapCemeteryProps) {
  const [hasPermition, setHasPermition] = useState<boolean>(false);
  const [isTerrian, setIsTerrian] = useState<boolean>(isTerrianView);
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
          <MarkerClusterGroup
            chunkedLoading
            iconCreateFunction={createClusterCustomIcon}
            spiderfyOnMaxZoom={true}
            polygonOptions={{
              fillColor: 'none',
              color: 'none',
              weight: 1,
              opacity: 1,
              fillOpacity: 0.8,
            }}
          >
            {graves_coordinates.map(
              (
                {
                  uuid,
                  burialLocationLatitude,
                  burialLocationLongitude,
                  suffix,
                  firstName,
                  lastName,
                  ranks,
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
                      isTerrian: isTerrian,
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
                    icon={
                      soldierUuid == uuid ? currentSoldierIcon : davidStarIcon
                    }
                    key={index}
                    eventHandlers={eventHandlers}
                  >
                    <Tooltip
                      direction="right"
                      opacity={1}
                      offset={[20, -20]}
                      className="myCSSClass"
                      permanent
                    >
                      <p className="font-noto map-text-shadow ">
                        {ranks.map((rank) => rank.abbreviation).join(' ')}{' '}
                        {firstName} {lastName} {suffix}
                      </p>
                    </Tooltip>
                  </Marker>
                );
              }
            )}
          </MarkerClusterGroup>
          <CurrentLocationMarker
            center={center}
            compass={compass}
            isTerrian={isTerrian}
          />
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
  isTerrian: boolean;
};

const CurrentLocationMarker = ({
  center,
  compass,
  isTerrian,
}: ICurrentLocationMarkerProps) => {
  const [position, setPosition] = useState<ICoordinates | null>(null);

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
        isTerrian: isTerrian,
      });
    },
    dragend(e) {
      const currentLocation = e.target.getCenter();
      const currentZoom = currentMapPosition?.zoom ?? 13;

      setCurrentMapPosition({
        zoom: currentZoom,
        latlng: currentLocation,
        isTerrian: isTerrian,
      });
    },
    click(e) {
      const currentLocation = e.target.getCenter();
      const currentZoom = currentMapPosition?.zoom ?? 13;

      setCurrentMapPosition({
        zoom: currentZoom,
        latlng: currentLocation,
        isTerrian: isTerrian,
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

  const iconSettings = {
    mapIconUrl: `<svg
      width="40px"
      height="40px"
      viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg"
      id="navigator"
      transform="rotate(${compass})"
    >     
      <image href="/images/icons/group4.svg" width="40" height="40" />
    </svg>`,
  };

  const svgIcon = L.divIcon({
    html: L.Util.template(iconSettings.mapIconUrl, iconSettings),
    className: '',
    iconSize: [40, 40],
    iconAnchor: [40, 40],
  });

  return position === null ? null : (
    <Marker position={position} icon={svgIcon}></Marker>
  );
};
