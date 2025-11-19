import Image from "next/image";
import Link from "next/link";

type EventCardProps = {
    name: string;
    startDate: string;
    endDate: string;
    description: string;
    image: string;
    href: string;
};

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('pl-PL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function formatDateRange(startDate: string, endDate: string): string {
    if (startDate === endDate) {
        return formatDate(startDate);
    }
    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
}

export default function EventCard({ name, startDate, endDate, description, image, href }: EventCardProps) {
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
                <p className="text-gray-700 font-medium mt-2 truncate">
                    {formatDateRange(startDate, endDate)}
                </p>
                <p className="text-gray-800 mt-4 line-clamp-4">{description}</p>
            </div>
        </Link>
    );
}