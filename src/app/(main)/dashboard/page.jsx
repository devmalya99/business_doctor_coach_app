"use client";

import { SignIn, useUser } from "@clerk/nextjs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { usernameSchema } from "@/app/lib/validators";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import useFetch from "@/hooks/useFetch";
import { updateUsername } from "@/actions/user";
import useOrigin from "@/hooks/useOrigin";
import { BarLoader } from "react-spinners";
import { getLatestUpdates } from "@/actions/dashboard";
import { format } from "date-fns/format";
import UpcomingMeetingsSkeleton from "@/components/UpcomingMeetingsSkeleton";

const DashboardPage = () => {
  const { user, isLoaded } = useUser();
  const origin = useOrigin();

  useFetch(updateUsername);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(usernameSchema),
  });

  useEffect(() => {
    setValue("username", user?.username);
  }, [isLoaded]);

  //call the user server action using useFetch hook
  const { loading, error, fn: fnUpdateUsername } = useFetch(updateUsername);

  const onSubmitFn = async (data) => {
    console.log(error);
    fnUpdateUsername(data.username);
  };

  const {
    loading: loadingUpdates,
    data: upcomingMeetings,
    fn: fnUpdates,
  } = useFetch(getLatestUpdates);

  useEffect(() => {
    (async () => await fnUpdates())();
  }, []);

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Welcome, {user?.firstName}!</CardTitle>
        </CardHeader>
        {upcomingMeetings ?(
                  <>
          <CardContent>
          <div className="space-y-6">
            <div>
              {upcomingMeetings && upcomingMeetings?.length > 0 ?  (
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-blue-600 dark:text-blue-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <rect
                          x="3"
                          y="4"
                          width="18"
                          height="18"
                          rx="2"
                          ry="2"
                        ></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Upcoming Meetings ({upcomingMeetings.length})
                    </h3>
                  </div>

                  {/* Meetings List */}
                  <div className="space-y-3">
                    {upcomingMeetings?.map((meeting) => (
                      <div
                        key={meeting.id}
                        className="relative p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 group"
                      >
                        {/* Blue accent line */}
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

                        <div className="flex items-center justify-between">
                          <div className="flex items-start gap-4 flex-1">
                            {/* Meeting Icon */}
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0">
                              <svg
                                className="w-6 h-6 text-blue-600 dark:text-blue-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="m9 12 2 2 4-4"></path>
                                <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"></path>
                                <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"></path>
                                <path d="M12 21c0-1-1-3-3-3s-3 2-3 3 1 3 3 3 3-2 3-3"></path>
                                <path d="M12 3c0 1 1 3 3 3s3-2 3-3-1-3-3-3-3 2-3 3"></path>
                              </svg>
                            </div>

                            {/* Meeting Details */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between mb-2">
                                <h4 className="font-semibold text-gray-900 dark:text-white text-base group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                  {meeting.event.title}
                                </h4>
                                <span className="text-xs font-medium px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full flex-shrink-0 ml-3">
                                  Upcoming
                                </span>
                              </div>

                              <div className="space-y-1">
                                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                                  <svg
                                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polyline points="12,6 12,12 16,14"></polyline>
                                  </svg>
                                  <span className="font-medium">
                                    {format(
                                      new Date(meeting.startTime),
                                      "MMM d, yyyy h:mm a"
                                    )}
                                  </span>
                                </div>

                                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                                  <svg
                                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                  </svg>
                                  <span>
                                    with{" "}
                                    <span className="font-medium">
                                      {meeting.name}
                                    </span>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Action Arrow */}
                          <div className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <svg
                              className="w-5 h-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <polyline points="9,18 15,12 9,6"></polyline>
                            </svg>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                
                  <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No Upcoming Meetings
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          You don't have any scheduled meetings at the moment.
        </p>
      </div>
              )}
            </div>
          </div>
        </CardContent>
</>
        ):(
        <UpcomingMeetingsSkeleton />
        )

        }
        
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Unique Link</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmitFn)}>
            <div>
              <div className="flex gap-2 mb-4">
                <span className="p-1">{origin}</span>

                <Input {...register("username")} placeholder="username" />
              </div>
              {errors.username && (
                <p className="text-red-500 my-2">{errors.username.message}</p>
              )}
              {error && <p className="text-red-500 my-2">{error?.message}</p>}
            </div>
            {loading && (
              <BarLoader className="my-4" width={"100%"} color="#36d7b7" />
            )}
            <Button type="submit">Update UserName</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;
