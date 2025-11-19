import Link from "next/link";
import Image from "next/image";

type NavButtonProps = {
  text: string;
  href: string;
  icon: string;
};

export default function NavButton({ text, href, icon }: NavButtonProps) {
  return (
    <Link
      href={href}
      className="
        flex items-center w-full px-4 py-3 text-white rounded-lg
        bg-transparent hover:bg-blue-500
        transition-all duration-300 ease-in-out
        transform hover:scale-105
        gap-3
      ">
      <Image
        src={icon}
        alt={`${text} icon`}
        width={24}
        height={24}
        className="invert"
      />
      <span className="font-medium">{text}</span>
    </Link>
  );
}
