type SearchBarProps = {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
};

export default function SearchBar({ value, onChange, placeholder = "Szukaj..." }: SearchBarProps) {
    return (
        <div className="sticky top-0 bg-gray-50 z-10 pb-2">
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="
                    w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm text-black bg-white
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                    transition-all duration-300 ease-out
                    hover:shadow-md
                "
            />
        </div>
    );
}