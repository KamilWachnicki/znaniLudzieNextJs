"use client";

import React, { useState, useEffect } from "react";

// --- MOVED OUTSIDE (Fixes the focus issue) ---
const InputGroup = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-gray-700 ml-1">{label}</label>
        {children}
    </div>
);

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

    // --- AUTO INCREMENT LOGIC (For both Person and Event) ---
    useEffect(() => {
        const fetchNextId = async () => {
            const endpoint = mode === "person" ? "/api/people/get" : "/api/events/get";
            
            try {
                const res = await fetch(endpoint);
                if (res.ok) {
                    const data = await res.json();
                    
                    // Logic: Parse maxId -> Increment -> Convert to string
                    // Note: If maxId is "5", next is "6". If null/undefined, starts at "1".
                    const currentMax = data.maxId ? parseInt(data.maxId) : 0;
                    const nextId = (currentMax + 1).toString();

                    if (mode === "person") {
                        setPersonForm((prev) => ({
                            ...prev,
                            id: nextId,
                            href: `/people/${nextId}`
                        }));
                    } else {
                        setEventForm((prev) => ({
                            ...prev,
                            id: nextId,
                            href: `/events/${nextId}`
                        }));
                    }
                }
            } catch (error) {
                console.error(`Failed to fetch max ID for ${mode}:`, error);
            }
        };

        fetchNextId();
    }, [mode]); // Re-run whenever the user switches tabs

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
                alert("Dodano pomyślnie!");
                const nextIdInt = parseInt(form.id) + 1;
                const nextIdStr = nextIdInt.toString();

                if (isEvent) {
                    setEventForm({
                        ...emptyEvent,
                        id: nextIdStr,
                        href: `/api/events/get?id=${nextIdStr}`
                    });
                } else {
                    setPersonForm({
                        ...emptyPerson,
                        id: nextIdStr,
                        href: `/api/people/get?id=${nextIdStr}`
                    });
                }
            } else {
                console.error(data.error);
                alert("Błąd: " + data.error);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const f = mode === "event" ? eventForm : personForm;
    const isEvent = mode === "event";

    // Deleted nested InputGroup definition from here

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
                        className={`px-3 py-2 rounded-md border flex-1 transition ${
                            mode === "person" ? "bg-blue-600 text-white" : "bg-gray-200 text-black hover:bg-gray-300"
                        }`}
                    >
                        Osoba
                    </button>
                    <button
                        type="button"
                        onClick={() => setMode("event")}
                        className={`px-3 py-2 rounded-md border flex-1 transition ${
                            mode === "event" ? "bg-blue-600 text-white" : "bg-gray-200 text-black hover:bg-gray-300"
                        }`}
                    >
                        Wydarzenie
                    </button>
                </div>

                {/* SHARED FIELDS */}
                <InputGroup label="ID">
                    <input
                        name="id"
                        placeholder="ID (Automatyczne)"
                        value={f.id}
                        onChange={(e) => handleChange(e, isEvent)}
                        required
                        readOnly // Always auto-generated now
                        className="border p-2 rounded-md text-black bg-gray-100 cursor-not-allowed"
                    />
                </InputGroup>

                <InputGroup label={isEvent ? "Nazwa wydarzenia" : "Imię i nazwisko"}>
                    <input
                        name="name"
                        placeholder={isEvent ? "Np. Powstanie Warszawskie" : "Np. Jan Kowalski"}
                        value={f.name}
                        onChange={(e) => handleChange(e, isEvent)}
                        required
                        className="border p-2 rounded-md text-black"
                    />
                </InputGroup>

                <InputGroup label="Krótki opis">
                    <input
                        name="shortDescription"
                        placeholder="Zwięzłe podsumowanie"
                        value={f.shortDescription}
                        onChange={(e) => handleChange(e, isEvent)}
                        className="border p-2 rounded-md text-black"
                    />
                </InputGroup>

                <InputGroup label="Pełny opis">
                    <textarea
                        name="description"
                        placeholder="Szczegółowy opis..."
                        value={f.description}
                        onChange={(e) => handleChange(e, isEvent)}
                        className="border p-2 rounded-md text-black h-28 resize-none"
                    />
                </InputGroup>

                <InputGroup label="Zdjęcie (URL)">
                    <input
                        name="image"
                        placeholder="https://..."
                        value={f.image}
                        onChange={(e) => handleChange(e, isEvent)}
                        className="border p-2 rounded-md text-black"
                    />
                </InputGroup>

                {/* PERSON-ONLY FIELDS */}
                {!isEvent && (
                    <>
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <InputGroup label="Data urodzenia">
                                    <input
                                        name="birthDate"
                                        type="date"
                                        value={f.birthDate}
                                        onChange={(e) => handleChange(e, false)}
                                        className="border p-2 rounded-md text-black w-full"
                                    />
                                </InputGroup>
                            </div>
                            <div className="flex-1">
                                <InputGroup label="Data śmierci">
                                    <input
                                        name="deathDate"
                                        type="date"
                                        value={f.deathDate}
                                        onChange={(e) => handleChange(e, false)}
                                        className="border p-2 rounded-md text-black w-full"
                                    />
                                </InputGroup>
                            </div>
                        </div>

                        <InputGroup label="Kategoria">
                            <input
                                name="category"
                                placeholder="Np. Nauka, Sport, Polityka"
                                value={f.category}
                                onChange={(e) => handleChange(e, false)}
                                className="border p-2 rounded-md text-black"
                            />
                        </InputGroup>
                    </>
                )}

                {/* EVENT-ONLY FIELDS */}
                {isEvent && (
                    <>
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <InputGroup label="Data rozpoczęcia">
                                    <input
                                        name="startDate"
                                        type="date"
                                        value={f.startDate}
                                        onChange={(e) => handleChange(e, true)}
                                        className="border p-2 rounded-md text-black w-full"
                                    />
                                </InputGroup>
                            </div>
                            <div className="flex-1">
                                <InputGroup label="Data zakończenia">
                                    <input
                                        name="endDate"
                                        type="date"
                                        value={f.endDate}
                                        onChange={(e) => handleChange(e, true)}
                                        className="border p-2 rounded-md text-black w-full"
                                    />
                                </InputGroup>
                            </div>
                        </div>
                    </>
                )}

                {/* SHARED FIELDS */}
                <InputGroup label="Link (HREF)">
                    <input
                        name="href"
                        placeholder={`/api/${isEvent ? 'events' : 'people'}/get?id=...`}
                        value={f.href}
                        onChange={(e) => handleChange(e, isEvent)}
                        className="border p-2 rounded-md text-black"
                    />
                </InputGroup>

                <div className="flex gap-4">
                    <div className="flex-1">
                        <InputGroup label="Szerokość (Lat)">
                            <input
                                name="lat"
                                placeholder="52.2297"
                                type="number"
                                step="0.0001"
                                value={f.lat}
                                onChange={(e) => handleChange(e, isEvent)}
                                className="border p-2 rounded-md text-black w-full"
                            />
                        </InputGroup>
                    </div>
                    <div className="flex-1">
                        <InputGroup label="Długość (Lng)">
                            <input
                                name="lng"
                                placeholder="21.0122"
                                type="number"
                                step="0.0001"
                                value={f.lng}
                                onChange={(e) => handleChange(e, isEvent)}
                                className="border p-2 rounded-md text-black w-full"
                            />
                        </InputGroup>
                    </div>
                </div>

                {/* SUBMIT BUTTON */}
                <button
                    type="submit"
                    disabled={loading}
                    className="mt-4 bg-blue-600 text-white p-3 rounded-md font-semibold hover:bg-blue-700 transition shadow-sm"
                >
                    {loading ? "Przetwarzanie..." : isEvent ? "Dodaj wydarzenie" : "Dodaj osobę"}
                </button>
            </form>
        </div>
    );
}