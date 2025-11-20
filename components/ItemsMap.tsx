"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

type Item = {
    id: string;
    title: string;
    description: string;
    lat?: number;
    lng?: number;
};

type Props = {
    items: Item[];
};

export default function ItemsMap({ items }: Props) {
    return (
        <MapContainer
            center={[51.505, -0.09]}
            zoom={13}
            style={{ height: "400px", width: "100%" }}
            scrollWheelZoom={true}
        >
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {items.map(
                (item) =>
                    item.lat &&
                    item.lng && (
                        <Marker key={item.id} position={[item.lat, item.lng]}>
                            <Popup>
                                <strong>{item.title}</strong>
                                <br />
                                {item.description}
                            </Popup>
                        </Marker>
                    )
            )}
        </MapContainer>
    );
}
