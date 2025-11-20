"use client";

import React, { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import LoadLeaflet from "./LoadLeaflet";

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

const ItemsMap = dynamic(() => import("./ItemsMap"), { ssr: false });

export default function FrontPage() {
  const categories: Category[] = [
    { id: "all", name: "Wszystko" },
    { id: "stories", name: "Historie" },
    { id: "places", name: "Miejsca" },
    { id: "news", name: "Aktualności" },
  ];

  const items: Item[] = [
    {
      id: "1",
      title: "Pierwsza legenda o ławce",
      description: "Opowieść o początku projektu oraz pierwsze notatki.",
      lat: 51.505,
      lng: -0.09,
      categoryId: "stories",
    },
    {
      id: "2",
      title: "Stary rynek",
      description: "Historyczne miejsce targowe, obecnie park.",
      lat: 51.51,
      lng: -0.1,
      categoryId: "places",
    },
    {
      id: "3",
      title: "Nowo dodane: Wersja 1.2",
      description: "Ostatnio dodane informacje dla społeczności.",
      categoryId: "news",
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [query, setQuery] = useState("");

  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((it) => {
      if (selectedCategory !== "all" && it.categoryId !== selectedCategory)
        return false;
      if (!q) return true;
      return (
        it.title.toLowerCase().includes(q) ||
        it.description.toLowerCase().includes(q)
      );
    });
  }, [selectedCategory, query]);

  return (
    <div className="p-6 font-sans text-black">
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
