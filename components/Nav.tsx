import NavButton from "./NavButton";
import Image from "next/image";
import AuthLoginButton from "./AuthLoginButton";

type NavItem = {
    text: string;
    href: string;
    icon: string;
};

const navigationItems = [
    { text: "Strona Główna", href: "/", icon: "/home.svg" },
    { text: "Znani ludzie", href: "/people", icon: "/people.svg" },
    { text: "Wydarzenia", href: "/events", icon: "/events.svg" },
];

export default function Nav() {
    return (
        <nav className="sticky top-0 h-screen w-[260px] shrink-0 bg-blue-900 text-gray-800 flex flex-col p-4 gap-4 shadow-lg border-r border-gray-200">
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
                <AuthLoginButton />
                {navigationItems.map((item : NavItem,index) => (
                    <NavButton key={index} text={item.text} href={item.href} icon={item.icon} />
                ))}
            </div>
        </nav>
    );
}