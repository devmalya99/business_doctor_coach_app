"use client";

import { useUser } from "@clerk/nextjs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {usernameSchema} from "@/app/lib/validators"
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import useFetch from "@/hooks/useFetch";
import { updateUsername } from "@/actions/user";
import useOrigin from "@/hooks/useOrigin";
import {BarLoader} from "react-spinners"
import {getLatestUpdates} from "@/actions/dashboard";
import { format } from "date-fns/format";
const DashboardPage = () => {
  const { user, isLoaded } = useUser();
     const origin = useOrigin();
     console.log("user",user)

  useFetch(updateUsername)

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
  const {
    loading,
    error,
    fn:fnUpdateUsername
  } = useFetch(updateUsername);

  const onSubmitFn=async(data)=>{
    console.log(error)
    fnUpdateUsername(data.username);
  }

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
         <CardContent>
          {!loadingUpdates ? (
            <div className="space-y-6 font-light">
              <div>
                {upcomingMeetings && upcomingMeetings?.length > 0 ? (
                  <ul className="list-disc pl-5">
                    {upcomingMeetings?.map((meeting) => (
                      <li key={meeting.id}>
                        {meeting.event.title} on{" "}
                        {format(
                          new Date(meeting.startTime),
                          "MMM d, yyyy h:mm a"
                        )}{" "}
                        with {meeting.name}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No upcoming meetings</p>
                )}
              </div>
            </div>
          ) : (
            <p>Loading updates...</p>
          )}
        </CardContent> 
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
              {
                errors.username && (
                  <p className="text-red-500 my-2">{errors.username.message}</p>
                )
              }
              {
                error && (
                  <p className="text-red-500 my-2">{error?.message}</p>
                )
              }
            </div>
            {loading && <BarLoader 
            className="my-4"
            width={"100%"} color="#36d7b7" />}
            <Button type="submit">Update UserName</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;
