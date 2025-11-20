type ButtonProps = {
    children: React.ReactNode;
    type?: "button" | "submit";
    onClick?: () => void;
};

export default function Button({ children, type = "button", onClick }: ButtonProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            className="w-full py-3 rounded-lg bg-blue-600 text-white font-medium
                       transition-all duration-300 hover:bg-blue-700 hover:-translate-y-0.5"
        >
            {children}
        </button>
    );
}
