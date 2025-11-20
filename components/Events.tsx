"use client";

import { useState, useEffect } from "react";
import EventCard from "./EventCard";
import SearchBar from "./SearchBar";

export default function Events() {
  const [query, setQuery] = useState("");
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("/events.json");
        if (!res.ok) throw new Error("Failed to fetch events data");
        const data = await res.json();
        setEvents(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const filtered = (events || []).filter(
    (event) =>
      event.name?.toLowerCase().includes(query.toLowerCase()) ||
      event.description?.toLowerCase().includes(query.toLowerCase()) ||
      event.startDate?.includes(query) ||
      event.endDate?.includes(query)
  );

  if (loading) {
    return <p className="p-8 text-gray-700">Ładowanie wydarzeń...</p>;
  }

  return (
    <div className="flex flex-col w-full p-8 gap-6">
      <SearchBar value={query} onChange={setQuery} placeholder="Szukaj wydarzeń..." />

      <div className="flex flex-col gap-6">
        {filtered.length > 0 ? (
          filtered.map((event) => (
            <EventCard
              key={event.id}
              name={event.name ?? "Brak nazwy"}
              startDate={event.startDate ?? ""}
              endDate={event.endDate ?? ""}
              description={event.shortDescription ?? ""}
              image={event.image ?? "/placeholder.jpg"}
              href={event.href ?? "#"}
            />
          ))
        ) : (
          <p className="text-gray-600">Nie znaleziono wydarzeń pasujących do wyszukiwania.</p>
        )}
      </div>
    </div>
  );
}
