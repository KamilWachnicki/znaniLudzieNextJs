"use client";

import React, { useState } from "react";

export default function ContentPost() {
    const [loading, setLoading] = useState(false);
    const [mode, setMode] = useState<"person" | "event">("person");

    const emptyPerson = {
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
    };

    const emptyEvent = {
        id: "",
        name: "",
        shortDescription: "",
        description: "",
        category: "events",
        image: "",
        startDate: "",
        endDate: "",
        href: "",
        lat: 0,
        lng: 0,
    };

    const [personForm, setPersonForm] = useState(emptyPerson);
    const [eventForm, setEventForm] = useState(emptyEvent);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        isEvent: boolean
    ) => {
        const { name, value } = e.target;

        if (isEvent) {
            setEventForm((prev) => ({
                ...prev,
                [name]: name === "lat" || name === "lng" ? parseFloat(value) : value,
            }));
        } else {
            setPersonForm((prev) => ({
                ...prev,
                [name]: name === "lat" || name === "lng" ? parseFloat(value) : value,
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const isEvent = mode === "event";
        const form = isEvent ? eventForm : personForm;

        try {
            const res = await fetch(isEvent ? "/api/events/post" : "/api/people/post", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await res.json();
            if (data.success) {
                if (isEvent) {
                    setEventForm(emptyEvent);
                } else {
                    setPersonForm(emptyPerson);
                }
            } else {
                console.error(data.error);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const f = mode === "event" ? eventForm : personForm;
    const isEvent = mode === "event";

    return (
        <div className="w-full flex justify-center p-8">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-xl flex flex-col gap-4 border border-gray-300 p-6 rounded-xl shadow-md bg-white"
            >
                <h1 className="text-2xl font-semibold text-black mb-2">
                    {isEvent ? "Dodaj nowe wydarzenie" : "Dodaj nową osobę"}
                </h1>

                {/* MODE SWITCH */}
                <div className="flex gap-4 mb-4">
                    <button
                        type="button"
                        onClick={() => setMode("person")}
                        className={`px-3 py-2 rounded-md border ${
                            mode === "person" ? "bg-blue-600 text-white" : "bg-gray-200 text-black"
                        }`}
                    >
                        Osoba
                    </button>
                    <button
                        type="button"
                        onClick={() => setMode("event")}
                        className={`px-3 py-2 rounded-md border ${
                            mode === "event" ? "bg-blue-600 text-white" : "bg-gray-200 text-black"
                        }`}
                    >
                        Wydarzenie
                    </button>
                </div>

                {/* SHARED FIELDS */}
                <input
                    name="id"
                    placeholder="ID"
                    value={f.id}
                    onChange={(e) => handleChange(e, isEvent)}
                    required
                    className="border p-2 rounded-md text-black"
                />

                <input
                    name="name"
                    placeholder={isEvent ? "Nazwa wydarzenia" : "Imię i nazwisko"}
                    value={f.name}
                    onChange={(e) => handleChange(e, isEvent)}
                    required
                    className="border p-2 rounded-md text-black"
                />

                <input
                    name="shortDescription"
                    placeholder="Krótki opis"
                    value={f.shortDescription}
                    onChange={(e) => handleChange(e, isEvent)}
                    className="border p-2 rounded-md text-black"
                />

                <textarea
                    name="description"
                    placeholder="Opis"
                    value={f.description}
                    onChange={(e) => handleChange(e, isEvent)}
                    className="border p-2 rounded-md text-black h-28 resize-none"
                />

                <input
                    name="image"
                    placeholder="URL obrazka"
                    value={f.image}
                    onChange={(e) => handleChange(e, isEvent)}
                    className="border p-2 rounded-md text-black"
                />

                {/* PERSON-ONLY FIELDS */}
                {!isEvent && (
                    <>
                        <input
                            name="birthDate"
                            placeholder="Data urodzenia"
                            value={f.birthDate}
                            onChange={(e) => handleChange(e, false)}
                            className="border p-2 rounded-md text-black"
                        />

                        <input
                            name="deathDate"
                            placeholder="Data śmierci"
                            value={f.deathDate}
                            onChange={(e) => handleChange(e, false)}
                            className="border p-2 rounded-md text-black"
                        />

                        <input
                            name="category"
                            placeholder="Kategoria"
                            value={f.category}
                            onChange={(e) => handleChange(e, false)}
                            className="border p-2 rounded-md text-black"
                        />
                    </>
                )}

                {/* EVENT-ONLY FIELDS */}
                {isEvent && (
                    <>
                        <input
                            name="startDate"
                            placeholder="Data rozpoczęcia"
                            type="date"
                            value={f.startDate}
                            onChange={(e) => handleChange(e, true)}
                            className="border p-2 rounded-md text-black"
                        />

                        <input
                            name="endDate"
                            placeholder="Data zakończenia"
                            type="date"
                            value={f.endDate}
                            onChange={(e) => handleChange(e, true)}
                            className="border p-2 rounded-md text-black"
                        />
                    </>
                )}

                {/* SHARED FIELDS */}
                <input
                    name="href"
                    placeholder="Link"
                    value={f.href}
                    onChange={(e) => handleChange(e, isEvent)}
                    className="border p-2 rounded-md text-black"
                />

                <input
                    name="lat"
                    placeholder="Szerokość geograficzna"
                    type="number"
                    step="0.0001"
                    value={f.lat}
                    onChange={(e) => handleChange(e, isEvent)}
                    className="border p-2 rounded-md text-black"
                />

                <input
                    name="lng"
                    placeholder="Długość geograficzna"
                    type="number"
                    step="0.0001"
                    value={f.lng}
                    onChange={(e) => handleChange(e, isEvent)}
                    className="border p-2 rounded-md text-black"
                />

                {/* SUBMIT BUTTON */}
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white p-2 rounded-md font-semibold hover:bg-blue-700 transition"
                >
                    {loading ? "Dodawanie..." : isEvent ? "Dodaj wydarzenie" : "Dodaj osobę"}
                </button>
            </form>
        </div>
    );
}
