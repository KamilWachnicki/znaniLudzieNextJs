import PageLayout from "@/components/PageLayout";
import PersonMap from "./PersonMap";

interface Person {
    id: string;
    name: string;
    shortDescription: string;
    description: string;
    category: string;
    image: string;
    birthDate?: string;
    deathDate?: string;
    href?: string;
    lat?: number;
    lng?: number;
}

async function getPerson(id: string): Promise<Person[]> {
    const res = await fetch(`http://localhost:3000/api/people/get/?id=${id}`);
    if (!res.ok) {
        throw new Error("Failed to fetch person");
    }
    console.log(res)
    return res.json();
}

export default async function PersonPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
    const {id} = await params
    const people = await getPerson(id);
    const person = people.at(0)
    if(!person){
        throw new Error("No person")
    }
    console.log(person.image)

    return (
        <PageLayout>
        <div className="p-8 flex flex-col gap-6">
            <div className="flex gap-6">
                <img
                    src={person.image}
                    alt={person.name}
                    className="w-48 h-48 object-cover rounded-lg"
                />
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold text-black">{person.name}</h1>
                    <p className="text-white-600 text-black">{person.category}</p>
                    {person.birthDate && (
                        <p className="text-gray-700">Urodzony: {person.birthDate}</p>
                    )}
                    {person.deathDate && (
                        <p className="text-gray-700">Zmarł: {person.deathDate}</p>
                    )}
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-semibold text-black">Krótki opis</h2>
                <p className="text-gray-800">{person.shortDescription}</p>
            </div>

            <div>
                <h2 className="text-2xl font-semibold text-black">Pełny opis</h2>
                <p className="text-gray-800 whitespace-pre-line">{person.description}</p>
            </div>

            {/* Map */}
            {person.lat != null && person.lng != null && (
                <PersonMap lat={person.lat} lng={person.lng} name={person.name} />
            )}
        </div>


        </PageLayout>
    );
}
