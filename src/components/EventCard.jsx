"use client";

import { useState } from "react";
import { 
  Link, 
  Trash2, 
  Clock, 
  Calendar, 
  Users, 
  Eye, 
  EyeOff, 
  ExternalLink,
  Copy,
  Check
} from "lucide-react";

import { deleteEvent } from "@/actions/events";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useFetch from "@/hooks/useFetch";
import { useRouter } from "next/navigation";

export default function EventCard({ event, username, isPublic = false }) {
  const [isCopied, setIsCopied] = useState(false);
  const router = useRouter();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        `${window?.location.origin}/${username}/${event.id}`
      );
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const { loading, fn: fnDeleteEvent } = useFetch(deleteEvent);

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (window?.confirm("Are you sure you want to delete this event?")) {
      await fnDeleteEvent(event.id);
      router.refresh();
    }
  };

  const handleCardClick = (e) => {
    if (e.target.tagName !== "BUTTON" && 
        e.target.tagName !== "SVG" && 
        !e.target.closest('button')) {
      window?.open(
        `${window?.location.origin}/${username}/${event.id}`,
        "_blank"
      );
    }
  };

  const handleButtonClick = (e) => {
    e.stopPropagation();
  };

  // Get first sentence of description
  const shortDescription = event.description.includes('.') 
    ? event.description.substring(0, event.description.indexOf('.') + 1)
    : event.description;

  return (
    <Card
      className="group cursor-pointer hover:border-blue-200 relative bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
      onClick={handleCardClick}
    >
      {/* Status indicator stripe */}
      <div className={`absolute top-0 left-0 w-full h-1 ${
        event.isPrivate 
          ? 'bg-gradient-to-r from-amber-400 to-orange-500' 
          : 'bg-gradient-to-r from-green-400 to-blue-500'
      }`} />
      
      <CardHeader className="relative p-6 pb-4">
        {/* Privacy badge */}
        <div className="absolute top-4 right-4">
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
            event.isPrivate 
              ? 'bg-amber-100 text-amber-800 border border-amber-200' 
              : 'bg-green-100 text-green-800 border border-green-200'
          }`}>
            {event.isPrivate ? (
              <>
                <EyeOff className="w-3 h-3 mr-1" />
                Private
              </>
            ) : (
              <>
                <Eye className="w-3 h-3 mr-1" />
                Public
              </>
            )}
          </div>
        </div>

        <CardTitle className="text-xl mb-3 pr-20 leading-tight group-hover:text-blue-700 transition-colors font-bold text-gray-900">
          {event.title}
        </CardTitle>
        
        {/* Event stats */}
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center text-gray-600">
            <div className="flex items-center justify-center w-7 h-7 bg-blue-50 rounded-lg mr-2">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
            </div>
            <span className="font-medium">{event.duration} mins</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <div className="flex items-center justify-center w-7 h-7 bg-purple-50 rounded-lg mr-2">
              <Users className="w-3.5 h-3.5 text-purple-600" />
            </div>
            <span className="font-medium">
              {event._count.bookings} {event._count.bookings === 1 ? 'booking' : 'bookings'}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-6 px-6">
        <p className="text-gray-700 leading-relaxed text-sm">
          {shortDescription}
        </p>
        
        {/* View event link */}
        <div className="mt-4 flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors">
          <ExternalLink className="w-4 h-4 mr-2" />
          <span>View event page</span>
        </div>
      </CardContent>

      {!isPublic && (
        <CardFooter className="bg-gray-50 border-t border-gray-100 px-6 pb-6 pt-4">
          <div className="flex gap-3 w-full">
            <Button
              variant="outline"
              onClick={(e) => {
                handleButtonClick(e);
                handleCopy();
              }}
              className="flex-1 bg-white hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 transition-all duration-200"
            >
              {isCopied ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Link
                </>
              )}
            </Button>
            
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={loading}
              className="flex-1 hover:shadow-md transition-all duration-200"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              {loading ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}