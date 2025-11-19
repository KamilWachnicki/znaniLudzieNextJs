// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 py-8 px-6 mt-auto shadow-inner border-t border-gray-300">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-6">

        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold text-gray-900">Zlecenie</h2>
          <p>
            Stworzone przez <span className="font-medium">Gmina Kolbuszowa </span>
            <span>na zlecenie</span> <span className="font-medium">Lucjana Maciąga</span>.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold text-gray-900">Kontakt</h2>
          <p>Email: <a href="mailto:lucjan@gmail.com" className="text-blue-600 hover:underline">lucjan@gmail.com</a></p>
          <p>Telefon: <a href="tel:+48123456789" className="text-blue-600 hover:underline">+48 123 456 789</a></p>
          <p>Adres: ul Obrońców Pokoju 21, 36-100 Kolbuszowa</p>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold text-gray-900">Info</h2>
          <p>© {new Date().getFullYear()} Gmina Kolbuszowa. Wszystkie prawa zastrzeżone.</p>
          <p>Strona stworzona do pokazania znanych ludzi w gminie.</p>
        </div>

      </div>
    </footer>
  );
}
