"use client";

import { useState, useEffect } from "react";
import PersonCard from "./PersonCard";
import SearchBar from "./SearchBar";

export default function People() {
  const [query, setQuery] = useState("");
  const [people, setPeople] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const res = await fetch("/people.json");
        if (!res.ok) throw new Error("Failed to fetch people data");
        const data = await res.json();
        // store array directly
        setPeople(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setPeople([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPeople();
  }, []);

  const filtered = people.filter(
    (person) =>
      person.name?.toLowerCase().includes(query.toLowerCase()) ||
      person.category?.toLowerCase().includes(query.toLowerCase()) ||
      person.description?.toLowerCase().includes(query.toLowerCase())
  );

  if (loading) return <p className="p-8 text-gray-700">Ładowanie osób...</p>;

  return (
    <div className="flex flex-col w-full p-8 gap-6">
      <SearchBar value={query} onChange={setQuery} placeholder="Szukaj..." />

      <div className="flex flex-col gap-6">
        {filtered.length > 0 ? (
          filtered.map((person) => (
            <PersonCard
              key={person.id}
              name={person.name ?? "Brak imienia"}
              category={person.category ?? ""}
              description={person.description ?? ""}
              image={person.image ?? "/placeholder.jpg"}
              href={person.href ?? "#"}
            />
          ))
        ) : (
          <p className="text-gray-600">Nie znaleziono osób pasujących do wyszukiwania.</p>
        )}
      </div>
    </div>
  );
}
