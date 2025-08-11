import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Clock, Video, User, MessageSquare } from "lucide-react";
import CancelMeetingButton from "@/components/meetings/CancelMeeting";

export default function MeetingList({ meetings, type }) {
  if (meetings.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <Calendar className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No {type} meetings
        </h3>
        <p className="text-gray-500">
          {type === "upcoming" 
            ? "You have no scheduled meetings at this time." 
            : "No meetings found in this category."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {meetings.map((meeting) => (
        <Card 
          key={meeting.id} 
          className="group hover:shadow-lg transition-all duration-200 border-0 shadow-sm bg-white"
        >
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-lg font-semibold text-gray-900 leading-tight mb-2">
                  {meeting.event.title}
                </CardTitle>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <User className="mr-2 h-4 w-4 text-gray-400" />
                  <span className="font-medium">{meeting.name}</span>
                </div>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                type === "upcoming" 
                  ? "bg-blue-50 text-blue-700 border border-blue-200" 
                  : "bg-gray-50 text-gray-700 border border-gray-200"
              }`}>
                {type}
              </div>
            </div>
            
            {meeting.additionalInfo && (
              <div className="flex items-start mt-3 p-3 bg-gray-50 rounded-lg border-l-4 border-blue-200">
                <MessageSquare className="mr-2 h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-700 italic leading-relaxed">
                  "{meeting.additionalInfo}"
                </p>
              </div>
            )}
          </CardHeader>
          
          <CardContent className="pt-0">
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-8 h-8 bg-blue-50 rounded-lg mr-3">
                  <Calendar className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">
                    {format(new Date(meeting.startTime), "EEEE, MMMM d")}
                  </p>
                  <p className="text-xs text-gray-500">
                    {format(new Date(meeting.startTime), "yyyy")}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="flex items-center justify-center w-8 h-8 bg-green-50 rounded-lg mr-3">
                  <Clock className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">
                    {format(new Date(meeting.startTime), "h:mm a")} - {format(new Date(meeting.endTime), "h:mm a")}
                  </p>
                  <p className="text-xs text-gray-500">
                    {Math.round((new Date(meeting.endTime) - new Date(meeting.startTime)) / (1000 * 60))} minutes
                  </p>
                </div>
              </div>
              
              {meeting.meetLink && (
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-8 h-8 bg-purple-50 rounded-lg mr-3">
                    <Video className="h-4 w-4 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <a
                      href={meeting.meetLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200"
                    >
                      Join Meeting
                      <svg className="ml-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
          
          {type === "upcoming" && (
            <CardFooter className="pt-4 border-t border-gray-100">
              <div className="w-full">
                <CancelMeetingButton meetingId={meeting.id} />
              </div>
            </CardFooter>
          )}
        </Card>
      ))}
    </div>
  );
}