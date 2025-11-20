import React from "react";

type TextFieldProps = {
    id: string;
    label: string;
    type?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
};

export default function TextField({
    id,
    label,
    type = "text",
    value,
    onChange,
    placeholder
}: TextFieldProps) {
    return (
        <div className="flex flex-col gap-1 w-full">
            <label htmlFor={id} className="text-sm font-medium text-black">
                {label}
            </label>
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full px-4 py-3 border rounded-lg text-black bg-white
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
}
