export type LeafletMarker = {
    id: string;
    name: string;
    shortDescription: string;
    description: string;
    lat?: number;
    lng?: number;
    category: "people" | "events";
};