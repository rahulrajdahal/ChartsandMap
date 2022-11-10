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

/* eslint-disable import/no-webpack-loader-syntax */
import mapboxgl from "mapbox-gl";

// @ts-ignore
mapboxgl.workerClass =
  require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

function TaskTwo() {
  const [lat, setLat] = React.useState(26.449432670637346);
  const [lon, setLon] = React.useState(87.27721567619342);

  const mapRef = React.useRef(null);
  const [showPopup, setShowPopup] = React.useState<boolean>(true);

  const [viewport, setViewport] = React.useState<any>({
    latitude: 0,
    longitude: 0,
    // zoom: 1,
    transitionDuration: 100,
  });
  const [markers, setMarkers] = React.useState<any>([{ lat, lon }]);
  const [geoJson, setGeoJson] = React.useState();

  const handleLatLonOnChange = async (e: any) => {
    const { value } = e.target;
    const [lat, lon] = value.split(",");
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lon},${lat}.json?types=place%2Cpostcode%2Caddress&limit=1&access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`
      );
      const data = await response.json();
      setGeoJson((prev) => data);
      let temp: any = [];
      data.features.map((item: any) => {
        temp.push(item);
      });
      setSuggestions(temp);
    } catch (error: any) {
      alert("Error");
    }
  };
  const [suggestions, setSuggestions] = React.useState([]);

  const handleAddMarker = async (suggestion: any) => {
    setSuggestions((prev) => []);

    setLon((prev) => suggestion.geometry.coordinates[0]);
    setLat((prev) => suggestion.geometry.coordinates[1]);
    setMarkers((prev: any) => [
      ...prev,
      {
        lat: suggestion.geometry.coordinates[1],
        lon: suggestion.geometry.coordinates[0],
      },
    ]);
  };

  React.useEffect(() => {
    setViewport((prev: any) => ({
      ...viewport,
      latitude: lat,
      longitude: lon,
      // zoom: 12,
      width: "100%",
      height: "100vh",
    }));
  }, [lat, lon, viewport]);

  return (
    <>
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
        {...viewport}
      >
        {markers.map((marker: any, i: number) => (
          <Marker
            key={i}
            longitude={marker.lon}
            latitude={marker.lat}
            anchor="bottom"
          />
        ))}

        <FullscreenControl />
        <GeolocateControl ref={mapRef} />
        <ScaleControl />
        <NavigationControl />

        {/* {showPopup && (
          <Popup
            longitude={lon}
            latitude={lat}
            anchor="top"
            onClose={() => setShowPopup((prev) => false)}
          >
            You are here
          </Popup>
        )} */}
      </Map>

      <div className="absolute top-2 inline-flex items-center gap-2 self-center bg-slate-400 px-4 py-2 left-60">
        <div className="relative">
          <input
            type="text"
            placeholder="Enter LatLon or an address"
            className="p-2 rounded-xs"
            onChange={handleLatLonOnChange}
          />
          {suggestions.length > 0 && (
            <div className="absolute px-6 py-2 bg-white mt-2 rounded-sm">
              <ul>
                {suggestions.map((suggestion: any) => (
                  <li
                    key={suggestion.id}
                    className="whitespace-nowrap hover:cursor-pointer"
                    onClick={() => handleAddMarker(suggestion)}
                  >
                    <p>{suggestion.place_name}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {/* <input
          type="text"
          placeholder="Enter Longitude"
          className="p-2 rounded-xs"
        /> */}
        {/* <button
          onClick={handleAddMarker}
          className="bg-blue-800 px-4 py-2 rounded-sm text-white"
        >
          Add Marker
        </button> */}
      </div>
    </>
  );
}

export default TaskTwo;

// lat and long cordinates
// latitude:26.449432670637346,longitude:87.27721567619342
