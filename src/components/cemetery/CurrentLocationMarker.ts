export const CurrentLocationMarker = () => {
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return 
  <>
  {position === null ? null : (
    <Marker position={position} icon={currentPositionIcon}>
      <Popup>You are here</Popup>
    </Marker>}
    
    </>
  );
};
