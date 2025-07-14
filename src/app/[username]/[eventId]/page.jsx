import { notFound } from "next/navigation";
import { getEventDetails } from "@/actions/events.js";
import {getEventAvailability} from "@/actions/availability"
// import EventCard from "@/components/event-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


export async function generateMetadata({ params }) {
  const event = await getEventDetails(
    params.username, params.eventId);

  if (!event) {
    return {
      title: "Event Not Found",
    };
  }

   return {
    title: `Book ${event.title} with ${event.user.name} on Business Doctor`,
    description: `Schedule a ${event.duration}-minute ${event.title} event with ${event.user.name}.`,
  };
}

export default async function EventBookingPage({ params }) {
  const event= await getEventDetails(params.username, params.eventId);

  const availability = await getEventAvailability(params.eventId);

  if (!event) {
    notFound();
  }

  return (
      <div className="flex flex-col justify-center lg:flex-row px-4 py-8">
      {/* <EventDetails event={event} />
      <Suspense fallback={<div>Loading booking form...</div>}>
        <BookingForm event={event} availability={availability} />
      </Suspense> */}
      Event Page
    </div>
  );
}