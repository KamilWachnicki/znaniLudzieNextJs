"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import SearchBar from "./SearchBar";
import Button from "./Button";
import QRCard from "./QrCard";

type Item = {
    id: string;
    name: string;
    shortDescription: string;
    description: string;
    category: "people" | "events";
    image: string;
    startDate?: string;
    endDate?: string;
};

const categories = [
    { id: "people", name: "Ludzie" },
    { id: "events", name: "Wydarzenia" },
];

export default function QrCodeGenerator() {
    const [selectedCategory, setSelectedCategory] = useState("people");
    const [query, setQuery] = useState("");
    const [selectedItem, setSelectedItem] = useState<string | null>(null);
    const [items, setItems] = useState<Item[]>([]);
    const router = useRouter();

    // Fetch JSON data when component mounts or category changes
    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = selectedCategory === "people" ? "/api/people/get" : "/api/events/get";
                const res = await fetch(url);
                const data: Item[] = await res.json();
                setItems(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [selectedCategory]);

    const filteredItems = useMemo(() => {
        const q = query.trim().toLowerCase();
        return items.filter((item) => {
            if (!q) return true;
            return (
                item.name.toLowerCase().includes(q) ||
                item.shortDescription.toLowerCase().includes(q)
            );
        });
    }, [items, query]);

    const handleSelect = (id: string) => {
        setSelectedItem(id);
    };

    const handleGenerateQr = () => {
        if (!selectedItem) return;
        router.push(`/generatedQrCode?id=${selectedItem}&category=${selectedCategory}`);
    };

    return (
        <div className="p-6 font-sans min-h-screen flex flex-col gap-6 w-full">
            <h1 className="text-3xl font-bold text-black mb-4">Generator QR Kodów</h1>

            {/* Sticky Filters */}
            <div className="sticky top-0 z-10 bg-gray-50 p-4 flex flex-wrap items-center gap-4 shadow-md rounded-md w-full">
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-2 border rounded-md bg-white text-black text-sm"
                >
                    {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                            {c.name}
                        </option>
                    ))}
                </select>

                <SearchBar value={query} onChange={setQuery} placeholder="Szukaj..." />
            </div>

            {/* Cards */}
            <div className="flex flex-col gap-6 w-full">
                {filteredItems.map((item) => (
                    <QRCard
                        key={item.id}
                        id={item.id}
                        title={item.name}
                        description={item.shortDescription}
                        category={item.category === "people" ? "Ludzie" : undefined}
                        startDate={item.startDate}
                        endDate={item.endDate}
                        image={item.image}
                        onClick={() => handleSelect(item.id)}
                    />
                ))}
            </div>

            <div className="flex justify-center mt-6 w-full">
                <Button type="button" onClick={handleGenerateQr}>
                    Generuj QR Code
                </Button>
            </div>
        </div>
    );
}
