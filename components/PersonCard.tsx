import Image from "next/image";
import Link from "next/link";

type PersonCardProps = {
    name: string;
    category: string;
    description: string;
    image: string;
    href: string;
};

export default function PersonCard({ name, category, description, image, href }: PersonCardProps) {
    return (
        <Link
            href={href}
            className="
                flex bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden p-0 gap-6
                transition-all duration-300 ease-out
                hover:shadow-lg hover:-translate-y-1
                flex-shrink-0
            "
        >
            {/* Image */}
            <div className="flex-shrink-0 w-48 h-48 relative">
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover rounded-l-2xl"
                />
            </div>

            {/* Text */}
            <div className="flex flex-col justify-start p-6 overflow-hidden min-w-0">
                <h2 className="text-2xl font-semibold text-black truncate">{name}</h2>
                <p className="text-gray-700 font-medium mt-2 truncate">{category}</p>
                <p className="text-gray-800 mt-4 line-clamp-4">{description}</p>
            </div>
        </Link>
    );
}