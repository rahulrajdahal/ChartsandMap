import React from "react";
import Map, {
  AttributionControl,
  FullscreenControl,
  GeolocateControl,
  Marker,
  NavigationControl,
  Popup,
  ScaleControl,
} from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";

function TaskTwo() {
  const lat = 26.449432670637346;
  const lon = 87.27721567619342;
  const mapRef = React.useRef(null);
  const [showPopup, setShowPopup] = React.useState<boolean>(true);

  return (
    <Map
      ref={mapRef}
      initialViewState={{
        longitude: lon,
        latitude: lat,
        zoom: 24,
      }}
      style={{ width: "100%", height: "100vh" }}
      mapStyle="mapbox://styles/ankur20/cklq3agbe6tc918ny8hlc7ch6"
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
    >
      <Marker
        longitude={lon}
        latitude={lat}
        anchor="bottom"
        onClick={() => {
          setShowPopup((prev) => true);
        }}
      />

      <FullscreenControl />
      <GeolocateControl />
      <ScaleControl />
      <NavigationControl />

      {showPopup && (
        <Popup
          longitude={lon}
          latitude={lat}
          anchor="top"
          onClose={() => setShowPopup((prev) => false)}
        >
          You are here
        </Popup>
      )}
    </Map>
  );
}

export default TaskTwo;

// lat and long cordinates
// latitude:26.449432670637346,longitude:87.27721567619342
