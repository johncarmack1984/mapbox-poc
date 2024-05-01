"use client";

import { cn } from "@/lib/utils";
import "mapbox-gl/dist/mapbox-gl.css";
import classes from "./map.module.css";
import Image from "next/image";
import * as React from "react";
import { useState, useMemo } from "react";
import { env } from "@/env";
import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from "react-map-gl";

import ControlPanel from "./control-panel";
import Pin from "./pin";

import CITIES, { type City } from "./cities";

const TOKEN = env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN; // Set your mapbox token here

export default function MapComponent() {
  const [popupInfo, setPopupInfo] = useState<City | null>(null);

  const pins = useMemo(
    () =>
      CITIES.map((city, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={city.longitude}
          latitude={city.latitude}
          anchor="bottom"
          onClick={(e) => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            e.originalEvent.stopPropagation();
            setPopupInfo(city);
          }}
        >
          <Pin />
        </Marker>
      )),
    []
  );

  return (
    <main className={cn(classes.mainStyle)}>
      <Map
        initialViewState={{
          latitude: 40,
          longitude: -100,
          zoom: 3.5,
          bearing: 0,
          pitch: 0,
        }}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        // style={classes.mapStyle}
        mapboxAccessToken={TOKEN}
      >
        <GeolocateControl position="top-left" />
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
        <ScaleControl />

        {pins}

        {popupInfo && (
          <Popup
            anchor="top"
            longitude={Number(popupInfo.longitude)}
            latitude={Number(popupInfo.latitude)}
            onClose={() => setPopupInfo(null)}
          >
            <div>
              {popupInfo.city}, {popupInfo.state} |{" "}
              <a
                target="_new"
                href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=${popupInfo.city}, ${popupInfo.state}`}
              >
                Wikipedia
              </a>
            </div>
            <Image alt={popupInfo.city} src={popupInfo.image} />
          </Popup>
        )}
      </Map>

      <ControlPanel />
    </main>
  );
}
