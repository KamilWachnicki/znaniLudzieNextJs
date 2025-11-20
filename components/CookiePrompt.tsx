"use client";

import { useState, useEffect } from "react";
import Button from "./Button";

export default function CookiePrompt() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookiesAccepted");
    if (!accepted) setShow(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 w-64 h-40 bg-white border border-gray-300 rounded-xl shadow-lg p-4 flex flex-col justify-between">
      <p className="text-gray-800 text-sm">
        Ta strona używa plików cookies w celu poprawy doświadczenia użytkownika.
      </p>
      <Button type="button" onClick={handleAccept} className="self-start">
        Akceptuję
      </Button>
    </div>
  );
}
