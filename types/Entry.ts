export type Entry = {
    id: string;
    name: string;
    shortDescription: string;
    description: string;
    category: "people" | "events";
    image: string;
    href: string;
    lat: number;
    lng: number;
    startDate?: string;
    endDate?: string;
};