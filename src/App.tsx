import Map from "react-map-gl";
import maplibregl from "maplibre-gl";

import "maplibre-gl/dist/maplibre-gl.css";
import { useMemo } from "react";

const MAPTILER_API_KEY = import.meta.env.VITE_MAPTILER_API_KEY;

const MAPS_DEFAULT_LOCATION = {
  latitude: -22.9064,
  longitude: -47.0616,
  zoom: 6,
};

export const App = () => {
  const mapTilerMapStyle = useMemo(() => {
    return `https://api.maptiler.com/maps/basic-v2/style.json?key=${MAPTILER_API_KEY}`;
  }, []);

  return (
    <>
      <Map
        initialViewState={{
          ...MAPS_DEFAULT_LOCATION,
        }}
        style={{
          width: "100wh",
          height: "100vh",
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}
        hash
        mapLib={maplibregl}
        mapStyle={mapTilerMapStyle}
      ></Map>
    </>
  );
};
