"use client";

import { useState, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";
import LoadLeaflet from "./LoadLeaflet";

type Item = {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  lat?: number;
  lng?: number;
  category: "people" | "events";
};

const ItemsMap = dynamic(() => import("./ItemsMap"), { ssr: false });

export default function FrontPage() {
  const categories = [
    { id: "all", name: "Wszystko" },
    { id: "people", name: "Ludzie" },
    { id: "events", name: "Wydarzenia" },
  ];

  const [items, setItems] = useState<Item[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [peopleRes, eventsRes] = await Promise.all([
          fetch("/api/people/get"),
          fetch("/api/events/get"),
        ]);
        const peopleData = await peopleRes.json();
        const eventsData = await eventsRes.json();

        const formattedPeople: Item[] = peopleData.map((p: any) => ({
          id: `person-${p.id}`,
          name: p.name,
          description: p.shortDescription,
          lat: p.lat,
          lng: p.lng,
          category: "people",
        }));

        const formattedEvents: Item[] = eventsData.map((e: any) => ({
          id: `event-${e.id}`,
          name: e.name,
          description: e.shortDescription,
          lat: e.lat,
          lng: e.lng,
          category: "events",
        }));

        setItems([...formattedPeople, ...formattedEvents]);
      } catch (err) {
        console.error("Failed to fetch data", err);
      }
    };
    fetchData();
  }, []);

  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      if (selectedCategory !== "all" && item.category !== selectedCategory)
        return false;
      if (!q) return true;
      return item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q);
    });
  }, [items, selectedCategory, query]);

  return (
    <div className="p-6 font-sans text-black min-h-screen">
      <LoadLeaflet />

      <h1 className="text-3xl font-bold mb-4 text-black">Znani Ludzie</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-black">Cel projektu</h2>
        <p className="text-gray-700 mb-4">
          Projekt powstał, aby zachować i udostępniać lokalne historie, miejsca
          - wszystko w jednym miejscu, powiązane z interaktywną mapą.
        </p>

        <h2 className="text-xl font-semibold mb-2 text-black">Kto go tworzy</h2>
        <p className="text-gray-700 mb-4">
          Strona rozwijana jest przez osoby, które chcą zwiększyć widoczność
          lokalnego dziedzictwa i umożliwić łatwe odkrywanie ciekawych osób oraz
          miejsc.
        </p>

        <h2 className="text-xl font-semibold mb-2 text-black">Aktualności</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>Ostatnio dodane historie i wpisy</li>
          <li>Nowe miejsca na mapie</li>
          <li>Zmiany zgłaszane przez mieszkańców</li>
        </ul>
      </section>

      <section className="mb-6 flex flex-wrap items-center gap-4">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 border rounded-md bg-white text-sm text-black"
        >
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <input
          type="search"
          placeholder="Szukaj..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 min-w-[220px] max-w-lg px-3 py-2 border rounded-md text-sm text-black"
        />
      </section>

      <section className="w-full mt-6">
        <h3 className="text-lg font-semibold mb-2 text-black">Mapa</h3>
        <ItemsMap items={filteredItems} />
      </section>
    </div>
  );
}
