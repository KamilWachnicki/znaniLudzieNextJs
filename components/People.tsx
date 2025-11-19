"use client";

import { useState } from "react";
import PersonCard from "./PersonCard";
import SearchBar from "./SearchBar";

const samplePeople = [
    {
        name: "Jan Kowalski",
        category: "Naukowiec",
        description: "Pionier w dziedzinie badań regionalnych, autor wielu publikacji.",
        image: "/albert_einstein.jpg",
        href: "/people/jan-kowalski"
    },
    {
        name: "Maria Nowak",
        category: "Artystka",
        description: "Znana malarka pochodząca z regionu Kolbuszowej.",
        image: "/albert_einstein.jpg",
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
            <SearchBar
                value={query}
                onChange={setQuery}
                placeholder="Szukaj..."
            />

            <div className="flex flex-col gap-6">
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