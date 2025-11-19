import Nav from "@/components/nav";
import Footer from "@/components/footer"
import Events from "@/components/events";

export default function Home() {
  return (
    <div className="flex flex-col">
      <div className="flex min-h-screen bg-gray-50">
        <Nav />
        <Events />
      </div>
      <Footer />
    </div>
  );
}
