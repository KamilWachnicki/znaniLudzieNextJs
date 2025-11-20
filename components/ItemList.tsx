import { JSX } from "react";

export type ListItem = {
    id: string;
    title: string;
    description: string;
    categoryName: string;
};

type Props = {
    items: ListItem[];
};

export default function ItemList({ items }: Props): JSX.Element {
    return (
        <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2 text-black">
                Results <span className="text-gray-600">({items.length})</span>
            </h3>

            {items.length === 0 && (
                <p className="text-gray-600">No items match your search.</p>
            )}

            <ul className="space-y-3 mt-3">
                {items.map((it) => (
                    <li key={it.id} className="border rounded-md p-3 bg-white shadow-sm">
                        <strong className="block text-sm font-semibold text-black">{it.title}</strong>
                        <div className="text-gray-700 text-sm">{it.description}</div>
                        <div className="text-gray-500 text-xs mt-2">
                            Category: {it.categoryName}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
