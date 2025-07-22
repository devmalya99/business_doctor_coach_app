// app/(main)/profile/page.tsx
"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import Image from "next/image";
import { Form, useForm } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import z from "zod";
import { profileFormSchema } from "@/app/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";

type ProfileFormValues = z.infer<typeof profileFormSchema>;


const initialData = {
  id: "e7ddd5f5-09e1-4606-b5a7-e59c2686d799",
  clerkUserId: "user_302TYcxhNZSaVYh5ADlb7TVKyLA",
  email: "devmalya2025@gmail.com",
  username: "devmalya",
  name: "Devmalya Mazumdar",
  role: "coach",
  imageUrl:
    "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18zMDJUWWhKVEc3ZXNyMVk4NUJ2SFJrRExVSEQifQ",
  createdAt: "2025-07-18 07:45:36.869",
  updatedAt: "2025-07-21 09:54:02.069",
  bio: null,
  experience: null,
  industry: null,
};

export default function ProfilePage() {
  const [profile, setProfile] = useState(initialData);
  const [bio, setBio] = useState(profile.bio || "");
  const [experience, setExperience] = useState(profile.experience || "");
  const [industry, setIndustry] = useState(profile.industry || "");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const form = useForm<ProfileFormValues>({
    resolver:zodResolver(profileFormSchema),
    defaultValues:{
        bio:profile.bio || "",
        experience: profile.experience || "",
        industry:profile.industry || ""
    },
    mode:"onChange"
  })

 const handleSave = (data: ProfileFormValues) => {
    setProfile({ ...profile, ...data });
    setIsDialogOpen(false);
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <div className="flex gap-6 items-center">
        <Image
          src={profile.imageUrl}
          alt="Profile"
          width={100}
          height={100}
          className="rounded-full border shadow"
        />
        <div>
          <h1 className="text-2xl font-semibold">{profile.name}</h1>
          <p className="text-gray-500">@{profile.username}</p>
          <p className="text-sm text-muted-foreground">{profile.email}</p>
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <div>
          <h2 className="text-lg font-medium">Bio</h2>
          <p className="text-gray-700 whitespace-pre-wrap">
            {profile.bio || "No bio added yet."}
          </p>
        </div>
        <div>
          <h2 className="text-lg font-medium">Experience</h2>
          <p className="text-gray-700">
            {profile.experience || "No experience added yet."}
          </p>
        </div>
        <div>
          <h2 className="text-lg font-medium">Industry</h2>
          <p className="text-gray-700">
            {profile.industry || "No industry specified yet."}
          </p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="mt-4">Edit Profile</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Your Profile</DialogTitle>
            </DialogHeader>
           <Form {...form}>

            <form onSubmit={form.handleSubmit(handleSave)} className="space-y-4">
               <FormField
               control={form.control}
               name="bio"
               render={({field})=>(
                <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                        <Textarea 
                         placeholder="Tell us about yourself"
                         className="resize-none"
                         {...field}
                        />
                    </FormControl>
                </FormItem>
               )}

               >

               </FormField>

                 <FormField
                  control={form.control}
                  name="experience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Experience</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your experience"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="industry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Industry</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your industry"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Save changes</Button>

            </form>

           </Form>

            
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
