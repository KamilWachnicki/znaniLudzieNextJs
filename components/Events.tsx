"use client";

import { useState } from "react";
import EventCard from "./EventCard";
import SearchBar from "./SearchBar";

const sampleEvents = [
    {
        name: "Festiwal Kultury Regionalnej",
        startDate: "2025-06-15",
        endDate: "2025-06-17",
        description: "Trzydniowe święto kultury lokalnej z wystepami zespołów folklorystycznych, warsztatami rękodzieła i degustacją potraw regionalnych.",
        image: "/albert_einstein.jpg",
        href: "/events/festiwal-kultury"
    },
    {
        name: "Jarmark Kolbuszowski",
        startDate: "2025-07-20",
        endDate: "2025-07-20",
        description: "Tradycyjny jarmark z lokalnymi wyrobami rzemieślniczymi, produktami spożywczymi i atrakcjami dla całej rodziny.",
        image: "/albert_einstein.jpg",
        href: "/events/jarmark"
    },
    {
        name: "Koncert Letni w Parku",
        startDate: "2025-08-05",
        endDate: "2025-08-05",
        description: "Wieczorny koncert muzyki klasycznej i rozrywkowej w pięknej scenerii parku miejskiego.",
        image: "/albert_einstein.jpg",
        href: "/events/koncert-letni"
    }
];

export default function Events() {
    const [query, setQuery] = useState("");

    const filtered = sampleEvents.filter((event) =>
        event.name.toLowerCase().includes(query.toLowerCase()) ||
        event.description.toLowerCase().includes(query.toLowerCase()) ||
        event.startDate.includes(query) ||
        event.endDate.includes(query)
    );

    return (
        <div className="flex flex-col w-full p-8 gap-6">
            <SearchBar
                value={query}
                onChange={setQuery}
                placeholder="Szukaj wydarzeń..."
            />

            <div className="flex flex-col gap-6">
                {filtered.map((event) => (
                    <EventCard
                        key={event.name}
                        name={event.name}
                        startDate={event.startDate}
                        endDate={event.endDate}
                        description={event.description}
                        image={event.image}
                        href={event.href}
                    />
                ))}
            </div>
        </div>
    );
}