"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import QRCode from "qrcode";

type ItemData = {
  name: string;
  category?: string;
  startDate?: string;
  endDate?: string;
  project?: string;
  url?: string;
};

export default function GeneratedQrCode() {
  const searchParams = useSearchParams();
  const [data, setData] = useState<ItemData | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);

  useEffect(() => {
    // Pull data from GET params
    const name = searchParams.get("name") || "Nieznany";
    const category = searchParams.get("category") || undefined;
    const startDate = searchParams.get("startDate") || undefined;
    const endDate = searchParams.get("endDate") || undefined;
    const project = "Znani Ludzie"; // default project
    const url = searchParams.get("url") || window.location.href;

    const item: ItemData = { name, category, startDate, endDate, project, url };
    setData(item);

    // Generate QR code
    QRCode.toDataURL(url)
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error(err));
  }, [searchParams]);

  if (!data) return null;

  const displayDate = data.startDate
    ? data.endDate && data.endDate !== data.startDate
      ? `${data.startDate} - ${data.endDate}`
      : data.startDate
    : data.category;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
      <div className="bg-white border shadow-lg rounded-2xl p-6 flex flex-col md:flex-row items-center md:items-start gap-6 w-full max-w-4xl">
        
        {/* Left: Text info */}
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-center md:text-left">{data.name}</h1>
          {displayDate && (
            <p className="text-gray-700 text-lg text-center md:text-left">{displayDate}</p>
          )}
        </div>

        {/* Right: QR Code */}
        <div className="flex flex-col items-center justify-between">
          {qrDataUrl && (
            <img
              src={qrDataUrl}
              alt="QR Code"
              className="w-64 h-64 md:w-72 md:h-72"
            />
          )}

          {/* Bottom info & emblem */}
          <div className="mt-4 flex justify-between items-end w-full">
            <p className="text-gray-500 text-sm">{data.project}</p>
            {/* Placeholder for emblem/herb */}
            <img
              src="/herb.png"
              alt="Herb"
              className="w-12 h-12"
            />
          </div>
        </div>
      </div>

      {/* Optional extra info */}
      <p className="mt-4 text-gray-600 text-sm text-center">
        Wygenerowano przy użyciu systemu lokalnych historii i wydarzeń.
      </p>
    </div>
  );
}
