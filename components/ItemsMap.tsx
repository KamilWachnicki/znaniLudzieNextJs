"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import L from "leaflet";

type Item = {
  id: string;
  name: string;
  description: string;
  lat?: number;
  lng?: number;
  category: "people" | "events";
};

type ItemsMapProps = {
  items: Item[];
};

function AutoFitBounds({ items }: { items: Item[] }) {
  const map = useMap();

  useEffect(() => {
    const positions = items
      .filter((item) => item.lat !== undefined && item.lng !== undefined)
      .map((item) => [item.lat!, item.lng!] as [number, number]);

    if (positions.length > 0) {
      const bounds = L.latLngBounds(positions);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [items, map]);

  return null;
}

export default function ItemsMap({ items }: ItemsMapProps) {
  const [isClient, setIsClient] = useState(false);

  // ensure client-side rendering only
  useEffect(() => setIsClient(true), []);

  if (!isClient) return null;

  return (
    <MapContainer
      center={[52.0, 19.0]} // default to Poland
      zoom={6}
      scrollWheelZoom={true}
      style={{ width: "100%", height: "400px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <AutoFitBounds items={items} />

      {items
        .filter((item) => item.lat !== undefined && item.lng !== undefined)
        .map((item) => (
          <Marker key={item.id} position={[item.lat!, item.lng!]}>
            <Popup>
              <strong>{item.name}</strong>
              <br />
              {item.description}
              <br />
              <em>{item.category === "people" ? "Osoba" : "Wydarzenie"}</em>
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  );
}
