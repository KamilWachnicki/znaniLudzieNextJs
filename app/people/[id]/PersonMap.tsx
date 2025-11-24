"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import L from "leaflet";


interface PersonMapProps {
    lat: number;
    lng: number;
    name: string;
    description?: string;
}

function CenterOnPerson({ lat, lng }: { lat: number; lng: number }) {
    const map = useMap();
    useEffect(() => {
        // create a bounds for a single point
        const bounds = L.latLngBounds([[lat, lng]]);
        map.fitBounds(bounds, { padding: [50, 50] });
    }, [lat, lng, map]);
    return null;
}

export default function PersonMap({ lat, lng, name, description }: PersonMapProps) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => setIsClient(true), []);

    if (!isClient) return null;

    const icon = require("leaflet/dist/images/marker-icon.png");
    const iconShadow = require("leaflet/dist/images/marker-shadow.png");

    const DefaultIcon = L.icon({
        iconUrl: icon,
        shadowUrl: iconShadow,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
    });

    L.Marker.prototype.setIcon(DefaultIcon);

    return (
        <div className="w-full h-96 mt-4">
            <MapContainer
                // initial center doesn't matter too much because CenterOnPerson will adjust it
                center={[lat, lng]}
                zoom={13}
                scrollWheelZoom={true}
                style={{ width: "100%", height: "100%" }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <CenterOnPerson lat={lat} lng={lng} />

                <Marker position={[lat, lng]}>
                    <Popup>
                        <strong>{name}</strong>
                        {description && <div>{description}</div>}
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}
