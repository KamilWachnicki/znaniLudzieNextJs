import NavButton from "./navButton";
import Image from "next/image";

export default function Nav() {
  return (
    <nav className="h-screen w-64 bg-blue-900 text-gray-800 flex flex-col p-4 gap-4 shadow-lg border-r border-gray-200">
      <div className="flex flex-col items-center mt-4 mb-4">
        <Image
          src="/herb.png"
          alt="Herb Gmina Kolbuszowa"
          width={82}
          height={104}
          className="object-contain"
        />
        <p className="mt-2 text-white text-lg font-semibold text-center tracking-wide">
          Gmina Kolbuszowa
        </p>
      </div>
      <div className="flex flex-col gap-3 w-full">
        <NavButton text="Strona Główna" href="/" icon="/home.svg" />
        <NavButton text="Znani ludzie" href="/people" icon="/people.svg" />
        <NavButton text="Wydarzenia" href="/people" icon="/events.svg" />
      </div>
    </nav>
  );
}
