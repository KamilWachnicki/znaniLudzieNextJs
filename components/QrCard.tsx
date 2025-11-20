"use client";

import Image from "next/image";
import { MouseEventHandler } from "react";

type QRCardProps = {
    id: string;
    title: string;
    description: string;
    category?: string;       // for people
    startDate?: string;      // for events
    endDate?: string;        // for events
    image: string;
    selected?: boolean;
    onClick?: MouseEventHandler<HTMLButtonElement>;
};

function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleDateString("pl-PL", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

function formatDateRange(startDate?: string, endDate?: string) {
    if (!startDate) return "";
    if (!endDate || startDate === endDate) return formatDate(startDate);
    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
}

export default function QRCard({
    title,
    description,
    category,
    startDate,
    endDate,
    image,
    selected = false,
    onClick,
}: QRCardProps) {
    return (
        <button
            onClick={onClick}
            className={`flex bg-white rounded-2xl shadow-md border p-0 
            gap-6 transition-all duration-300 w-full cursor-pointer hover:shadow-lg hover:-translate-y-1
      `}
        >
            {/* Image */}
            <div className="flex-shrink-0 w-48 h-48 relative">
                <Image src={image} alt={title} fill className="object-cover rounded-l-2xl" />
            </div>

            {/* Text */}
            <div className="flex flex-col justify-start p-6 overflow-hidden min-w-0">
                <h2 className="text-2xl font-semibold text-black truncate">{title}</h2>
                <p className="text-gray-700 font-medium mt-2 truncate">
                    {category || formatDateRange(startDate, endDate)}
                </p>
                <p className="text-gray-800 mt-4 line-clamp-4">{description}</p>
            </div>
        </button>
    );
}
