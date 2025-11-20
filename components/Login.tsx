"use client";

import { useState } from "react";
import TextField from "@/components/TextField";
import Button from "@/components/Button";

export default function Login() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // prevent page reload
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Coś poszło nie tak");
                setLoading(false);
                return;
            }

            // Login successful, redirect or update state
            console.log("Logged in!", data);
            window.location.href = "/"; // redirect to home page
        } catch (err) {
            setError("Błąd serwera");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 p-6">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md border border-gray-200">
                <h1 className="text-3xl font-semibold text-center mb-8 text-black">
                    Logowanie
                </h1>

                <form className="flex flex-col gap-5 w-full" onSubmit={handleSubmit}>
                    <TextField
                        id="name"
                        label="Nazwa"
                        type="text"
                        placeholder="username"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        id="password"
                        label="Hasło"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Button type="submit" disabled={loading}>
                        {loading ? "Logowanie..." : "Zaloguj się"}
                    </Button>

                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                </form>

                <p className="text-center text-sm text-gray-600 mt-6">
                    Nie masz konta?{" "}
                    <a href="/register" className="text-blue-600 hover:underline">
                        Zarejestruj się
                    </a>
                </p>
            </div>
        </div>
    );
}
