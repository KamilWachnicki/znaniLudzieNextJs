"use client";

import { useState } from "react";
import TextField from "./TextField";
import Button from "./Button";

export default function Register() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirm) {
      setError("Hasła nie są takie same!");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Coś poszło nie tak!");
      } else {
        setSuccess("Konto zostało utworzone pomyślnie!");
        setName("");
        setPassword("");
        setConfirm("");
      }
    } catch (err) {
      setError("Błąd serwera. Spróbuj ponownie później.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md border border-gray-200">
        <h1 className="text-3xl font-semibold text-center mb-8 text-black">
          Rejestracja
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
          <TextField
            id="confirm"
            label="Powtórz hasło"
            type="password"
            placeholder="••••••••"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
        <Button type="submit">
        {loading ? "Tworzenie konta..." : "Utwórz konto"}
        </Button>

        </form>

        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
        {success && <p className="text-green-500 text-sm mt-4">{success}</p>}

        <p className="text-center text-sm text-gray-600 mt-6">
          Masz już konto?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Zaloguj się
          </a>
        </p>
      </div>
    </div>
  );
}
