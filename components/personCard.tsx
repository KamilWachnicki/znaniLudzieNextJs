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
        flex bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden p-4 gap-4
        transition-all duration-300 ease-out
        hover:shadow-lg hover:-translate-y-1 hover:scale-[1.01]
        animate-fadeIn
      "
    >
      {/* Image */}
      <div className="flex-shrink-0">
        <Image
          src={image}
          alt={name}
          width={120}
          height={120}
          className="object-cover rounded-lg"
        />
      </div>

      {/* Text */}
      <div className="flex flex-col justify-start">
        <h2 className="text-xl font-semibold text-black">{name}</h2>
        <p className="text-gray-700 font-medium mt-1">{category}</p>
        <p className="text-gray-800 mt-2">{description}</p>
      </div>

    </Link>
  );
}
