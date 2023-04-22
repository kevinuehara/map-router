import Map, { Layer, Marker, Source, useMap } from "react-map-gl";
import maplibregl from "maplibre-gl";

import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useMemo, useState } from "react";
import { Loader } from "google-maps";
import polyline from "@mapbox/polyline";
import { GeocoderForm } from "./components/GeocoderForm";
import { GeocoderResult } from "./components/types";
import { Infobox } from "./components/Infobox";
import { Modal } from "./components/Modal";
import { pinIconMap } from "./components/icons";

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const MAPTILER_API_KEY = import.meta.env.VITE_MAPTILER_API_KEY;

const loader = new Loader(GOOGLE_API_KEY);
const google = await loader.load();
const directionsService = new google.maps.DirectionsService();

const MAPS_DEFAULT_LOCATION = {
  latitude: -22.9064,
  longitude: -47.0616,
  zoom: 6,
};

export const App = () => {
  const [originLat, setOriginLat] = useState<number>();
  const [originLng, setOriginLng] = useState<number>();

  const [destinyLat, setDestinyLat] = useState<number>();
  const [destinyLng, setDestinyLng] = useState<number>();

  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  const [modal, setModal] = useState(google.maps.TravelMode.DRIVING);

  const [route, setRoute] = useState<any>();

  const { map } = useMap();

  useEffect(() => {
    if (destinyLat && destinyLng && originLat && originLng) {
      const start = new google.maps.LatLng(originLat, originLng);
      const end = new google.maps.LatLng(destinyLat, destinyLng);
      var request = {
        origin: start,
        destination: end,
        travelMode: modal,
      };

      directionsService.route(request, function (result, status) {
        if (status == "OK") {
          setDuration(result.routes[0].legs[0].duration.text);
          setDistance(result.routes[0].legs[0].distance.text);
          setRoute(polyline.toGeoJSON(result.routes[0].overview_polyline));
        }
      });
    }
  }, [destinyLat, destinyLng, originLat, originLng, modal]);

  const mapTilerMapStyle = useMemo(() => {
    return `https://api.maptiler.com/maps/basic-v2/style.json?key=${MAPTILER_API_KEY}`;
  }, []);

  const onOriginSelected = (value: GeocoderResult | undefined) => {
    setOriginLat(value ? parseFloat(value.lat) : undefined);
    setOriginLng(value ? parseFloat(value.lon) : undefined);

    if (!value) {
      setRoute(undefined);
    }
  };

  const onDestinySelected = (value: GeocoderResult | undefined) => {
    setDestinyLat(value ? parseFloat(value.lat) : undefined);
    setDestinyLng(value ? parseFloat(value.lon) : undefined);

    if (!value) {
      setRoute(undefined);
    }
  };

  const onModalSelect = (event: any) => {
    setModal(event.target.value);
  };

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
      >
        {originLat && originLng && (
          <Marker longitude={originLng} latitude={originLat} anchor="bottom">
            {pinIconMap()}
          </Marker>
        )}

        {destinyLat && destinyLng && (
          <Marker longitude={destinyLng} latitude={destinyLat} anchor="bottom">
            {pinIconMap()}
          </Marker>
        )}

        {route && (
          <>
            <Source id="polylineLayer" type="geojson" data={route}>
              <Layer
                id="lineLayer"
                type="line"
                source="my-data"
                layout={{
                  "line-join": "round",
                  "line-cap": "round",
                }}
                paint={{
                  "line-color": "rgba(3, 170, 238, 0.5)",
                  "line-width": 5,
                }}
              />
            </Source>
            <Infobox duration={duration} distance={distance} />
          </>
        )}
      </Map>
      <div className="">
        <GeocoderForm
          onOriginSelectEvent={onOriginSelected}
          onDestinySelectEvent={onDestinySelected}
        />
        <Modal onModalSelect={onModalSelect} />
      </div>
    </>
  );
};
