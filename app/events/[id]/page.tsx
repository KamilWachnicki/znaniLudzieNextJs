import PageLayout from "@/components/PageLayout";
import PersonMap from "./EventMap";

interface Event {
    id: string;
    name: string;
    shortDescription: string;
    description: string;
    category: string;
    image: string;
    startDate?: string;
    endDate?: string;
    href?: string;
    lat?: number;
    lng?: number;
}

async function getEvent(id: string): Promise<Event[]> {
    const res = await fetch(`http://localhost:3000/api/events/get/?id=${id}`);
    if (!res.ok) {
        throw new Error("Failed to fetch person");
    }
    console.log(res)
    return res.json();
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
    const {id} = await params
    const events = await getEvent(id);
    const event = events.at(0)
    if(!event){
        throw new Error("No person")
    }
    console.log(event.image)

    return (
        <PageLayout>
        <div className="p-8 flex flex-col gap-6">
            <div className="flex gap-6">
                <img
                    src={event.image}
                    alt={event.name}
                    className="w-48 h-48 object-cover rounded-lg"
                />
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold text-black">{event.name}</h1>
                    {event.startDate && (
                        <p className="text-gray-700">Start: {event.startDate}</p>
                    )}
                    {event.endDate && (
                        <p className="text-gray-700">End: {event.endDate}</p>
                    )}
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-semibold text-black">Krótki opis</h2>
                <p className="text-gray-800">{event.shortDescription}</p>
            </div>

            <div>
                <h2 className="text-2xl font-semibold text-black">Pełny opis</h2>
                <p className="text-gray-800 whitespace-pre-line">{event.description}</p>
            </div>

            {/* Map */}
            {event.lat != null && event.lng != null && (
                <PersonMap lat={event.lat} lng={event.lng} name={event.name} />
            )}
        </div>


        </PageLayout>
    );
}
