import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import mapboxgl from "mapbox-gl";
import {
  ChangeEvent,
  MutableRefObject,
  RefObject,
  useCallback,
  useEffect,
  useRef,
} from "react";

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
      cooperativeGestures: true,
    });

    mapRef.current.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
      })
    );

    return () => mapRef.current.remove();
  }, []);

  const handleStyleOnClick = useCallback((event: ChangeEvent) => {
    const style = event.target.id;
    mapRef.current.setStyle(`mapbox://styles/mapbox/${style}`);
  }, []);

  const mapStyles = [
    { id: 1, title: "Streets", value: "streets-v12" },
    { id: 2, title: "Outdoors", value: "outdoors-v12" },
    { id: 3, title: "Light", value: "light-v11" },
    { id: 4, title: "Dark", value: "dark-v11" },
    { id: 5, title: "Satellite", value: "satellite-streets-v12" },
    { id: 6, title: "Day", value: "navigation-day-v1" },
    { id: 7, title: "Night", value: "navigation-night-v1" },
  ];

  return (
    <div className="relative w-full h-full">
      <div className="absolute flex gap-4 items-center top-2 bg-gray-50 z-10 py-2 px-4 rounded-md shadow-sm left-4">
        {mapStyles.map(({ id, title, value }) => (
          <fieldset key={id} className="flex gap-1 items-center">
            <input
              type="radio"
              name="rtoggle"
              value={title.toLowerCase()}
              id={value}
              onChange={handleStyleOnClick}
            />
            <label htmlFor={value}>{title}</label>
          </fieldset>
        ))}
      </div>
      <div ref={mapContainerRef} className="h-full" />
    </div>
  );
}
