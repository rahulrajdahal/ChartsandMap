import React from "react";
import Map, {
  FullscreenControl,
  GeolocateControl,
  MapRef,
  Marker,
  NavigationControl,
  ScaleControl,
} from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";

/* eslint-disable import/no-webpack-loader-syntax */
import mapboxgl from "mapbox-gl";

// @ts-ignore
mapboxgl.workerClass =
  require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

function TaskTwo() {
  // store latitude and longitude in state
  const [lat, setLat] = React.useState(26.449432670637346);
  const [lon, setLon] = React.useState(87.27721567619342);

  // reference the map container
  const mapRef = React.useRef<MapRef>() as any;

  /**
   * @description This function is used to update the suggestions based on the input
   * @param e = event object triggered by the latlong input change
   */
  const handleLatLonOnChange = async (e: any) => {
    const { value } = e.target;
    const [lat, lon] = value.split(",");
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lon},${lat}.json?country=np&types=address%2Cregion%2Cpostcode%2Ccountry%2Cdistrict%2Clocality%2Cplace%2Cneighborhood%2Cpoi&access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`
      );
      const data = await response.json();
      let temp: any = [];
      data.features.map((item: any) => {
        temp.push(item);
      });
      setSuggestions(temp);
    } catch (error: any) {
      alert("Error");
    }
  };

  // store the suggestions in state
  const [suggestions, setSuggestions] = React.useState([]);

  /**
   * @description This function is used to add a marker on the map
   * @param suggestion - suggestion object returned from mapbox api
   */
  const handleAddMarker = async (suggestion: any) => {
    setSuggestions((prev) => []);

    setLat((prev) => suggestion.center[1]);
    setLon((prev) => suggestion.center[0]);

    mapRef.current?.flyTo({
      center: [suggestion.center[0], suggestion.center[1]],
      duration: 2000,
    });
  };

  /**
   * @description Renders the UI for LatLong Input
   * @returns {JSX.Element}
   */
  const renderInput = () => (
    <div
      className="absolute top-[6.25rem] inline-flex items-center gap-2 self-center bg-slate-400 px-4 py-2 
  md:top-0 md:left-60 
  "
    >
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
    </div>
  );
  const initialViewState = {
    latitude: lat,
    longitude: lon,
    zoom: 18,
    bearing: 0,
    pitch: 0,
  };
  return (
    <>
      <Map
        ref={mapRef}
        reuseMaps
        initialViewState={initialViewState}
        style={{ width: "100%", height: "100vh" }}
        mapStyle="mapbox://styles/ankur20/cklq3agbe6tc918ny8hlc7ch6"
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      >
        <Marker longitude={lon} latitude={lat} anchor="bottom" />

        <FullscreenControl />
        <GeolocateControl ref={mapRef} />
        <ScaleControl />
        <NavigationControl />
      </Map>

      {renderInput()}
    </>
  );
}

export default TaskTwo;
