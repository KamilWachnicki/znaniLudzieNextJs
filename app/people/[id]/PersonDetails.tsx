// app/people/[id]/PersonDetails.tsx
"use client";

import { useState } from "react";

interface PersonDetailsProps {
  shortDescription: string;
  description: string;
}

export default function PersonDetails({ shortDescription, description }: PersonDetailsProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="space-y-4">
      <p>{shortDescription}</p>
      {expanded && <p>{description}</p>}
      <button
        onClick={() => setExpanded(!expanded)}
        className="text-blue-600 hover:underline"
      >
        {expanded ? "Pokaż mniej" : "Czytaj więcej"}
      </button>
    </div>
  );
}
