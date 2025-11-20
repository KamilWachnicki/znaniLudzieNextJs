"use client";

import { useState } from "react";
import PersonCard from "./PersonCard";
import SearchBar from "./SearchBar";

export default function PeoplePost() {
  const [query, setQuery] = useState("");
  const [people, setPeople] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    id: "",
    name: "",
    shortDescription: "",
    description: "",
    category: "",
    image: "",
    birthDate: "",
    deathDate: "",
    href: "",
    lat: 0,
    lng: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "lat" || name === "lng" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/people/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (data.success) {
        setPeople((prev) => [...prev, { ...form, id: data.insertedId }]);
        setForm({
          id: "",
          name: "",
          shortDescription: "",
          description: "",
          category: "",
          image: "",
          birthDate: "",
          deathDate: "",
          href: "",
          lat: 0,
          lng: 0,
        });
      } else {
        console.error(data.error);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = people.filter(
    (person) =>
      person.name?.toLowerCase().includes(query.toLowerCase()) ||
      person.category?.toLowerCase().includes(query.toLowerCase()) ||
      person.description?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex flex-col w-full p-8 gap-6">
      <SearchBar value={query} onChange={setQuery} placeholder="Szukaj..." />

      {/* Form to add a new person */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 border p-4 rounded-md">
        <input name="id" placeholder="ID" value={form.id} onChange={handleChange} required />
        <input name="name" placeholder="Imię i nazwisko" value={form.name} onChange={handleChange} required />
        <input name="shortDescription" placeholder="Krótki opis" value={form.shortDescription} onChange={handleChange} />
        <textarea name="description" placeholder="Opis" value={form.description} onChange={handleChange} />
        <input name="category" placeholder="Kategoria" value={form.category} onChange={handleChange} />
        <input name="image" placeholder="URL obrazka" value={form.image} onChange={handleChange} />
        <input name="birthDate" placeholder="Data urodzenia" value={form.birthDate} onChange={handleChange} />
        <input name="deathDate" placeholder="Data śmierci" value={form.deathDate} onChange={handleChange} />
        <input name="href" placeholder="Link" value={form.href} onChange={handleChange} />
        <input name="lat" placeholder="Szerokość geograficzna" type="number" step="0.0001" value={form.lat} onChange={handleChange} />
        <input name="lng" placeholder="Długość geograficzna" type="number" step="0.0001" value={form.lng} onChange={handleChange} />
        <button type="submit" disabled={loading} className="bg-blue-600 text-white p-2 rounded-md">
          {loading ? "Dodawanie..." : "Dodaj osobę"}
        </button>
      </form>

      {/* Display people */}
      <div className="flex flex-col gap-6 mt-4">
        {filtered.length > 0 ? (
          filtered.map((person) => (
            <PersonCard
              key={person.id}
              name={person.name ?? "Brak imienia"}
              category={person.category ?? ""}
              description={person.shortDescription ?? person.description ?? ""}
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
