import { notFound } from "next/navigation";
import { getEventDetails } from "@/actions/events.js";
import {getEventAvailability} from "@/actions/availability"
// import EventCard from "@/components/event-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import EventDetails from "../../../components/Events/EventDetails";
import BookingForm from "../../../components/Events/BookingForm"
import { Suspense } from "react";


export async function generateMetadata({ params }) {

  const awaitedParams = await params;
  const event = await getEventDetails(
    awaitedParams.username, awaitedParams.eventId);

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
  const paramData = await params;
  const event= await getEventDetails(paramData.username, paramData.eventId);

  const availability = await getEventAvailability(paramData.eventId);

  if (!event) {
    notFound();
  }

  return (
      <div className="flex flex-col justify-center lg:flex-row px-4 py-8">
       <EventDetails event={event} />
      <Suspense fallback={<div>Loading booking form...</div>}>
        <BookingForm event={event} availability={availability} />
      </Suspense> 
    
    </div>
  );
}