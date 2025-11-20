"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { JSX } from "react";

export type MapItem = {
    id: string;
    title: string;
    description: string;
    lat?: number;
    lng?: number;
};

type Props = {
    items: MapItem[];
};

export default function ItemsMap({ items }: Props): JSX.Element {
    const markerPositions = items
        .filter((it) => typeof it.lat === "number" && typeof it.lng === "number")
        .map((it) => [it.lat as number, it.lng as number] as [number, number]);

    const center: [number, number] = markerPositions.length
        ? markerPositions[0]
        : [20, 0];

    return (
        <div className="h-80 rounded-md overflow-hidden border">
            <MapContainer center={center} zoom={markerPositions.length ? 13 : 2} style={{ height: "100%", width: "100%" }}>
                <TileLayer
                    attribution='&copy; OpenStreetMap'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {items.map(
                    (it) =>
                        typeof it.lat === "number" &&
                        typeof it.lng === "number" && (
                            <Marker key={it.id} position={[it.lat, it.lng]}>
                                <Popup>
                                    <strong className="text-black">{it.title}</strong>
                                    <div className="text-black text-sm">{it.description}</div>
                                </Popup>
                            </Marker>
                        )
                )}
            </MapContainer>
        </div>
    );
}