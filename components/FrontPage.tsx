"use client";

import  "./LoadLeaflet"
import React, { JSX, useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';


type Item = {
    id: string;
    title: string;
    description: string;
    lat?: number;
    lng?: number;
    categoryId: string;
};

type Category = {
    id: string;
    name: string;
};

export default function FrontPage(): JSX.Element {
    const categories: Category[] = [
        { id: "all", name: "All" },
        { id: "stories", name: "Stories" },
        { id: "places", name: "Places" },
        { id: "news", name: "News" },
    ];

    const items: Item[] = [
        {
            id: "1",
            title: "The first Lawka tale",
            description: "Origin story and early notes.",
            lat: 51.505,
            lng: -0.09,
            categoryId: "stories",
        },
        {
            id: "2",
            title: "Old market place",
            description: "Historical market location, now a park.",
            lat: 51.51,
            lng: -0.1,
            categoryId: "places",
        },
        {
            id: "3",
            title: "Release v1.2",
            description: "Added search and map features.",
            categoryId: "news",
        },
    ];

    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [query, setQuery] = useState<string>("");

    const filteredItems = useMemo(() => {
        const q = query.trim().toLowerCase();
        return items.filter((it) => {
            if (selectedCategory !== "all" && it.categoryId !== selectedCategory) {
                return false;
            }
            if (!q) return true;
            return (
                it.title.toLowerCase().includes(q) ||
                it.description.toLowerCase().includes(q)
            );
        });
    }, [items, selectedCategory, query]);

    const markerPositions = filteredItems
        .filter((it) => typeof it.lat === "number" && typeof it.lng === "number")
        .map((it) => [it.lat as number, it.lng as number] as [number, number]);

    const center: [number, number] = markerPositions.length
        ? markerPositions[0]
        : [20, 0];

    return (
        <div className="p-6 font-sans">
            <h1 className="text-3xl font-bold mb-4">Lawka-Legend</h1>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Why this project exists</h2>
                <p className="text-gray-700 mb-4">
                    Lawka-Legend was created to preserve and share local legends, places,
                    and recent updates in a single, searchable map and content portal.
                </p>

                <h2 className="text-xl font-semibold mb-2">Who made it and why</h2>
                <p className="text-gray-700 mb-4">
                    Built by contributors who care about cultural heritage and
                    discoverability. The project aims to make stories easy to find and
                    place them on a map so context is preserved.
                </p>

                <h2 className="text-xl font-semibold mb-2">Latest changes</h2>
                <ul className="list-disc list-inside text-gray-700">
                    <li>Search-only filter across titles and descriptions</li>
                    <li>Category dropdown to narrow results</li>
                    <li>Interactive Leaflet map showing filtered items</li>
                </ul>
            </section>

            <section className="mb-6 flex flex-wrap items-center gap-4">
                <label htmlFor="category-select" className="sr-only">
                    Category
                </label>
                <select
                    id="category-select"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-2 border rounded-md bg-white text-sm"
                >
                    {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                            {c.name}
                        </option>
                    ))}
                </select>

                <input
                    type="search"
                    aria-label="Search items"
                    placeholder="Search by title or description..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-1 min-w-[220px] max-w-lg px-3 py-2 border rounded-md text-sm"
                />
            </section>

            <section className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">
                        Results <span className="text-gray-600">({filteredItems.length})</span>
                    </h3>
                    {filteredItems.length === 0 && <p className="text-gray-600">No items match your search.</p>}
                    <ul className="space-y-3 mt-3">
                        {filteredItems.map((it) => (
                            <li key={it.id} className="border rounded-md p-3 bg-white shadow-sm">
                                <strong className="block text-sm font-semibold">{it.title}</strong>
                                <div className="text-gray-600 text-sm">{it.description}</div>
                                <div className="text-gray-500 text-xs mt-2">
                                    Category: {categories.find((c) => c.id === it.categoryId)?.name}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex-1 min-h-[320px]">
                    <h3 className="text-lg font-semibold mb-2">Map</h3>
                    <div className="h-80 rounded-md overflow-hidden border">
                        <MapContainer
                            center={center}
                            zoom={markerPositions.length ? 13 : 2}
                            style={{ height: "100%", width: "100%" }}
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            {filteredItems.map(
                                (it) =>
                                    typeof it.lat === "number" &&
                                    typeof it.lng === "number" && (
                                        <Marker key={it.id} position={[it.lat, it.lng]}>
                                            <Popup>
                                                <strong>{it.title}</strong>
                                                <div className="text-sm">{it.description}</div>
                                            </Popup>
                                        </Marker>
                                    )
                            )}
                        </MapContainer>
                    </div>
                </div>
            </section>
        </div>
    );
}