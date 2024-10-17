import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import mapboxgl from "mapbox-gl";
import { MutableRefObject, RefObject, useEffect, useRef } from "react";

import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "mapbox-gl/dist/mapbox-gl.css";

export default function AppMap() {
  const mapContainerRef = useRef() as RefObject<HTMLDivElement>;
  const mapRef = useRef() as MutableRefObject<mapboxgl.Map>;

  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current as HTMLElement,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [85.428339, 27.672115],
      zoom: 12,
    });

    mapRef.current.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
      })
    );

    return () => mapRef.current.remove();
  }, []);

  return <div ref={mapContainerRef} className="h-full" />;
}
