import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import React from "react";

type PageLayoutProps = {
    children: React.ReactNode;
};

export default function PageLayout({ children }: PageLayoutProps) {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex flex-1 bg-gray-50">
                <Nav />
                {children}
            </div>
            <Footer />
        </div>
    );
}