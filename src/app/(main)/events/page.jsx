import React, { Suspense } from 'react'
import EventCard from '@/components/EventCard'

import {getUserEvents} from "@/actions/events.js"

const EventsPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Events/>

    </Suspense>
  )
}

export default EventsPage

const Events=async()=>{
  const {events,username}= await getUserEvents();
  console.log(events)
  if(events.length===0)
  {
    return <p>You havnt created any events yet</p>
  }

  return <div>
    {
      events.map((event)=>{
        return (
        <EventCard 
        key={event.id}
        event={event}
        username={username}
        />)
      })
    }
  </div>

  
}
