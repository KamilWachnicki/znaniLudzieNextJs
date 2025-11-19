"use client";

import { useState } from "react";
import PersonCard from "./personCard";

const samplePeople = [
  {
    name: "Jan Kowalski",
    category: "Naukowiec",
    description: "Pionier w dziedzinie badań regionalnych, autor wielu publikacji.",
    image: "/people/jan_kowalski.jpg",
    href: "/people/jan-kowalski"
  },
  {
    name: "Maria Nowak",
    category: "Artystka",
    description: "Znana malarka pochodząca z regionu Kolbuszowej.",
    image: "/people/maria_nowak.jpg",
    href: "/people/maria-nowak"
  }
];

export default function People() {
  const [query, setQuery] = useState("");

  const filtered = samplePeople.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase()) ||
    p.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex flex-col w-full p-8 gap-6">

      {/* Search */}
      <input
        type="text"
        placeholder="Szukaj..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="
          w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm text-black
          focus:outline-none focus:ring-2 focus:ring-blue-500
          transition-all duration-300 ease-out
          hover:shadow-md
          animate-fadeIn
        "
      />

      {/* Cards */}
      <div className="flex flex-col gap-6 animate-fadeIn">
        {filtered.map((person) => (
          <PersonCard
            key={person.name}
            name={person.name}
            category={person.category}
            description={person.description}
            image={person.image}
            href={person.href}
          />
        ))}
      </div>

    </div>
  );
}
