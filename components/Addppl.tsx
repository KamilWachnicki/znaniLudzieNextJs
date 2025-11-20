"use client";

import { useState } from "react";
import PersonCard from "./PersonCard";
import SearchBar from "./SearchBar";

export default function PeoplePost() {
  const [query, setQuery] = useState("");
  const [people, setPeople] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    shortDescription: "",
    image: "",
    href: "",
    birthDate: "",
    deathDate: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/people", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (data.success) {
        setPeople((prev) => [...prev, { ...form, id: data.insertedId }]);
        setForm({
          title: "",
          category: "",
          description: "",
          shortDescription: "",
          image: "",
          href: "",
          birthDate: "",
          deathDate: "",
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
      person.title?.toLowerCase().includes(query.toLowerCase()) ||
      person.category?.toLowerCase().includes(query.toLowerCase()) ||
      person.description?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex flex-col w-full p-8 gap-6">
      <SearchBar value={query} onChange={setQuery} placeholder="Szukaj..." />

      {/* Form to add a new person */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 border p-4 rounded-md">
        <input name="title" placeholder="Imię i nazwisko" value={form.title} onChange={handleChange} required />
        <input name="category" placeholder="Kategoria" value={form.category} onChange={handleChange} />
        <textarea name="description" placeholder="Opis" value={form.description} onChange={handleChange} />
        <input name="shortDescription" placeholder="Krótki opis" value={form.shortDescription} onChange={handleChange} />
        <input name="image" placeholder="URL obrazka" value={form.image} onChange={handleChange} />
        <input name="href" placeholder="Link" value={form.href} onChange={handleChange} />
        <input name="birthDate" placeholder="Data urodzenia" value={form.birthDate} onChange={handleChange} />
        <input name="deathDate" placeholder="Data śmierci" value={form.deathDate} onChange={handleChange} />
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
              name={person.title ?? "Brak imienia"}
              category={person.category ?? ""}
              description={person.shortDescription ?? person.description ?? ""}
              image={person.image ?? "/placeholder.jpg"}
              href={person.href ?? "#"}
            />
          ))
        ) : (
          <p className="text-black-600">Nie znaleziono osób pasujących do wyszukiwania.</p>
        )}
      </div>
    </div>
  );
}
