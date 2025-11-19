import Nav from "@/components/nav";
import Footer from "@/components/footer"
import FrontPage from "@/components/frontPage";

export default function Home() {
  return (
    <div className="flex flex-col">
      <div className="flex min-h-screen bg-gray-50">
        <Nav />
        <FrontPage />
      </div>
      <Footer />
    </div>
  );
}
