"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import QRCode from "qrcode";

type Item = {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  category: "people" | "events";
  image: string;
  startDate?: string;
  endDate?: string;
  birthDate?: string;
  deathDate?: string;
};

export default function GeneratedQrCode() {
  const searchParams = useSearchParams();
  const [item, setItem] = useState<Item | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);

  useEffect(() => {
    const id = searchParams.get("id");
    const category = searchParams.get("category");

    if (!id || !category) return;

    const fetchItem = async () => {
      try {
        const url = category === "people" ? "/api/people/get" : "/api/events/get";
        const res = await fetch(url);
        const data: Item[] = await res.json();

        const found = data.find((x) => x.id === id);
        if (!found) return;

        setItem(found);

        const qrPayload = `${window.location.origin}/${category}/${found.id}`;
        const qr = await QRCode.toDataURL(qrPayload);

        setQrDataUrl(qr);
      } catch (error) {
        console.error("QR generation error:", error);
      }
    };

    fetchItem();
  }, [searchParams]);

  // Trigger print once item & QR code are ready
  useEffect(() => {
    if (item && qrDataUrl) {
      window.print();
    }
  }, [item, qrDataUrl]);

  if (!item) return <p className="text-center mt-20">Ładowanie...</p>;

  const format = (date: string | undefined) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("pl-PL", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  let displayDate = "";

  if (searchParams.get("category") === "people") {
    const birth = format(item.birthDate);
    const death = format(item.deathDate);

    if (birth && death) displayDate = `${birth} — ${death}`;
    else if (birth) displayDate = `${birth}`;
    else displayDate = "";
  } else {
    const start = format(item.startDate);
    const end = format(item.endDate);

    if (start && end && start !== end) displayDate = `${start} — ${end}`;
    else if (start) displayDate = start;
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 p-10">
      <div className="bg-white rounded-3xl p-10 max-w-6xl w-full flex flex-row items-center gap-10">
        {/* LEFT: QR */}
        <div className="flex flex-col items-center shrink-0">
          {qrDataUrl && (
            <img
              src={qrDataUrl}
              alt="QR Code"
              className="w-80 h-80 rounded-2xl"
            />
          )}

          <div className="flex items-center gap-3 mt-6">
            <img src="/herb.png" alt="Herb" className="w-14 h-14 opacity-90" />
            <span className="text-2xl font-semibold text-gray-800 tracking-wide">
              Znani Ludzie
            </span>
          </div>
        </div>

        {/* RIGHT: TEXT */}
        <div className="flex flex-col justify-center flex-1">
          <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-4">
            {item.name}
          </h1>

          {displayDate && (
            <p className="text-2xl font-medium text-gray-700 mb-6">
              {displayDate}
            </p>
          )}

          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
            {item.shortDescription}
          </p>
        </div>
      </div>
    </div>
  );
}
