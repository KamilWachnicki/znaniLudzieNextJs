"use client";

import Button from "./Button";
import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (res.ok) {
        router.push("/login");
      } else {
        console.error("Failed to log out");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md border border-gray-200">
        <h1 className="text-3xl font-semibold text-center mb-6 text-black">
          Wyloguj się
        </h1>

        <p className="text-center text-gray-700 mb-6">
          Czy na pewno chcesz się wylogować?
        </p>

        <Button type="button" onClick={handleLogout}>
          Wyloguj
        </Button>
      </div>
    </div>
  );
}
