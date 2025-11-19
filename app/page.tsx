// pages/index.tsx
import Nav from "@/components/nav";
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="flex flex-col">
      <div className="flex min-h-screen bg-gray-50">
        <Nav />
        HomeWrapper
      </div>
      <Footer/>
    </div>
  );
}
